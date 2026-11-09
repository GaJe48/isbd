/* Data netral antara extract.ts (browser) dan build.ts (penulis PPTX). Satuan: px kanvas 1920×1080. */
export type Rgba = [r: number, g: number, b: number, a: number];

export type Fill =
  | { kind: 'solid'; c: Rgba }
  /** ang: sudut CSS (0 = ke atas, 90 = ke kanan) */
  | { kind: 'lin'; ang: number; stops: [pos: number, c: Rgba][] }
  /** closest: ukuran closest-side (default CSS farthest-corner = perilaku PowerPoint) */
  | { kind: 'rad'; stops: [pos: number, c: Rgba][]; closest?: boolean };

export interface Run {
  t: string;
  font: string; weight: number; italic: boolean; stretch: number;
  size: number; ls: number; caps: boolean;
  color: Rgba | null; grad?: Fill; gbox?: { x: number; y: number; w: number; h: number }; stroke?: { w: number; c: Rgba };
}

export interface Para {
  runs: Run[];
  align: 'l' | 'ctr' | 'r';
  /** tinggi baris dan jarak setelah paragraf */
  lh: number; after: number;
  /** indentasi baris pertama (px) */
  indent?: number;
  bullet?: { c: Rgba; size: number; indent: number };
}

export interface Shape {
  name: string;
  x: number; y: number; w: number; h: number;
  /** radius sudut (px) */
  rad: number;
  geom?: 'ellipse' | 'line';
  fill?: Fill;
  line?: { w: number; c: Rgba; dash?: boolean };
  shadow?: { c: Rgba; x: number; y: number; blur: number };
  text?: { paras: Para[]; anchor: 't' | 'ctr' };
  /** padding [kiri, atas, kanan, bawah] */
  inset?: [number, number, number, number];
  /** gambar hasil potret elemen (SVG, canvas, filter, mask, ...): id elemen di halaman, lalu nama file PNG */
  pic?: { id: string; file?: string };
  /** elemen <video>: pic = poster, video ditanam oleh build.ts */
  video?: boolean;
}

export interface SlideData { id: string; bg: Rgba; shapes: Shape[] }
