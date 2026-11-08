import { defineSlide } from '../types';
import { FX, $ } from '../fx';
import { INFO as I } from '../data/info';
import './01-cover.css';

/* ---------------- S01 · Cover ---------------- */
export default defineSlide({
  id: 's01', cls: 'cover', act: 0, title: 'Cover', hud: false,
  bg: '#5b5b60',
  orbs: [[230, 380, 1600, '#A3A3A8', .95], [960, 620, 1250, '#D9283F', .9], [1720, 420, 1500, '#2F6FD6', .95], [1200, 980, 900, '#B85A9C', .55]],
  html: `<div class="black"></div><div class="dot"></div>
    <div class="big"><svg class="sw"><text font-size="400" y="0">ODGJ</text></svg></div>
    <div class="full pre">Orang Dengan Gangguan Jiwa</div>
    <div class="tag pre">Memandang manusia, bukan labelnya.</div>
    <div class="meta-l pre">${I.matkul}<br>${I.tahun}</div>
    <div class="meta-r pre">Dipresentasikan oleh<b>${I.kelompok}</b>Dosen: ${I.dosen}</div>`,
  init(el) { el._t = FX.svgText($('svg', el)); },
  intro(el, tl) {
    const dot = $('.dot', el), black = $('.black', el);
    tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: .6, ease: 'back.out(3)' })
      .to(dot, { scale: 1.25, duration: .5, yoyo: true, repeat: 1, ease: 'sine.inOut' })
      .to(dot, { scale: 95, duration: 1.5, ease: 'expo.in' })
      .to(black, { autoAlpha: 0, duration: 1, ease: 'power2.out' }, '-=.5')
      .set(dot, { autoAlpha: 0 });
    FX.draw(tl, el._t, '-=.4', { dur: 2.4, stagger: .22, len: 2600 });
    tl.fromTo($('.full', el), { autoAlpha: 0, letterSpacing: '.08em' }, { autoAlpha: 1, letterSpacing: '.5em', duration: 1.8, ease: 'expo.out' }, '-=1.2');
    FX.fade(tl, $('.tag', el), '-=1', { duration: 1.2 });
    tl.fromTo($('.meta-r', el), { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, '-=.7');
    tl.fromTo($('.meta-l', el), { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, '<');
  },
  notes: 'Pembukaan. Perkenalkan kelompok. Tekankan judulnya: kita akan belajar memandang manusia, bukan labelnya. Huruf ODGJ sengaja berongga — nanti terisi di akhir.',
});
