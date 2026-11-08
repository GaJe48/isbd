import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './10-ppdgj-iii.css';

/* ---------------- S10 · PPDGJ-III ---------------- */
const PP = [['F0', 'F00–F09', 'Gangguan mental organik', 'Demensia, delirium', 'studi kasus'], ['F1', 'F10–F19', 'Akibat zat psikoaktif', 'Ketergantungan alkohol, NAPZA'], ['F2', 'F20–F29', 'Skizofrenia & gangguan waham', 'Skizofrenia, psikotik akut', 'psikosis'], ['F3', 'F30–F39', 'Gangguan suasana perasaan (mood)', 'Depresi, bipolar', 'depresi'], ['F4', 'F40–F48', 'Neurotik, somatoform & terkait stres', 'Cemas, fobia, OCD, PTSD'],
  ['F5', 'F50–F59', 'Sindrom perilaku terkait faktor fisiologis', 'Gangguan makan, gangguan tidur'], ['F6', 'F60–F69', 'Gangguan kepribadian & perilaku dewasa', 'Borderline, antisosial'], ['F7', 'F70–F79', 'Retardasi mental (disabilitas intelektual)', 'Ringan hingga berat'], ['F8', 'F80–F89', 'Gangguan perkembangan psikologis', 'Autisme, gangguan bicara'], ['F9', 'F90–F98', 'Perilaku & emosi onset kanak / remaja', 'ADHD, gangguan tingkah laku']];
export default defineSlide({
  id: 's10', act: 2, title: '10 kelompok PPDGJ-III',
  orbs: [[1620, 200, 1000, '#7A6BB0', .45], [280, 920, 1000, '#2F6FD6', .45]],
  html: `${HD('02', 'Pengertian · PPDGJ-III (1993) mengikuti ICD-10 WHO', '10 kelompok <span class="ol">gangguan jiwa</span>')}
    <div class="tiles">${PP.map(p => `<div class="tile" data-noclick><div class="ring"></div>${p[4] ? `<span class="tag">${p[4]}</span>` : ''}<div class="c">${p[0]}</div><div class="r">${p[1]}</div><div class="g">${p[2]}</div><div class="e">${p[3]}</div></div>`).join('')}</div>
    <div class="msg pre">Tidak semua ODGJ itu <span class="ol thin" style="font-family:var(--disp);font-stretch:125%;font-weight:900">“orang gila”</span> di jalan.
      <p class="small" style="margin-top:10px;font-size:22px">Orang dengan depresi atau gangguan cemas juga termasuk ODGJ, dan banyak yang tetap bisa bekerja serta kuliah bila ditangani.</p></div>`,
  intro(el, tl) {
    hdIn(el, tl);
    tl.from($$('.tile', el), { autoAlpha: 0, y: 60, rotationX: -50, scale: .9, transformPerspective: 900, duration: .9, ease: 'expo.out', stagger: { grid: [2, 5], from: 'start', amount: .9 } }, .4);
  },
  steps: [
    (el, tl) => {
      const t = $$('.tile', el), hot = [0, 2, 3];
      tl.to(t.filter((_, k) => !hot.includes(k)), { opacity: .42, duration: .6 });
      hot.forEach((k, j) => {
        tl.to($('.ring', t[k]), { opacity: 1, duration: .6 }, .2 + j * .15);
        tl.fromTo($('.tag', t[k]), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .5 }, .3 + j * .15);
        tl.fromTo(t[k], { scale: 1 }, { scale: 1.05, duration: .35, yoyo: true, repeat: 1, ease: 'power2.out' }, .2 + j * .15);
      });
    },
    (el, tl) => { tl.to($$('.tile', el), { opacity: 1, duration: .5 }); FX.up(tl, $('.msg', el), .1); },
  ],
  click(e, el) {
    const t = (e.target as Element).closest<HTMLElement>('.tile'); if (!t) return false;
    const big = t.classList.toggle('big');
    $$('.tile', el).forEach(o => { if (o !== t) { o.classList.remove('big'); gsap.to(o, { scale: 1, duration: .4 }); } });
    gsap.to(t, { scale: big ? 1.32 : 1, duration: .5, ease: 'expo.out' });
    return true;
  },
  notes: 'PPDGJ-III = acuan diagnosis resmi Indonesia, 10 kelompok F0–F9. Sorot F0 (demensia — studi kasus kita), F2 (skizofrenia), F3 (depresi). Ubin bisa diklik untuk diperbesar.',
});
