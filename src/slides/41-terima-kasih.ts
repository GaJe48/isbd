import { defineSlide } from '../types';
import { FX, $ } from '../fx';
import { INFO as I } from '../data/info';
import './41-terima-kasih.css';

/* ---------------- S41 · Terima kasih ---------------- */
export default defineSlide({
  id: 's41', cls: 'cover s41', act: 9, title: 'Terima kasih', hud: false, morph: 2,
  bg: '#4a3d58',
  orbs: [[260, 300, 1500, '#7A6BB0', .95], [980, 700, 1300, '#B85A9C', .9], [1720, 380, 1400, '#F0A04B', .85], [1300, 1020, 900, '#D9283F', .5]],
  html: `<div class="big"><svg class="sw"><text font-size="400" style="fill:#fff">ODGJ</text></svg></div>
    <div class="disp tk pre" style="position:absolute;left:0;right:0;top:330px;text-align:center;font-size:150px">Terima kasih</div>
    <div class="tag pre" style="top:620px">Memandang manusia, bukan labelnya.</div>
    <div class="meta-l pre">${I.matkul}<br>${I.tahun}</div>
    <div class="meta-r pre"><b>${I.kelompok}</b>${I.anggota.join(' · ')}<br>Dosen: ${I.dosen}</div>`,
  init(el) { el._t = FX.svgText($('svg', el)); },
  intro(el, tl) {
    tl.from(el._t, { yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .12 }, .3);
    tl.fromTo(el._t, { fill: 'rgba(255,255,255,0)' }, { fill: 'rgba(255,255,255,1)', duration: 1.2, stagger: .12 }, .5);
    tl.to(el._t, { y: -80, opacity: 0, filter: 'blur(14px)', duration: .8, ease: 'power3.in', stagger: .08 }, 3);
    FX.rise(tl, $('.tk', el), 3.5, { stagger: .04 });
    FX.fade(tl, $('.tag', el), 4.4, { duration: 1.2 });
    tl.fromTo($('.meta-r', el), { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, 4.6);
    tl.fromTo($('.meta-l', el), { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, 4.6);
  },
  notes: 'Callback ke cover: ODGJ kini terisi penuh (solid). Terima kasih — buka sesi tanya jawab.',
});
