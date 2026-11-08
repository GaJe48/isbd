import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './36-empat-upaya.css';

/* ---------------- S36 · Empat upaya ---------------- */
const RC = { x: 700, y: 640, r: 240 };
const LBL = [[700, 352], [1078, 640], [700, 928], [300, 640]];
const UP: [name: string, angle: number, text: string, stat: [value: number, dec: number, suf: string] | '', note: string][] = [['Promotif', -90, 'Edukasi kesehatan jiwa di sekolah, kampus, tempat kerja, dan media.', '', 'sekolah · kampus · kerja · media'], ['Preventif', 0, 'Deteksi dini dan skrining, misalnya lewat program Cek Kesehatan Gratis.', [71.86, 2, ' juta'], 'penduduk sudah diskrining kesehatan jiwanya'], ['Kuratif', 90, 'Pengobatan oleh dokter, psikiater, dan psikolog di Puskesmas atau rumah sakit.', [6549, 0, ''], 'Puskesmas (64%) mampu memberi layanan kesehatan jiwa · Okt 2026'], ['Rehabilitatif', 180, 'Pemulihan agar ODGJ bisa kembali mandiri, bekerja, dan bersosialisasi.', '', 'mandiri · bekerja · bersosialisasi']];
const pt = (a: number) => [RC.x + RC.r * Math.cos(a * Math.PI / 180), RC.y + RC.r * Math.sin(a * Math.PI / 180)];
export default defineSlide({
  id: 's36', act: 8, title: 'Empat upaya kesehatan jiwa',
  orbs: [[700, 640, 1000, '#F0A04B', .42], [1500, 300, 900, '#B85A9C', .4]],
  html: `${HD('08', 'Upaya & peran', 'Empat upaya <span class="ol">kesehatan jiwa</span>')}
    <svg class="cyc" viewBox="0 0 1920 1080"><circle class="ring" cx="${RC.x}" cy="${RC.y}" r="${RC.r}" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="3"/>
      <circle class="dot" cx="${RC.x}" cy="${RC.y - RC.r}" r="13" fill="#fff" style="filter:drop-shadow(0 0 14px #F0A04B)"/></svg>
    ${UP.map((u, k) => `<div class="st cc pre" style="left:${LBL[k][0]}px;top:${LBL[k][1]}px">${u[0]}</div>`).join('')}
    <div class="panel"><div class="card pc pi pre"><div class="k">Siklus · 4 tahap</div><h4>Saling menyambung</h4><p>Pemulihan ODGJ butuh kerja sama layanan kesehatan, keluarga, dan masyarakat.</p><ol>${UP.map((u, k) => `<li><i>${k + 1}</i>${u[0]}</li>`).join('')}</ol></div>${UP.map((u, k) => `<div class="card pc pre"><div class="k">0${k + 1} / 04</div><h4>${u[0]}</h4><p>${u[2]}</p><div class="stat">${u[3] ? `<span class="c">0</span>` : `<span style="font-size:30px;font-family:var(--body);font-weight:700">${u[4]}</span>`}${u[3] ? `<small>${u[4]}</small>` : ''}</div></div>`).join('')}</div>`,
  init(el) { const r = $('.ring', el), L = 2 * Math.PI * RC.r; gsap.set(r, { strokeDasharray: L, strokeDashoffset: L, rotation: -90, svgOrigin: `${RC.x} ${RC.y}` }); gsap.set($('.dot', el), { autoAlpha: 0 }); el._a = { a: -90 }; },
  intro(el, tl) {
    hdIn(el, tl);
    tl.to($('.ring', el), { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, .4);
    tl.fromTo($$('.st', el), { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .2 }, 1);
    tl.to($('.dot', el), { autoAlpha: 1, duration: .4 }, 1.8);
    FX.up(tl, $('.pi', el), 1.2);
    tl.from($$('.pi li', el), { autoAlpha: 0, x: 24, duration: .5, stagger: .12 }, 1.6);
    tl.call(() => FX.loop(gsap.to($('.dot', el), { attr: { r: 17 }, duration: .9, yoyo: true, repeat: -1, ease: 'sine.inOut' })), undefined, 2.2);
  },
  steps: UP.map((u, k) => (el, tl) => {
    const dot = $('.dot', el), sts = $$('.st', el), pcs = $$('.pc:not(.pi)', el);
    const target = 270 + k * 90;
    if (k === 0) el._a.a = -90;
    tl.to(el._a, { a: target, duration: k === 0 ? 1.8 : 1.1, ease: 'power2.inOut', onUpdate: () => { const [x, y] = pt(el._a.a); dot.setAttribute('cx', String(x)); dot.setAttribute('cy', String(y)); } });
    tl.call(() => sts.forEach((s, j) => s.classList.toggle('on', j === k)), undefined, k === 0 ? 1.6 : .9);
    tl.fromTo(sts[k], { scale: 1 }, { scale: 1.12, duration: .3, yoyo: true, repeat: 1 }, k === 0 ? 1.6 : .9);
    tl.to(k ? pcs[k - 1] : $('.pi', el), { autoAlpha: 0, x: -30, duration: .4 }, .3);
    tl.fromTo(pcs[k], { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: .7, ease: 'power3.out' }, k === 0 ? 1.4 : .7);
    if (u[3]) FX.count(tl, $('.c', pcs[k]), u[3][0], { dec: u[3][1], suf: u[3][2], dur: 1.6 }, 1);
  }),
  notes: 'Promotif (edukasi), preventif (skrining — 71,86 juta penduduk), kuratif (pengobatan — 6.549 Puskesmas mampu), rehabilitatif (pemulihan).',
});
