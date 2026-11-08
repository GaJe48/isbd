import { defineSlide } from '../types';
import { FX, $ } from '../fx';
import './19-pesan-kunci.css';

/* ---------------- S19 · Pesan kunci ---------------- */
export default defineSlide({
  id: 's19', act: 4, title: 'Pesan kunci: bukan guna-guna',
  orbs: [[960, 560, 1300, '#7A6BB0', .42], [380, 180, 700, '#2F6FD6', .3]],
  html: `${['Bukan guna-guna.', 'Bukan kutukan.', 'Bukan kurang iman.'].map((t, k) => `<div class="ln o disp ol l${k} ${k ? 'pre' : ''}" style="font-size:96px"><span class="strike">${t}<i></i></span></div>`).join('')}
    <div class="fin" style="top:430px"><div class="disp pre f1">Bisa dialami</div><div class="disp pre f2">siapa saja.</div><div class="disp pre f3"><span class="hlw">Bisa diobati.</span></div></div>`,
  intro(el, tl) { FX.rise(tl, $('.l0', el), .2, { stagger: .035 }); },
  steps: [0, 1, 2].map(k => (el, tl) => {
    const ln = $(`.l${k}`, el);
    FX.strike(tl, $('.strike', ln), 0, { dur: .55 });
    tl.to(ln, { y: -290 + k * 56, scale: .42, opacity: .45, duration: 1, ease: 'expo.inOut' }, .7);
    if (k < 2) FX.rise(tl, $(`.l${k + 1}`, el), 1.2, { stagger: .035 });
    else {
      ['.f1', '.f2'].forEach((s, j) => FX.rise(tl, $(s, el), 1.3 + j * .25));
      tl.fromTo($('.f3', el), { autoAlpha: 0, scale: .8, filter: 'blur(12px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' }, 2.1);
    }
  }),
  notes: 'Ucapkan tiap kalimat lalu klik untuk mencoretnya. Pesan akhir: bisa dialami siapa saja, dan bisa diobati.',
});
