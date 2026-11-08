import { defineSlide } from '../types';
import { FX, $, $$ } from '../fx';
import './28-profil.css';

/* ---------------- S28 · Profil ---------------- */
const PROF = [['Narasumber', 'Istri pasien, sekaligus pendamping utama (caregiver)'], ['Pasien', 'Suami narasumber (“Bapak”), pensiunan, ayah dari beberapa anak'], ['Diagnosis', 'Demensia: gangguan mental organik (F00–F09, PPDGJ-III)'], ['Status UU', 'ODGJ: gejalanya bermakna dan mengganggu fungsi sehari-hari'], ['Lama sakit', '± 6 tahun (saat anak keempat kelas 6 SD; kini kelas 3 SMA)'], ['Jalur layanan', 'Puskesmas Susukan (BPJS) → psikolog Puskesmas → rujukan ke Kesdam'], ['Kondisi kini', 'Komunikasi sangat terbatas, menolak minum obat, keluarga kewalahan']];
export default defineSlide({
  id: 's28', act: 6, title: 'Profil kasus', bg: '#1f1f22',
  orbs: [[1520, 420, 900, '#F0A04B', .35], [380, 920, 800, '#7A6BB0', .3]],
  html: `<div class="card file"><span class="tab">Berkas kasus</span><dl>${PROF.map(p => `<div class="pr"><dt>${p[0]}</dt><dd>${p[1]}</dd></div>`).join('')}</dl></div>
    <div class="rt"><div class="kicker pre"><b>06</b><span>Studi kasus</span></div><div class="disp" style="font-size:96px;margin-top:30px">Profil<br><span class="ol">kasus</span></div>
      <p class="lead pre">Wawancara ± 3 menit, empat pertanyaan, bersama istri pasien.</p></div>`,
  intro(el, tl) {
    tl.fromTo($('.file', el), { autoAlpha: 0, rotationX: -80, transformPerspective: 1600, y: -40 }, { autoAlpha: 1, rotationX: 0, y: 0, duration: 1.3, ease: 'expo.out' }, 0);
    tl.from($$('.file .pr', el), { autoAlpha: 0, x: -24, duration: .5, ease: 'power3.out', stagger: .14 }, .6);
    FX.fade(tl, $('.rt .kicker', el), .3);
    FX.rise(tl, $('.rt .disp', el), .4);
    FX.up(tl, $('.rt .lead', el), 1);
  },
  notes: 'Profil singkat sebelum video. Demensia termasuk F00–F09 di PPDGJ-III, dan secara UU termasuk ODGJ.',
});
