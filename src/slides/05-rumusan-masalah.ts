import { defineSlide } from '../types';
import { FX, $, $$, HD, hdIn } from '../fx';
import './05-rumusan-masalah.css';

/* ---------------- S05 · Rumusan masalah ---------------- */
const RM = [['Apa yang dimaksud dengan ODGJ?', 'Bab 02'], ['Bagaimana kondisi ODGJ di Indonesia saat ini?', 'Bab 03'], ['Bagaimana pandangan sosial budaya masyarakat terhadap ODGJ?', 'Bab 05 · 06'], ['Apa hak ODGJ dan bagaimana peran masyarakat?', 'Bab 07 · 08']];
export default defineSlide({
  id: 's05', act: 1, title: 'Rumusan masalah',
  orbs: [[1500, 280, 1100, '#2F6FD6', .6], [350, 850, 900, '#A8DDA0', .22], [960, 1080, 900, '#7A6BB0', .4]],
  html: `${HD('01', 'Pendahuluan', 'Rumusan <span class="ol">masalah</span>', 'h2', 'Empat pertanyaan yang akan kita jawab bersama.')}
    <div class="cards4">${RM.map((r, k) => `<div class="card"><div class="nd">${k + 1}</div><p>${r[0]}</p><div class="ft">→ ${r[1]}</div></div>`).join('')}</div>`,
  intro(el, tl) {
    hdIn(el, tl);
    FX.up(tl, $$('.cards4 .card', el), .5, { stagger: .16 });
    tl.fromTo($$('.cards4 .nd', el), { scale: .4 }, { scale: 1, duration: .8, ease: 'elastic.out(1.2,.45)', stagger: .16 }, .7);
  },
  notes: 'Empat rumusan masalah. Tiap kartu menunjuk bab yang menjawabnya.',
});
