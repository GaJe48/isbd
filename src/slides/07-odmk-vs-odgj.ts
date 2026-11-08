import { defineSlide } from '../types';
import { $, HD, hdIn, ARROW } from '../fx';
import './07-odmk-vs-odgj.css';

/* ---------------- S07 · ODMK vs ODGJ ---------------- */
const card7 = (ab: string, nm: string, q: string, ps: string, ex: string[]) => `<div class="card"><div class="ab">${ab}<span class="bk">${ab}</span></div><div class="nm">${nm}</div><blockquote>“${q}”</blockquote><div class="ps">${ps}</div><div class="ex">${ex.map(e => `<span class="chip">${e}</span>`).join('')}</div></div>`;
export default defineSlide({
  id: 's07', act: 2, title: 'ODMK vs ODGJ',
  orbs: [[480, 620, 1000, '#2F6FD6', .5], [1460, 620, 1000, '#D9283F', .32], [960, 90, 800, '#7A6BB0', .4]],
  html: `${HD('02', 'Pengertian · UU No. 18 Tahun 2014', 'Dua tahap <span class="ol">kondisi</span>')}
    <div class="pair">
      <div class="pre L">${card7('ODMK', 'Orang Dengan Masalah Kejiwaan', 'orang yang mempunyai masalah fisik, mental, sosial, pertumbuhan dan perkembangan, dan/atau kualitas hidup sehingga memiliki risiko mengalami gangguan jiwa', 'Pasal 1 angka 2 · berisiko', ['korban bencana', 'berduka berat', 'korban perundungan', 'terkena PHK'])}</div>
      <div class="pre R">${card7('ODGJ', 'Orang Dengan Gangguan Jiwa', 'orang yang mengalami gangguan dalam pikiran, perilaku, dan perasaan yang termanifestasi dalam bentuk sekumpulan gejala dan/atau perubahan perilaku yang bermakna, serta dapat menimbulkan penderitaan dan hambatan dalam menjalankan fungsi orang sebagai manusia', 'Pasal 1 angka 3 · mengalami gangguan', ['skizofrenia', 'depresi', 'gangguan bipolar'])}</div>
    </div><div class="arrow cc pre">${ARROW}</div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: [
    (el, tl) => tl.fromTo($('.pair .L', el), { autoAlpha: 0, x: -160, rotationY: 12 }, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.1, ease: 'expo.out' }),
    (el, tl) => {
      tl.fromTo($('.pair .R', el), { autoAlpha: 0, x: 160, rotationY: -12 }, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.1, ease: 'expo.out' });
      tl.fromTo($('.arrow', el), { autoAlpha: 0, scale: 0, rotation: -90 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: .8, ease: 'back.out(2)' }, .5);
    },
  ],
  notes: 'ODMK = berisiko (contoh: korban bencana, PHK). ODGJ = sudah mengalami gangguan yang bermakna dan mengganggu fungsi. Keduanya tahapan, bukan kotak permanen.',
});
