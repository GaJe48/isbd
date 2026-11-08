import { defineSlide } from '../types';
import { FX, $, $$, PERSON } from '../fx';
import './14-9-dari-10.css';

/* ---------------- S14 · 9 dari 10 ---------------- */
export default defineSlide({
  id: 's14', act: 3, title: 'Bab 03 · 9 dari 10', divider: true,
  orbs: [[960, 520, 1400, '#7A6BB0', .55], [280, 920, 900, '#2F6FD6', .4], [1650, 180, 800, '#D9283F', .25]],
  html: `<div class="chap">03</div>
    <div class="kicker cx pre" style="position:absolute;left:960px;top:118px"><b>03</b><span>Data & fakta</span></div>
    <div class="head"><div class="disp">9 dari 10</div></div>
    <div class="people">${Array.from({ length: 10 }, () => `<span class="pp">${PERSON}</span>`).join('')}</div>
    <div class="cap pre">penderita depresi <b>belum</b> tertangani medis</div>
    <div class="pct pre"><div class="disp"><span class="pc">0</span>%</div><div class="small">yang mendapat pengobatan</div></div>
    <p class="src">Sumber: Kemenkes, Oktober 2026</p>`,
  intro(el, tl) {
    tl.from($('.chap', el), { x: 600, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0);
    FX.fade(tl, $('.kicker', el), .2);
    FX.rise(tl, $('.head .disp', el), .3);
    tl.from($$('.pp', el), { autoAlpha: 0, y: 40, scale: .7, duration: .6, ease: 'back.out(2)', stagger: .07 }, .7);
  },
  steps: [
    (el, tl) => {
      const pp = $$('.pp', el);
      pp.slice(0, 9).forEach((p, k) => tl.to(p, { opacity: .14, scale: .94, duration: .5, ease: 'power2.out' }, k * .32));
      tl.to($('.pp:last-child path', el), { fill: '#A8DDA0', duration: .6 }, 2.8).to($('.pp:last-child circle', el), { fill: '#A8DDA0', duration: .6 }, 2.8)
        .to(pp[9], { filter: 'drop-shadow(0 0 22px rgba(168,221,160,.85))', scale: 1.08, duration: .8 }, 2.8);
      FX.up(tl, $('.cap', el), 3.1);
    },
    (el, tl) => { FX.fade(tl, $('.pct', el), 0); FX.count(tl, $('.pc', el), 12.7, { dec: 1, dur: 1.8 }, 0); },
  ],
  notes: 'Dari 10 penderita depresi, hanya sekitar 1 yang mendapat pengobatan: 12,7%. Beri jeda saat figur meredup.',
});
