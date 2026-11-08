import { gsap } from 'gsap';
import { H, W } from '../config';
import { $ } from '../fx/dom';
import type { SlideDef } from '../types';
import { buildOverview } from './chrome';
import { go, mountSlides } from './deck';
import { bindInput } from './input';
import { setupOrbs } from './orbs';
import { DECK } from './state';

/* Alat uji (hanya build dev):
   ?tick  paksa animasi berjalan walau jendela tersembunyi (rAF dijeda)
   ?shot  panggung ditempel di pojok kiri atas, diskalakan 1/devicePixelRatio (untuk screenshot) */
const params = new URLSearchParams(location.search);
const SHOT = __DEV__ && params.has('shot');

function fit(stage: HTMLElement) {
  const s = Math.min(innerWidth / W, innerHeight / H) * (SHOT ? 1 / devicePixelRatio : 1);
  const x = SHOT ? 0 : (innerWidth - W * s) / 2, y = SHOT ? 0 : (innerHeight - H * s) / 2;
  stage.style.transform = `translate(${x}px,${y}px) scale(${s})`;
  DECK.scale = s;
}

const FONTS = ['900 100px Archivo', '400 20px Montserrat', '600 20px Montserrat', '700 20px Montserrat', '800 20px Montserrat', 'italic 400 20px Montserrat', 'italic 600 20px Montserrat'];

export async function boot(slides: SlideDef[]) {
  // tunggu font: svgText mengukur huruf
  await Promise.all(FONTS.map(f => document.fonts.load(f))).catch(() => {});
  await document.fonts.ready;

  const stage = $('#stage');
  fit(stage);
  addEventListener('resize', () => fit(stage));
  setupOrbs();
  mountSlides(slides);
  buildOverview();
  bindInput(stage);

  if (__DEV__) {
    if (params.has('tick')) setInterval(() => gsap.ticker.tick(), 16);
    Object.assign(window, {
      DECK,
      gsap,
      /** DECK.test(29, 1): lompat ke slide 29 langkah 1, tunggu animasi selesai */
      test: async (n: number, s = 99, wait = 1600) => {
        go(n - 1, Math.min(s, (slides[n - 1].steps || []).length), 'instant');
        await new Promise(r => setTimeout(r, wait));
        return `${DECK.i + 1}.${DECK.step}`;
      },
    });
  }

  const m = /^#(\d+)(?:\.(\d+))?/.exec(location.hash);
  if (m) go(+m[1] - 1, +(m[2] || 0), 'instant');
  else go(0, 0, 'fwd');
  gsap.to('#hint', { autoAlpha: 0, delay: 6, duration: 1 });
}
