import { defineSlide } from '../types';
import { FX, $, $$, HD, hdIn } from '../fx';
import './17-provinsi.css';

/* ---------------- S17 · Provinsi ---------------- */
const PROV: [name: string, permil: number, bg: string][] = [['DI Yogyakarta', 9.3, 'linear-gradient(90deg,#B85A9C,#D9283F)'], ['Jawa Tengah', 6.5, 'linear-gradient(90deg,#5d4f99,#7A6BB0)'], ['Sulawesi Barat', 5.9, 'linear-gradient(90deg,#1f4fa8,#2F6FD6)']];
export default defineSlide({
  id: 's17', act: 3, title: 'Provinsi tertinggi',
  orbs: [[1550, 620, 1000, '#D9283F', .32], [300, 300, 900, '#7A6BB0', .5]],
  html: `${HD('03', 'Data & fakta · SKI 2023', 'Provinsi <span class="ol">tertinggi</span>', 'h3', 'Proporsi rumah tangga dengan anggota bergejala psikosis/skizofrenia, per mil (‰).')}
    <div class="chart">${PROV.map(p => `<div class="pr"><span class="nm">${p[0]}</span><div class="track"><div class="bar" style="width:${p[1] / 10 * 1180}px;background:${p[2]}"><span class="c">0</span></div></div></div>`).join('')}
      <div class="avg pre" style="left:${400 + 4 / 10 * 1180}px"><span>rata-rata nasional ±4‰</span></div></div>
    <p class="lead pre" style="position:absolute;left:140px;top:880px;font-size:27px">DI Yogyakarta: lebih dari <b>dua kali</b> rata-rata nasional.</p>
    <p class="src" style="left:auto;right:140px">Sumber: SKI 2023 · detikHealth 2024</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    $$('.pr', el).forEach((r, k) => {
      tl.from($('.nm', r), { autoAlpha: 0, x: -30, duration: .6 }, .5 + k * .25);
      tl.from($('.bar', r), { scaleX: 0, duration: 1.4, ease: 'expo.out' }, .6 + k * .25);
      FX.count(tl, $('.c', r), PROV[k][1], { dec: 1, dur: 1.4, suf: '‰' }, .6 + k * .25);
    });
    FX.fade(tl, $('.src', el), 1.2);
  },
  steps: [(el, tl) => { tl.fromTo($('.avg', el), { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, duration: .8, ease: 'expo.out' }); FX.up(tl, $('.lead.pre', el), .4); }],
  notes: 'DIY 9,3‰, Jawa Tengah 6,5‰, Sulawesi Barat 5,9‰. Rata-rata nasional 4 per 1.000 rumah tangga.',
});
