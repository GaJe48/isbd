/* Gabungkan screenshot web (export.ts --shots) dan render PowerPoint (render.ps1) berdampingan:
   out/pptx/cmp/N.png = kiri web, kanan PowerPoint. Pakai: bun tools/pptx/compare.ts [N ...] */
import { mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dir, '..', '..', 'out', 'pptx');
const CMP = path.join(OUT, 'cmp');
mkdirSync(CMP, { recursive: true });
const { slides } = (await Bun.file(path.join(OUT, 'dump.json')).json()) as { slides: { id: string }[] };
const want = process.argv.slice(2).map(Number);
const ns = want.length ? want : readdirSync(path.join(OUT, 'render')).filter(f => f.endsWith('.png')).map(f => +/\d+/.exec(f)![0]).sort((a, b) => a - b);

await Promise.all(ns.map(async n => {
  const p = Bun.spawn(['ffmpeg', '-y', '-loglevel', 'error', '-i', path.join(OUT, 'web', `${n}.png`), '-i', path.join(OUT, 'render', `slide${n}.png`),
    '-filter_complex', '[0]scale=960:540[a];[1]scale=960:540[b];[a][b]hstack', '-frames:v', '1', path.join(CMP, `${n}.png`)]);
  await p.exited;
}));
console.log(ns.map(n => `${n}=${slides[n - 1]?.id}`).join(' '));
