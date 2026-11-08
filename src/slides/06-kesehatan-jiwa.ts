import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './06-kesehatan-jiwa.css';

/* ---------------- S06 · Kesehatan jiwa ---------------- */
const BALLS: [label: string, color: string, x: number, y: number, lx: number, ly: number][] = [['Fisik', '#2F6FD6', -200, -200, 0, -275], ['Mental', '#7A6BB0', 200, -200, 300, 0], ['Spiritual', '#B85A9C', -200, 200, -300, 0], ['Sosial', '#55b38f', 200, 200, 0, 275]];
export default defineSlide({
  id: 's06', act: 2, title: 'Apa itu kesehatan jiwa?',
  orbs: [[380, 280, 1000, '#2F6FD6', .5], [1450, 540, 1150, '#7A6BB0', .42]],
  html: `${HD('02', 'Pengertian', 'Kesehatan <span class="ol">jiwa</span>')}
    <blockquote class="quote pre">Kesehatan Jiwa adalah kondisi dimana seorang individu dapat berkembang secara <b>fisik, mental, spiritual, dan sosial</b> sehingga individu tersebut menyadari kemampuan sendiri, dapat mengatasi tekanan, dapat bekerja secara produktif, dan mampu memberikan kontribusi untuk komunitasnya.<span class="cite">UU No. 18 Tahun 2014 · Pasal 1 angka 1</span></blockquote>
    <div class="goo">${BALLS.map(b => `<div class="ball pre" style="background:${b[1]}"></div>`).join('')}<div class="ball merged pre" style="background:linear-gradient(135deg,#2F6FD6,#7A6BB0 40%,#B85A9C 70%,#55b38f)"></div></div>
    <div class="lbls">${BALLS.map(b => `<div class="lb cc pre">${b[0]}</div>`).join('')}<div class="core cc pre">SEHAT<br>JIWA</div></div>
    <div class="abil">${['menyadari kemampuan', 'mengatasi tekanan', 'produktif', 'berkontribusi'].map(p => `<span class="pill pre">${p}</span>`).join('')}</div>`,
  intro(el, tl) {
    hdIn(el, tl);
    FX.up(tl, $('.quote', el), .5);
    const bs = $$('.ball:not(.merged)', el), ls = $$('.lb', el);
    BALLS.forEach((b, k) => {
      tl.fromTo(bs[k], { autoAlpha: 1, x: b[2] * 2.2, y: b[3] * 2.2, scale: 0 }, { x: b[2], y: b[3], scale: 1, duration: 1.4, ease: 'expo.out' }, .7 + k * .12);
      tl.fromTo(ls[k], { autoAlpha: 0, x: b[2], y: b[3] }, { autoAlpha: 1, duration: .6 }, 1.2 + k * .12);
    });
  },
  steps: [
    (el, tl) => {
      const bs = $$('.ball:not(.merged)', el), ls = $$('.lb', el), mg = $('.merged', el);
      tl.fromTo(mg, { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1.75, duration: 1.1, ease: 'expo.out' }, 1.2);
      tl.to(bs, { x: 0, y: 0, duration: 1.5, ease: 'expo.inOut', stagger: .05 }, 0)
        .to(bs, { scale: 1.75, duration: 1, ease: 'expo.out' }, 1.3);
      BALLS.forEach((b, k) => tl.to(ls[k], { x: b[4], y: b[5], duration: 1.5, ease: 'expo.inOut' }, 0));
      tl.fromTo($('.core', el), { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1, duration: .8, ease: 'back.out(2)' }, 1.5);
      tl.call(() => FX.loop(gsap.to([...bs, mg], { scale: 1.85, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
    },
    (el, tl) => tl.fromTo($$('.abil .pill', el), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'back.out(2)', stagger: .12 }),
  ],
  notes: 'Definisi UU 18/2014: sehat jiwa = berkembang utuh secara fisik, mental, spiritual, sosial. Empat aspek ini menyatu. Ciri orang sehat jiwa: sadar kemampuan, mampu mengatasi tekanan, produktif, berkontribusi.',
});
