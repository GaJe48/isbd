import { defineSlide } from '../types';
import { FX, $, $$ } from '../fx';
import './02-agenda.css';

/* ---------------- S02 · Agenda ---------------- */
const AG = ['Pendahuluan', 'Pengertian ODGJ', 'Data & fakta', 'Faktor penyebab', 'Perspektif sosial budaya', 'Studi kasus: wawancara', 'Hak & dasar hukum', 'Upaya & peran', 'Penutup'];
const AGX = ['latar & rumusan', 'UU 18/2014 · PPDGJ-III', 'SKI 2023 · Kemenkes', 'biopsikososial', 'stigma · mitos · pasung', 'video 3:20', '1945 → 2023', 'keluarga · masyarakat · kita', 'kesimpulan & saran'];
export default defineSlide({
  id: 's02', cls: 'agenda', act: 0, title: 'Peta presentasi',
  orbs: [[260, 880, 1100, '#2F6FD6', .55], [1700, 160, 1000, '#7A6BB0', .5], [1450, 1040, 800, '#B85A9C', .35]],
  html: `<div class="vt disp"><div class="a">AGEN</div><div class="b ol">DA</div></div>
    <p class="lead pre" style="position:absolute;left:140px;top:560px;width:600px;font-size:28px">Sembilan bab: dari arti istilah, data, dan budaya, sampai cerita nyata dan peran kita sebagai mahasiswa.</p>
    <div class="list"><div class="rail"></div>${AG.map((t, k) => `<div class="it"><span class="k">0${k + 1}</span><span class="t">${t}</span><span class="x">${AGX[k]}</span></div>`).join('')}</div>`,
  intro(el, tl) {
    FX.rise(tl, $('.vt .a', el), 0, { stagger: .05 });
    tl.from($('.vt .b', el), { autoAlpha: 0, x: -80, duration: 1.2, ease: 'expo.out' }, .3);
    FX.up(tl, $('.lead', el), .6);
    tl.from($('.rail', el), { scaleY: 0, duration: 2, ease: 'power2.inOut' }, .3);
    tl.from($$('.it', el), { autoAlpha: 0, x: 50, duration: .7, ease: 'power3.out', stagger: .16 }, .4);
    tl.from($$('.it .k', el), { scale: 0, duration: .5, ease: 'back.out(2.5)', stagger: .16 }, .45);
  },
  notes: 'Gambaran alur. Inti presentasi ada di bab 05 (sosial budaya) dan bab 06 (studi kasus dengan video).',
});
