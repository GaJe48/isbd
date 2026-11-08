/* "Timeline 1.srt" -> src/data/subs.ts. Pakai: bun run subs  (membuat subtitle lalu build ulang) */
import path from 'node:path';
import { CONFIG } from './config';
import { buildSubtitles } from './core';

const ROOT = path.resolve(import.meta.dir, '..', '..');
const SRT = path.join(ROOT, 'Timeline 1.srt');
const OUT = path.join(ROOT, 'src', 'data', 'subs.ts');

const r = buildSubtitles(await Bun.file(SRT).text(), CONFIG);

await Bun.write(OUT, `// Dibuat otomatis oleh tools/subtitle/cli.ts dari "Timeline 1.srt". Jangan diedit langsung: jalankan bun run subs.
import type { Quote, Segment, Sub } from '../types';

export const SUBS: Sub[] = ${JSON.stringify(r.subs)};

export const SEGMENTS: Segment[] = ${JSON.stringify(r.segments, null, 2)};

export const QUOTES: Quote[] = ${JSON.stringify(r.quotes, null, 2)};
`);

// laporan
const mmss = (t: number) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${(t % 60).toFixed(1).padStart(4, '0')}`;
r.all.forEach((l, i) => console.log(`${String(i + 1).padStart(2, '0')} ${mmss(l.s)} ${l.hide ? '(sembunyi)' : l.sp === 'P' ? '[P]' : '   '} ${l.key ? '★ ' : ''}${l.text}`));
console.log(`\n${r.wordCount} kata (${r.perKata ? 'per kata' : 'per baris'}) -> ${r.subs.length} baris -> ${path.relative(ROOT, OUT)}`);
r.segments.forEach((s, k) => console.log(`Q${k + 1} ${mmss(s.t)} ${s.label}`));
r.quotes.forEach((q, k) => console.log(`★${k + 1} ${mmss(q.t)} ${q.teks}`));
const nKey = r.subs.filter(l => l.key).length;
if (nKey !== CONFIG.kutipan.length) console.warn(`! ${nKey} baris kutipan ditemukan, diharapkan ${CONFIG.kutipan.length}`);
if (r.segments.length !== CONFIG.segmen.length) console.warn(`! ${r.segments.length} segmen ditemukan, diharapkan ${CONFIG.segmen.length}`);
