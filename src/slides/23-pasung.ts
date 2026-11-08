import { defineSlide } from '../types';
import { FX, $, $$, gsap } from '../fx';
import { INFO as I } from '../data/info';
import './23-pasung.css';

/* ---------------- S23 · Pasung ---------------- */
export default defineSlide({
  id: 's23', act: 5, title: 'Pasung', bg: '#111113', grain: .2,
  orbs: [[960, 520, 1100, '#5e0f1d', .6]],
  morph: 2,
  html: `<div class="bar t"></div><div class="bar b"></div>
    <div class="ttl"><div class="kicker pre" style="justify-content:center"><b>05</b><span>Perspektif sosial budaya</span></div><div class="disp ol" style="margin-top:30px">Pasung</div></div>
    <div class="defn"><p class="lead pre">Tindakan membatasi gerak ODGJ, misalnya dengan:</p>
      <div class="forms"><span class="pre">merantai</span><span class="pre">memasang balok kayu di kaki</span><span class="hot pre">mengurung di kamar / kandang<small>kini juga dihitung pasung</small></span></div></div>
    <div class="nums">
      <div class="pre"><div class="n"><span class="gh">6,6%</span><span class="gh">6,6%</span><span class="gh">6,6%</span><span class="c">0</span></div><p>rumah tangga pernah memasung anggota dengan psikosis/skizofrenia</p></div>
      <div class="pre"><div class="n"><span class="gh">1.750</span><span class="gh">1.750</span><span class="gh">1.750</span><span class="c">0</span></div><p>kasus pemasungan tercatat pada 2024</p></div>
      <div class="pre"><div class="n"><span class="gh">±1.443</span><span class="gh">±1.443</span><span class="gh">±1.443</span><span class="c">0</span></div><p>kasus pada triwulan I 2026</p></div>
    </div>
    <p class="note pre">Angka sebenarnya diyakini lebih besar: banyak keluarga enggan melapor.</p>
    <p class="src pre">Sumber: SKI 2023 · Kemenkes via Kumparan (2025) dan Antara (2026)</p>`,
  init(el) { gsap.set($$('.gh', el), { opacity: 0 }); },
  intro(el, tl) {
    tl.from($('.bar.t', el), { x: -1920, duration: 2.4, ease: 'power3.inOut' }, 0)
      .from($('.bar.b', el), { x: 1920, duration: 2.4, ease: 'power3.inOut' }, 0)
      .to([$('.bar.t', el), $('.bar.b', el)], { keyframes: { scaleY: [1, 2.5, 1] }, duration: .3 }, 2.4);
    FX.fade(tl, $('.ttl .kicker', el), .4, { duration: 1 });
    tl.from($('.ttl .disp', el), { autoAlpha: 0, letterSpacing: '.5em', duration: 2.4, ease: 'power2.out' }, .4);
  },
  steps: [
    (el, tl) => {
      FX.up(tl, $('.defn .lead', el), 0, { duration: 1.2 });
      tl.fromTo($$('.forms span', el), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', stagger: .4 }, .6);
      tl.to($('.forms .hot', el), { boxShadow: '0 0 50px rgba(217,40,63,.55)', duration: 1.2 }, 1.8);
    },
    (el, tl) => {
      tl.to($('.defn', el), { autoAlpha: 0, y: -20, duration: .8 });
      const ns = $$('.nums > div', el);
      FX.up(tl, ns, .6, { duration: 1.2, stagger: .4 });
      ([[6.6, 1, '', '%'], [1750, 0, '', ''], [1443, 0, '±', '']] as [number, number, string, string][]).forEach((v, k) => FX.count(tl, $('.c', ns[k]), v[0], { dec: v[1], pre: v[2], suf: v[3], dur: 2.6, ease: 'power1.out' }, .8 + k * .4));
    },
    (el, tl) => {
      FX.up(tl, $('.note', el), 0, { duration: 1.2 });
      $$('.nums .n', el).forEach((n, k) => $$('.gh', n).forEach((g, j) => tl.fromTo(g, { opacity: 0, scale: 1, x: 0 }, { opacity: .55 - j * .14, scale: 1 + (j + 1) * .12, x: (j + 1) * 14 * (k - 1), y: -(j + 1) * 10, duration: 2, ease: 'power2.out' }, .6 + j * .25)));
      tl.call(() => $$('.nums .gh', el).forEach((g, j) => FX.loop(gsap.to(g, { opacity: '-=.2', duration: 'random(1.5,2.5)', yoyo: true, repeat: -1, ease: 'sine.inOut' }))));
      FX.fade(tl, $('.src', el), 1);
    },
  ],
  notes: 'Slide paling berat. Pelan, tanpa foto. Pasung = merantai, balok kayu, dan kini pengurungan juga dihitung. 6,6% rumah tangga pernah memasung. Angka asli kemungkinan jauh lebih besar.',
});
