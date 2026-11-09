/* Logika subtitle tanpa efek samping: teks .ass (diedit di Aegisub) -> baris subtitle, segmen, waktu kutipan.
   Aturan file .ass (lihat juga komentar di kepala "Timeline 1.ass"):
   - satu baris Dialogue = satu baris subtitle; baris Comment dilewati
   - Style = pembicara: "Pewawancara" (P) atau "Narasumber" (N); isi Style (font, ukuran, warna, kotak) = gaya di web dan video PPTX
   - timing per kata dari tag karaoke {\k..}; baris tanpa tag: waktu dibagi menurut panjang kata
   - kolom Effect, dipisah ";": "segmen: <label>" (penanda Q di garis waktu), "kutipan <n>" (kutipan kunci slide 31) */
import type { Segment, Sub } from '../../src/types';

export interface Line {
  s: number;
  e: number;
  sp: 'P' | 'N';
  style: string;
  comment: boolean;
  text: string;
  w: [number, string][];
  segmen?: string;
  kutipan?: number;
  /** nomor baris di file (untuk pesan) */
  row: number;
}

export interface Result {
  lines: Line[];
  subs: Sub[];
  segments: Segment[];
  /** waktu kutipan ke-n ada di indeks n-1 */
  quoteTimes: number[];
  /** Style tiap pembicara (Narasumber -> N, Pewawancara -> P) */
  styles: Record<'P' | 'N', AssStyle>;
  warnings: string[];
}

/** panjang baris (huruf) yang mulai sulit dibaca: hanya peringatan */
export const MAKS_HURUF = 58;
const SPEAKER: Record<string, 'P' | 'N'> = { pewawancara: 'P', narasumber: 'N', p: 'P', n: 'N' };
const r2 = (x: number) => Math.round(x * 100) / 100;

export function toSec(s: string) {
  const m = /^(\d+):(\d+):(\d+)[.,](\d+)$/.exec(s.trim());
  if (!m) throw new Error(`Waktu tidak valid: "${s}"`);
  return +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 10 ** m[4].length;
}

/** teks satu baris -> kata + waktu mulai. s/e = waktu baris */
export function words(raw: string, s: number, e: number): [number, string][] {
  const BS = String.fromCharCode(92);
  const txt = raw.split(BS + 'N').join(' ').split(BS + 'n').join(' ').split(BS + 'h').join(' ');
  const out: [number, string][] = [];
  let t = s, dur: number | null = null, karaoke = false, glue = false;
  for (const m of txt.matchAll(/\{([^}]*)\}|([^{]+)/g)) {
    if (m[1] !== undefined) {
      const k = /\\[kK][fo]?(\d+)/.exec(m[1]);
      if (k) { dur = +k[1] / 100; karaoke = true; }
      continue;
    }
    const chunk = m[2];
    const start = t, toks = chunk.split(/\s+/).filter(Boolean);
    if (dur !== null) t += dur;
    dur = null;
    if (!toks.length) { glue = false; continue; }
    // satu suku karaoke berisi beberapa kata: waktunya dibagi menurut panjang kata
    const total = toks.join('').length, span = t - start;
    let acc = 0;
    toks.forEach((w, i) => {
      const ws = start + (span * acc) / total;
      acc += w.length;
      // suku yang menempel tanpa spasi ("ber{\k10}ubah") melanjutkan kata sebelumnya
      if (i === 0 && glue && !/^\s/.test(chunk) && out.length) out[out.length - 1][1] += w;
      else out.push([r2(ws), w]);
    });
    glue = !/\s$/.test(chunk);
  }
  if (!karaoke && out.length) {
    const total = out.map(w => w[1]).join('').length;
    let acc = 0;
    out.forEach(w => { w[0] = r2(s + ((e - s) * acc) / total); acc += w[1].length; });
  }
  return out;
}

/** baris "Kunci: a,b,c" di satu bagian ([V4+ Styles], [Events]) mengikuti baris Format-nya.
    Kolom terakhir (Text) boleh berisi koma. */
function section(src: string, name: string, kinds: string[], fields: string[]) {
  const rows = src.replace(/^﻿/, '').split(/\r?\n/);
  const at = rows.findIndex(r => r.trim().toLowerCase() === `[${name.toLowerCase()}]`);
  if (at < 0) throw new Error(`Bagian [${name}] tidak ada`);
  const out: { kind: string; get: (k: string) => string; row: number }[] = [];
  for (let i = at + 1; i < rows.length && !/^\[/.test(rows[i].trim()); i++) {
    const m = /^([A-Za-z]+):\s*(.*)$/.exec(rows[i]);
    if (!m) continue;
    if (m[1] === 'Format') { fields = m[2].split(',').map(f => f.trim().toLowerCase()); continue; }
    if (!kinds.includes(m[1])) continue;
    const parts = m[2].split(',');
    const vals = [...parts.slice(0, fields.length - 1), parts.slice(fields.length - 1).join(',')];
    const f = [...fields];
    out.push({ kind: m[1], get: k => (vals[f.indexOf(k.toLowerCase())] ?? '').trim(), row: i + 1 });
  }
  return out;
}

/** gaya satu Style di [V4+ Styles], nilai mentah (warna &HAABBGGRR) */
export interface AssStyle {
  name: string;
  font: string;
  size: number;
  primary: string;
  secondary: string;
  outline: string;
  back: string;
  bold: boolean;
  italic: boolean;
  borderStyle: number;
  outlineW: number;
  shadow: number;
  align: number;
  marginL: number;
  marginR: number;
  marginV: number;
  /** baris Style lengkap seperti di file (untuk disalin) */
  raw: Record<string, string>;
}

export const STYLE_FIELDS = 'name,fontname,fontsize,primarycolour,secondarycolour,outlinecolour,backcolour,bold,italic,underline,strikeout,scalex,scaley,spacing,angle,borderstyle,outline,shadow,alignment,marginl,marginr,marginv,encoding'.split(',');

/** isi file .ass -> Style per nama */
export function parseStyles(src: string): Record<string, AssStyle> {
  const out: Record<string, AssStyle> = {};
  for (const r of section(src, 'V4+ Styles', ['Style'], STYLE_FIELDS)) {
    const raw = Object.fromEntries(STYLE_FIELDS.map(k => [k, r.get(k)]));
    const n = (k: string) => +r.get(k) || 0;
    out[r.get('name')] = {
      name: r.get('name'), font: r.get('fontname'), size: n('fontsize'),
      primary: r.get('primarycolour'), secondary: r.get('secondarycolour'), outline: r.get('outlinecolour'), back: r.get('backcolour'),
      bold: n('bold') !== 0, italic: n('italic') !== 0, borderStyle: n('borderstyle'), outlineW: n('outline'), shadow: n('shadow'),
      align: n('alignment'), marginL: n('marginl'), marginR: n('marginr'), marginV: n('marginv'), raw,
    };
  }
  return out;
}

/** warna ASS &HAABBGGRR (AA 00 = penuh, FF = transparan) -> rgb + opasitas 0..1 */
export function assColor(c: string) {
  const h = c.replace(/^&H/i, '').replace(/&$/, '').padStart(8, '0');
  const n = (i: number) => parseInt(h.slice(i, i + 2), 16);
  return { r: n(6), g: n(4), b: n(2), a: Math.round((1 - n(0) / 255) * 100) / 100 };
}
/** warna ASS -> CSS rgba() */
export const cssColor = (c: string) => { const { r, g, b, a } = assColor(c); return `rgba(${r},${g},${b},${a})`; };

/** isi file .ass -> semua baris di [Events] (Dialogue dan Comment) */
export function parseAss(src: string): Line[] {
  const out: Line[] = [];
  const EV = ['layer', 'start', 'end', 'style', 'name', 'marginl', 'marginr', 'marginv', 'effect', 'text'];
  for (const { kind, get: f, row } of section(src, 'Events', ['Dialogue', 'Comment'], EV)) {
    const s = toSec(f('start')), e = toSec(f('end')), style = f('style');
    const w = words(f('text'), s, e);
    const line: Line = { s: r2(s), e: r2(e), sp: SPEAKER[style.toLowerCase()] ?? 'N', style, comment: kind === 'Comment', text: w.map(x => x[1]).join(' '), w, row };
    for (const tag of f('effect').split(';').map(x => x.trim()).filter(Boolean)) {
      const sg = /^segmen\s*:\s*(.+)$/i.exec(tag), kq = /^kutipan\s*(\d+)$/i.exec(tag);
      if (sg) line.segmen = sg[1].trim();
      else if (kq) line.kutipan = +kq[1];
    }
    out.push(line);
  }
  return out;
}

export function buildSubtitles(src: string): Result {
  const lines = parseAss(src);
  const warnings: string[] = [];
  const all = Object.values(parseStyles(src));
  const pick = (name: string) => {
    const st = all.find(x => x.name.toLowerCase() === name.toLowerCase());
    if (!st) throw new Error(`Style "${name}" tidak ada di [V4+ Styles]`);
    return st;
  };
  const styles = { N: pick('Narasumber'), P: pick('Pewawancara') };
  const shown = lines.filter(l => !l.comment && l.w.length).sort((a, b) => a.s - b.s);
  shown.forEach((l, i) => {
    if (!(l.style.toLowerCase() in SPEAKER)) warnings.push(`baris ${l.row}: style "${l.style}" bukan Pewawancara/Narasumber, dianggap narasumber`);
    if (l.e <= l.s) warnings.push(`baris ${l.row}: waktu selesai tidak setelah waktu mulai`);
    if (i && l.s < shown[i - 1].e - 0.005) warnings.push(`baris ${l.row}: mulai sebelum baris sebelumnya selesai`);
    if (l.text.length > MAKS_HURUF) warnings.push(`baris ${l.row}: ${l.text.length} huruf (lebih dari ${MAKS_HURUF}), mungkin terlalu panjang`);
    if (l.w.some(w => w[0] < l.s - 0.005 || w[0] > l.e + 0.005)) warnings.push(`baris ${l.row}: timing karaoke melewati waktu baris`);
  });

  // segmen: baris bertanda "segmen:" + baris pewawancara yang menyusul (teks pertanyaan lengkap)
  const segments: Segment[] = [];
  shown.forEach((l, i) => {
    if (!l.segmen) return;
    const q = [l.text];
    for (let j = i + 1; shown[j]?.sp === 'P' && l.sp === 'P' && !shown[j].segmen; j++) q.push(shown[j].text);
    segments.push({ t: l.s, label: l.segmen, q: q.join(' ') });
  });

  const quoteTimes: number[] = [];
  for (const l of shown) if (l.kutipan) {
    if (quoteTimes[l.kutipan - 1] !== undefined) warnings.push(`baris ${l.row}: kutipan ${l.kutipan} ditandai lebih dari sekali`);
    quoteTimes[l.kutipan - 1] ??= l.s;
  }

  const subs: Sub[] = shown.map((l, i) => ({ id: i + 1, s: l.s, e: l.e, sp: l.sp, w: l.w }));
  return { lines, subs, segments, quoteTimes, styles, warnings };
}
