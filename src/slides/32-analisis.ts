import { defineSlide } from '../types';
import { $, $$, gsap, HD, hdIn } from '../fx';
import './32-analisis.css';

/* ---------------- S32 · Analisis ---------------- */
const AN: [title: string, text: string, babs: number[], badge?: string][] = [
  ['Bertengkar karena tidak tahu itu sakit', 'Literasi kesehatan jiwa rendah: gejala dianggap kebiasaan aneh, penanganan baru dimulai setelah 6 bulan.', [3]],
  ['Penipuan & tuntutan anak sebagai pemicu', 'Sejalan dengan faktor sosial. Namun demensia terutama karena kerusakan otak; ini dugaan keluarga.', [2]],
  ['Psikolog Puskesmas, lalu dirujuk ke Kesdam', 'BPJS & Puskesmas membuka jalan diagnosis, tetapi alat dan dokter belum ada.', [1]],
  ['Menolak obat karena merasa sehat', 'Penderita sering tidak sadar dirinya sakit; tanpa pendampingan, pengobatan mudah terputus.', [0, 4]],
  ['Komunikasi menurun dari tahun ke tahun', 'Demensia bersifat progresif, jadi deteksi dini sangat penting.', [0]],
  ['Jemuran digembok empat', 'Cara darurat keluarga tanpa pendampingan. Gembok ada pada jemuran, bukan pada Bapak.', [3], 'Bukan pasung'],
  ['Anak-anak tidak betah di rumah', 'Keluarga pendamping menanggung beban berat dan berisiko menjadi ODMK.', [0, 4]],
  ['Istri tetap mendampingi bertahun-tahun', 'Nilai kekeluargaan menjadi kekuatan utama dalam merawat ODGJ.', [3]],
];
const BAB = [['02', 'Pengertian'], ['03', 'Data & tenaga'], ['04', 'Faktor penyebab'], ['05', 'Sosial budaya'], ['08', 'Upaya & peran']];
export default defineSlide({
  id: 's32', act: 6, title: 'Analisis: kasus ↔ materi', bg: '#1f1f22',
  orbs: [[1520, 520, 900, '#F0A04B', .32], [380, 820, 800, '#7A6BB0', .35]],
  html: `${HD('06', 'Studi kasus · analisis', 'Kasus <span class="ol">&amp;</span> materi')}
    <svg class="links" viewBox="0 0 1920 1080"></svg>
    <div class="finds">${[0, 1].map(p => `<div class="page p${p}">${AN.slice(p * 4, p * 4 + 4).map((a, j) => `<div class="f pre"><span class="nd">${p * 4 + j + 1}</span><div><h4>${a[0]}</h4><p>${a[1]}</p>${a[3] ? `<span class="bp">${a[3]}</span>` : ''}</div></div>`).join('')}</div>`).join('')}</div>
    <div class="chips">${BAB.map(b => `<div class="bab pre"><b>${b[0]}</b><span>${b[1]}</span></div>`).join('')}</div>`,
  init(el) {
    const fs = $$('.f', el), bs = $$('.bab', el), finds = $('.finds', el), chips = $('.chips', el);
    const fy = (j: number) => finds.offsetTop + fs[j].offsetTop + fs[j].offsetHeight / 2;
    const by = (j: number) => chips.offsetTop + bs[j].offsetTop + bs[j].offsetHeight / 2;
    let h = '';
    AN.forEach((a, k) => a[2].forEach(b => { const y1 = fy(k), y2 = by(b); h += `<path data-k="${k}" d="M1120 ${y1} C 1260 ${y1}, 1280 ${y2}, 1420 ${y2}"/>`; }));
    $('.links', el).innerHTML = h;
    $$<SVGPathElement>('.links path', el).forEach(p => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
    gsap.set($('.p1', el), { autoAlpha: 0 });
  },
  intro(el, tl) {
    hdIn(el, tl);
    tl.fromTo($$('.p0 .f', el), { autoAlpha: 0, x: -30 }, { autoAlpha: .35, x: 0, duration: .6, stagger: .1 }, .4);
    tl.fromTo($$('.bab', el), { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, duration: .6, stagger: .1 }, .5);
  },
  steps: AN.map((a, k) => (el, tl) => {
    const fs = $$('.f', el), bs = $$('.bab', el);
    if (k === 4) {
      tl.to($('.p0', el), { autoAlpha: 0, x: -40, duration: .5 });
      tl.to($$('.links path', el).filter(p => +p.dataset.k! < 4), { opacity: 0, duration: .4 }, 0);
      tl.set($('.p1', el), { autoAlpha: 1 }, .5);
      tl.fromTo($$('.p1 .f', el), { autoAlpha: 0, x: -30 }, { autoAlpha: .35, x: 0, duration: .5, stagger: .08 }, .5);
    } else if (k % 4) tl.to(fs[k - 1], { opacity: .55, borderColor: 'rgba(255,255,255,.12)', duration: .4 }, 0);
    const at = k === 4 ? .9 : 0;
    tl.to(fs[k], { opacity: 1, backgroundColor: 'rgba(255,255,255,.1)', borderColor: 'rgba(240,160,75,.6)', duration: .5 }, at);
    tl.to($$(`.links path[data-k="${k}"]`, el), { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, at + .2);
    bs.forEach((b, j) => tl.to(b, { borderColor: a[2].includes(j) ? '#F0A04B' : 'rgba(255,255,255,.25)', boxShadow: a[2].includes(j) ? '0 0 40px rgba(240,160,75,.4)' : '0 0 0 rgba(0,0,0,0)', duration: .4 }, at + .7));
    a[2].forEach(j => tl.fromTo(bs[j], { scale: 1 }, { scale: 1.06, duration: .25, yoyo: true, repeat: 1 }, at + .8));
    if (a[3]) tl.fromTo($('.bp', fs[k]), { scale: 1.8, autoAlpha: 0, rotation: -8 }, { scale: 1, autoAlpha: 1, rotation: -3, duration: .35, ease: 'power4.in' }, at + .8);
  }),
  notes: 'Hubungkan temuan wawancara dengan bab-bab sebelumnya. Tegaskan temuan 6: gembok ada pada jemuran, bukan pada Bapak, jadi BUKAN pasung.',
});
