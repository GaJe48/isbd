import type { Mode, SlideDef, SlideEl, Timeline } from '../types';

/** State bersama mesin presentasi. Fungsi navigasi diisi oleh deck.ts. */
export const DECK = {
  slides: [] as SlideDef[],
  i: -1,
  step: 0,
  tl: null as Timeline | null,
  /** tween ambient slide aktif, dimatikan saat pindah slide */
  loops: [] as gsap.core.Animation[],
  orbs: [] as HTMLElement[],
  el: null as unknown as SlideEl,
  scale: 1,
  /** true selama slide dibangun langsung ke keadaan akhir (mundur/lompat) */
  building: false,
  next: () => {},
  prev: () => {},
  go: (_idx: number, _step?: number, _mode?: Mode) => {},
};
