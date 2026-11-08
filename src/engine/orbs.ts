import { gsap } from 'gsap';
import { $ } from '../fx/dom';
import type { SlideDef } from '../types';
import { DECK } from './state';

const COUNT = 5;

/** Buat orb latar yang terus melayang pelan. */
export function setupOrbs() {
  const box = $('#orbs');
  for (let k = 0; k < COUNT; k++) {
    const o = document.createElement('div');
    o.className = 'orb';
    const inner = document.createElement('div');
    inner.className = 'orb-i';
    o.appendChild(inner);
    box.appendChild(o);
    DECK.orbs.push(o);
    gsap.set(o, { x: 960, y: 540, scale: 0.5 });
    gsap.to(inner, {
      x: 'random(-90,90)', y: 'random(-70,70)', scale: 'random(.86,1.14)', duration: 'random(16,30)',
      ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true, delay: -k * 3,
    });
  }
}

/** Pindahkan orb, warna latar, vignette, dan grain ke konfigurasi slide berikutnya. */
export function morph(def: SlideDef, dur: number) {
  const cfg = def.orbs || [];
  DECK.orbs.forEach((o, k) => {
    const c = cfg[k];
    if (c) gsap.to(o, { x: c[0], y: c[1], scale: c[2] / 1000, color: c[3], opacity: c[4] ?? 0.9, duration: dur, ease: 'expo.inOut', overwrite: 'auto' });
    else gsap.to(o, { opacity: 0, duration: dur * 0.8, ease: 'power2.inOut', overwrite: 'auto' });
  });
  gsap.to('#bg', { backgroundColor: def.bg || '#2B2B2D', duration: dur, ease: 'power2.inOut', overwrite: 'auto' });
  gsap.to('#vignette', { opacity: def.vignette ?? 1, duration: dur });
  gsap.to('#grain', { opacity: def.grain ?? 0.17, duration: dur });
}
