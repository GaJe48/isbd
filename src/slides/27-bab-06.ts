import { defineSlide } from '../types';
import { FX, $, $$ } from '../fx';
import './27-bab-06.css';

/* ---------------- S27 · Bab 06 ---------------- */
export default defineSlide({
  id: 's27', cls: 'divider s27', act: 6, title: 'Bab 06 · Enam tahun merawat', divider: true, hud: false,
  bg: '#19191b', morph: 1.8,
  orbs: [[640, 560, 1000, '#F0A04B', .32], [1600, 300, 700, '#B85A9C', .18]],
  html: `<div class="six"><svg class="sw"><defs><linearGradient id="g6" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F0A04B"/><stop class="a" offset="0" stop-color="#F0A04B"/><stop class="b" offset="0" stop-color="#F0A04B" stop-opacity="0"/></linearGradient></defs><text font-size="1000" style="fill:url(#g6)">6</text></svg></div>
    <div class="body"><div class="kicker pre"><b>06</b><span>Studi kasus</span></div>
      <div class="disp" style="margin-top:34px">Enam tahun <span class="ol">merawat</span></div>
      <p class="lead pre">Cerita seorang istri yang merawat suaminya dengan <b>demensia</b>, dan bagaimana gangguan jiwa memengaruhi seluruh keluarga.</p></div>`,
  init(el) { el._t = FX.svgText($('svg', el)); },
  intro(el, tl) {
    FX.draw(tl, el._t, 0, { dur: 2.6, len: 5000 });
    tl.to($$('#g6 stop.a, #g6 stop.b', el), { attr: { offset: 1 }, duration: 4.5, ease: 'power1.inOut' }, 1.2);
    FX.fade(tl, $('.body .kicker', el), .8);
    FX.rise(tl, $('.body .disp', el), 1);
    FX.up(tl, $('.body .lead', el), 1.8, { duration: 1.2 });
  },
  notes: 'Masuk studi kasus. Suasana lebih hening. Angka 6 = enam tahun merawat.',
});
