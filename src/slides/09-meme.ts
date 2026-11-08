import { defineSlide } from '../types';
import { FX, $, $$, gsap } from '../fx';
import './09-meme.css';

/* ---------------- S09 · Meme ---------------- */
const SPK = `<svg viewBox="0 0 40 40"><path d="M20 0 C22 14 26 18 40 20 C26 22 22 26 20 40 C18 26 14 22 0 20 C14 18 18 14 20 0Z" fill="#fff"/></svg>`;
export default defineSlide({
  id: 's09', act: 2, title: 'Makna di balik istilah (meme)',
  orbs: [[380, 320, 1000, '#2F6FD6', .5], [1500, 820, 1000, '#7A6BB0', .42], [1400, 200, 700, '#A8DDA0', .16]],
  html: `<div class="ttl"><div class="kicker"><b>02</b><span>Pengertian</span></div>
      <div class="disp t1" style="margin-top:30px">Makna</div><div class="disp t2">di balik</div><div class="disp ol t3">istilah</div>
      <p class="sub pre">Kata yang kita pilih untuk menyebut seseorang ikut menentukan cara kita memperlakukannya.</p></div>
    <div class="glow"></div>
    <div class="meme pre"><div class="grid">
      <div class="cellT c1"><div class="og pre">ORANG<br>GILA</div><div class="og2 pre">sinting · gendeng</div>
        <svg class="stamp pre" viewBox="0 0 250 250"><path d="M45 45 L205 205"/><path d="M205 45 L45 205"/></svg></div>
      <div class="face no"></div>
      <div class="cellT c2"><div class="yes1 pre">ODGJ</div><div class="yes2 pre">Orang Dengan Gangguan Jiwa</div></div>
      <div class="face yes" style="position:relative"><div class="sparkle pre" style="left:30px;top:40px">${SPK}</div><div class="sparkle pre" style="right:24px;top:90px;width:34px;height:34px">${SPK}</div><div class="sparkle pre" style="left:150px;bottom:30px;width:28px;height:28px">${SPK}</div></div>
      <div class="gl v"></div><div class="gl h"></div>
    </div></div>
    <div class="exp">
      <div class="card pre"><h4>“Orang gila”</h4><p><em>Gila</em> dijadikan <b>jati diri</b> seseorang: terkesan berbahaya, menyimpang, dan tidak bisa sembuh.</p></div>
      <div class="card yes pre"><h4>“Orang dengan gangguan jiwa”</h4><p>Gangguan adalah <b>kondisi yang sedang dialami</b>, seperti <em>orang dengan diabetes</em>. Bisa diobati, dan orangnya tetap manusia seutuhnya.</p></div>
    </div>
    <div class="final" style="left:140px;top:850px"><div class="disp pre">Bahasa ikut membentuk <span class="ol sk">sikap.</span></div>
      <p class="small pre">Istilah ODGJ resmi dipakai sejak UU No. 18 Tahun 2014, menggantikan sebutan yang diskriminatif.</p></div>`,
  init(el) { gsap.set($$('.face', el), { opacity: 0 }); },
  intro(el, tl) {
    FX.fade(tl, $('.ttl .kicker', el), 0);
    FX.rise(tl, [$('.t1', el), $('.t2', el)], .1);
    tl.from($('.t3', el), { autoAlpha: 0, x: -60, duration: 1.2, ease: 'expo.out' }, .5);
    FX.up(tl, $('.ttl .sub', el), .7);
    tl.fromTo($('.meme', el), { autoAlpha: 0, y: 80, rotation: 8, scale: .9 }, { autoAlpha: 1, y: 0, rotation: 2, scale: 1, duration: 1.2, ease: 'expo.out' }, .6);
    tl.from($('.gl.v', el), { scaleY: 0, duration: .8, ease: 'power3.inOut' }, 1.2);
    tl.from($('.gl.h', el), { scaleX: 0, duration: .8, ease: 'power3.inOut' }, 1.4);
  },
  steps: [
    (el, tl) => {
      tl.fromTo($('.og', el), { autoAlpha: 0, scale: .7 }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)' });
      FX.fade(tl, $('.og2', el), .3);
      tl.fromTo($('.face.no', el), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: .5, ease: 'power3.out' }, .2);
      tl.to($('.face.no', el), { keyframes: { x: [0, -14, 14, -12, 12, -6, 0] }, duration: .7, ease: 'none' }, .75);
      tl.fromTo($('.stamp', el), { autoAlpha: 0, scale: 2.8, rotation: -25 }, { autoAlpha: 1, scale: 1, rotation: -8, duration: .32, ease: 'power4.in' }, 1.35);
      tl.to($('.meme', el), { keyframes: { x: [0, 10, -8, 5, 0], y: [0, 6, -4, 2, 0] }, duration: .3, ease: 'none' }, 1.67);
      tl.to($('.og', el), { opacity: .45, duration: .4 }, 1.7);
    },
    (el, tl) => {
      tl.fromTo($('.yes1', el), { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'expo.out' });
      tl.fromTo($('.yes2', el), { autoAlpha: 0, letterSpacing: '0em' }, { autoAlpha: 1, letterSpacing: '.2em', duration: 1.2, ease: 'expo.out' }, .25);
      tl.fromTo($('.face.yes', el), { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: .55, ease: 'power4.out' }, .3);
      tl.fromTo($$('.sparkle', el), { autoAlpha: 0, scale: 0, rotation: -90 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: .5, ease: 'back.out(3)', stagger: .1 }, .6);
      tl.to($$('.sparkle', el), { autoAlpha: 0, scale: .4, duration: .5, stagger: .1 }, 1.6);
      tl.to($('.glow', el), { opacity: 1, duration: 1.2, ease: 'power2.out' }, .3);
    },
    (el, tl) => {
      tl.to($('.ttl', el), { autoAlpha: 0, y: -40, duration: .6, ease: 'power2.in' });
      tl.to($('.meme', el), { x: -900, y: 0, scale: .78, rotation: -2, duration: 1.3, ease: 'expo.inOut' }, .1);
      tl.to($('.glow', el), { x: -900, scale: .8, duration: 1.3, ease: 'expo.inOut' }, .1);
      FX.up(tl, $$('.exp .card', el), .9, { stagger: .2 });
    },
    (el, tl) => {
      FX.rise(tl, $('.final .disp', el), 0);
      FX.fill(tl, $$('.final .sk', el), .9, { dur: 1.2 });
      FX.fade(tl, $('.final .small', el), 1.4);
    },
  ],
  notes: 'Meme! Yang ditertawakan adalah KATA "orang gila", bukan orangnya. "Orang gila" menjadikan gila sebagai jati diri; "orang dengan gangguan jiwa" menempatkannya sebagai kondisi, seperti orang dengan diabetes. Bahasa membentuk sikap.',
});
