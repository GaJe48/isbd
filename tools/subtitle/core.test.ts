import { describe, expect, test } from 'bun:test';
import path from 'node:path';
import { CONFIG } from './config';
import { buildSubtitles, norm, parseSrt } from './core';

const srt = (cues: [number, number, string][]) =>
  cues.map(([s, e, t], i) => `${i + 1}\n00:00:${String(s).padStart(2, '0')},000 --> 00:00:${String(e).padStart(2, '0')},000\n${t}`).join('\n\n');

describe('parseSrt', () => {
  test('membaca cue per kata', () => {
    const c = parseSrt(srt([[1, 2, 'Halo'], [2, 3, 'dunia.']]));
    expect(c.flat().map(w => w.w)).toEqual(['Halo', 'dunia.']);
    expect(c[0][0].s).toBe(1);
  });
  test('cue berisi dua kata dibagi menurut panjang kata', () => {
    const [[a, b]] = parseSrt(srt([[0, 4, 'di situ']]));
    expect(a.e).toBeCloseTo(b.s);
    expect(b.e).toBe(4);
  });
});

describe('subtitle dari Timeline 1.srt', async () => {
  const text = await Bun.file(path.join(import.meta.dir, '..', '..', 'Timeline 1.srt')).text();
  const r = buildSubtitles(text, CONFIG);

  test('semua segmen pertanyaan terdeteksi', () => {
    expect(r.segments.map(s => s.label)).toEqual(CONFIG.segmen);
    for (const s of r.segments) expect(s.q).toContain('?');
  });
  test('setiap kutipan kunci utuh dalam satu baris', () => {
    for (const q of CONFIG.kutipan) expect(r.subs.some(l => norm(l.w.map(w => w[1]).join(' ')).includes(norm(q.cari)))).toBe(true);
    expect(r.quotes.every(q => q.t > 0)).toBe(true);
  });
  test('tidak ada baris melebihi batas huruf', () => {
    for (const l of r.subs) expect(l.w.map(w => w[1]).join(' ').length).toBeLessThanOrEqual(CONFIG.maksHuruf);
  });
  test('baris yang disembunyikan tidak ikut tampil', () => {
    const hidden = CONFIG.sembunyikan.map(norm);
    expect(r.subs.some(l => hidden.includes(norm(l.w.map(w => w[1]).join(' '))))).toBe(false);
  });
  test('waktu berurutan dan kata dalam baris naik', () => {
    r.subs.forEach((l, i) => {
      if (i) expect(l.s).toBeGreaterThanOrEqual(r.subs[i - 1].s);
      l.w.forEach((w, k) => { if (k) expect(w[0]).toBeGreaterThanOrEqual(l.w[k - 1][0]); });
    });
  });
  test('kata terpotong tanda hubung digabung', () => {
    expect(r.subs.some(l => l.w.some(w => w[1].endsWith('-')))).toBe(false);
  });
});
