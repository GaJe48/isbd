// Ubah "Timeline 1.srt" -> assets/js/subs.js (subtitle karaoke slide 29).
// Pakai: node perbarui-subtitle.js
const fs = require('fs');
const path = require('path');

// ---------------- pengaturan ----------------
// Pencocokan teks mengabaikan huruf besar/kecil dan tanda baca.
const ATUR = {
  pewawancara: ['Untuk gejala awal Bapak', 'Kalau misal Ibu ada kayak kendala komunikasi', 'Kalau misal ini ada obat', 'Kalau kendala atau kesulitan'], // awal ucapan pewawancara; berlanjut sampai akhir kalimat
  kutipan: ['tapi saya nggak tahu kalau sakit', 'saya cuma psikolog bukan dokter', 'saya tuh sehat', 'aku nggak mau di rumah'], // urutan = urutan kutipan slide 31
  sembunyikan: ['Iya.'],             // baris yang isinya persis ini
  potong: ['Awalnya?', 'Iya.', 'Ya, iya.'], // baris baru selalu dimulai dari sini
  segmen: ['Gejala awal', 'Komunikasi', 'Obat', 'Kendala mendampingi'], // label Q1..Qn
  targetHuruf: 38,  // panjang baris ideal (huruf)
  maksHuruf: 58,    // panjang baris maksimum
  gabungMaks: 30,   // kalimat pendek berurutan digabung kalau totalnya <= ini
  jedaPaksa: 1.5,   // jeda (detik) yang selalu memulai baris baru
};
// ---------------------------------------------

const SRT = path.join(__dirname, 'Timeline 1.srt');
const OUT = path.join(__dirname, 'assets', 'js', 'subs.js');
const norm = s => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const r3 = x => Math.round(x * 1000) / 1000;
const endsSentence = w => /[.?!]["”']?$/.test(w);
const textOf = ws => ws.map(w => w.w).join(' ');
const [P, K, H, CUT] = [ATUR.pewawancara, ATUR.kutipan, ATUR.sembunyikan, ATUR.potong].map(a => a.map(norm));

// 1. Baca SRT. Cue berisi beberapa kata -> waktunya dibagi menurut panjang kata.
const toSec = s => { const [, h, m, sec, ms] = /(\d+):(\d+):(\d+)[,.](\d+)/.exec(s); return +h * 3600 + +m * 60 + +sec + +ms / 1000; };
const cues = fs.readFileSync(SRT, 'utf8').replace(/^﻿/, '').replace(/\r/g, '').trim().split(/\n\s*\n/).map(b => {
  const ls = b.split('\n'), i = ls.findIndex(l => l.includes('-->'));
  const [s, e] = ls[i].split('-->').map(toSec), toks = ls.slice(i + 1).join(' ').split(/\s+/).filter(Boolean);
  const total = toks.join('').length; let acc = 0;
  return toks.map(w => ({ s: s + (e - s) * acc / total, e: s + (e - s) * (acc += w.length) / total, w }));
}).filter(c => c.length);
const perKata = cues.flat().length / cues.length < 1.5; // SRT per kata (boleh ada cue 2 kata, mis. "di situ")

// "berubah-" + "rubah" -> "berubah-rubah"
const joinHyphen = ws => ws.reduce((o, w) => { const p = o.at(-1); if (p && p.w.endsWith('-')) { p.w += w.w; p.e = w.e; } else o.push({ ...w }); return o; }, []);

// Pecah satu frasa jadi baris-baris seimbang (DP: biaya panjang + bonus potong di koma/jeda).
const PREP = new Set(['ke', 'di', 'dari', 'sama', 'buat', 'untuk', 'dengan', 'yang']);
const CONJ = new Set(['tapi', 'karena', 'terus', 'jadi', 'dan', 'atau', 'kalau', 'kalo', 'yang', 'akhirnya', 'berarti', 'katanya', 'bilang']);
function splitPhrase(ws) {
  const n = ws.length, len = (i, j) => textOf(ws.slice(i, j)).length;
  if (len(0, n) <= ATUR.maksHuruf) return [ws];
  const best = Array(n + 1).fill(Infinity), from = Array(n + 1).fill(0); best[0] = 0;
  for (let j = 1; j <= n; j++) for (let i = 0; i < j; i++) {
    if (j < n && ws[j].inKey) continue;                       // kutipan kunci tidak dipecah
    const L = len(i, j); if (L > ATUR.maksHuruf && j - i > 1) continue;
    const d = (L - ATUR.targetHuruf) / ATUR.targetHuruf;
    let c = 10 * d * d + 3;                                   // panjang ideal + biaya per baris
    if (j - i <= 2 && n > 3) c += 8;                          // hindari baris 1–2 kata
    if (j < n) {                                              // kualitas titik potong setelah kata j-1
      if (/[,;:]["”']?$/.test(ws[j - 1].w)) c -= 6;
      c -= 4 * Math.min(ws[j].s - ws[j - 1].e, 1.5);
      if (CONJ.has(norm(ws[j].w))) c -= 2;
      if (/^["“]/.test(ws[j].w)) c -= 2;
      if (PREP.has(norm(ws[j - 1].w))) c += 6;               // jangan berakhir di kata depan
    }
    if (best[i] + c < best[j]) { best[j] = best[i] + c; from[j] = i; }
  }
  const out = []; for (let j = n; j > 0; j = from[j]) out.unshift(ws.slice(from[j], j));
  return out;
}

// 2. Susun baris.
let lines;
if (!perKata) lines = cues.map(joinHyphen); // SRT per baris: pakai apa adanya
else {
  const words = joinHyphen(cues.flat()), nw = words.map(w => norm(w.w));
  // awal baris wajib: frasa potong + awal ucapan pewawancara (frasa terpanjang menang)
  const findAll = phs => { const r = []; for (const ph of phs.map(p => p.split(' '))) for (let i = 0; i + ph.length <= nw.length; i++) if (ph.every((p, j) => nw[i + j] === p)) r.push([i, i + ph.length]); return r; };
  const pStart = new Set(findAll(P).map(h => h[0])), keyHits = findAll(K);
  const forced = new Set(), taken = [];
  const hits = findAll([...CUT, ...P]);
  for (const [a, b] of hits.sort((x, y) => (y[1] - y[0]) - (x[1] - x[0])))
    if (!taken.some(([x, y]) => a > x && a < y)) { taken.push([a, b]); forced.add(a); }

  // frasa = potongan di akhir kalimat, awal wajib, atau jeda panjang
  const phrases = []; let cur = [];
  words.forEach((w, i) => {
    if (cur.length && (forced.has(i) || w.s - cur.at(-1).e > ATUR.jedaPaksa)) phrases.push(cur.splice(0));
    cur.push({ ...w, forced: forced.has(i), pstart: pStart.has(i), keyStart: keyHits.some(h => h[0] === i), inKey: keyHits.some(h => i > h[0] && i < h[1]) });
    if (endsSentence(w.w)) phrases.push(cur.splice(0));
  });
  if (cur.length) phrases.push(cur);
  for (let k = 0; k < phrases.length - 1; k++) {
    const ph = phrases[k], last = ph.at(-1), nx = phrases[k + 1];
    if (!endsSentence(last.w) && !nx[0].forced && CONJ.has(norm(last.w))) { nx.unshift(ph.pop()); if (!ph.length) phrases.splice(k--, 1); }
  }

  // kalimat pendek yang berdekatan digabung ("enam bulan, yah. Enam bulan.")
  lines = phrases.flatMap(splitPhrase).reduce((o, l) => {
    const p = o.at(-1);
    const merge = p && !l[0].forced && !H.includes(norm(textOf(l))) && !H.includes(norm(textOf(p)))
      && l[0].s - p.at(-1).e < 0.5 && textOf([...p, ...l]).length <= ATUR.gabungMaks;
    merge ? p.push(...l) : o.push(l);
    return o;
  }, []);
}

// 3. Pembicara (pewawancara berlanjut sampai kalimatnya selesai), kutipan, sembunyi.
const all = [];
for (const l of lines) {
  const text = textOf(l), n = norm(text), prev = all.at(-1);
  const sp = l.some(w => w.pstart) || P.some(p => n.includes(p)) || (prev?.sp === 'P' && !endsSentence(prev.text)) ? 'P' : 'N';
  all.push({ text, s: r3(l[0].s), e: r3(l.at(-1).e), sp, key: l.some(w => w.keyStart) || K.some(k => n.includes(k)), hide: H.includes(n), w: l.map(x => [r3(x.s), x.w]) });
}
const shown = all.filter(l => !l.hide);

// 4. Segmen = awal tiap blok pewawancara yang berisi pertanyaan (?).
const SEGMENTS = [];
shown.forEach((l, i) => {
  if (l.sp !== 'P' || shown[i - 1]?.sp === 'P') return;
  let j = i; const q = [];
  while (shown[j]?.sp === 'P') q.push(shown[j++].text);
  if (q.join(' ').includes('?')) SEGMENTS.push({ t: l.s, label: ATUR.segmen[SEGMENTS.length] || `Pertanyaan ${SEGMENTS.length + 1}`, q: q.join(' ') });
});

// 5. Tulis.
const SUBS = shown.map((l, i) => ({ id: i + 1, s: l.s, e: l.e, sp: l.sp, w: l.w, ...(l.key && { key: 1 }) }));
fs.writeFileSync(OUT, `// Dibuat otomatis oleh perbarui-subtitle.js dari "Timeline 1.srt". Jangan diedit langsung.\nwindow.SUBS=${JSON.stringify(SUBS)};\nwindow.SEGMENTS=${JSON.stringify(SEGMENTS)};\n`);

// 6. Laporan.
const mmss = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${(t % 60).toFixed(1).padStart(4, '0')}`;
all.forEach((l, i) => console.log(`${String(i + 1).padStart(2, '0')} ${mmss(l.s)} ${l.hide ? '(sembunyi)' : l.sp === 'P' ? '[P]' : '   '} ${l.key ? '★ ' : ''}${l.text}`));
console.log(`\n${shown.length} baris -> ${path.relative(__dirname, OUT)}`);
SEGMENTS.forEach((s, k) => console.log(`Q${k + 1} ${mmss(s.t)} ${s.label}`));
const nKey = SUBS.filter(l => l.key).length;
if (nKey !== ATUR.kutipan.length) console.warn(`! ${nKey} kutipan ditemukan, diharapkan ${ATUR.kutipan.length}`);
if (SEGMENTS.length !== ATUR.segmen.length) console.warn(`! ${SEGMENTS.length} segmen ditemukan, diharapkan ${ATUR.segmen.length}`);
