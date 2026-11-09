/* "Timeline 1.ass" (Aegisub) -> src/data/subs.ts. Pakai: bun run subs  (membuat subtitle lalu build ulang) */
import path from 'node:path';
import { KUTIPAN } from '../../src/data/kutipan';
import { assColor, buildSubtitles, cssColor, type AssStyle } from './core';

const ROOT = path.resolve(import.meta.dir, '..', '..');
const ASS = path.join(ROOT, 'Timeline 1.ass');
const OUT = path.join(ROOT, 'src', 'data', 'subs.ts');

const r = buildSubtitles(await Bun.file(ASS).text());
const quotes = KUTIPAN.map((q, k) => ({ t: r.quoteTimes[k] ?? 0, ...q }));

/* Style .ass -> CSS. Ukuran huruf libass = tinggi ascender+descender (~1,22 em untuk Montserrat), jadi px CSS = Fontsize / 1,22. */
const rgb = (c: string) => { const { r: R, g, b } = assColor(c); return `rgb(${R},${g},${b})`; };
const css = (s: AssStyle) => ({
  on: rgb(s.primary), off: rgb(s.secondary), offA: assColor(s.secondary).a,
  box: s.borderStyle === 3 ? cssColor(s.outline) : 'transparent', px: Math.round(s.size / 1.22), italic: s.italic,
});

await Bun.write(OUT, `// Dibuat otomatis oleh tools/subtitle/cli.ts dari "Timeline 1.ass". Jangan diedit langsung: jalankan bun run subs.
import type { Quote, Segment, Sub, SubStyle } from '../types';

export const SUBS: Sub[] = ${JSON.stringify(r.subs)};

/** gaya per pembicara dari Style Narasumber / Pewawancara */
export const SUB_STYLE: Record<'P' | 'N', SubStyle> = ${JSON.stringify({ N: css(r.styles.N), P: css(r.styles.P) }, null, 2)};

export const SEGMENTS: Segment[] = ${JSON.stringify(r.segments, null, 2)};

export const QUOTES: Quote[] = ${JSON.stringify(quotes, null, 2)};
`);

// laporan
const mmss = (t: number) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${(t % 60).toFixed(1).padStart(4, '0')}`;
r.subs.forEach(l => console.log(`${String(l.id).padStart(2, '0')} ${mmss(l.s)} ${l.sp === 'P' ? '[P]' : '   '} ${l.w.map(w => w[1]).join(' ')}`));
console.log(`\n${r.subs.length} baris (${r.lines.length - r.subs.length} komentar) -> ${path.relative(ROOT, OUT)}`);
r.segments.forEach((s, k) => console.log(`Q${k + 1} ${mmss(s.t)} ${s.label}`));
quotes.forEach((q, k) => console.log(`★${k + 1} ${mmss(q.t)} ${q.teks}`));
quotes.forEach((q, k) => { if (!q.t) console.warn(`! kutipan ${k + 1} belum ditandai: isi kolom Effect "kutipan ${k + 1}" di Aegisub`); });
if (r.quoteTimes.length > KUTIPAN.length) console.warn(`! ada tanda "kutipan ${r.quoteTimes.length}" tapi src/data/kutipan.ts hanya berisi ${KUTIPAN.length}`);
r.warnings.forEach(w => console.warn(`! ${w}`));
