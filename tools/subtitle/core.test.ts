import { describe, expect, test } from 'bun:test';
import path from 'node:path';
import { KUTIPAN } from '../../src/data/kutipan';
import { assColor, buildSubtitles, parseAss, parseStyles, words } from './core';

const K = String.fromCharCode(92) + 'k';
const STYLES = '[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'
  + 'Style: Narasumber,Montserrat SemiBold,54,&H00FFFFFF,&H94FFFFFF,&H940E0A0A,&H00000000,0,0,0,0,100,100,0,0,3,14,0,2,246,246,142,1\n'
  + 'Style: Pewawancara,Arial,40,&H00F5C6CF,&H94F5C6CF,&H940E0A0A,&H00000000,0,1,0,0,100,100,0,0,1,2,0,2,10,10,20,1\n';
const ass = (events: string[]) => `[Script Info]\nScriptType: v4.00+\n\n${STYLES}\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n${events.join('\n')}\n`;

describe('words', () => {
  test('tag karaoke jadi waktu mulai per kata', () => {
    expect(words(`{${K}50}Halo {${K}30}dunia.`, 1, 1.8)).toEqual([[1, 'Halo'], [1.5, 'dunia.']]);
  });
  test('suku yang menempel tanpa spasi tetap satu kata', () => {
    expect(words(`{${K}20}ber{${K}20}ubah-{${K}40}rubah`, 0, 0.8)).toEqual([[0, 'berubah-rubah']]);
  });
  test('satu suku berisi dua kata: waktunya dibagi menurut panjang kata', () => {
    const w = words(`{${K}100}di situ`, 0, 1);
    expect(w.map(x => x[1])).toEqual(['di', 'situ']);
    expect(w[1][0]).toBeCloseTo(1 / 3, 2);
  });
  test('tanpa tag karaoke: waktu baris dibagi menurut panjang kata', () => {
    expect(words('aa bb', 0, 2)).toEqual([[0, 'aa'], [1, 'bb']]);
  });
});

describe('parseAss', () => {
  const lines = parseAss(ass([
    `Dialogue: 0,0:00:01.00,0:00:02.00,Pewawancara,,0,0,0,segmen: Awal; kutipan 2,{${K}50}Apa {${K}50}kabar, Bu?`,
    `Comment: 0,0:00:02.00,0:00:03.00,Narasumber,,0,0,0,,catatan`,
    `Dialogue: 0,0:00:03.00,0:00:04.00,Narasumber,,0,0,0,,Baik.`,
  ]));
  test('style menentukan pembicara, koma di teks tidak memotong kolom', () => {
    expect(lines.map(l => [l.sp, l.comment, l.text])).toEqual([['P', false, 'Apa kabar, Bu?'], ['N', true, 'catatan'], ['N', false, 'Baik.']]);
  });
  test('kolom Effect: segmen dan kutipan', () => {
    expect(lines[0].segmen).toBe('Awal');
    expect(lines[0].kutipan).toBe(2);
  });
  test('baris Comment tidak tampil', () => {
    const r = buildSubtitles(ass([`Comment: 0,0:00:01.00,0:00:02.00,Narasumber,,0,0,0,,x`, `Dialogue: 0,0:00:03.00,0:00:04.00,Narasumber,,0,0,0,,y`]));
    expect(r.subs.map(s => s.w[0][1])).toEqual(['y']);
  });
});

describe('style', () => {
  test('warna ASS &HAABBGGRR jadi rgb + opasitas', () => {
    expect(assColor('&H940E0A0A')).toEqual({ r: 10, g: 10, b: 14, a: 0.42 });
    expect(assColor('&H00F5C6CF')).toEqual({ r: 207, g: 198, b: 245, a: 1 });
  });
  test('Style dibaca per nama, kolom mengikuti Format', () => {
    const p = parseStyles(ass([])).Pewawancara;
    expect([p.font, p.size, p.italic, p.borderStyle, p.marginV]).toEqual(['Arial', 40, true, 1, 20]);
  });
  test('style pembicara masuk hasil', () => {
    expect(buildSubtitles(ass([])).styles.N.font).toBe('Montserrat SemiBold');
  });
});

describe('subtitle dari Timeline 1.ass', async () => {
  const r = buildSubtitles(await Bun.file(path.join(import.meta.dir, '..', '..', 'Timeline 1.ass')).text());

  test('tidak ada peringatan', () => {
    expect(r.warnings).toEqual([]);
  });
  test('empat segmen pertanyaan dari pewawancara', () => {
    expect(r.segments.map(s => s.label)).toEqual(['Gejala awal', 'Komunikasi', 'Obat', 'Kendala mendampingi']);
    for (const s of r.segments) expect(s.q).toContain('?');
  });
  test('setiap kutipan di src/data/kutipan.ts ditandai', () => {
    expect(r.quoteTimes.length).toBe(KUTIPAN.length);
    expect(r.quoteTimes.every(t => t > 0)).toBe(true);
  });
  test('waktu berurutan dan kata dalam baris naik', () => {
    r.subs.forEach((l, i) => {
      if (i) expect(l.s).toBeGreaterThanOrEqual(r.subs[i - 1].e);
      l.w.forEach((w, k) => { if (k) expect(w[0]).toBeGreaterThanOrEqual(l.w[k - 1][0]); });
    });
  });
});
