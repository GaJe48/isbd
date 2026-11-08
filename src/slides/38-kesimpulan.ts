import { defineSlide } from '../types';
import { $, $$, HD, hdIn } from '../fx';
import './38-kesimpulan.css';

/* ---------------- S38 · Kesimpulan ---------------- */
const KS = ['ODGJ mengalami gangguan pikiran, perasaan, dan perilaku yang mengganggu fungsi hidupnya. Gangguan ini punya penyebab ilmiah dan <span class="kw">bisa diobati</span>.', 'Di Indonesia jumlahnya besar, tetapi banyak yang belum tertangani karena <span class="kw">stigma</span>, mitos, dan keterbatasan layanan.', 'Pasung dan diskriminasi adalah <span class="kw">pelanggaran HAM</span> yang sudah dilarang undang-undang.', 'Nilai budaya seperti <span class="kw">gotong royong</span> dan kekeluargaan dapat menjadi kekuatan untuk mendukung pemulihan.'];
export default defineSlide({
  id: 's38', act: 9, title: 'Kesimpulan',
  orbs: [[1500, 300, 1000, '#7A6BB0', .45], [400, 920, 900, '#B85A9C', .4], [1700, 950, 700, '#F0A04B', .35]],
  html: `${HD('09', 'Penutup', 'Kesimpu<span class="ol">lan</span>')}
    <div class="rows">${KS.map((k, j) => `<div class="card pre"><span class="nd warm">${j + 1}</span><p>${k}</p></div>`).join('')}</div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: KS.map((k, j) => (el, tl) => {
    const c = $$('.rows .card', el)[j];
    tl.fromTo(c, { autoAlpha: 0, x: -60, filter: 'blur(10px)' }, { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: .8, ease: 'power3.out' });
    tl.to($('.kw', c), { backgroundSize: '100% 100%', duration: .8, ease: 'power2.inOut' }, .6);
  }),
  notes: 'Empat kesimpulan: bisa diobati, stigma, pelanggaran HAM, gotong royong.',
});
