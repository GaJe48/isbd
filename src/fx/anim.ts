/* Animasi yang dipakai berulang oleh slide. */
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DECK } from '../engine/state';
import type { Timeline } from '../types';
import { $, $$ } from './dom';

gsap.registerPlugin(SplitText);

type Target = string | Element | Element[];
type At = gsap.Position;

const many = (t: Target): Element[] => (typeof t === 'string' ? $$(t, DECK.el) : ([] as Element[]).concat(t));
const one = (t: string | Element): Element => (typeof t === 'string' ? $(t, DECK.el) : t);

const nf: Record<number, Intl.NumberFormat> = {};
/** format angka Indonesia: 12,7 · 1.750 */
export const fmt = (v: number, dec = 0) =>
  (nf[dec] ||= new Intl.NumberFormat('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec })).format(v);

/** pecah ke huruf (dengan mask untuk mask-reveal) */
export const chars = (el: Element, mask = true) =>
  SplitText.create(el, { type: 'words,chars', mask: mask ? 'chars' : undefined, charsClass: 'ch' }).chars;

export const words = (el: Element, mask = false) =>
  SplitText.create(el, { type: 'words', mask: mask ? 'words' : undefined, wordsClass: 'w' }).words;

/** judul solid: huruf naik dari bawah mask */
export function rise(tl: Timeline, el: Target, at: At = '<', o: gsap.TweenVars = {}) {
  const els = many(el);
  els.forEach(e => gsap.set(e, { autoAlpha: 1 }));
  const c = els.flatMap(e => chars(e));
  tl.from(c, { yPercent: 118, duration: 0.9, ease: 'expo.out', stagger: 0.028, ...o }, at);
  return c;
}

/** kartu/blok: naik 40px + fade + blur */
export function up(tl: Timeline, el: Target, at: At = '<', o: gsap.TweenVars = {}) {
  const els = many(el);
  tl.fromTo(els, { autoAlpha: 0, y: 40, filter: 'blur(12px)' },
    { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.12, ...o }, at);
  return els;
}

export function fade(tl: Timeline, el: Target, at: At = '<', o: gsap.TweenVars = {}) {
  const els = many(el);
  tl.fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'power2.out', ...o }, at);
  return els;
}

/** kata per kata seperti ucapan */
export function speak(tl: Timeline, el: string | Element, at: At = '<', o: gsap.TweenVars = {}) {
  const e = one(el);
  gsap.set(e, { autoAlpha: 1 });
  const w = words(e);
  tl.from(w, { autoAlpha: 0, y: 24, filter: 'blur(8px)', duration: 0.55, ease: 'power3.out', stagger: 0.09, ...o }, at);
  return w;
}

export interface CountOpts { from?: number; dec?: number; pre?: string; suf?: string; dur?: number; ease?: string }
/** counter angka format Indonesia */
export function count(tl: Timeline, el: string | Element, to: number, o: CountOpts = {}, at: At = '<') {
  const e = one(el);
  const p = { v: o.from || 0 }, dec = o.dec || 0, pre = o.pre || '', suf = o.suf || '';
  const show = () => { e.textContent = pre + fmt(p.v, dec) + suf; };
  show();
  tl.to(p, { v: to, duration: o.dur || 1.6, ease: o.ease || 'power2.out', onUpdate: show }, at);
}

/** outline -> solid */
export function fill(tl: Timeline, el: Target, at: At = '<', o: { color?: string; dur?: number; stagger?: number } = {}) {
  tl.to(many(el), { color: o.color || 'rgba(255,255,255,1)', duration: o.dur || 1.2, ease: 'power2.inOut', stagger: o.stagger || 0 }, at);
}

/** coret garis merah (elemen .strike berisi <i>) */
export function strike(tl: Timeline, el: Target, at: At = '<', o: { dur?: number; stagger?: number } = {}) {
  const lines = many(el).map(e => e.querySelector(':scope > i') || e.appendChild(document.createElement('i')));
  tl.to(lines, { scaleX: 1, duration: o.dur || 0.6, ease: 'power3.inOut', stagger: o.stagger || 0 }, at);
}

/** gambar garis tepi teks SVG */
export function draw(tl: Timeline, texts: Element[], at: At = '<', o: { len?: number; dur?: number; ease?: string; stagger?: number } = {}) {
  const L = o.len || 3000;
  tl.fromTo(texts, { strokeDasharray: L, strokeDashoffset: L },
    { strokeDashoffset: 0, duration: o.dur || 1.8, ease: o.ease || 'power2.inOut', stagger: o.stagger ?? 0.16 }, at);
}

/** loop ambient (dimatikan otomatis saat pindah slide) */
export function loop<T extends gsap.core.Animation>(tw: T): T {
  DECK.loops.push(tw);
  return tw;
}

/** orb latar ke-i (untuk dianimasikan slide) */
export const orb = (i: number) => DECK.orbs[i];
