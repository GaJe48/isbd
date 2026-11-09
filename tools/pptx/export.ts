/* Ekspor semua langkah klik presentasi -> out/pptx/dump.json + out/pptx/img/*.png (untuk build.ts).
   Membuka build dev di Edge headless (playwright-core, memakai Edge bawaan Windows), menyuntikkan extract.ts,
   lalu tiap elemen bertanda `pic` dipotret sendirian dengan latar transparan pada skala 2×.
   Pakai: bun tools/pptx/export.ts [--only=29,37] [--shots]   (--shots: simpan juga screenshot web per langkah di out/pptx/web/) */
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { build } from '../build';
import type { SlideData } from './types';

const ROOT = path.resolve(import.meta.dir, '..', '..');
const OUT = path.join(ROOT, 'out', 'pptx');
const IMG = path.join(OUT, 'img');
const WEB = path.join(OUT, 'web');
mkdirSync(IMG, { recursive: true });
mkdirSync(WEB, { recursive: true });
const SHOTS = process.argv.includes('--shots');
const only = process.argv.find(a => a.startsWith('--only='))?.slice(7).split(',').map(Number);

await build(true);
const server = Bun.serve({
  port: 0,
  async fetch(req) {
    let p = decodeURIComponent(new URL(req.url).pathname);
    if (p === '/') p = '/index.html';
    const fp = path.join(ROOT, p);
    const file = Bun.file(fp);
    if (!fp.startsWith(ROOT) || !(await file.exists())) return new Response('404', { status: 404 });
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
    if (!m) return new Response(file, { headers: { 'Accept-Ranges': 'bytes' } });
    const start = m[1] ? +m[1] : 0, end = m[2] ? +m[2] : file.size - 1;
    return new Response(file.slice(start, end + 1), { status: 206, headers: { 'Content-Range': `bytes ${start}-${end}/${file.size}`, 'Accept-Ranges': 'bytes' } });
  },
});

const extract = await Bun.build({ entrypoints: [path.join(import.meta.dir, 'extract.ts')], format: 'iife' });
const browser = await chromium.launch({ channel: 'msedge', args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'] });
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.error('  [halaman]', e.message));
  await page.goto(`http://localhost:${server.port}/#1`);
  await page.waitForFunction(() => 'test' in window && document.fonts.status === 'loaded');
  await page.addScriptTag({ content: await extract.outputs[0].text() });
  const stage = await page.evaluate(() => { const r = document.querySelector('#stage')!.getBoundingClientRect(); return { x: r.left, y: r.top }; });

  type P = { states: () => [number, number][]; capture: (n: number, s: number, w: number, p: number) => Promise<SlideData & { pages?: number }>; isolate: (id: string | null) => void };
  const P = 'PPTX' as const;
  let states = await page.evaluate(() => (window as unknown as { PPTX: P }).PPTX.states());
  if (only) states = states.filter(([n]) => only.includes(n));

  const slides: SlideData[] = [];
  const seen = new Set<string>();
  let pics = 0;
  const t0 = Date.now();
  for (const [n, s] of states) {
    for (let pg = 0, pages = 1; pg < pages; pg++) {
      const d = await page.evaluate(([n, s, pg]) => (window as unknown as { PPTX: P }).PPTX.capture(n, s, 1000, pg), [n, s, pg] as const);
      pages = d.pages || 1;
      delete d.pages;
      // pembanding untuk render PowerPoint (tools/pptx/compare.ps1)
      if (SHOTS) await page.screenshot({ path: path.join(WEB, `${slides.length + 1}.png`), scale: 'css', animations: 'disabled' });
      for (const sh of d.shapes) {
        if (!sh.pic) continue;
        if (sh.video) {
          // poster: bingkai video sedikit setelah awal (seperti di web)
          await page.evaluate(id => new Promise<void>(res => {
            const v = document.querySelector<HTMLVideoElement>(`[data-pptx="${id}"]`)!;
            const go = () => { if (Math.abs(v.currentTime - 0.4) < 0.05 && v.readyState >= 2) return res(); v.addEventListener('seeked', () => res(), { once: true }); v.currentTime = 0.4; };
            if (v.readyState >= 1) go(); else v.addEventListener('loadedmetadata', go, { once: true });
            setTimeout(res, 5000);
          }), sh.pic.id);
        }
        await page.evaluate(([P, id]) => (window as unknown as Record<string, { isolate: (id: string) => void }>)[P].isolate(id), [P, sh.pic.id] as const);
        const png = await page.screenshot({ clip: { x: stage.x + sh.x, y: stage.y + sh.y, width: sh.w, height: sh.h }, omitBackground: true, animations: 'disabled' });
        const file = `${Bun.hash(png).toString(16)}.png`;
        if (!seen.has(file)) { await Bun.write(path.join(IMG, file), png); seen.add(file); }
        sh.pic.file = file;
        pics++;
      }
      await page.evaluate(() => (window as unknown as { PPTX: P }).PPTX.isolate(null));
      slides.push(d);
      process.stdout.write(`\r${d.id.padEnd(8)} ${slides.length} keadaan, ${pics} potret (${seen.size} unik), ${((Date.now() - t0) / 1000).toFixed(0)} dtk   `);
    }
  }
  await Bun.write(path.join(OUT, 'dump.json'), JSON.stringify({ slides }));
  console.log(`\n-> ${path.relative(ROOT, path.join(OUT, 'dump.json'))}`);
} finally {
  await browser.close();
  server.stop(true);
}
