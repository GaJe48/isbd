/* bun run dev: build dev + build ulang otomatis saat src/ berubah + server lokal.
   Server mendukung HTTP Range supaya video bisa digeser (seek). */
import { watch } from 'node:fs';
import path from 'node:path';
import { build } from './build';

const ROOT = path.resolve(import.meta.dir, '..');
const PORT = Number(process.env.PORT) || 5173;

await build(true);
let timer: ReturnType<typeof setTimeout> | undefined;
watch(path.join(ROOT, 'src'), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(() => build(true), 80);
});

Bun.serve({
  port: PORT,
  async fetch(req) {
    let p = decodeURIComponent(new URL(req.url).pathname);
    if (p === '/') p = '/index.html';
    const fp = path.join(ROOT, p);
    if (!fp.startsWith(ROOT)) return new Response('403', { status: 403 });
    const file = Bun.file(fp);
    if (!(await file.exists())) return new Response('404', { status: 404 });
    const headers = { 'Content-Type': file.type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
    if (!m) return new Response(file, { headers });
    const start = m[1] ? +m[1] : 0, end = m[2] ? +m[2] : file.size - 1;
    return new Response(file.slice(start, end + 1), {
      status: 206,
      headers: { ...headers, 'Content-Range': `bytes ${start}-${end}/${file.size}`, 'Content-Length': String(end - start + 1) },
    });
  },
});
console.log(`Presentasi: http://localhost:${PORT}  (Ctrl+C untuk berhenti)`);
