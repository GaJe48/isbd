import { defineSlide } from '../types';
import { FX, $, $$, quoteWords } from '../fx';
import './20-bab-05.css';

/* ---------------- S20 · Bab 05 ---------------- */
export default defineSlide({
  id: 's20', cls: 'divider s20', act: 5, title: 'Bab 05 · Perspektif sosial budaya', divider: true, hud: false,
  bg: '#232327',
  orbs: [[1500, 300, 1250, '#1f3f8f', .85], [380, 860, 1000, '#7A6BB0', .55]],
  html: `<div class="num" style="left:-40px;top:190px"><svg class="sw" style="height:560px"><text font-size="700">05</text></svg></div>
    <div class="body" style="left:1000px;top:280px">
      <div class="kicker pre"><b>05</b><span>Perspektif sosial budaya</span></div>
      <div class="q" style="margin-top:44px;font-size:62px">${quoteWords('Cara budaya memaknai gangguan jiwa menentukan cara masyarakat memperlakukannya.', 'jw ol')}</div>
      <p class="small pre" style="margin-top:40px;font-size:22px">Inti kaitan ODGJ dengan ISBD: dari pengucilan sampai pemasungan.</p>
    </div>`,
  init(el) { el._t = FX.svgText($('svg', el)); $$('svg text', el).forEach(t => t.style.stroke = 'rgba(255,255,255,.55)'); },
  intro(el, tl) {
    tl.from($('.num svg', el), { x: 1300, duration: 1.8, ease: 'expo.out' }, 0);
    FX.draw(tl, el._t, 0, { dur: 2, stagger: .25 });
    FX.fade(tl, $('.kicker', el), .6);
    tl.from($$('.q .w', el), { autoAlpha: 0, y: 30, filter: 'blur(10px)', duration: .6, stagger: .11, ease: 'power3.out' }, .9);
    FX.fill(tl, $$('.q .jw', el), '+=.3', { dur: 1.2 });
    FX.fade(tl, $('.small', el), '-=.6');
  },
  notes: 'Masuk ke inti ISBD: budaya memberi makna pada gangguan jiwa, dan makna itu menentukan perlakuan.',
});
