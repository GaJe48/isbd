import { defineSlide } from '../types';
import { FX, $, $$, gsap, HD, hdIn } from '../fx';
import './37-siapa-berperan.css';

/* ---------------- S37 · Siapa berperan ---------------- */
const RL: [name: string, d: number, items: string[], rect: [x: number, y: number, w: number, h: number], level: string][] = [['Keluarga', 300, ['Bawa ke layanan sejak gejala awal', 'Dampingi dan pastikan obat diminum rutin', 'Sabar, tidak menyalahkan, tidak memasung'], [140, 310, 500, 610], 'Lingkar 1 · paling dekat'], ['Masyarakat', 500, ['Terima ODGJ yang sudah pulih', 'Laporkan ODGJ telantar atau terpasung ke Puskesmas, Dinsos, atau desa', 'Hidupkan kader dan desa siaga sehat jiwa'], [680, 310, 500, 610], 'Lingkar 2 · lingkungan'], ['Mahasiswa', 700, ['Stop memakai “gila” sebagai candaan', 'Jangan rekam & sebar video ODGJ', 'Peka pada teman yang depresi', 'Tidak self-diagnose dari internet', 'Ikut kampanye 10 Oktober'], [1220, 310, 560, 610], 'Lingkar 3 · kita']];
const MHS = [['Stop candaan “gila”', 'Berhenti memakai kata “gila” atau nama gangguan jiwa sebagai ejekan.'], ['Jangan rekam & sebar', 'Tidak merekam, menertawakan, atau menyebarkan video ODGJ di media sosial.'], ['Peka pada teman', 'Arahkan teman yang menunjukkan tanda depresi ke konseling kampus atau profesional.'], ['Tidak self-diagnose', 'Jangan mendiagnosis diri atau orang lain hanya dari konten internet.'], ['Kampanye anti-stigma', 'Ikut Hari Kesehatan Jiwa Sedunia setiap 10 Oktober.']];
export default defineSlide({
  id: 's37', act: 8, title: 'Siapa berperan? Keluarga · masyarakat · mahasiswa',
  orbs: [[960, 620, 1100, '#F0A04B', .45], [300, 250, 800, '#B85A9C', .4], [1650, 900, 800, '#7A6BB0', .35]],
  html: `${HD('08', 'Upaya & peran', 'Siapa <span class="ol">berperan?</span>')}
    ${[...RL].reverse().map(r => `<div class="circ c-${r[0]}" style="left:${960 - r[1] / 2}px;top:${620 - r[1] / 2}px;width:${r[1]}px;height:${r[1]}px;border-radius:${r[1] / 2}px"><span class="cl">${r[0]}</span>
      <div class="cbody"><span class="cn">0${RL.indexOf(r) + 1}</span><h4${r[0] === 'Mahasiswa' ? ' class="hlw"' : ''}>${r[0]}</h4><ul>${r[2].map(i => `<li>${i}</li>`).join('')}</ul><div class="lv">${r[4]}</div></div></div>`).join('')}
    <div class="mhs"><div class="disp h4">Peran kita sebagai <span class="hlw">mahasiswa</span></div><div class="grid">${MHS.map((m, k) => `<div class="card"><span class="nd warm">${k + 1}</span><h4>${m[0]}</h4><p>${m[1]}</p></div>`).join('')}</div></div>`,
  init(el) { gsap.set($$('.circ', el), { autoAlpha: 0 }); },
  intro(el, tl) {
    hdIn(el, tl);
    const cs = $$('.circ', el).reverse();
    cs.forEach((c, k) => tl.fromTo(c, { autoAlpha: 1, scale: 0 }, { scale: 1, duration: 1.2, ease: 'expo.out' }, .5 + k * .35));
  },
  steps: [
    (el, tl) => {
      RL.forEach(r => {
        const c = $(`.c-${r[0]}`, el), [x, y, w, h] = r[3];
        tl.to($('.cl', c), { autoAlpha: 0, duration: .3 }, 0);
        tl.to(c, { left: x, top: y, width: w, height: h, borderRadius: '28px', backgroundColor: 'rgba(255,255,255,.06)', borderColor: r[0] === 'Mahasiswa' ? 'rgba(240,160,75,.9)' : 'rgba(255,255,255,.18)', duration: 1.3, ease: 'expo.inOut' }, .1);
        tl.to($('.cbody', c), { opacity: 1, duration: .6 }, 1.2);
        tl.from($$('.cbody li', c), { autoAlpha: 0, x: -16, duration: .45, stagger: .08 }, 1.3);
      });
    },
    (el, tl) => {
      tl.to($$('.circ', el), { autoAlpha: 0, scale: .96, duration: .6, ease: 'power2.in' });
      tl.set($('.mhs', el), { autoAlpha: 1 }, .5);
      FX.up(tl, $('.mhs .disp', el), .5);
      FX.up(tl, $$('.mhs .card', el), .8, { stagger: .12 });
    },
  ],
  notes: 'Keluarga di lingkar terdalam, lalu masyarakat, lalu kita sebagai mahasiswa. Klik terakhir membuka lima peran mahasiswa.',
});
