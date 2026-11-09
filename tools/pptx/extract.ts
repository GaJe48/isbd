/* Jalan di BROWSER: membaca keadaan DOM slide per langkah klik menjadi data netral
   (kotak, teks, warna, gradien) untuk tools/pptx/build.ts. Disuntikkan oleh tools/pptx/export.ts
   sebagai window.PPTX. Elemen yang tidak bisa ditiru DrawingML (SVG, canvas, filter, mask, rotasi, ...)
   ditandai sebagai `pic`; export.ts memotretnya terpisah (lihat isolate()). */
import type { Fill, Para, Run, Rgba, Shape, SlideData } from './types';

type Anim = { pause: (t?: number) => void; repeat: () => number; progress: (v?: number) => number; kill: () => void };
type Def = { steps?: unknown[] };
type Win = Window & {
  DECK: { scale: number; i: number; step: number; slides: Def[]; loops: Anim[] };
  gsap: { killTweensOf: (t: unknown) => void; set: (t: unknown, v: object) => void };
  test: (n: number, s?: number, wait?: number) => Promise<string>;
};
const W = window as unknown as Win;

const px = (v: string) => parseFloat(v) || 0;

/** "rgb(1, 2, 3)" / "rgba(1, 2, 3, .5)" -> [r,g,b,a] */
function rgba(c: string): Rgba | null {
  const m = /rgba?\(([^)]+)\)/.exec(c);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return a > 0.003 ? [r, g, b, a] : null;
}

/** pisah argumen di koma tingkat atas: "100deg, rgb(1, 2, 3), rgb(4, 5, 6) 50%" */
function topSplit(s: string) {
  const out: string[] = [];
  let depth = 0, cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && !depth) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function stopsOf(parts: string[]): [number, Rgba][] {
  return parts.map((p, k) => {
    const pos = /\s([\d.]+)%$/.exec(p);
    const c = rgba(p) || [0, 0, 0, 0];
    return [pos ? +pos[1] / 100 : k / Math.max(1, parts.length - 1), c];
  });
}

/** satu lapis linear-/radial-gradient dari computed style -> Fill (null kalau bentuk lain) */
function gradient(bg: string): Fill | null {
  const lin = /^linear-gradient\((.*)\)$/.exec(bg.trim());
  if (lin) {
    const parts = topSplit(lin[1]);
    let ang = 180;
    if (/deg$/.test(parts[0])) ang = parseFloat(parts.shift()!);
    else if (/^to /.test(parts[0])) {
      const d = parts.shift()!;
      ang = { 'to top': 0, 'to right': 90, 'to bottom': 180, 'to left': 270 }[d] ?? 180;
    }
    return { kind: 'lin', ang, stops: stopsOf(parts) };
  }
  const rad = /^radial-gradient\((.*)\)$/.exec(bg.trim());
  if (rad) {
    const parts = topSplit(rad[1]);
    let closest = false;
    if (!rgba(parts[0])) {
      const d = parts.shift()!;
      // hanya gradien berpusat di tengah yang bisa ditiru
      if (/ at /.test(` ${d}`) && !/at (center|50% 50%)$/.test(d)) return null;
      closest = /closest-side/.test(d);
    }
    return { kind: 'rad', stops: stopsOf(parts), ...(closest && { closest }) };
  }
  return null;
}

const withAlpha = (c: Rgba, op: number): Rgba => [c[0], c[1], c[2], c[3] * op];
const fillAlpha = (f: Fill, op: number): Fill =>
  f.kind === 'solid' ? { kind: 'solid', c: withAlpha(f.c, op) } : { ...f, stops: f.stops.map(([p, c]) => [p, withAlpha(c, op)]) };

let stage: DOMRect;
const toStage = (r: DOMRect) => {
  const s = W.DECK.scale;
  return { x: (r.left - stage.left) / s, y: (r.top - stage.top) / s, w: r.width / s, h: r.height / s };
};
const box = (el: Element) => toStage(el.getBoundingClientRect());
/** skala transform elemen (mis. gsap scale) relatif ke panggung */
const scaleOf = (el: HTMLElement) => (el.offsetWidth ? el.getBoundingClientRect().width / W.DECK.scale / el.offsetWidth : 1);

const visible = (cs: CSSStyleDeclaration) => cs.display !== 'none' && cs.visibility !== 'hidden';
const isAbs = (el: Element) => ['absolute', 'fixed'].includes(getComputedStyle(el).position);
const MEDIA = /^(svg|canvas|img|video)$/i;
const textClip = (cs: CSSStyleDeclaration) => cs.getPropertyValue('-webkit-background-clip') === 'text' || cs.backgroundClip === 'text';

/** blok teks = isi langsung berupa teks dan elemen inline saja */
function isTextBlock(el: HTMLElement) {
  const kids = [...el.children].filter(k => !isAbs(k));
  // inline-block ikut dianggap inline: sisa pecahan SplitText (div per huruf/kata)
  if (kids.some(k => !/^inline(-block)?$/.test(getComputedStyle(k).display) && k.tagName !== 'BR')) return false;
  return [...el.childNodes].some(n => (n.nodeType === 3 ? n.textContent!.trim() : n.nodeType === 1 && !isAbs(n as Element) && !MEDIA.test((n as Element).tagName) && (n as Element).textContent!.trim()));
}

/* ---------- yang tidak bisa ditiru DrawingML -> dipotret jadi PNG ---------- */
const IDENTITY = /^(blur\(0px\)|brightness\(1\)|contrast\(1\)|grayscale\(0\)|saturate\(1\)|sepia\(0\)|invert\(0\)|opacity\(1\)|hue-rotate\(0deg\))$/;
const fns = (s: string) => s.match(/[\w-]+\((?:[^()]|\([^()]*\))*\)/g) || [];
/** filter yang benar-benar mengubah gambar (gsap meninggalkan blur(0px) setelah animasi) */
const realFilter = (f: string) => f !== 'none' && fns(f).some(fn => !IDENTITY.test(fn) && !/^drop-shadow\(rgba\(\d+, \d+, \d+, 0\)/.test(fn));
const nums = (s: string) => [...s.matchAll(/(-?[\d.]+)px/g)].map(x => Math.abs(+x[1]));
/** margin potret untuk efek yang meluber keluar kotak */
function bleed(cs: CSSStyleDeclaration) {
  let m = 4;
  for (const fn of fns(cs.filter)) {
    const n = nums(fn);
    if (/^blur/.test(fn)) m += (n[0] || 0) * 2;
    if (/^drop-shadow/.test(fn)) m += (n[2] || 0) * 2 + Math.max(n[0] || 0, n[1] || 0);
  }
  for (const sh of cs.boxShadow === 'none' ? [] : cs.boxShadow.split(/,(?![^(]*\))/)) {
    const n = nums(sh);
    m = Math.max(m, (n[2] || 0) + (n[3] || 0) + Math.max(n[0] || 0, n[1] || 0));
  }
  return m;
}
function needsPic(el: Element, cs: CSSStyleDeclaration) {
  if (MEDIA.test(el.tagName)) return true;
  if (realFilter(cs.filter)) return true;
  if ((cs.getPropertyValue('mask-image') || cs.getPropertyValue('-webkit-mask-image') || 'none') !== 'none') return true;
  if (cs.clipPath !== 'none') return true;
  if (cs.backgroundImage !== 'none' && !textClip(cs)) {
    const layers = topSplit(cs.backgroundImage);
    if (layers.length > 1 || !gradient(layers[0])) return true;
  }
  const m = /^matrix\(([^)]+)\)/.exec(cs.transform);
  if (m) { const [, b, c] = m[1].split(',').map(Number); if (Math.abs(b) > 1e-3 || Math.abs(c) > 1e-3) return true; }
  if (/matrix3d/.test(cs.transform)) return true;
  const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
  if (radii.some(r => r !== radii[0]) && (rgba(cs.backgroundColor) || cs.backgroundImage !== 'none' || px(cs.borderTopWidth))) return true;
  if (/dashed|dotted|double/.test(cs.borderStyle) && px(cs.borderTopWidth)) return true;
  return false;
}

let picN = 0;
function pic(el: Element, name: string): Shape {
  const id = String(++picN);
  el.setAttribute('data-pptx', id);
  const b = box(el), m = bleed(getComputedStyle(el));
  // potong ke panggung
  const x = Math.max(0, b.x - m), y = Math.max(0, b.y - m);
  const shape: Shape = { name, x, y, w: Math.min(1920, b.x + b.w + m) - x, h: Math.min(1080, b.y + b.h + m) - y, rad: 0, pic: { id } };
  if (el.tagName === 'VIDEO') shape.video = true;
  return shape;
}

/** opacity span di dalam blok teks (mis. kata yang diredupkan), relatif ke akar blok */
let textRoot: HTMLElement | null = null;
function textOp(el: HTMLElement) {
  let o = 1;
  for (let p: HTMLElement | null = el; p && p !== textRoot; p = p.parentElement) o *= +getComputedStyle(p).opacity;
  return o;
}

/** gaya run dari elemen induk teks */
function runStyle(el: HTMLElement, op: number, k: number): Omit<Run, 't'> {
  const cs = getComputedStyle(el);
  const grad = textClip(cs) ? gradient(topSplit(cs.backgroundImage)[0] || '') : null;
  const sw = px(cs.getPropertyValue('-webkit-text-stroke-width'));
  const sc = rgba(cs.getPropertyValue('-webkit-text-stroke-color'));
  const o = op * textOp(el);
  return {
    font: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
    weight: +cs.fontWeight,
    italic: cs.fontStyle === 'italic',
    stretch: px(cs.fontStretch) || 100,
    size: px(cs.fontSize) * k,
    ls: px(cs.letterSpacing) * k,
    caps: cs.textTransform === 'uppercase',
    color: grad ? null : rgba(cs.color) && withAlpha(rgba(cs.color)!, o),
    grad: grad ? fillAlpha(grad, o) : undefined,
    // kotak acuan gradien (background-clip:text): kotak elemen, bukan kotak teks PowerPoint
    gbox: grad ? toStage(el.getBoundingClientRect()) : undefined,
    stroke: sw && sc ? { w: sw * k, c: withAlpha(sc, o) } : undefined,
  };
}

/** simpul teks yang tampil di dalam el. only: hanya di dalam simpul-simpul ini (grup inline);
    br: ikut kembalikan <br> (paragraf), kalau tidak simpul spasi saja dilewati */
function texts(el: HTMLElement, only?: Node[], br = false) {
  return document.createTreeWalker(el, NodeFilter.SHOW_TEXT | (br ? NodeFilter.SHOW_ELEMENT : 0), {
    acceptNode: n => {
      if (only && !only.some(o => o === n || o.contains(n))) return NodeFilter.FILTER_REJECT;
      if (n.nodeType === 1) return (n as Element).tagName === 'BR' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      for (let p = n.parentElement; p && p !== el; p = p.parentElement) {
        const ps = getComputedStyle(p);
        if (isAbs(p) || !visible(ps) || +ps.opacity < 0.02 || MEDIA.test(p.tagName)) return NodeFilter.FILTER_REJECT;
      }
      return br || n.textContent!.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
}

/** isi blok teks -> satu paragraf; '\n' menandai tempat browser memutus baris */
function paragraph(el: HTMLElement, op: number, only?: Node[]): Para {
  const cs = getComputedStyle(el), k = scaleOf(el);
  textRoot = el;
  const runs: Run[] = [];
  let lastMid: number | null = null, lastRight: number | null = null, firstLeft: number | null = null, pendingSpace = false, hard = false;
  // tinggi baris = yang terbesar di baris itu (span berhuruf besar di dalam blok berhuruf kecil menaikkan kotak baris)
  let lh = px(cs.lineHeight) || px(cs.fontSize) * 1.2;
  const walker = texts(el, only, true);
  const range = document.createRange();
  for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
    if (n.nodeType === 1) { hard = true; continue; } // <br>
    const st = runStyle(n.parentElement!, op, k);
    const pcs = getComputedStyle(n.parentElement!);
    if (n.data.trim()) lh = Math.max(lh, px(pcs.lineHeight) || px(pcs.fontSize) * 1.2);
    const data = n.data;
    if (/^\s/.test(data)) pendingSpace = true;
    for (const m of data.matchAll(/\S+/g)) {
      range.setStart(n, m.index!);
      range.setEnd(n, m.index! + m[0].length);
      const rects = range.getClientRects(), top = rects[0]?.top ?? 0, half = lh * W.DECK.scale * 0.5;
      let word = m[0];
      // browser memutus baris di dalam "kata" (sesudah tanda hubung): sisipkan putus di huruf yang turun baris
      if (rects.length > 1 && rects[rects.length - 1].top > top + half) {
        for (let j = 1; j < word.length; j++) {
          range.setStart(n, m.index! + j); range.setEnd(n, m.index! + j + 1);
          const r = range.getClientRects()[0];
          if (r && r.top > top + half) { word = word.slice(0, j) + '\n' + word.slice(j); break; }
        }
      }
      // baris baru dibandingkan lewat titik tengah huruf: teks kecil sebaris dengan teks besar (mis. "4" + "/ 1.000")
      // puncaknya lebih rendah, tapi tengahnya hampir sama
      const r0 = rects[0], rl = rects[rects.length - 1];
      const mid = r0 ? r0.top + r0.height / 2 : 0;
      const brk = lastMid !== null && mid > lastMid + half;
      // tanpa spasi di HTML tapi berjarak (margin antar-span, mis. kata per span): tetap dipisah spasi
      if (!brk && !pendingSpace && lastRight !== null && r0 && r0.left - lastRight > 0.15 * r0.height) pendingSpace = true;
      if (firstLeft === null && r0) firstLeft = r0.left;
      lastMid = rl ? rl.top + rl.height / 2 : mid;
      lastRight = rl ? rl.right : null;
      const sep = runs.length ? (hard ? String.fromCharCode(0x2028) : brk ? '\n' : pendingSpace ? ' ' : '') : '';
      hard = false;
      const prev = runs.at(-1);
      if (prev && JSON.stringify({ ...prev, t: '' }) === JSON.stringify({ ...st, t: '' })) prev.t += sep + word;
      else {
        if (prev && sep) prev.t += sep; // spasi/putus milik run sebelumnya
        runs.push({ ...st, t: word });
      }
      pendingSpace = /\s/.test(data[m.index! + m[0].length] ?? '') || false;
    }
    if (/\s$/.test(data)) pendingSpace = true;
  }
  textRoot = null;
  const align = ({ center: 'ctr', right: 'r', end: 'r' } as Record<string, Para['align']>)[cs.textAlign] || 'l';
  const para: Para = { runs, align, lh: lh * k, after: 0 };
  // bullet dari ::before berupa titik berwarna (li)
  const bs = getComputedStyle(el, '::before');
  if (el.tagName === 'LI' && bs.content !== 'none' && rgba(bs.backgroundColor)) {
    para.bullet = { c: withAlpha(rgba(bs.backgroundColor)!, op * +bs.opacity), size: px(bs.width) * k, indent: px(cs.paddingLeft) * k };
  } else if (!only && align === 'l' && firstLeft !== null && !/flex|grid/.test(cs.display)) {
    // huruf pertama tidak di tepi kiri isi (mis. ikon SVG inline "≥" di depan teks): jadi indentasi baris pertama
    const ind = (firstLeft - el.getBoundingClientRect().left) / W.DECK.scale - (px(cs.borderLeftWidth) + px(cs.paddingLeft)) * k;
    if (ind > 0.5) para.indent = ind;
  }
  return para;
}

function boxFill(cs: CSSStyleDeclaration, op: number): Fill | undefined {
  if (textClip(cs)) return undefined;
  const g = cs.backgroundImage !== 'none' ? gradient(topSplit(cs.backgroundImage)[0]) : null;
  if (g) return fillAlpha(g, op);
  const c = rgba(cs.backgroundColor);
  return c ? { kind: 'solid', c: withAlpha(c, op) } : undefined;
}

const SHADOW = /(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/;
function shadowOf(v: string, op: number, k: number): Shape['shadow'] {
  const s = SHADOW.exec(v.split(/,(?![^(]*\))/).find(s => !/inset/.test(s)) || '');
  return s && rgba(s[1]) ? { c: withAlpha(rgba(s[1])!, op), x: +s[2] * k, y: +s[3] * k, blur: +s[4] * k } : undefined;
}

type Box = { x: number; y: number; w: number; h: number };
/** kotak (isi, garis tepi, sudut, bayangan) -> Shape tanpa teks; garis tepi tak seragam jadi garis terpisah */
function boxShapes(cs: CSSStyleDeclaration, b: Box, name: string, op: number, k: number) {
  const fill = boxFill(cs, op);
  const bw = ['top', 'right', 'bottom', 'left'].map(s => px(cs.getPropertyValue(`border-${s}-width`)) * k);
  const bc = ['top', 'right', 'bottom', 'left'].map(s => rgba(cs.getPropertyValue(`border-${s}-color`)));
  const uniform = bw.every(w => w === bw[0]) && bc.every(c => JSON.stringify(c) === JSON.stringify(bc[0]));
  const r0 = cs.borderTopLeftRadius;
  const rad = Math.min(r0.endsWith('%') ? (parseFloat(r0) / 100) * Math.min(b.w, b.h) : px(r0) * k, b.w / 2, b.h / 2);
  const shape: Shape = { name, ...b, rad };
  if (fill) shape.fill = fill;
  if (uniform && bw[0] > 0 && bc[0]) shape.line = { w: bw[0], c: withAlpha(bc[0], op) };
  const sh = shadowOf(cs.boxShadow, op, k);
  if (sh) shape.shadow = sh;
  const lines: Shape[] = [];
  if (!uniform) bw.forEach((w, i) => {
    if (!w || !bc[i]) return;
    const c = withAlpha(bc[i]!, op);
    const [x1, y1, x2, y2] = [[b.x, b.y + w / 2, b.x + b.w, b.y + w / 2], [b.x + b.w - w / 2, b.y, b.x + b.w - w / 2, b.y + b.h], [b.x, b.y + b.h - w / 2, b.x + b.w, b.y + b.h - w / 2], [b.x + w / 2, b.y, b.x + w / 2, b.y + b.h]][i];
    lines.push({ name: `${name}-b${i}`, x: x1, y: y1, w: x2 - x1, h: y2 - y1, rad: 0, geom: 'line', line: { w, c, ...(/dashed|dotted/.test(cs.getPropertyValue(`border-${['top', 'right', 'bottom', 'left'][i]}-style`)) && { dash: true }) } });
  });
  return { shape, lines };
}

/** ::before / ::after berupa kotak hias (garis kicker, isian kalender, ...) */
function pseudo(el: HTMLElement, which: '::before' | '::after', name: string, op: number): Shape[] {
  const ps = getComputedStyle(el, which);
  if (ps.content === 'none' || ps.display === 'none' || ps.visibility === 'hidden') return [];
  if (el.tagName === 'LI' && which === '::before' && /^(UL|OL)$/.test(el.parentElement?.tagName || '')) return []; // jadi bullet asli
  const o = op * +ps.opacity;
  if (o < 0.02) return [];
  const cs = getComputedStyle(el), r = el.getBoundingClientRect(), k = scaleOf(el), s = W.DECK.scale;
  const left = (r.left - stage.left) / s, top = (r.top - stage.top) / s;
  let w = px(ps.width) * k, h = px(ps.height) * k, x: number, y: number;
  if (/absolute|fixed/.test(ps.position)) {
    // kotak acuan: padding box elemen induk (dianggap sudah diposisikan)
    x = left + (px(cs.borderLeftWidth) + px(ps.left) + px(ps.marginLeft)) * k;
    y = top + (px(cs.borderTopWidth) + px(ps.top) + px(ps.marginTop)) * k;
  } else if (/flex/.test(cs.display) && !/column/.test(cs.flexDirection)) {
    // item flex baris: letaknya sesudah anak dengan `order` lebih kecil (atau sama, untuk ::after)
    const kids = [...el.children].filter(c => !isAbs(c)) as HTMLElement[];
    const po = +ps.order, gap = px(cs.columnGap) * k;
    const before = kids.filter(c => { const o2 = +getComputedStyle(c).order; return o2 < po || (o2 === po && which === '::after'); });
    const ref = before.at(-1);
    x = ref ? box(ref).x + box(ref).w + gap : left + (px(cs.paddingLeft) + px(cs.borderLeftWidth)) * k;
    const ch = r.height / s - (px(cs.paddingTop) + px(cs.paddingBottom)) * k;
    y = top + px(cs.paddingTop) * k + (/center/.test(cs.alignItems) ? (ch - h) / 2 : 0);
  } else return [];
  // transform (mis. scaleY isian kalender) di sekitar transform-origin
  const m = /^matrix\(([^)]+)\)/.exec(ps.transform);
  if (m) {
    const [a, b, c, d, e, f] = m[1].split(',').map(Number);
    if (Math.abs(b) > 1e-3 || Math.abs(c) > 1e-3) return [];
    const [tox, toy] = ps.transformOrigin.split(' ').map(v => px(v) * k);
    x += tox * (1 - a) + e * k; y += toy * (1 - d) + f * k; w *= a; h *= d;
  }
  if (w < 0.5 || h < 0.5) return [];
  const bg = ps.backgroundImage !== 'none' ? topSplit(ps.backgroundImage) : [];
  if (bg.length > 1 || (bg.length && !gradient(bg[0]))) return [];
  const { shape, lines } = boxShapes(ps, { x, y, w, h }, `${name}${which}`, o, k);
  return shape.fill || shape.line || shape.shadow ? [shape, ...lines] : lines;
}

let shapes: Shape[] = [];

function walk(el: HTMLElement, name: string, parentOp: number) {
  const cs = getComputedStyle(el);
  if (cs.display === 'none') return;
  const op = parentOp * +cs.opacity;
  if (op < 0.02) return;
  // visibility:hidden tidak menurun kalau anak menyetel visible
  if (cs.visibility === 'hidden') { [...el.children].forEach((c, i) => walk(c as HTMLElement, `${name}.${i}`, op)); return; }
  const b = box(el), k = scaleOf(el);
  if (b.w < 0.5 || b.h < 0.5 || b.x > 1920 || b.y > 1080 || b.x + b.w < 0 || b.y + b.h < 0) {
    if (!['hidden', 'clip'].includes(cs.overflow)) [...el.children].forEach((c, i) => walk(c as HTMLElement, `${name}.${i}`, op));
    return;
  }

  if (needsPic(el, cs)) { shapes.push(pic(el, name)); return; }

  const { shape, lines } = boxShapes(cs, b, name, op, k);

  // daftar <ul>/<ol>: satu kotak teks, satu paragraf per <li>
  const lis = [...el.children] as HTMLElement[];
  const isList = /^(UL|OL)$/.test(el.tagName) && lis.length > 0 && lis.every(l => l.tagName === 'LI' && isTextBlock(l));
  if (isList || isTextBlock(el)) {
    const paras = isList ? lis.map(l => ({ ...paragraph(l, op), after: px(getComputedStyle(l).marginBottom) * k })) : [paragraph(el, op)];
    if (isList) paras.at(-1)!.after = 0;
    const ins = ['left', 'top', 'right', 'bottom'].map(s => (px(cs.getPropertyValue(`padding-${s}`)) + px(cs.getPropertyValue(`border-${s}-width`))) * k) as Shape['inset'];
    const center = /grid|flex/.test(cs.display) && /center/.test(cs.alignItems + cs.placeItems);
    // teks dipusatkan oleh grid/flex (mis. place-items:center), bukan text-align
    if (/grid|flex/.test(cs.display) && /center/.test(cs.justifyContent + cs.justifyItems)) paras.forEach(p => (p.align = 'ctr'));
    if (paras.some(p => p.runs.length)) {
      shape.text = { paras, anchor: center ? 'ctr' : 't' };
      shape.inset = ins;
      // kotak tanpa isi: efek bayangan PowerPoint jatuh ke hurufnya
      if (!shape.fill && !shape.line && cs.textShadow !== 'none') shape.shadow = shadowOf(cs.textShadow, op, k);
    }
  }
  if (shape.fill || shape.line || shape.text || shape.shadow) shapes.push(shape);
  shapes.push(...lines, ...pseudo(el, '::before', name, op));

  if (shape.text && !isList) {
    // turunan absolut (mis. garis coret .strike>i) dan media inline di dalam blok teks tetap digambar sendiri
    el.querySelectorAll<HTMLElement>('*').forEach((c, i) => {
      for (let p = c.parentElement; p && p !== el; p = p.parentElement) if (isAbs(p) || MEDIA.test(p.tagName)) return;
      if (isAbs(c)) walk(c, `${name}.a${i}`, op);
      else if (MEDIA.test(c.tagName)) shapes.push(pic(c, `${name}.m${i}`));
    });
  } else if (!isList) {
    // urutan gambar mengikuti tumpukan CSS: z-index negatif, lalu urutan DOM, lalu z-index positif
    const jobs: { z: number; run: () => void }[] = [];
    let group: Node[] = [], gi = 0;
    const flush = () => {
      const g = group, at = gi;
      if (g.some(n => n.nodeType === 3 && n.textContent!.trim())) jobs.push({ z: 0, run: () => inlineGroup(el, g, `${name}.t${at}`, op) });
      else g.forEach(n => { if (n.nodeType === 1) jobs.push({ z: 0, run: () => walk(n as HTMLElement, `${name}.${[...el.childNodes].indexOf(n as ChildNode)}`, op) }); });
      group = [];
    };
    [...el.childNodes].forEach((c, i) => {
      const e = c as HTMLElement;
      const inline = c.nodeType === 3 || (c.nodeType === 1 && !isAbs(e) && !MEDIA.test(e.tagName) && /^inline/.test(getComputedStyle(e).display)) || e.tagName === 'BR';
      if (inline) { if (!group.length) gi = i; group.push(c); return; }
      flush();
      if (c.nodeType !== 1) return;
      const cs2 = getComputedStyle(e);
      const z = cs2.position !== 'static' && cs2.zIndex !== 'auto' ? +cs2.zIndex : 0;
      jobs.push({ z, run: () => walk(e, `${name}.${i}`, op) });
    });
    flush();
    jobs.push({ z: 0.5, run: () => shapes.push(...pseudo(el, '::after', name, op)) }); // ::after di atas anak biasa
    jobs.map((j, k) => ({ ...j, k })).sort((x, y) => x.z - y.z || x.k - y.k).forEach(j => j.run());
    return;
  }
  shapes.push(...pseudo(el, '::after', name, op));
}

/** teks lepas di samping anak blok (mis. "Dipresentasikan oleh<b>…</b>Dosen: …" dengan b{display:block}):
    simpul teks + elemen inline yang berurutan jadi satu paragraf */
function inlineGroup(el: HTMLElement, n: Node[], name: string, op: number) {
  // kotak dari huruf pertama sampai huruf terakhir yang tampak: spasi di tepi (mis. &nbsp; di awal) tidak ikut
  // dibawa ke PowerPoint, jadi kalau kotaknya mulai dari spasi itu teks bergeser ke kiri
  const tw = texts(el, n), nodes: Text[] = [];
  for (let t = tw.nextNode() as Text | null; t; t = tw.nextNode() as Text | null) nodes.push(t);
  if (!nodes.length) return;
  const first = nodes[0], last = nodes.at(-1)!;
  const range = document.createRange();
  range.setStart(first, first.data.search(/\S/));
  range.setEnd(last, last.data.trimEnd().length);
  const rects = range.getClientRects();
  if (!rects.length) return;
  const r = toStage(range.getBoundingClientRect());
  const para = paragraph(el, op, n);
  if (!para.runs.length) return;
  // kotak Range = tinggi huruf; kotak teks PowerPoint = tinggi baris (setengah leading di atas dan bawah)
  const lead = (para.lh - rects[0].height / W.DECK.scale) / 2;
  const b = { x: r.x, y: r.y - lead, w: r.w, h: r.h + 2 * lead };
  shapes.push({ name, ...b, rad: 0, text: { paras: [para], anchor: 't' }, inset: [0, 0, 0, 0] });
}

/** orb latar: radial-gradient currentColor (lihat .orb-i di base.css) */
function orbs() {
  document.querySelectorAll<HTMLElement>('#orbs .orb').forEach((o, i) => {
    const op = +getComputedStyle(o).opacity;
    if (op < 0.02) return;
    const c = rgba(getComputedStyle(o).color)!;
    const stops: [number, number][] = [[0, 1], [0.38, 0.55], [0.68, 0.16], [1, 0]];
    shapes.push({ name: `orb${i}`, ...box(o.firstElementChild!), rad: 0, geom: 'ellipse', fill: { kind: 'rad', closest: true, stops: stops.map(([p, a]) => [p, [c[0], c[1], c[2], a * op]]) } });
  });
}

function snapshot(): SlideData {
  stage = document.querySelector('#stage')!.getBoundingClientRect();
  shapes = [];
  document.querySelectorAll('[data-pptx]').forEach(e => e.removeAttribute('data-pptx'));
  orbs();
  const vg = +getComputedStyle(document.querySelector('#vignette')!).opacity;
  if (vg > 0.02) shapes.push({ name: 'vignette', x: 0, y: 0, w: 1920, h: 1080, rad: 0, fill: { kind: 'rad', stops: [[0, [0, 0, 0, 0]], [0.55, [0, 0, 0, 0]], [1, [0, 0, 0, 0.38 * vg]]] } });
  const slide = document.querySelector<HTMLElement>('.slide.on')!;
  walk(slide, slide.id || 'slide', 1);
  walk(document.querySelector<HTMLElement>('#hud')!, 'hud', 1);
  walk(document.querySelector<HTMLElement>('#progress')!, 'progress', 1);
  return { id: `${W.DECK.i + 1}.${W.DECK.step}`, bg: rgba(getComputedStyle(document.querySelector('#bg')!).backgroundColor) || [43, 43, 45, 1], shapes };
}

/* ---------------- dipanggil dari export.ts ---------------- */

/** semua [slide, langkah]: langkah 0 (intro) sampai langkah terakhir */
const states = () => W.DECK.slides.flatMap((d, k) => Array.from({ length: (d.steps?.length || 0) + 1 }, (_, s) => [k + 1, s] as [number, number]));

/** gulungan daftar pustaka (S40) dipecah jadi halaman diam: indeks entri awal tiap halaman */
let rollPages: number[] = [];
function rollTo(roll: HTMLElement, page: number) {
  const kids = [...roll.children] as HTMLElement[];
  if (!page) {
    rollPages = [0];
    // area jelas di antara dua gradasi pudar (260px atas & bawah)
    for (let i = 0, start = 0; i < kids.length; i++) {
      if (kids[i].offsetTop + kids[i].offsetHeight - kids[start].offsetTop > 560) { rollPages.push(i); start = i; }
    }
  }
  roll.style.transform = `translateY(${270 - kids[rollPages[page]].offsetTop}px)`;
}

let frozen = false;
/** buka satu keadaan lalu baca DOM-nya. page: halaman ke-n daftar pustaka (tanpa memuat ulang slide) */
async function capture(n: number, s: number, wait = 1000, page = 0): Promise<SlideData & { pages?: number }> {
  if (!frozen) {
    // orb berhenti melayang supaya latar sama persis di semua langkah satu slide
    W.gsap.killTweensOf('.orb-i');
    W.gsap.set('.orb-i', { x: 0, y: 0, scale: 1 });
    document.documentElement.classList.add('pptx-export');
    frozen = true;
  }
  if (!page) await W.test(n, s, wait);
  const roll = document.querySelector<HTMLElement>('.slide.on .roll');
  // loop ambient (denyut, kedip) diam di keadaan awalnya
  for (const t of W.DECK.loops) { if (t.repeat() === -1) t.pause(0); else if (roll) t.kill(); else t.progress(1); }
  if (roll) rollTo(roll, page);
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  const d = snapshot();
  if (roll) return { ...d, id: `${d.id}p${page}`, pages: rollPages.length };
  return d;
}

/** sembunyikan semua kecuali elemen bertanda id (beserta isinya) untuk dipotret dengan latar transparan */
function isolate(id: string | null) {
  document.querySelectorAll('[data-pptx-iso]').forEach(e => e.removeAttribute('data-pptx-iso'));
  document.documentElement.classList.toggle('pptx-iso', !!id);
  if (id) document.querySelector(`[data-pptx="${id}"]`)!.setAttribute('data-pptx-iso', '');
}

const css = document.createElement('style');
css.textContent = `html.pptx-iso,html.pptx-iso body,html.pptx-iso #stage{background:transparent!important}
html.pptx-iso *{visibility:hidden!important}
html.pptx-iso [data-pptx-iso],html.pptx-iso [data-pptx-iso] *{visibility:visible!important}
html.pptx-export #grain,html.pptx-export .s29 .subs{display:none!important}`;
document.head.appendChild(css);

Object.assign(window, { PPTX: { states, capture, isolate } });
