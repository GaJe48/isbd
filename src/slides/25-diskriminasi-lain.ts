import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './25-diskriminasi-lain.css';

/* ---------------- S25 · Diskriminasi lain ---------------- */
const DS = [['Telantar di jalan', 'Tidak diurus siapa pun, kehilangan tempat tinggal dan perawatan.'], ['Sulit bekerja dan bersekolah', 'Sulit mendapat pekerjaan, bahkan dikeluarkan dari sekolah atau kampus.'], ['Dijadikan konten', 'Direkam, ditertawakan, dan disebarkan di media sosial.'], ['Hak diabaikan', 'Hak pilih, hak waris, atau hak atas harta sering tidak dihormati.']];
export default defineSlide({
  id: 's25', act: 5, title: 'Bentuk diskriminasi lain',
  orbs: [[1500, 620, 1000, '#7A6BB0', .45], [300, 300, 800, '#2F6FD6', .35], [1500, 100, 600, '#D9283F', .25]],
  html: `${HD('05', 'Perspektif sosial budaya', 'Diskriminasi <span class="ol">lainnya</span>')}
    <div class="rows">${DS.map((d, k) => `<div class="card pre"><div class="nd">${k + 1}</div><div><h4>${d[0]}</h4><p>${d[1]}</p></div></div>`).join('')}</div>
    <div class="phone pre"><div class="scr"></div><div class="notch"></div><div class="rec"><i></i>REC 00:42</div>
      <svg class="silh" viewBox="0 0 60 120"><circle cx="30" cy="17" r="15"/><path d="M6 120 V63 a24 24 0 0 1 48 0 V120 Z"/></svg>
      <div class="likes"><span>♥<br>12,4 rb</span><span>➦<br>3,1 rb</span></div>
      <div class="btn"><i></i></div>
      <svg class="x" viewBox="0 0 360 720"><path d="M40 160 L320 560"/><path d="M320 160 L40 560"/></svg></div>`,
  init(el) { $$('.phone .x path', el).forEach(p => gsap.set(p, { strokeDasharray: 500, strokeDashoffset: 500 })); },
  intro(el, tl) { hdIn(el, tl); },
  steps: DS.map((d, k) => (el, tl) => {
    const c = $$('.rows .card', el)[k];
    tl.fromTo(c, { autoAlpha: 0, x: -60, filter: 'blur(10px)' }, { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: .8, ease: 'power3.out' });
    tl.fromTo($('.nd', c), { scale: .4 }, { scale: 1, duration: .7, ease: 'elastic.out(1.2,.45)' }, .2);
    if (k === 2) {
      tl.fromTo($('.phone', el), { autoAlpha: 0, y: 80, rotation: 6 }, { autoAlpha: 1, y: 0, rotation: -3, duration: 1, ease: 'expo.out' }, .2);
      tl.call(() => FX.loop(gsap.to($('.phone .rec i', el), { opacity: .15, duration: .5, yoyo: true, repeat: -1 })), undefined, .8);
      tl.to($$('.phone .x path', el), { strokeDashoffset: 0, duration: .45, ease: 'power3.in', stagger: .2 }, 1.8);
      tl.to($('.phone .scr', el), { filter: 'grayscale(1) brightness(.6)', duration: .6 }, 2.1);
    }
  }),
  notes: 'Telantar, sulit bekerja/sekolah, dijadikan konten (jangan merekam dan menyebarkan video ODGJ!), dan hak-hak diabaikan.',
});
