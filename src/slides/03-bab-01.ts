import { defineSlide } from '../types';
import { FX, $, $$, quoteWords } from '../fx';
import './03-bab-01.css';

/* ---------------- S03 · Bab 01 ---------------- */
export default defineSlide({
  id: 's03', cls: 'divider s03', act: 1, title: 'Bab 01 · Kutipan pembuka', divider: true, hud: false,
  orbs: [[1500, 300, 1250, '#2F6FD6', .8], [380, 900, 950, '#7A6BB0', .5]],
  html: `<div class="num" style="left:-40px;top:190px"><svg class="sw" style="height:560px"><text font-size="700">01</text></svg></div>
    <div class="body" style="left:1000px;top:300px">
      <div class="kicker pre"><b>01</b><span>Pendahuluan</span></div>
      <div class="q" style="margin-top:44px">${quoteWords('Tidak ada kesehatan tanpa kesehatan jiwa.', 'jw ol')}</div>
      <p class="small pre" style="margin-top:40px;font-size:22px">“No health without mental health” — prinsip WHO</p>
    </div>`,
  init(el) { el._t = FX.svgText($('svg', el)); $$('svg text', el).forEach(t => t.style.stroke = 'rgba(255,255,255,.55)'); },
  intro(el, tl) {
    tl.from($('.num svg', el), { x: 1300, duration: 1.8, ease: 'expo.out' }, 0);
    FX.draw(tl, el._t, 0, { dur: 2, stagger: .25 });
    FX.fade(tl, $('.kicker', el), .6);
    tl.from($$('.q .w', el), { autoAlpha: 0, y: 30, filter: 'blur(10px)', duration: .6, stagger: .14, ease: 'power3.out' }, .9);
    FX.fill(tl, $$('.q .jw', el), '+=.3', { dur: 1.2 });
    tl.to($('.q .jw', el), { textShadow: '0 0 40px rgba(47,111,214,.9)', duration: 1, yoyo: true, repeat: 1 }, '<');
    FX.fade(tl, $('.small', el), '-=.8');
  },
  notes: 'Kesehatan jiwa bagian dari kesehatan utuh. Kata "jiwa" yang terisi = memberi isi pada hal yang sering diabaikan.',
});
