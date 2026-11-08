import { defineSlide } from '../types';
import { FX, $, $$, HD, hdIn } from '../fx';
import './35-hak-odgj.css';

/* ---------------- S35 · Hak ODGJ ---------------- */
const IC: Record<string, string> = {
  hp: '<circle cx="25" cy="25" r="20"/><path d="M25 15v20M15 25h20"/>',
  in: '<circle cx="25" cy="25" r="20"/><path d="M25 22v13"/><path d="M25 15.5v.5"/>',
  ch: '<path d="M9 31 l7-7 a6 6 0 0 1 8.5 8.5 l-2.5 2.5 a6 6 0 0 1 -8.5 0"/><path d="M41 19 l-7 7 a6 6 0 0 1 -8.5 -8.5 l2.5 -2.5 a6 6 0 0 1 8.5 0"/><path d="M22 10 l2 5M28 40 l-2 -5"/>',
  bk: '<rect x="8" y="16" width="34" height="24" rx="4"/><path d="M18 16v-5h14v5M8 26h34"/>',
  vt: '<path d="M9 24h32v17H9z"/><path d="M17 13 l6 6 11-11"/>',
};
const HAK = [['hp', 'Layanan kesehatan jiwa', 'Aman, bermutu, dan terjangkau.'], ['in', 'Informasi yang jujur', 'Tentang kondisi dan pengobatannya.'], ['ch', 'Bebas pasung & kekerasan', 'Bebas dari penelantaran dan perlakuan merendahkan.'], ['bk', 'Pendidikan & pekerjaan', 'Dan kehidupan sosial yang setara.'], ['vt', 'Hak warga negara', 'Termasuk hak pilih.']];
export default defineSlide({
  id: 's35', act: 7, title: 'Hak-hak ODGJ',
  orbs: [[960, 640, 1200, '#B85A9C', .45], [300, 200, 800, '#F0A04B', .3]],
  html: `${HD('07', 'Hak & dasar hukum', 'Hak-hak <span class="ol">ODGJ</span>')}
    <p class="claim pre">ODGJ adalah <span class="hlw">warga negara dengan hak yang sama.</span></p>
    <div class="fan">${HAK.map((h, k) => `<div class="card rc pre" style="left:${k * 333}px"><div class="ic"><svg viewBox="0 0 50 50">${IC[h[0]]}</svg></div><h4>${h[1]}</h4><p>${h[2]}</p></div>`).join('')}</div>`,
  intro(el, tl) { hdIn(el, tl); FX.up(tl, $('.claim', el), .5); },
  steps: [(el, tl) => {
    const cs = $$('.rc', el);
    cs.forEach((c, k) => tl.fromTo(c, { autoAlpha: 0, x: (2 - k) * 333, y: 60, rotation: (k - 2) * 7, scale: .85 }, { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 1.2, ease: 'expo.out' }, .1 + Math.abs(k - 2) * .08));
    tl.from($$('.rc .ic', el), { scale: 0, rotation: -90, duration: .7, ease: 'back.out(2)', stagger: .08 }, .7);
  }],
  notes: 'Lima hak inti ODGJ. Pemasungan dilarang dan negara wajib menangani ODGJ, termasuk yang telantar.',
});
