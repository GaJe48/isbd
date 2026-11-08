/* Logika subtitle tanpa efek samping: SRT (teks) -> baris subtitle, segmen, kutipan. */
import type { Quote, Segment, Sub } from '../../src/types';
import type { SubtitleConfig } from './config';

export interface Word {
  s: number;
  e: number;
  w: string;
  forced?: boolean;
  pstart?: boolean;
  keyStart?: number;
  inKey?: boolean;
}

export interface Line {
  text: string;
  s: number;
  e: number;
  sp: 'P' | 'N';
  key: boolean;
  hide: boolean;
  w: [number, string][];
}

export interface Result {
  all: Line[];
  subs: Sub[];
  segments: Segment[];
  quotes: Quote[];
  perKata: boolean;
  wordCount: number;
}

export const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const r3 = (x: number) => Math.round(x * 1000) / 1000;
export const endsSentence = (w: string) => /[.?!]["”']?$/.test(w);
const textOf = (ws: Word[]) => ws.map(w => w.w).join(' ');

const PREP = new Set(['ke', 'di', 'dari', 'sama', 'buat', 'untuk', 'dengan', 'yang']);
const CONJ = new Set(['tapi', 'karena', 'terus', 'jadi', 'dan', 'atau', 'kalau', 'kalo', 'yang', 'akhirnya', 'berarti', 'katanya', 'bilang']);

const toSec = (s: string) => {
  const m = /(\d+):(\d+):(\d+)[,.](\d+)/.exec(s);
  if (!m) throw new Error(`Waktu SRT tidak valid: "${s}"`);
  return +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000;
};

/** SRT -> cue berisi kata-kata. Cue dengan beberapa kata: waktunya dibagi menurut panjang kata. */
export function parseSrt(src: string): Word[][] {
  return src.replace(/^﻿/, '').replace(/\r/g, '').trim().split(/\n\s*\n/).map(b => {
    const ls = b.split('\n'), i = ls.findIndex(l => l.includes('-->'));
    if (i < 0) return [];
    const [s, e] = ls[i].split('-->').map(toSec);
    const toks = ls.slice(i + 1).join(' ').split(/\s+/).filter(Boolean);
    const total = toks.join('').length;
    let acc = 0;
    return toks.map(w => ({ s: s + (e - s) * acc / total, e: s + (e - s) * (acc += w.length) / total, w }));
  }).filter(c => c.length);
}

/** "berubah-" + "rubah" -> "berubah-rubah" */
const joinHyphen = (ws: Word[]) => ws.reduce<Word[]>((o, w) => {
  const p = o.at(-1);
  if (p && p.w.endsWith('-')) { p.w += w.w; p.e = w.e; } else o.push({ ...w });
  return o;
}, []);

/** Pecah satu frasa jadi baris seimbang (DP: biaya panjang + bonus potong di koma/jeda). */
function splitPhrase(ws: Word[], cfg: SubtitleConfig): Word[][] {
  const n = ws.length, len = (i: number, j: number) => textOf(ws.slice(i, j)).length;
  if (len(0, n) <= cfg.maksHuruf) return [ws];
  const best = Array(n + 1).fill(Infinity), from = Array(n + 1).fill(0);
  best[0] = 0;
  for (let j = 1; j <= n; j++) for (let i = 0; i < j; i++) {
    if (j < n && ws[j].inKey) continue;                 // kutipan kunci tidak dipecah
    const L = len(i, j);
    if (L > cfg.maksHuruf && j - i > 1) continue;
    const d = (L - cfg.targetHuruf) / cfg.targetHuruf;
    let c = 10 * d * d + 3;                             // panjang ideal + biaya per baris
    if (j - i <= 2 && n > 3) c += 8;                    // hindari baris 1–2 kata
    if (j < n) {                                        // kualitas titik potong setelah kata j-1
      if (/[,;:]["”']?$/.test(ws[j - 1].w)) c -= 6;
      c -= 4 * Math.min(ws[j].s - ws[j - 1].e, 1.5);
      if (CONJ.has(norm(ws[j].w))) c -= 2;
      if (/^["“]/.test(ws[j].w)) c -= 2;
      if (PREP.has(norm(ws[j - 1].w))) c += 6;          // jangan berakhir di kata depan
    }
    if (best[i] + c < best[j]) { best[j] = best[i] + c; from[j] = i; }
  }
  const out: Word[][] = [];
  for (let j = n; j > 0; j = from[j]) out.unshift(ws.slice(from[j], j));
  return out;
}

export function buildSubtitles(srt: string, cfg: SubtitleConfig): Result {
  const P = cfg.pewawancara.map(norm), K = cfg.kutipan.map(q => norm(q.cari)), H = cfg.sembunyikan.map(norm), CUT = cfg.potong.map(norm);
  const cues = parseSrt(srt);
  const flat = cues.flat();
  const perKata = flat.length / cues.length < 1.5;     // SRT per kata (boleh ada cue 2 kata, mis. "di situ")

  let lines: Word[][];
  if (!perKata) lines = cues.map(joinHyphen);          // SRT per baris: pakai apa adanya
  else {
    const words = joinHyphen(flat), nw = words.map(w => norm(w.w));
    const findAll = (phs: string[]) => {
      const r: [number, number, number][] = [];         // [awal, akhir, indeks frasa]
      phs.forEach((p, pi) => {
        const ph = p.split(' ');
        for (let i = 0; i + ph.length <= nw.length; i++) if (ph.every((x, j) => nw[i + j] === x)) r.push([i, i + ph.length, pi]);
      });
      return r;
    };
    const pStart = new Set(findAll(P).map(h => h[0])), keyHits = findAll(K);
    // awal baris wajib: frasa potong + awal ucapan pewawancara (frasa terpanjang menang)
    const forced = new Set<number>(), taken: [number, number][] = [];
    for (const [a, b] of findAll([...CUT, ...P]).sort((x, y) => (y[1] - y[0]) - (x[1] - x[0])))
      if (!taken.some(([x, y]) => a > x && a < y)) { taken.push([a, b]); forced.add(a); }

    // frasa = dipotong di akhir kalimat, awal wajib, atau jeda panjang
    const phrases: Word[][] = [];
    let cur: Word[] = [];
    words.forEach((w, i) => {
      if (cur.length && (forced.has(i) || w.s - cur.at(-1)!.e > cfg.jedaPaksa)) phrases.push(cur.splice(0));
      const kh = keyHits.find(h => h[0] === i);
      cur.push({ ...w, forced: forced.has(i), pstart: pStart.has(i), keyStart: kh ? kh[2] : undefined, inKey: keyHits.some(h => i > h[0] && i < h[1]) });
      if (endsSentence(w.w)) phrases.push(cur.splice(0));
    });
    if (cur.length) phrases.push(cur);
    // kata sambung yang menggantung sebelum jeda pindah ke frasa berikutnya
    for (let k = 0; k < phrases.length - 1; k++) {
      const ph = phrases[k], last = ph.at(-1)!, nx = phrases[k + 1];
      if (!endsSentence(last.w) && !nx[0].forced && CONJ.has(norm(last.w))) {
        nx.unshift(ph.pop()!);
        if (!ph.length) phrases.splice(k--, 1);
      }
    }
    // kalimat pendek yang berdekatan digabung ("enam bulan, yah. Enam bulan.")
    lines = phrases.flatMap(p => splitPhrase(p, cfg)).reduce<Word[][]>((o, l) => {
      const p = o.at(-1);
      const merge = p && !l[0].forced && !H.includes(norm(textOf(l))) && !H.includes(norm(textOf(p)))
        && l[0].s - p.at(-1)!.e < 0.5 && textOf([...p, ...l]).length <= cfg.gabungMaks;
      if (merge) p.push(...l); else o.push(l);
      return o;
    }, []);
  }

  // pembicara (pewawancara berlanjut sampai kalimatnya selesai), kutipan, sembunyi
  const all: Line[] = [];
  const quoteTime: number[] = [];
  for (const l of lines) {
    const text = textOf(l), n = norm(text), prev = all.at(-1);
    const sp = l.some(w => w.pstart) || P.some(p => n.includes(p)) || (prev?.sp === 'P' && !endsSentence(prev.text)) ? 'P' : 'N';
    l.forEach(w => { if (w.keyStart !== undefined) quoteTime[w.keyStart] ??= r3(w.s); });
    K.forEach((k, i) => { if (n.includes(k)) quoteTime[i] ??= r3(l[0].s); });
    all.push({ text, s: r3(l[0].s), e: r3(l.at(-1)!.e), sp, key: l.some(w => w.keyStart !== undefined) || K.some(k => n.includes(k)), hide: H.includes(n), w: l.map(x => [r3(x.s), x.w]) });
  }
  const shown = all.filter(l => !l.hide);

  // segmen = awal tiap blok pewawancara yang berisi pertanyaan (?)
  const segments: Segment[] = [];
  shown.forEach((l, i) => {
    if (l.sp !== 'P' || shown[i - 1]?.sp === 'P') return;
    const q: string[] = [];
    for (let j = i; shown[j]?.sp === 'P'; j++) q.push(shown[j].text);
    if (q.join(' ').includes('?')) segments.push({ t: l.s, label: cfg.segmen[segments.length] || `Pertanyaan ${segments.length + 1}`, q: q.join(' ') });
  });

  const subs: Sub[] = shown.map((l, i) => ({ id: i + 1, s: l.s, e: l.e, sp: l.sp, w: l.w, ...(l.key && { key: 1 as const }) }));
  const quotes: Quote[] = cfg.kutipan.map((q, i) => ({ t: quoteTime[i] ?? 0, teks: q.teks, siapa: q.siapa, makna: q.makna }));
  return { all, subs, segments, quotes, perKata, wordCount: flat.length };
}
