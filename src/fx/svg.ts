import { $$ } from './dom';

/**
 * Sesuaikan viewBox <svg> dengan teks di dalamnya, dan (opsional) pecah teks jadi satu <text> per huruf
 * supaya garis tepinya bisa digambar bergantian. Harus dipanggil saat font sudah termuat.
 */
export function svgText(svg: SVGSVGElement, perChar = true): SVGTextElement[] {
  const t = svg.querySelector('text')!;
  if (perChar) {
    const str = t.textContent || '';
    const xs = [...str].map((_, k) => t.getStartPositionOfChar(k).x);
    const frag = document.createDocumentFragment();
    [...str].forEach((ch, k) => {
      if (ch === ' ') return;
      const c = t.cloneNode(false) as SVGTextElement;
      c.setAttribute('x', String(xs[k]));
      c.setAttribute('y', t.getAttribute('y') || '0');
      c.textContent = ch;
      frag.appendChild(c);
    });
    t.replaceWith(frag);
  }
  const bb = svg.getBBox(), pad = 12;
  svg.setAttribute('viewBox', `${bb.x - pad} ${bb.y - pad} ${bb.width + pad * 2} ${bb.height + pad * 2}`);
  return $$<SVGTextElement>('text', svg);
}
