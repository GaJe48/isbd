import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './24-alasan-dampak.css';

/* ---------------- S24 · Alasan & dampak ---------------- */
const RS = ['Takut ODGJ melukai diri atau orang lain', 'Malu, ingin menyembunyikan aib keluarga', 'Tidak tahu gangguan jiwa bisa diobati', 'Biaya, jarak, dan akses layanan sulit', 'Pernah berobat, putus obat, lalu kambuh'];
const IM = ['Luka dan kerusakan otot', 'Kondisi jiwa makin buruk', 'Trauma', 'Kehilangan martabat', 'Tersingkir dari kehidupan sosial'];
export default defineSlide({
  id: 's24', act: 5, title: 'Mengapa memasung & dampaknya', bg: '#1a1a1d',
  orbs: [[960, 640, 900, '#6b1020', .5], [300, 300, 700, '#7A6BB0', .3]],
  html: `${HD('05', 'Pasung · sebab dan akibat', 'Mengapa <span class="ol">memasung?</span>')}
    <svg class="flow" viewBox="0 0 1920 1080"></svg>
    <div class="side l"><h5 class="pre">Alasan keluarga</h5>${RS.map(r => `<div class="it pre">${r}</div>`).join('')}</div>
    <div class="hub cc pre">PASUNG</div>
    <div class="side r"><h5 class="pre">Dampak</h5>${IM.map(r => `<div class="it pre">${r}</div>`).join('')}</div>`,
  init(el) {
    const svg = $('.flow', el), L = $('.side.l', el), R = $('.side.r', el), hub = $('.hub', el);
    const pos = (side: HTMLElement, it: HTMLElement) => side.offsetTop + it.offsetTop + it.offsetHeight / 2;
    const hy = pos(L, $$('.it', L)[2]); hub.style.top = hy + 'px';
    let h = '';
    $$('.it', L).forEach(it => { const y = pos(L, it); h += `<path class="pl" d="M700 ${y} C 790 ${y}, 760 ${hy}, 850 ${hy}" stroke="rgba(255,255,255,.4)"/>`; });
    $$('.it', R).forEach(it => { const y = pos(R, it); h += `<path class="pr" d="M1070 ${hy} C 1160 ${hy}, 1130 ${y}, 1220 ${y}" stroke="rgba(217,40,63,.75)"/>`; });
    svg.innerHTML = h;
    $$<SVGPathElement>('path', svg).forEach(p => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
  },
  intro(el, tl) { hdIn(el, tl); FX.fade(tl, $('.side.l h5', el), .4); FX.up(tl, $$('.side.l .it', el), .5, { stagger: .12 }); },
  steps: [
    (el, tl) => {
      tl.to($$('.pl', el), { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: .1 });
      tl.fromTo($('.hub', el), { autoAlpha: 0, scale: .4 }, { autoAlpha: 1, scale: 1, duration: .8, ease: 'back.out(2)' }, .8);
      tl.call(() => FX.loop(gsap.to($('.hub', el), { boxShadow: '0 0 80px rgba(217,40,63,.6)', duration: 1.5, yoyo: true, repeat: -1 })));
    },
    (el, tl) => {
      tl.to($$('.pr', el), { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: .1 });
      FX.fade(tl, $('.side.r h5', el), .3);
      FX.up(tl, $$('.side.r .it', el), .6, { stagger: .12 });
    },
  ],
  notes: 'Alasan memasung biasanya takut, malu, tidak tahu, akses sulit, atau putus obat. Dampaknya fisik dan mental — dan merampas martabat.',
});
