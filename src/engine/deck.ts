/* Navigasi: build-per-klik, maju/mundur, transisi antar-slide dan antar-bab. */
import { gsap } from 'gsap';
import { ACTS } from '../config';
import { $ } from '../fx/dom';
import type { Mode, SlideDef, SlideEl } from '../types';
import { updateChrome } from './chrome';
import { morph } from './orbs';
import { DECK } from './state';

let slidesEl: HTMLElement;
let wipe: HTMLElement;

export function mountSlides(slides: SlideDef[]) {
  DECK.slides = slides;
  slidesEl = $('#slides');
  wipe = $('#wipe');
  slides.forEach(() => {
    const s = document.createElement('section');
    s.className = 'slide';
    slidesEl.appendChild(s);
  });
}

const slideEl = (k: number) => slidesEl.children[k] as SlideEl;

/** Pasang ulang HTML slide (menghapus semua state animasi sebelumnya). */
function reset(k: number): SlideEl {
  const def = DECK.slides[k], el = slideEl(k);
  gsap.killTweensOf(el);
  gsap.set(el, { clearProps: 'all' });
  el.innerHTML = def.html;
  el.className = 'slide on ' + (def.cls || def.id);
  const cc = el.querySelectorAll('.cc'), cx = el.querySelectorAll('.cx');
  if (cc.length) gsap.set(cc, { xPercent: -50, yPercent: -50 });
  if (cx.length) gsap.set(cx, { xPercent: -50 });
  return el;
}

function killLoops() {
  DECK.loops.forEach(t => t.kill());
  DECK.loops = [];
}

/** Timeline berisi intro + langkah 0..upto-1. */
function buildTo(def: SlideDef, el: SlideEl, upto: number) {
  const tl = gsap.timeline();
  if (def.intro) { const t = gsap.timeline(); def.intro(el, t); tl.add(t); }
  for (let k = 0; k < upto; k++) { const t = gsap.timeline(); def.steps![k](el, t); tl.add(t); }
  return tl;
}

export function go(idx: number, step = 0, mode: Mode = 'fwd') {
  idx = Math.max(0, Math.min(DECK.slides.length - 1, idx));
  const def = DECK.slides[idx], prevIdx = DECK.i, prevDef = DECK.slides[prevIdx];
  DECK.tl?.progress(1);
  killLoops();
  prevDef?.leave?.(slideEl(prevIdx));
  if (prevDef && prevIdx !== idx) {
    const pel = slideEl(prevIdx);
    const clear = () => { pel.className = 'slide'; pel.innerHTML = ''; };
    if (mode === 'instant') clear();
    else gsap.to(pel, {
      autoAlpha: 0, scale: 0.985, filter: 'blur(10px)', duration: 0.45, ease: 'power2.in',
      onComplete: () => { if (DECK.i !== prevIdx) { clear(); gsap.set(pel, { clearProps: 'all' }); } },
    });
  }
  const same = prevIdx === idx;
  DECK.i = idx;
  DECK.step = step;
  const el = reset(idx);
  DECK.el = el;
  def.init?.(el);
  if (!same) morph(def, mode === 'instant' ? 0.5 : def.morph || 1.4);

  DECK.building = mode === 'instant' || same;
  const tl = buildTo(def, el, step);
  if (DECK.building) {
    tl.progress(1);
    DECK.building = false;
  } else {
    tl.pause(0);
    if (prevDef && def.act !== prevDef.act && !def.divider && idx > prevIdx) chapterWipe(def.act);
    gsap.delayedCall(prevDef ? 0.38 : 0.05, () => { tl.play(); });
  }
  DECK.tl = tl;
  def.enter?.(el, mode);
  updateChrome();
}

/** Transisi antar-bab: angka bab raksasa melintas. */
function chapterWipe(act: number) {
  const a = ACTS[act];
  $('.wn', wipe).textContent = a.n;
  $('.wl', wipe).textContent = a.name;
  gsap.timeline()
    .set(wipe, { opacity: 1 })
    .fromTo('#wipe .wn', { x: 1500 }, { x: -1500, duration: 1.7, ease: 'power3.inOut' }, 0)
    .fromTo('#wipe .wl', { opacity: 0, letterSpacing: '.2em' }, { opacity: 1, letterSpacing: '.7em', duration: 0.7, yoyo: true, repeat: 1, repeatDelay: 0.2, ease: 'power2.out' }, 0.1)
    .set(wipe, { opacity: 0 });
}

export function next() {
  const def = DECK.slides[DECK.i];
  if (DECK.tl?.isActive()) { DECK.tl.progress(1); return; }
  if (def.steps && DECK.step < def.steps.length) {
    const t = gsap.timeline();
    def.steps[DECK.step](DECK.el, t);
    DECK.step++;
    DECK.tl = t;
    updateChrome();
  } else if (DECK.i < DECK.slides.length - 1) go(DECK.i + 1, 0, 'fwd');
}

export function prev() {
  if (DECK.step > 0) go(DECK.i, DECK.step - 1, 'instant');
  else if (DECK.i > 0) go(DECK.i - 1, (DECK.slides[DECK.i - 1].steps || []).length, 'instant');
}

DECK.next = next;
DECK.prev = prev;
DECK.go = go;
