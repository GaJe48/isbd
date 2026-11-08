import { defineSlide, type Build } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './22-mitos-vs-fakta.css';

/* ---------------- S22 · Mitos vs fakta ---------------- */
const MF = [
  ['Gangguan jiwa disebabkan guna-guna, kerasukan, atau kutukan', 'Gangguan jiwa punya penyebab biologis, psikologis, dan sosial yang bisa dijelaskan secara ilmiah.', 'Punya penyebab ilmiah'],
  ['ODGJ pasti berbahaya dan suka mengamuk', 'Sebagian besar ODGJ tidak melakukan kekerasan. Mereka justru lebih sering menjadi korban kekerasan.', 'Lebih sering jadi korban'],
  ['Gangguan jiwa tidak bisa sembuh', 'Dengan pengobatan rutin dan dukungan keluarga, banyak ODGJ bisa pulih dan kembali beraktivitas.', 'Bisa pulih'],
  ['Depresi hanya tanda kurang bersyukur atau kurang iman', 'Depresi adalah gangguan kesehatan yang nyata dan butuh penanganan, sama seperti penyakit fisik.', 'Depresi = gangguan nyata'],
  ['Ke psikolog atau psikiater berarti “orang gila”', 'Konsultasi kesehatan jiwa sama wajarnya dengan periksa ke dokter umum.', 'Konsultasi itu wajar'],
];
const ROT = [0, -2.5, 2, -1.5, 1.5];
const mfSteps: Build[] = [];
MF.forEach((m, k) => {
  mfSteps.push((el, tl) => {
    const c = $$('.fc', el)[k];
    tl.to(c, { rotationY: 180, duration: 1.1, ease: 'expo.inOut' }).to(c, { keyframes: { scale: [1, 1.06, 1] }, duration: 1.1, ease: 'sine.inOut' }, 0);
  });
  if (k < MF.length - 1) mfSteps.push((el, tl) => {
    const cs = $$('.fc', el), c = cs[k], d = $$('.done .d', el)[k];
    tl.to(c, { x: 1100, y: -150 + k * 110, scale: .3, autoAlpha: 0, duration: .9, ease: 'expo.in' });
    FX.up(tl, d, .6);
    cs.slice(k + 1).forEach((o, j) => tl.to(o, { y: j * 16, scale: 1 - j * .035, rotation: j ? ROT[k + 1 + j] : 0, duration: .8, ease: 'expo.out' }, .5));
  });
});
export default defineSlide({
  id: 's22', act: 5, title: 'Mitos vs fakta (kuis)',
  orbs: [[640, 560, 1100, '#2F6FD6', .5], [1600, 300, 900, '#7A6BB0', .45]],
  html: `${HD('05', 'Perspektif sosial budaya · kuis', 'Mitos <span class="ol">atau</span> fakta?')}
    <div class="deck" style="left:140px;width:1000px;height:540px">${MF.map((m, k) => `<div class="fc" style="z-index:${10 - k}"><div class="face m"><div class="lb"><span>Mitos?</span><span>${k + 1} / 5</span></div><div class="tx">${m[0]}</div><div class="qz">Mitos atau fakta? Tebak dulu…</div></div><div class="face f"><div class="lb"><span>Fakta</span><span>${k + 1} / 5</span></div><div class="tx">${m[1]}</div></div></div>`).join('')}</div>
    <div class="done" style="left:1260px">${MF.map((m, k) => `<div class="d pre"><i>${k + 1}</i>${m[2]}</div>`).join('')}</div>`,
  init(el) { $$('.fc', el).forEach((c, k) => gsap.set(c, { y: k * 16, scale: 1 - k * .035, rotation: ROT[k], transformPerspective: 2200 })); },
  intro(el, tl) { hdIn(el, tl); tl.from($$('.fc', el).reverse(), { autoAlpha: 0, y: 140, rotation: 10, duration: .9, ease: 'expo.out', stagger: .08 }, .4); },
  steps: mfSteps,
  notes: 'Kuis ke audiens: bacakan mitosnya, minta audiens menebak, lalu klik untuk membalik. Klik berikutnya memindahkan kartu dan memunculkan mitos baru.',
});
