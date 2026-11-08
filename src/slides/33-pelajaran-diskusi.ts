import { defineSlide } from '../types';
import { FX, $, $$, HD, hdIn } from '../fx';
import './33-pelajaran-diskusi.css';

/* ---------------- S33 · Pelajaran & diskusi ---------------- */
const LS = [['Kenali gejala sejak dini', 'Perilaku aneh yang menetap bisa jadi tanda gangguan jiwa, bukan sekadar kebiasaan buruk.'], ['Manfaatkan layanan yang ada', 'Puskesmas dan BPJS bisa menjadi pintu awal diagnosis dan rujukan.'], ['Pengobatan butuh pendampingan', 'Penderita yang merasa sehat cenderung menolak obat; keluarga dan tenaga kesehatan perlu bekerja sama.'], ['Keluarga juga perlu dirawat', 'Pendamping menanggung beban fisik dan mental, butuh dukungan lingkungan dan pemerintah.']];
const DQ = ['Apa yang bisa berubah jika keluarga sejak awal tahu bahwa perilaku aneh Bapak adalah gejala sakit?', 'Bagaimana cara membantu penderita yang menolak minum obat karena merasa sehat?', 'Dukungan apa yang dibutuhkan keluarga pendamping dari lingkungan sekitar dan pemerintah?'];
export default defineSlide({
  id: 's33', act: 6, title: 'Pelajaran & pertanyaan diskusi',
  orbs: [[1520, 520, 1000, '#B85A9C', .4], [300, 300, 800, '#F0A04B', .35]],
  html: `${HD('06', 'Studi kasus', 'Pelajaran &amp; <span class="ol">diskusi</span>')}
    <div class="lessons">${LS.map((l, k) => `<div class="ls pre"><span class="nd warm">${k + 1}</span><div><h4>${l[0]}</h4><p>${l[1]}</p></div></div>`).join('')}</div>
    <div class="qs">${DQ.map(q => `<div class="card qq pre"><span class="qmk">?</span><p>${q}</p></div>`).join('')}</div>`,
  intro(el, tl) { hdIn(el, tl); FX.up(tl, $$('.ls', el), .5, { stagger: .15 }); },
  steps: DQ.map((q, k) => (el, tl) => {
    const c = $$('.qq', el)[k];
    FX.up(tl, c, 0);
    tl.fromTo($('.qmk', c), { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: .8, ease: 'back.out(2.2)' }, .2);
  }),
  notes: 'Ajak audiens berdiskusi. Tampilkan pertanyaan satu per satu.',
});
