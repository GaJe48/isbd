import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './08-spektrum.css';

/* ---------------- S08 · Spektrum ---------------- */
export default defineSlide({
  id: 's08', act: 2, title: 'Spektrum dua arah',
  orbs: [[260, 560, 900, '#2F6FD6', .6], [1660, 560, 900, '#D9283F', .42], [960, 160, 800, '#7A6BB0', .32]],
  html: `${HD('02', 'Pengertian', 'Spektrum <span class="ol">dua arah</span>')}
    <div class="spec"></div>
    ${[['Sehat jiwa', 'kondisi utuh', 330], ['ODMK', 'berisiko', 960], ['ODGJ', 'mengalami gangguan', 1590]].map(s => `<div class="stop cc pre" style="left:${s[2]}px"><div class="lbl"><b>${s[0]}</b><small>${s[1]}</small></div><i></i></div>`).join('')}
    <div class="spark pre"></div>
    <div class="dirs"><span class="l pre">← pulih dengan pengobatan</span><span class="r pre">tidak tertangani →</span></div>
    <div class="pulih"><b class="disp pre">Bisa <span class="hl">pulih.</span></b></div>
    <p class="src pre">UU No. 18/2014 kini digantikan UU No. 17/2023 tentang Kesehatan, tetapi istilah ODMK dan ODGJ tetap dipakai.</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    tl.from($('.spec', el), { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, .4);
    tl.fromTo($$('.stop', el), { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'back.out(2)', stagger: .35 }, .7);
    tl.fromTo($('.spark', el), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: .6 }, 1.7);
    tl.call(() => FX.loop(gsap.to($('.spark', el), { scale: 1.25, duration: .8, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
  },
  steps: [
    (el, tl) => {
      const sp = $('.spark', el);
      tl.to(sp, { left: 1590, duration: 2.6, ease: 'power2.inOut' })
        .to(sp, { background: 'radial-gradient(closest-side,#fff,#D9283F 45%,transparent)', duration: 2.6 }, 0);
      FX.fade(tl, $('.dirs .r', el), 1.4);
    },
    (el, tl) => {
      const sp = $('.spark', el);
      tl.to(sp, { left: 330, duration: 2.6, ease: 'power2.inOut' })
        .to(sp, { background: 'radial-gradient(closest-side,#fff,#A8DDA0 45%,transparent)', duration: 2.6 }, 0);
      FX.fade(tl, $('.dirs .l', el), 1.2);
      tl.fromTo($('.pulih b', el), { autoAlpha: 0, scale: .8, filter: 'blur(12px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'expo.out' }, 1.8);
      FX.fade(tl, $('.src', el), 2.4);
    },
  ],
  notes: 'Posisi seseorang bisa bergeser dua arah. ODMK yang tidak tertangani bisa menjadi ODGJ; ODGJ yang diobati bisa pulih dan kembali berfungsi.',
});
