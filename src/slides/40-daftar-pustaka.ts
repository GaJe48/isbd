import { defineSlide } from '../types';
import { FX, $, gsap } from '../fx';
import { INFO as I } from '../data/info';
import './40-daftar-pustaka.css';

/* ---------------- S40 · Daftar pustaka ---------------- */
const REF = [['Kementerian Kesehatan RI · 2025', 'Kepmenkes No. HK.01.07/MENKES/970/2025 tentang PNPK Tata Laksana Skizofrenia'], ['Badan Kebijakan Pembangunan Kesehatan, Kemenkes RI · 2024', 'Survei Kesehatan Indonesia (SKI) 2023 — factsheet kesehatan jiwa'], ['Republik Indonesia · 2014', 'Undang-Undang No. 18 Tahun 2014 tentang Kesehatan Jiwa'], ['Republik Indonesia · 2023', 'Undang-Undang No. 17 Tahun 2023 tentang Kesehatan'], ['Kementerian Kesehatan RI · 2017', 'Permenkes No. 54 Tahun 2017 tentang Penanggulangan Pemasungan pada ODGJ'], ['Rusdi Maslim', 'Buku Saku Diagnosis Gangguan Jiwa: Rujukan Ringkas PPDGJ-III dan DSM-5'], ['Kumparan · 2025', 'Kemenkes Catat Ada 1.750 Kasus Pemasungan di Indonesia pada 2024'], ['Metro TV News · 13 Oktober 2026', 'Kemenkes: 9 dari 10 Penderita Depresi Belum Tertangani Medis'], ['RCTI+ / IDX Channel · 11 Oktober 2026', 'Kemenkes: Penderita Depresi yang Terima Layanan Kesehatan Baru 12,7 Persen'], ['detikHealth · 2024', 'Kemenkes RI Ungkap Kemungkinan Pemicu Kasus Skizofrenia Tinggi di Yogyakarta'], ['Antara · 2026', 'Kemenkes Sebut Ada 1.443 Kasus Pemasungan pada 2026'], ['SIP Law Firm', 'Penanganan Kesehatan Mental menurut UU 17/2023']];
export default defineSlide({
  id: 's40', act: 9, title: 'Daftar pustaka', bg: '#202022', hud: false,
  orbs: [[960, 1020, 1400, '#7A6BB0', .35], [300, 160, 700, '#B85A9C', .22]],
  html: `<div class="roll"><div class="kicker" style="justify-content:center"><b>09</b><span>Penutup</span></div><h2 class="disp" style="margin-top:30px">Daftar pustaka</h2>
      ${REF.map(r => `<div class="ent"><div class="a">${r[0]}</div><div class="t">${r[1]}</div></div>`).join('')}
      <div class="ent" style="margin-top:120px"><div class="a">Video wawancara</div><div class="t">Dokumentasi ${I.kelompok}</div></div>
      <div class="ent"><div class="a">Disusun oleh</div><div class="t">${I.kelompok} · ${I.matkul} · ${I.tahun}</div></div></div>
    <div class="fade t"></div><div class="fade b"></div><div class="paused">JEDA · KLIK UNTUK LANJUT</div>`,
  enter(el) {
    const roll = $('.roll', el), h = roll.offsetHeight;
    el._roll = FX.loop(gsap.fromTo(roll, { y: 1000 }, { y: -(h - 640), duration: (h + 360) / 55, ease: 'none' }));
  },
  click(e, el) {
    if (!el._roll) return false;
    el._roll.paused(!el._roll.paused());
    gsap.to($('.paused', el), { opacity: el._roll.paused() ? 1 : 0, duration: .3 });
    return true;
  },
  notes: 'Daftar pustaka bergulir seperti credit film. Klik mouse = jeda/lanjut gulir. Tekan → untuk ke slide penutup.',
});
