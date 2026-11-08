import { defineSlide, type SlideEl, type Timeline } from '../types';
import { FX, $, $$, gsap, quoteWords, mmss } from '../fx';
import { QUOTES } from '../data/subs';
import './31-kutipan-kunci.css';

/* ---------------- S31 · Kutipan kunci ----------------
   Teks, pembicara, dan makna diatur di tools/subtitle/config.ts; menitnya diambil dari SRT. */
const N = QUOTES.length;

function showQ(el: SlideEl, tl: Timeline, k: number, at: number) {
  const w = $$(`.q${k} .qt .w`, el);
  tl.from(w, { autoAlpha: 0, y: 30, filter: 'blur(10px)', duration: .6, ease: 'power3.out', stagger: .12 }, at);
  FX.fade(tl, $(`.q${k} .who`, el), at + w.length * .12 + .2);
  tl.fromTo($(`.q${k} .mean`, el), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: .6 }, at + w.length * .12 + .5);
}

export default defineSlide({
  id: 's31', act: 6, title: 'Kutipan kunci', bg: '#1c1c1f',
  orbs: [[1500, 720, 1000, '#B85A9C', .35], [380, 300, 800, '#F0A04B', .3]],
  html: `<div class="qm">“</div><div class="ctr">1 / ${N}</div>
    <div class="kicker pre" style="position:absolute;left:260px;top:250px"><b>06</b><span>Studi kasus · kutipan kunci</span></div>
    ${QUOTES.map((q, k) => `<div class="qwrap q${k}"><div class="qt">${quoteWords('“' + q.teks + '”')}</div><div class="who pre">— ${q.siapa} · menit ${mmss(q.t)}</div><div class="mean pre"><i></i>${q.makna}</div></div>`).join('')}`,
  init(el) { gsap.set($$('.qwrap', el).slice(1), { autoAlpha: 0 }); },
  intro(el, tl) {
    tl.from($('.qm', el), { autoAlpha: 0, scale: .6, rotation: -10, duration: 1.4, ease: 'expo.out' }, 0);
    FX.fade(tl, $('.kicker', el), .2);
    showQ(el, tl, 0, .5);
  },
  steps: QUOTES.slice(1).map((_, i) => (el, tl) => {
    const k = i + 1;
    tl.to($(`.q${k - 1}`, el), { autoAlpha: 0, y: -40, filter: 'blur(10px)', duration: .6, ease: 'power2.in' });
    tl.set($(`.q${k}`, el), { autoAlpha: 1 });
    tl.call(() => { $('.ctr', el).textContent = `${k + 1} / ${N}`; });
    tl.fromTo($('.qm', el), { rotation: 0 }, { rotation: 8, duration: .6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
    showQ(el, tl, k, .5);
  }),
  notes: 'Bacakan pelan. Setiap kutipan menunjukkan satu masalah: tidak mengenali gejala, keterbatasan layanan, penolakan obat, dampak pada anak.',
});
