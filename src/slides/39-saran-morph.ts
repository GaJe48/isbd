import { defineSlide } from '../types';
import { FX, $, $$, gsap } from '../fx';
import './39-saran-morph.css';

/* ---------------- S39 · Saran (morph) ---------------- */
const FROM = 'AIB YANG DISEMBUNYIKAN', TO = 'SAKIT YANG PERLU DIOBATI';
const spans = (s: string) => [...s].map(ch => `<span>${ch === ' ' ? ' ' : ch}</span>`).join('');
export default defineSlide({
  id: 's39', act: 9, title: 'Saran: aib → sakit yang perlu diobati',
  orbs: [[960, 480, 1200, '#7A6BB0', .5], [380, 920, 800, '#B85A9C', .4], [1600, 920, 800, '#F0A04B', .4]],
  html: `<div class="lbl"><div class="kicker pre"><b>09</b><span>Saran · keluarga & masyarakat perlu mengganti cara pandang</span></div></div>
    <div class="morph"><div class="mline disp from" style="font-size:70px">${spans(FROM)}</div><div class="mline disp to" style="font-size:70px">${spans(TO)}</div></div>
    <p class="small pre cap" style="position:absolute;left:0;right:0;top:520px;text-align:center;font-size:22px">dari sesuatu yang disembunyikan, menjadi sesuatu yang ditangani bersama</p>
    <p class="gov pre">Pemerintah perlu <b>menambah tenaga dan layanan kesehatan jiwa</b> sampai ke desa.</p>`,
  init(el) {
    const S = $$('.from span', el), T = $$('.to span', el), used = new Set<number>();
    gsap.set(T, { opacity: 0 });
    el._pairs = T.map((t, j) => {
      if (t.textContent === ' ') return null;
      const i = S.findIndex((s, k) => !used.has(k) && s.textContent === t.textContent);
      if (i < 0) return null; used.add(i); return i;
    });
    el._unusedS = S.map((s, k) => k).filter(k => !used.has(k) && S[k].textContent !== ' ');
  },
  intro(el, tl) {
    FX.fade(tl, $('.lbl .kicker', el), 0);
    tl.from($$('.from span', el), { autoAlpha: 0, yPercent: 60, duration: .8, ease: 'expo.out', stagger: .035 }, .2);
  },
  steps: [
    (el, tl) => {
      const S = $$('.from span', el), T = $$('.to span', el), m = $('.morph', el);
      const ox = (e: HTMLElement) => e.offsetLeft + e.parentElement!.offsetLeft;
      const pairs: (number | null)[] = el._pairs, unused: number[] = el._unusedS;
      S.forEach(s => gsap.set(s, { x: 0 }));
      pairs.forEach((i, j) => {
        if (i == null) return;
        const dx = ox(T[j]) - ox(S[i]), d = Math.random() * .5;
        tl.to(S[i], { x: dx, rotation: 360, duration: 1.8, ease: 'expo.inOut' }, .2 + d);
        tl.to(S[i], { keyframes: { y: [0, -90 - Math.random() * 60, 0] }, duration: 1.8, ease: 'sine.inOut' }, .2 + d);
        tl.to(S[i], { color: '#fff', webkitTextStrokeColor: 'rgba(255,255,255,0)', duration: 1, ease: 'power2.inOut' }, 1 + d);
      });
      unused.forEach(k => tl.to(S[k], { y: gsap.utils.random(-260, 260), x: gsap.utils.random(-200, 200), rotation: gsap.utils.random(-180, 180), scale: .3, opacity: 0, duration: 1.2, ease: 'power3.in' }, .1));
      T.forEach((t, j) => { if (pairs[j] == null && t.textContent !== ' ') tl.fromTo(t, { opacity: 0, scale: 0, rotation: gsap.utils.random(-180, 180), y: -60 }, { opacity: 1, scale: 1, rotation: 0, y: 0, duration: .9, ease: 'back.out(2)' }, 1.5 + Math.random() * .4); });
      tl.call(() => { pairs.forEach((i, j) => { if (i != null) { gsap.set(T[j], { opacity: 1 }); gsap.set(S[i], { opacity: 0 }); } }); }, undefined, 2.6);
      tl.to(m, { scale: 1.04, duration: .4, yoyo: true, repeat: 1, ease: 'power2.out' }, 2.6);
      FX.fade(tl, $('.cap', el), 2.8);
    },
    (el, tl) => FX.up(tl, $('.gov', el)),
  ],
  notes: 'Momen puncak: "aib yang disembunyikan" berubah menjadi "sakit yang perlu diobati". Lalu saran untuk pemerintah.',
});
