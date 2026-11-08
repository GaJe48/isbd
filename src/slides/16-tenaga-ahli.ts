import { defineSlide } from '../types';
import { FX, $, HD, hdIn } from '../fx';
import './16-tenaga-ahli.css';

/* ---------------- S16 · Tenaga ahli ---------------- */
export default defineSlide({
  id: 's16', act: 3, title: 'Kesenjangan tenaga ahli',
  orbs: [[1500, 330, 1000, '#7A6BB0', .5], [380, 880, 900, '#D9283F', .3]],
  html: `${HD('03', 'Data & fakta · Kemenkes 2026', 'Kesenjangan <span class="ol">tenaga ahli</span>')}
    <div class="bars">
      <p class="small" style="margin-bottom:10px;font-size:21px">Jumlah penduduk yang dilayani oleh <b style="color:#fff">1 psikiater</b></p>
      <div class="br r1 pre"><span class="who">WHO</span><span class="ratio">1 : 30.000</span><span class="bar" style="width:180px;background:#A8DDA0"></span></div>
      <div class="br r2 pre"><span class="who">RI</span><span class="ratio">1 : <span class="c">30.000</span></span><span class="bar" style="width:1080px;background:linear-gradient(90deg,#7A6BB0,#D9283F)"></span></div>
    </div>
    <div class="callout pre"><b>≈ 1/6</b>dari standar WHO · baru <b style="font-size:inherit;font-family:var(--body);margin:0">1.495</b> psikiater</div>
    <div class="dots pre"><canvas width="3280" height="740" style="width:1640px;height:370px"></canvas></div>
    <div class="dl pre"><b class="l">213</b> dari 3.513 psikolog klinis bertugas di <b>Puskesmas</b></div>`,
  init(el) {
    const cv = $<HTMLCanvasElement>('canvas', el), g = cv.getContext('2d')!, N = 3513, LIT = 213, cols = 131, sp = 12.5;
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const idx = [...Array(N).keys()]; for (let k = N - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [idx[k], idx[j]] = [idx[j], idx[k]]; }
    const lit = new Set(idx.slice(0, LIT)), order = idx.slice(0, LIT);
    el._dots = { p: 0, l: 0 };
    el._draw = () => {
      const { p, l } = el._dots; g.setTransform(2, 0, 0, 2, 0, 0); g.clearRect(0, 0, 1640, 370);
      const shown = Math.floor(p * N), on = new Set(order.slice(0, Math.floor(l * LIT)));
      for (let k = 0; k < shown; k++) {
        const x = (k % cols) * sp + 6, y = Math.floor(k / cols) * sp + 6;
        g.beginPath(); g.arc(x, y, on.has(k) ? 4.4 : 3.4, 0, 6.283);
        g.fillStyle = on.has(k) ? '#A8DDA0' : 'rgba(255,255,255,.2)'; g.fill();
      }
    };
    el._lit = lit;
  },
  intro(el, tl) { hdIn(el, tl); FX.fade(tl, $('.bars .small', el), .4); tl.fromTo($('.r1', el), { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: .7 }, .6).from($('.r1 .bar', el), { scaleX: 0, duration: .8, ease: 'power3.out' }, .8); },
  steps: [
    (el, tl) => {
      tl.fromTo($('.r2', el), { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: .6 });
      tl.from($('.r2 .bar', el), { scaleX: 1 / 6, duration: 2.4, ease: 'power2.inOut' }, .4);
      FX.count(tl, $('.r2 .c', el), 180000, { from: 30000, dur: 2.4, ease: 'power2.inOut' }, .4);
    },
    (el, tl) => FX.up(tl, $('.callout', el)),
    (el, tl) => {
      tl.to([$('.bars', el), $('.callout', el)], { autoAlpha: 0, y: -40, duration: .6, ease: 'power2.in' });
      FX.fade(tl, $('.dots', el), .5, { duration: .2 });
      tl.to(el._dots, { p: 1, duration: 1.6, ease: 'power1.inOut', onUpdate: el._draw }, .6);
      tl.to(el._dots, { l: 1, duration: 2, ease: 'power2.out', onUpdate: el._draw }, 2.3);
      FX.up(tl, $('.dl', el), 2.3);
    },
  ],
  notes: 'Standar WHO 1 psikiater untuk 30.000 penduduk; di Indonesia 1 : 180.000, baru ±1/6 standar (1.495 psikiater). Dari 3.513 psikolog klinis, hanya 213 yang ada di Puskesmas — titik hijau.',
});
