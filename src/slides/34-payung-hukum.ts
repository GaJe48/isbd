import { defineSlide, type Build, type SlideEl, type Timeline } from '../types';
import { FX, $, $$, HD, hdIn } from '../fx';
import './34-payung-hukum.css';

/* ---------------- S34 · Payung hukum ---------------- */
const LAW = [['1945', 'UUD 1945 Pasal 28H & 28I', 'Hak hidup sejahtera lahir batin dan memperoleh layanan kesehatan; hak bebas dari perlakuan diskriminatif.'], ['1999', 'UU No. 39 tentang HAM', 'Menjamin martabat dan hak asasi setiap manusia, termasuk ODGJ.'], ['2011', 'UU No. 19 (CRPD)', 'Pengesahan Konvensi PBB tentang Hak Penyandang Disabilitas.'], ['2016', 'UU No. 8 Penyandang Disabilitas', 'Gangguan jiwa jangka panjang termasuk disabilitas mental yang dilindungi.'], ['2017', 'Permenkes No. 54', 'Penanggulangan pemasungan pada orang dengan gangguan jiwa.'], ['2023', 'UU No. 17 tentang Kesehatan', 'Pasal 74–85 mengatur upaya kesehatan jiwa.']];
export default defineSlide({
  id: 's34', act: 7, title: 'Payung hukum 1945 → 2023',
  orbs: [[1500, 300, 1000, '#B85A9C', .5], [400, 900, 900, '#7A6BB0', .45]],
  html: `${HD('07', 'Hak & dasar hukum', 'Payung <span class="ol">hukum</span>')}
    <div class="vp"><div class="rail"><div class="lineL" style="width:${300 + LAW.length * 640}px"></div>${LAW.map(l => `<div class="yr"><div class="y">${l[0]}</div><span class="pt"></span><h4>${l[1]}</h4><p>${l[2]}</p></div>`).join('')}</div></div>
    <div class="card pasal pre" style="left:960px;top:330px"><h4>UU 17/2023 · yang paling penting</h4>
      <div class="pp"><b>Pasal 76</b><p>Hak atas layanan kesehatan jiwa, <b>larangan pemasungan</b>, dan persamaan hak ODGJ.</p></div>
      <div class="pp"><b>Pasal 77</b><p>Tanggung jawab pemerintah pusat dan daerah, termasuk <b>menangani ODGJ telantar</b>.</p></div></div>`,
  intro(el, tl) {
    hdIn(el, tl);
    tl.from($('.rail', el), { x: 600, autoAlpha: 0, duration: 1.4, ease: 'expo.out' }, .3);
    activate(el, tl, 0, .8);
  },
  steps: [...LAW.slice(1).map((_, k): Build => (el, tl) => {
    tl.to($('.rail', el), { x: -(k + 1) * 640, duration: 1.3, ease: 'expo.inOut' });
    activate(el, tl, k + 1, .6);
  }), (el: SlideEl, tl: Timeline) => {
    FX.up(tl, $('.pasal', el), 0);
    tl.from($$('.pasal .pp', el), { autoAlpha: 0, x: 30, duration: .6, stagger: .2 }, .4);
  }],
  notes: 'Dari UUD 1945 sampai UU Kesehatan 2023. Sorot UU 17/2023 Pasal 76 (larangan pasung) dan Pasal 77 (tanggung jawab pemerintah).',
});
function activate(el: SlideEl, tl: Timeline, k: number, at: number) {
  const ys = $$('.yr', el);
  ys.forEach((y, j) => tl.to(y, { opacity: j === k ? 1 : .28, duration: .6 }, at));
  tl.to($('.y', ys[k]), { color: '#fff', duration: 1, ease: 'power2.inOut' }, at);
  tl.fromTo($('.pt', ys[k]), { scale: 0 }, { scale: 1, duration: .5, ease: 'back.out(3)' }, at + .2);
}
