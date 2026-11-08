/* Bundle src/main.ts -> assets/app.js + assets/app.css (format IIFE supaya bisa dibuka lewat file://).
   bun tools/build.ts            build final (minify, tanpa alat uji)
   bun tools/build.ts --dev      build dev (sourcemap, alat uji ?tick/?shot aktif) */
import { rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');

export async function build(dev: boolean) {
  const t0 = performance.now();
  const r = await Bun.build({
    entrypoints: [path.join(ROOT, 'src/main.ts')],
    outdir: path.join(ROOT, 'assets'),
    naming: { entry: 'app.[ext]' },
    format: 'iife',
    target: 'browser',
    minify: !dev,
    sourcemap: dev ? 'linked' : 'none',
    // font & gambar di assets/ dirujuk apa adanya dari CSS, tidak disalin
    external: ['*.woff2', '*.png'],
    define: { __DEV__: String(dev) },
  });
  if (!r.success) {
    for (const log of r.logs) console.error(log);
    return false;
  }
  if (!dev) await rm(path.join(ROOT, 'assets/app.js.map'), { force: true });
  const size = r.outputs.map(o => `${path.basename(o.path)} ${(o.size / 1024).toFixed(0)} KB`).join(' · ');
  console.log(`[${dev ? 'dev' : 'final'}] ${size} (${(performance.now() - t0).toFixed(0)} ms)`);
  return true;
}

if (import.meta.main) {
  const ok = await build(process.argv.includes('--dev'));
  process.exit(ok ? 0 : 1);
}
