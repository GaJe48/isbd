import { defineSlide } from '../types';
import { FX, $, $$, HD, hdIn } from '../fx';
import './15-dashboard.css';

/* ---------------- S15 · Dashboard ---------------- */
export default defineSlide({
  id: 's15', act: 3, title: 'Dashboard data nasional',
  orbs: [[1620, 280, 1000, '#7A6BB0', .5], [280, 920, 900, '#2F6FD6', .45]],
  html: `${HD('03', 'Data & fakta · Survei Kesehatan Indonesia 2023', 'Dashboard <span class="ol">nasional</span>')}
    <div class="dash">
      <div class="card pre"><div class="v"><span class="c">0</span><small> / 1.000</small></div><p>rumah tangga punya anggota <b>bergejala psikosis/skizofrenia</b></p><div class="s">SKI 2023</div></div>
      <div class="card pre"><div class="v">±<span class="c">0</span><small> juta</small></div><p>perkiraan penderita <b>skizofrenia</b> di Indonesia</p><div class="s">PNPK Kemenkes 2025</div></div>
      <div class="card pre"><svg class="ring" viewBox="0 0 150 150"><circle cx="75" cy="75" r="64" stroke="rgba(17,17,17,.12)"/><circle class="arc" cx="75" cy="75" r="64" stroke="url(#gradBG)" stroke-linecap="round" transform="rotate(-90 75 75)" stroke-dasharray="402.1" stroke-dashoffset="402.1"/></svg><div class="v" style="margin-top:18px"><span class="c">0</span>%</div><p>pengidap psikosis/skizofrenia <b>sudah berobat</b></p><div class="s">SKI 2023</div></div>
      <div class="card pre"><div class="v"><span class="c">0</span>%</div><p>prevalensi <b>depresi</b> (usia 15 tahun ke atas)</p><div class="young pre"><span class="tag">usia kita</span><span style="font:700 20px var(--body)">15–24 tahun</span><span class="v2">2%</span></div><div class="s">SKI 2023</div></div>
    </div>
    <p class="src">Label “psikosis/skizofrenia” dipakai karena petugas survei hanya bisa menangkap gejala.</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    const c = $$('.dash .card', el)[0];
    FX.up(tl, c, .4); FX.count(tl, $('.c', c), 4, { dur: 1.2 }, .6);
    FX.fade(tl, $('.src', el), 1);
  },
  steps: [
    (el, tl) => { const c = $$('.dash .card', el)[1]; FX.up(tl, c, 0); FX.count(tl, $('.c', c), 2.6, { dec: 1 }, .2); },
    (el, tl) => {
      const c = $$('.dash .card', el)[2]; FX.up(tl, c, 0); FX.count(tl, $('.c', c), 62.9, { dec: 1 }, .2);
      tl.to($('.arc', c), { strokeDashoffset: 402.1 * (1 - .629), duration: 1.6, ease: 'power2.out' }, .2);
    },
    (el, tl) => {
      const c = $$('.dash .card', el)[3]; FX.up(tl, c, 0); FX.count(tl, $('.c', c), 1.4, { dec: 1 }, .2);
      tl.fromTo($('.young', c), { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: .7, ease: 'back.out(2)' }, 1.2)
        .fromTo($('.young .tag', c), { scale: .5 }, { scale: 1, duration: .7, ease: 'elastic.out(1.2,.4)' }, 1.3);
    },
  ],
  notes: '4 dari 1.000 rumah tangga punya anggota bergejala psikosis. ±2,6 juta penderita skizofrenia. 62,9% sudah berobat. Depresi 1,4%, tetapi 2% di usia 15–24: usia kita.',
});
