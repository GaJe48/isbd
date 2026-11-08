import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './12-skizofrenia.css';

/* ---------------- S12 · Skizofrenia ---------------- */
const bars = Array.from({ length: 11 }, (_, k) => `<rect x="${k * 26}" y="${60 - [14, 30, 48, 22, 56, 36, 50, 18, 42, 26, 12][k] / 2 * 2}" width="14" height="${[14, 30, 48, 22, 56, 36, 50, 18, 42, 26, 12][k] * 2}" rx="7" fill="#111"/>`).join('');
const dots = Array.from({ length: 15 }, (_, k) => `<circle cx="${(k % 5) * 40 + 20}" cy="${Math.floor(k / 5) * 40 + 20}" r="9" fill="#111"/>`).join('');
export default defineSlide({
  id: 's12', act: 2, title: 'Skizofrenia: 3 kelompok gejala',
  orbs: [[300, 300, 900, '#2F6FD6', .45], [1600, 820, 1000, '#7A6BB0', .45]],
  html: `${HD('02', 'Pengertian · penyebab psikosis paling umum', 'Skizo<span class="ol">frenia</span>', 'h3', 'Gangguan jiwa berat jangka panjang: sulit membedakan mana yang nyata dan mana yang tidak.')}
    <div class="three">
      <div class="card pre c1"><div class="sym">+</div><h4>Gejala positif</h4><div class="vis"><svg viewBox="0 0 290 120">${bars}</svg></div><p><b>Muncul</b> hal yang seharusnya tidak ada: halusinasi, waham, bicara kacau.</p></div>
      <div class="card pre c2"><div class="sym">−</div><h4>Gejala negatif</h4><div class="vis"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="none" stroke="#111" stroke-width="6"/><circle class="ey" cx="40" cy="48" r="7" fill="#111"/><circle class="ey" cx="80" cy="48" r="7" fill="#111"/><path class="mo" d="M34 76 q26 22 52 0" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/><path class="mf" d="M36 82 h48" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0"/></svg></div><p><b>Hilang</b> hal yang seharusnya ada: ekspresi datar, malas bicara, menarik diri.</p></div>
      <div class="card pre c3"><div class="sym">?</div><h4>Gejala kognitif</h4><div class="vis"><svg viewBox="0 0 200 120">${dots}</svg></div><p>Sulit <b>berkonsentrasi</b> dan <b>mengingat</b>.</p></div>
    </div>
    <div class="strip"><span class="pill pre">Muncul akhir remaja – awal 30-an</span><span class="pill pre">Paling sering kambuh karena putus obat</span><span class="pill pre"><b class="no">Bukan</b>&nbsp;kepribadian ganda</span></div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: [
    (el, tl) => { FX.up(tl, $('.c1', el)); tl.from($$('.c1 rect', el), { scaleY: 0, transformOrigin: '50% 50%', duration: .6, ease: 'back.out(3)', stagger: .05 }, .4); tl.call(() => FX.loop(gsap.to($$('.c1 rect', el), { scaleY: 'random(.4,1.3)', transformOrigin: '50% 50%', duration: .35, repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut', stagger: .04 }))); },
    (el, tl) => { FX.up(tl, $('.c2', el)); tl.to($$('.c2 .ey', el), { opacity: .15, duration: 1.2 }, 1).to($('.c2 .mo', el), { opacity: 0, duration: 1 }, 1.2).to($('.c2 .mf', el), { opacity: .35, duration: 1 }, 1.4); },
    (el, tl) => { FX.up(tl, $('.c3', el)); tl.to($$('.c3 circle', el), { x: 'random(-30,30)', y: 'random(-25,25)', opacity: 'random(.15,.8)', duration: 1.6, ease: 'power2.inOut', stagger: .03 }, .7); },
    (el, tl) => tl.fromTo($$('.strip .pill', el), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'back.out(2)', stagger: .15 }),
  ],
  notes: 'Positif = ada yang muncul (halusinasi, waham). Negatif = ada yang hilang (ekspresi, minat bicara). Kognitif = konsentrasi & ingatan. Bisa dikendalikan dengan obat rutin; bukan kepribadian ganda.',
});
