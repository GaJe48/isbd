import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './11-psikosis.css';

/* ---------------- S11 · Psikosis ---------------- */
const LEAF = ['Skizofrenia', 'Gangguan bipolar', 'Depresi berat', 'Narkoba', 'Penyakit otak'];
export default defineSlide({
  id: 's11', act: 2, title: 'Psikosis: gejala, bukan penyakit',
  orbs: [[380, 820, 1000, '#7A6BB0', .45], [1500, 500, 1100, '#2F6FD6', .4]],
  html: `${HD('02', 'Pengertian · istilah sebelum data', 'Psikosis = <span class="ol">gejala</span>')}
    <div class="def"><p class="lead pre">Kehilangan kontak dengan kenyataan: <b>halusinasi</b> (mendengar bisikan yang tidak ada) atau <b>waham</b> (yakin dirinya sedang diikuti).</p></div>
    <div class="icon">
      <svg class="th" viewBox="0 0 300 300"><path d="M128 60 a22 22 0 0 1 44 0 v118 a44 44 0 1 1 -44 0 z"/><line x1="150" y1="92" x2="150" y2="205"/><line x1="182" y1="80" x2="200" y2="80"/><line x1="182" y1="112" x2="200" y2="112"/><line x1="182" y1="144" x2="200" y2="144"/></svg>
      <svg class="hd2" viewBox="0 0 300 300"><path d="M104 272 v-44 c-36 -18 -58 -54 -58 -96 c0 -62 48 -108 110 -108 c58 0 100 42 100 98 c0 22 -6 32 4 48 l16 26 c4 8 -2 12 -8 12 h-14 v26 c0 16 -12 26 -28 26 h-26 v12"/><path d="M110 120 q20 -24 40 0 t40 0"/><path d="M118 156 q16 -18 32 0 t32 0"/></svg>
    </div>
    <p class="analog pre">Ibaratnya <b>demam</b>: penyebabnya bisa macam-macam.</p>
    <div class="tree"><svg viewBox="0 0 800 700">${LEAF.map(() => `<path/>`).join('')}</svg>
      <div class="node cc root pre" style="left:70px;top:350px">PSIKOSIS</div>
      ${LEAF.map((l, k) => `<div class="node cc leaf pre" style="left:610px;top:${70 + k * 140}px">${l}</div>`).join('')}</div>`,
  init(el) {
    gsap.set($('.hd2', el), { autoAlpha: 0 }); gsap.set($$('.th > *', el), { strokeDasharray: 900, strokeDashoffset: 900 });
    // cabang dihitung dari ukuran kotak sebenarnya: mulai tepat di tepi kanan PSIKOSIS, berakhir tepat di tepi kiri tiap label
    const root = $('.root', el), x0 = root.offsetLeft + root.offsetWidth / 2, y0 = root.offsetTop;
    $$<SVGPathElement>('.tree path', el).forEach((p, k) => {
      const lf = $$('.leaf', el)[k], x1 = lf.offsetLeft - lf.offsetWidth / 2, y1 = lf.offsetTop, mx = (x0 + x1) / 2;
      p.setAttribute('d', `M${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`);
    });
    gsap.set($$('.tree path', el), { autoAlpha: 0 });
  },
  intro(el, tl) { hdIn(el, tl); FX.up(tl, $('.def .lead', el), .5); },
  steps: [
    (el, tl) => {
      const th = $$('.th > *', el), hd = $$('.hd2 > *', el);
      tl.fromTo(th, { strokeDasharray: 900, strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: .1 });
      FX.up(tl, $('.analog', el), .6);
      tl.to($('.th', el), { autoAlpha: 0, scale: .7, rotation: -20, duration: .7, ease: 'power2.in' }, 1.9);
      tl.set($('.hd2', el), { autoAlpha: 1 }, 2.4);
      tl.fromTo(hd, { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: .15 }, 2.4);
    },
    (el, tl) => {
      tl.fromTo($('.root', el), { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'back.out(2)' });
      $$<SVGPathElement>('.tree path', el).forEach((p, k) => { const L = p.getTotalLength(); tl.fromTo(p, { autoAlpha: 1, strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: .9, ease: 'power2.inOut' }, .5 + k * .14); });
      tl.fromTo($$('.leaf', el), { autoAlpha: 0, x: -30, scale: .8 }, { autoAlpha: 1, x: 0, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .14 }, 1.1);
    },
  ],
  notes: 'Data nasional memakai label "psikosis/skizofrenia". Psikosis itu gejala (seperti demam), penyebabnya bisa skizofrenia, bipolar, depresi berat, narkoba, atau penyakit otak.',
});
