import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './30-kronologi.css';

/* ---------------- S30 · Kronologi ---------------- */
const KR = [['Tekanan hidup', 'Menurut keluarga: dua kali tertipu investasi bodong (Rp200 juta, lalu uang pensiun) dan ditagih biaya kuliah anak.'], ['Gejala awal', 'Mencuci pakaian, termasuk pakaian dalam, memakai keset. Berlangsung ±6 bulan; keluarga bertengkar karena tidak tahu itu sakit.'], ['Diagnosis', 'Dibawa ke Puskesmas Susukan (BPJS), dites psikolog lebih dari satu jam. Hasilnya hari itu juga: demensia.'], ['Rujukan & obat', 'Puskesmas belum punya alat dan dokter, jadi dirujuk ke Kesdam. Obat hanya diminum sekali, lalu dibuang.'], ['Kemampuan menurun', 'Enam bulan pertama masih bisa bicara meski tidak nyambung. Tahun kedua hanya merespons “heh, heh”.'], ['Beban keluarga', 'Jemuran basah terus diangkat sampai dipasang empat gembok. Anak-anak tidak betah di rumah.']];
const KX = (k: number) => 200 + k * 304;
export default defineSlide({
  id: 's30', act: 6, title: 'Kronologi perjalanan penyakit', bg: '#1f1f22',
  orbs: [[200, 600, 650, '#F0A04B', .5], [1500, 260, 800, '#7A6BB0', .3]],
  html: `${HD('06', 'Studi kasus', 'Kronologi <span class="ol">perjalanan</span>')}
    <div class="line"></div>
    ${KR.map((c, k) => `<span class="stem pre" style="left:${KX(k) - 1}px;${k % 2 ? 'top:614px;height:26px' : 'top:560px;height:26px'}"></span><span class="tn pre" style="left:${KX(k)}px"></span>
      <div class="tc ${k % 2 ? 'dn' : 'up'} pre" style="left:${KX(k)}px"><div class="k">0${k + 1}</div><h4>${c[0]}</h4><p>${c[1]}</p></div>`).join('')}`,
  init(el) { gsap.set($$('.tc', el), { xPercent: -50 }); },
  intro(el, tl) {
    hdIn(el, tl);
    tl.from($('.line', el), { scaleX: 0, duration: 1.8, ease: 'expo.inOut' }, .4);
    tl.fromTo($$('.tn', el), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: .5, ease: 'back.out(2)', stagger: .15 }, .8);
  },
  steps: KR.map((c, k) => (el, tl) => {
    const tn = $$('.tn', el)[k], tc = $$('.tc', el)[k], st = $$('.stem', el)[k];
    tl.call(() => { $$('.tn', el).forEach((n, j) => n.classList.toggle('on', j <= k)); });
    tl.to(FX.orb(0), { x: KX(k), y: 600, duration: 1.2, ease: 'expo.inOut', overwrite: 'auto' }, 0);
    tl.fromTo(tn, { scale: 1 }, { scale: 1.5, duration: .3, yoyo: true, repeat: 1 }, .1);
    tl.fromTo(st, { autoAlpha: 1, scaleY: 0, transformOrigin: k % 2 ? 'top' : 'bottom' }, { scaleY: 1, duration: .4 }, .2);
    tl.fromTo(tc, { autoAlpha: 0, y: k % 2 ? -20 : 20, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .7, ease: 'power3.out' }, .4);
    if (k) tl.to($$('.tc', el).slice(0, k), { opacity: .55, duration: .5 }, .3);
  }),
  notes: 'Enam titik dalam perjalanan penyakit. Penting: tekanan hidup adalah dugaan keluarga; demensia terutama karena kerusakan otak.',
});
