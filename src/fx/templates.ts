/* Potongan HTML yang dipakai banyak slide. */
import type { SlideEl, Timeline } from '../types';
import { fade, rise, up } from './anim';
import { $ } from './dom';

/** header standar: kicker (nomor bab + label) dan judul display */
export const HD = (n: string, label: string, title: string, size = 'h3', sub = '') =>
  `<header class="hd"><div class="kicker"><b>${n}</b><span>${label}</span></div><h2 class="disp ${size} ttl" style="margin-top:26px">${title}</h2>${sub ? `<p class="lead sub" style="margin-top:22px;max-width:1200px">${sub}</p>` : ''}</header>`;

/** animasi masuk header HD */
export function hdIn(el: SlideEl, tl: Timeline, at = 0) {
  fade(tl, $('.hd .kicker', el), at, { duration: 0.7 });
  rise(tl, $('.hd .ttl', el), at + 0.1);
  const s = el.querySelector('.hd .sub');
  if (s) up(tl, s, at + 0.45);
}

/** kalimat jadi <span class="w"> per kata; kata terakhir boleh diberi kelas tambahan */
export const quoteWords = (txt: string, last = '') =>
  txt.split(' ').map((w, k, a) => `<span class="w${k === a.length - 1 && last ? ' ' + last : ''}">${w}</span>`).join(' ');

/** tanda ≥ (tidak ada di subset font) */
export const GEQ = `<svg viewBox="0 0 100 100" style="height:.7em;width:.7em;vertical-align:-.02em;margin-right:.18em"><path d="M14 8 L86 36 L14 64 M14 92 H86" stroke="#fff" stroke-width="15" fill="none"/></svg>`;

export const ARROW = `<svg viewBox="0 0 40 40" width="38" height="38"><path d="M6 20 H32 M22 10 L32 20 L22 30" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const PERSON = `<svg viewBox="0 0 60 120"><circle cx="30" cy="17" r="15"/><path d="M6 120 V63 a24 24 0 0 1 48 0 V120 Z"/></svg>`;

/** detik -> m:ss */
export const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
