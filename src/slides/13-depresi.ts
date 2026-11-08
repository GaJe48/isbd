import { defineSlide } from '../types';
import { FX, $, $$, HD, hdIn, GEQ } from '../fx';
import './13-depresi.css';

/* ---------------- S13 · Depresi ---------------- */
export default defineSlide({
  id: 's13', act: 2, title: 'Depresi: lebih dari sekadar sedih',
  orbs: [[1450, 520, 1200, '#2F6FD6', .85], [300, 920, 800, '#7A6BB0', .4]],
  html: `${HD('02', 'Pengertian', 'Depresi: lebih dari <span class="ol">sekadar sedih</span>')}
    <div class="big pre" style="font-size:112px">${GEQ}2 minggu</div>
    <div class="cal">${Array.from({ length: 14 }, (_, k) => `<i><b>${k + 1}</b></i>`).join('')}</div>
    <p class="lead pre" style="position:absolute;left:140px;top:760px;width:820px;font-size:26px">Rasa sedih atau hampa yang <b>menetap minimal dua minggu</b>, sampai mengganggu kegiatan sehari-hari.</p>
    <div class="signs" style="left:1080px">
      ${[['Sedih atau hampa', 'menetap hampir sepanjang hari'], ['Hilang minat', 'hal yang dulu disukai terasa hambar'], ['Mudah lelah', 'energi turun, aktivitas terganggu']].map((s, k) => `<div class="card dark pre"><div class="nd">${k + 1}</div><div><h4>${s[0]}</h4><p>${s[1]}</p></div></div>`).join('')}
    </div>
    <p class="note lead pre" style="left:1080px;top:820px;font-size:25px">Depresi berat juga bisa disertai <b>psikosis</b>.</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    FX.up(tl, $('.big', el), .4);
    tl.from($$('.cal i', el), { autoAlpha: 0, scale: .6, duration: .4, stagger: .04 }, .6);
    tl.to($$('.cal i', el), { '--f': 1, duration: .5, ease: 'power1.inOut', stagger: .2 }, 1.2);
    tl.to(FX.orb(0), { color: '#5d6070', opacity: .55, duration: 4.5, ease: 'power1.inOut', overwrite: 'auto' }, 1.4);
    FX.up(tl, $('.lead.pre', el), 2.4);
  },
  steps: [
    (el, tl) => FX.up(tl, $$('.signs .card', el), 0, { stagger: .2 }),
    (el, tl) => FX.up(tl, $('.note', el)),
  ],
  notes: 'Bukan sedih biasa: menetap minimal 2 minggu, ditambah hilang minat dan mudah lelah, sampai mengganggu kegiatan. Orb latar sengaja meredup.',
});
