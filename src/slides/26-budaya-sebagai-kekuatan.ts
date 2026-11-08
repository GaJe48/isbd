import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './26-budaya-sebagai-kekuatan.css';

/* ---------------- S26 · Budaya sebagai kekuatan ---------------- */
const CX = 1250, CY = 580;
const NET: [title: string, text: string, x: number, y: number][] = [['Gotong royong', 'mendampingi berobat bersama-sama', CX, CY - 230], ['Kekeluargaan', 'keluarga sebagai pendamping utama', CX + 340, CY], ['Kepedulian tetangga', 'mengingatkan minum obat, menerima kembali', CX, CY + 230], ['Dukungan keagamaan', 'dukungan batin, tidak menggantikan medis', CX - 340, CY]];
export default defineSlide({
  id: 's26', act: 5, title: 'Budaya sebagai kekuatan', bg: '#2d2a2e', morph: 2.6,
  orbs: [[1250, 580, 1150, '#F0A04B', .58], [700, 260, 900, '#B85A9C', .55], [1720, 940, 900, '#7A6BB0', .45]],
  html: `${HD('05', 'Titik balik', 'Budaya sebagai <span class="ol">kekuatan</span>')}
    <div class="left" style="width:600px"><p class="lead pre" style="font-size:29px">Nilai budaya juga bisa menjadi bagian dari <b>solusi</b>: mendampingi ODGJ berobat, mengingatkan minum obat, dan menerima mereka kembali di lingkungan.</p></div>
    <svg class="net" viewBox="0 0 1920 1080">${NET.map((n, k) => `<line class="sp" x1="${CX}" y1="${CY}" x2="${n[2]}" y2="${n[3]}"/><line class="rg" x1="${n[2]}" y1="${n[3]}" x2="${NET[(k + 1) % 4][2]}" y2="${NET[(k + 1) % 4][3]}"/>`).join('')}</svg>
    <div class="center cc pre" style="left:${CX}px;top:${CY}px">ODGJ</div>
    ${NET.map(n => `<div class="nd2 cx pre" style="left:${n[2]}px;top:${n[3] - 55}px"><div class="b"></div><h4>${n[0]}</h4><p>${n[1]}</p></div>`).join('')}`,
  init(el) { $$<SVGLineElement>('.net line', el).forEach(l => { const len = Math.hypot(l.x2.baseVal.value - l.x1.baseVal.value, l.y2.baseVal.value - l.y1.baseVal.value); gsap.set(l, { strokeDasharray: len, strokeDashoffset: len }); }); },
  intro(el, tl) {
    hdIn(el, tl, .6);
    FX.up(tl, $('.left .lead', el), 1);
    tl.fromTo($('.center', el), { autoAlpha: 0, scale: .3 }, { autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out(2)' }, 1.3);
    tl.call(() => FX.loop(gsap.to($('.center', el), { scale: 1.07, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
  },
  steps: NET.map((n, k) => (el, tl) => {
    tl.to($$('.net .sp', el)[k], { strokeDashoffset: 0, duration: .7, ease: 'power2.out' });
    tl.fromTo($$('.nd2', el)[k], { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'back.out(2)' }, .4);
    if (k > 0) tl.to($$('.net .rg', el)[k - 1], { strokeDashoffset: 0, duration: .7 }, .6);
    if (k === 3) tl.to($$('.net .rg', el)[3], { strokeDashoffset: 0, duration: .7 }, 1);
  }),
  notes: 'Titik balik: warna menghangat. Gotong royong, kekeluargaan, kepedulian tetangga, dukungan keagamaan — membentuk jaring di sekitar ODGJ. Keagamaan sebagai dukungan batin, bukan pengganti medis.',
});
