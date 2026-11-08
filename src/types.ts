/** Elemen <section> slide. Slide boleh menyimpan state sementara di elemen (mis. el._v untuk video). */
export type SlideEl = HTMLElement & { [state: `_${string}`]: any };

export type Timeline = gsap.core.Timeline;

/** Orb latar: [x, y, diameter, warna, opacity]. Koordinat panggung 1920×1080. */
export type Orb = readonly [x: number, y: number, size: number, color: string, opacity?: number];

/** Satu langkah build: menambahkan tween ke timeline yang diberikan. */
export type Build = (el: SlideEl, tl: Timeline) => void;

/** 'fwd' = maju dengan animasi; 'instant' = langsung ke keadaan akhir (mundur, lompat). */
export type Mode = 'fwd' | 'instant';

/** Indeks babak 0–9, lihat ACTS di config.ts. */
export type Act = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface SlideDef {
  id: string;
  act: Act;
  title: string;
  html: string;
  /** kelas CSS slide; default = id */
  cls?: string;
  notes?: string;
  /** false = sembunyikan HUD & progress */
  hud?: boolean;
  /** slide pembatas bab: tidak memakai transisi angka bab */
  divider?: boolean;
  bg?: string;
  orbs?: Orb[];
  /** durasi morph orb (detik) */
  morph?: number;
  grain?: number;
  vignette?: number;
  /** dipanggil setelah HTML dipasang, sebelum animasi dibuat */
  init?: (el: SlideEl) => void;
  intro?: Build;
  steps?: Build[];
  /** dipanggil setelah slide tampil */
  enter?: (el: SlideEl, mode: Mode) => void;
  /** dipanggil sebelum slide ditinggalkan / dibangun ulang */
  leave?: (el: SlideEl) => void;
  /** true = tombol sudah ditangani slide */
  key?: (e: KeyboardEvent, el: SlideEl) => boolean;
  /** true = klik sudah ditangani slide */
  click?: (e: MouseEvent, el: SlideEl) => boolean;
}

export const defineSlide = (def: SlideDef): SlideDef => def;

/** Satu baris subtitle: w = [waktu mulai kata (detik), kata]. */
export interface Sub {
  id: number;
  s: number;
  e: number;
  sp: 'P' | 'N';
  w: [number, string][];
}

export interface Segment {
  t: number;
  label: string;
  q: string;
}

export interface Quote {
  t: number;
  teks: string;
  siapa: string;
  makna: string;
}
