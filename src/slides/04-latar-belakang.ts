import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './04-latar-belakang.css';

/* ---------------- S04 · Latar belakang ---------------- */
const MYTH = [['GUNA-GUNA', 1080, 118, 62, -4], ['KERASUKAN', 880, 245, 104, 2], ['KUTUKAN', 1250, 400, 70, -3], ['KURANG IMAN', 140, 430, 62, 3]];
export default defineSlide({
  id: 's04', act: 1, title: 'Latar belakang: cara masyarakat memandang',
  orbs: [[1600, 250, 1000, '#2F6FD6', .55], [280, 280, 900, '#7A6BB0', .45], [1000, 1040, 1100, '#D9283F', .28]],
  html: `${HD('01', 'Pendahuluan · Latar belakang', 'Cara masyarakat<br>memandang')}
    ${MYTH.map(m => `<div class="myth pre" style="left:${m[1]}px;top:${m[2]}px;font-size:${m[3]}px">${m[0]}</div>`).join('')}
    <div class="effect"><p class="lead pre">Akibatnya, banyak ODGJ tidak dibawa berobat. Mereka justru…</p>
      <div class="triple"><span class="pre">dikucilkan</span><span class="sep pre">·</span><span class="pre">ditelantarkan</span><span class="sep pre">·</span><span class="pre">dipasung</span></div></div>
    <div class="isbd"><span class="lbl pre">Kaitan<br>dengan ISBD</span>${['nilai', 'norma', 'stigma', 'keadilan sosial'].map(p => `<span class="pill pre">${p}</span>`).join('')}</div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: [
    (el, tl) => {
      const ms = $$('.myth', el);
      const from = [[-300, -200], [400, -300], [500, 200], [-400, 200]];
      ms.forEach((m, k) => tl.fromTo(m, { autoAlpha: 0, x: from[k][0], y: from[k][1], rotation: from[k][0] / 20, filter: 'blur(14px)' },
        { autoAlpha: 1, x: 0, y: 0, rotation: MYTH[k][4], filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' }, k * .18));
      tl.call(() => ms.forEach(m => FX.loop(gsap.to(m, { y: 'random(-16,16)', x: 'random(-12,12)', rotation: '+=random(-2,2)', duration: 'random(2.6,4)', yoyo: true, repeat: -1, ease: 'sine.inOut' }))));
    },
    (el, tl) => {
      tl.to($$('.myth', el), { opacity: .3, duration: .8 });
      FX.up(tl, $('.effect .lead', el), 0);
      const t = $$('.triple span', el);
      tl.fromTo(t, { autoAlpha: 0, scale: 1.6, filter: 'blur(10px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: .55, ease: 'power4.out', stagger: .28 }, .5);
    },
    (el, tl) => {
      FX.fade(tl, $('.isbd .lbl', el), 0);
      tl.fromTo($$('.isbd .pill', el), { autoAlpha: 0, y: 30, scale: .8 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .12 }, .1);
    },
  ],
  notes: 'Mitos yang beredar: guna-guna, kerasukan, kutukan, kurang iman. Akibatnya ODGJ dikucilkan, ditelantarkan, bahkan dipasung. ISBD mengkaji ini lewat nilai, norma, stigma, dan keadilan sosial.',
});
