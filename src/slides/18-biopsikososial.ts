import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './18-biopsikososial.css';

/* ---------------- S18 · Biopsikososial ---------------- */
const VN: [name: string, color: string, cx: number, cy: number, lx: number, ly: number, items: string[], listStyle: string][] = [
  ['Biologis', '#2F6FD6', 960, 470, 960, 370, ['Riwayat keluarga (genetik)', 'Ketidakseimbangan zat kimia otak', 'Komplikasi kehamilan atau kelahiran', 'Infeksi otak, cedera kepala', 'Narkoba dan alkohol'], 'left:1300px;top:250px'],
  ['Psikologis', '#9d8fe0', 830, 690, 745, 750, ['Trauma masa kecil', 'Pola asuh penuh kekerasan atau penelantaran', 'Peristiwa hidup yang sangat menekan', 'Cara mengelola stres yang kurang sehat'], 'left:140px;top:600px;width:440px'],
  ['Sosial', '#F0A04B', 1090, 690, 1175, 750, ['Kemiskinan, pengangguran', 'Konflik keluarga', 'Perundungan, diskriminasi', 'Dukungan sosial lemah', 'Tempat tinggal buruk'], 'left:1380px;top:600px;width:420px'],
];
export default defineSlide({
  id: 's18', act: 4, title: 'Model biopsikososial', morph: 1.9,
  orbs: [[960, 470, 640, '#2F6FD6', .7], [830, 690, 640, '#7A6BB0', .7], [1090, 690, 640, '#F0A04B', .6]],
  html: `${HD('04', 'Faktor penyebab', 'Model <span class="ol">biopsikososial</span>')}
    <svg class="venn" viewBox="0 0 1920 1080">${VN.map(v => `<g class="vc"><circle cx="${v[2]}" cy="${v[3]}" r="210" stroke="${v[1]}" fill="${v[1]}" fill-opacity=".1"/></g>`).join('')}
      <circle class="core" cx="960" cy="617" r="14" fill="#fff"/></svg>
    ${VN.map(v => `<div class="vl cc pre" style="left:${v[4]}px;top:${v[5]}px;color:${v[1]}">${v[0]}</div>`).join('')}
    ${VN.map(v => `<div class="list pre" style="${v[7]};color:${v[1]}"><h5>${v[0]}</h5><ul>${v[6].map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}`,
  init(el) { $$('.vc circle', el).forEach(c => gsap.set(c, { strokeDasharray: 1320, strokeDashoffset: 1320 })); gsap.set($('.core', el), { autoAlpha: 0 }); },
  intro(el, tl) {
    hdIn(el, tl);
    tl.to($$('.vc circle', el), { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: .2 }, .5);
    tl.fromTo($$('.vl', el), { autoAlpha: 0, scale: .7 }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .15 }, 1.2);
    tl.to($('.core', el), { autoAlpha: 1, duration: .4 }, 2).to($('.core', el), { attr: { r: 22 }, duration: .6, yoyo: true, repeat: 1 }, 2);
    tl.call(() => FX.loop(gsap.to($('.core', el), { opacity: .4, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
  },
  steps: VN.map((v, k) => (el, tl) => {
    const cs = $$('.vc circle', el), ls = $$('.list', el);
    cs.forEach((c, j) => tl.to(c, { attr: { r: j === k ? 232 : 210 }, fillOpacity: j === k ? .28 : .07, duration: .8, ease: 'expo.out' }, 0));
    ls.slice(0, k).forEach(l => tl.to(l, { opacity: .5, duration: .5 }, 0));
    FX.up(tl, ls[k], .2);
    tl.from($$('li', ls[k]), { autoAlpha: 0, x: -20, duration: .5, stagger: .08 }, .4);
    tl.to(FX.orb(k), { scale: .8, opacity: .9, duration: 1, ease: 'expo.out', overwrite: 'auto' }, 0);
    [0, 1, 2].filter(j => j !== k).forEach(j => tl.to(FX.orb(j), { scale: .6, opacity: .5, duration: 1, overwrite: 'auto' }, 0));
  }),
  notes: 'Gangguan jiwa hampir tidak pernah satu sebab. Biologis (genetik, zat kimia otak), psikologis (trauma, pola asuh), sosial (kemiskinan, bullying). Ketiganya saling tumpang-tindih.',
});
