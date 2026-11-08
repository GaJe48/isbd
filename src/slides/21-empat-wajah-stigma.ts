import { defineSlide } from '../types';
import { FX, $, $$ } from '../fx';
import './21-empat-wajah-stigma.css';

/* ---------------- S21 · Empat wajah stigma ---------------- */
const STG: [title: string, text: string, sticker: string, rot: number][] = [['Stigma publik', 'Masyarakat menganggap ODGJ berbahaya, malas, tidak bisa sembuh, atau aib keluarga.', 'berbahaya', -6], ['Stigma diri', 'ODGJ ikut percaya label itu, merasa malu, lalu menolak berobat.', 'malu', 5], ['Stigma keluarga', 'Keluarga menyembunyikan anggota yang sakit karena takut dikucilkan tetangga.', 'aib', -4], ['Stigma dalam bahasa', 'Kata “gila”, “sinting”, atau “stres” dipakai sebagai ejekan dan candaan, termasuk di media sosial.', 'gila lu!', 7]];
export default defineSlide({
  id: 's21', act: 5, title: 'Empat wajah stigma', bg: '#28282b',
  orbs: [[1500, 300, 1000, '#1f3f8f', .7], [700, 920, 1000, '#7A6BB0', .5], [280, 200, 600, '#D9283F', .22]],
  html: `<div class="vt"><div class="disp" style="font-size:140px">Stig<span class="ol">ma</span></div></div>
    <div class="quad">${STG.map((s, k) => `<div class="card pre"><span class="sticker" style="transform:rotate(${s[3]}deg)">${s[2]}</span><div class="ix">0${k + 1}</div><h4>${s[0]}</h4><p>${s[1]}</p></div>`).join('')}</div>`,
  intro(el, tl) { FX.rise(tl, $('.vt .disp', el), 0, { stagger: .05 }); },
  steps: STG.map((s, k) => (el, tl) => {
    const c = $$('.quad .card', el)[k];
    FX.up(tl, c, 0);
    tl.fromTo($('.sticker', c), { scale: 2.2, autoAlpha: 0, rotation: s[3] * 3 }, { scale: 1, autoAlpha: 1, rotation: s[3], duration: .4, ease: 'power4.in' }, .5)
      .to(c, { keyframes: { y: [0, 5, 0] }, duration: .25 }, .9);
  }),
  notes: 'Stigma = label negatif. Empat bentuk: publik, diri sendiri, keluarga, dan bahasa sehari-hari (termasuk candaan "gila lu").',
});
