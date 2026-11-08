/* =========================================================
   S27–S41 · Studi kasus (video), Hak & hukum, Upaya & peran, Penutup
   ========================================================= */
(() => {
const { $, $$, fmt } = FX;
const I = window.INFO;
const mmss = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
// waktu kutipan kunci ke-k (urutan [KUTIPAN] di subtitle-atur.txt)
const keyTime = k => ((SUBS.filter(l => l.key)[k]) || { s: 0 }).s;

/* ---------------- S27 · Bab 06 ---------------- */
DECK.add({
  id: 's27', cls: 'divider s27', act: 6, title: 'Bab 06 · Enam tahun merawat', divider: true, hud: false,
  bg: '#19191b', morph: 1.8,
  orbs: [[640, 560, 1000, '#F0A04B', .32], [1600, 300, 700, '#B85A9C', .18]],
  html: `<div class="six"><svg class="sw"><defs><linearGradient id="g6" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F0A04B"/><stop class="a" offset="0" stop-color="#F0A04B"/><stop class="b" offset="0" stop-color="#F0A04B" stop-opacity="0"/></linearGradient></defs><text font-size="1000" style="fill:url(#g6)">6</text></svg></div>
    <div class="body"><div class="kicker pre"><b>06</b><span>Studi kasus</span></div>
      <div class="disp" style="margin-top:34px">Enam tahun <span class="ol">merawat</span></div>
      <p class="lead pre">Cerita seorang istri yang merawat suaminya dengan <b>demensia</b>, dan bagaimana gangguan jiwa memengaruhi seluruh keluarga.</p></div>`,
  init(el) { el._t = FX.svgText($('svg', el)); },
  intro(el, tl) {
    FX.draw(tl, el._t, 0, { dur: 2.6, len: 5000 });
    tl.to($$('#g6 stop.a, #g6 stop.b', el), { attr: { offset: 1 }, duration: 4.5, ease: 'power1.inOut' }, 1.2);
    FX.fade(tl, $('.body .kicker', el), .8);
    FX.rise(tl, $('.body .disp', el), 1);
    FX.up(tl, $('.body .lead', el), 1.8, { duration: 1.2 });
  },
  notes: 'Masuk studi kasus. Suasana lebih hening. Angka 6 = enam tahun merawat.',
});

/* ---------------- S28 · Profil ---------------- */
const PROF = [['Narasumber', 'Istri pasien, sekaligus pendamping utama (caregiver)'], ['Pasien', 'Suami narasumber (“Bapak”), pensiunan, ayah dari beberapa anak'], ['Diagnosis', 'Demensia: gangguan mental organik (F00–F09, PPDGJ-III)'], ['Status UU', 'ODGJ: gejalanya bermakna dan mengganggu fungsi sehari-hari'], ['Lama sakit', '± 6 tahun (saat anak keempat kelas 6 SD; kini kelas 3 SMA)'], ['Jalur layanan', 'Puskesmas Susukan (BPJS) → psikolog Puskesmas → rujukan ke Kesdam'], ['Kondisi kini', 'Komunikasi sangat terbatas, menolak minum obat, keluarga kewalahan']];
DECK.add({
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

/* ---------------- S29 · VIDEO ---------------- */
DECK.add({
  id: 's29', act: 6, title: '▶ Video wawancara (3:20)', hud: false, bg: '#141416',
  orbs: [[960, 600, 1300, '#F0A04B', .22], [300, 200, 600, '#7A6BB0', .2]],
  html: `<div class="intro"><div class="kicker"><b>06</b><span>Studi kasus · video wawancara</span></div><div class="disp">Wawancara keluarga ODGJ</div></div>
    <div class="lap"><div class="bezel"></div><div class="base"></div><div class="scr"><div class="vslot" style="position:absolute;inset:0"></div>
      <div class="play"><svg viewBox="0 0 80 80" width="80" height="80"><path d="M28 18 L62 40 L28 62 Z" fill="#18181b"/></svg></div></div></div>
    <div class="shade"></div>
    <div class="l3"><i></i><div><b>Wawancara keluarga ODGJ</b><span>Studi kasus demensia · istri pendamping ± 6 tahun</span></div></div>
    <div class="seg"><small>Q1</small><b></b></div>
    <div class="subs"></div>
    <div class="ctl" data-noclick><div class="track"><div class="fillbar"></div>${SEGMENTS.map((s, k) => `<span class="mk" data-k="${k}" style="left:${s.t / 200.68 * 100}%"></span>`).join('')}</div>
      ${SEGMENTS.map((s, k) => `<span class="mkl" style="left:${s.t / 200.68 * 100}%">Q${k + 1} ${s.label}</span>`).join('')}<span class="time">0:00 / 3:20</span></div>
    <div class="pz"><svg viewBox="0 0 60 60" width="60" height="60"><rect x="14" y="12" width="11" height="36" rx="3" fill="#fff"/><rect x="35" y="12" width="11" height="36" rx="3" fill="#fff"/></svg></div>
    <div class="blackout"></div>`,
  init(el) {
    const v = $('#vid'); $('.vslot', el).appendChild(v);
    v.muted = false; v.playbackRate = 1;
    el._v = v; el._line = null; el._seg = -1; el._zoomed = false;
    gsap.set($('.lap', el), { scale: .56, y: 40 });
    if (!DECK.building && v.currentTime < .3) { try { v.currentTime = .4; } catch (e) {} }
  },
  intro(el, tl) {
    FX.fade(tl, $('.intro .kicker', el), 0);
    FX.rise(tl, $('.intro .disp', el), .1);
    tl.from($('.lap', el), { autoAlpha: 0, y: 160, duration: 1.3, ease: 'expo.out' }, .2);
    tl.fromTo($('.play', el), { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)' }, 1);
    tl.call(() => FX.loop(gsap.to($('.play', el), { scale: 1.08, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
  },
  steps: [
    (el, tl) => {
      el._zoomed = true;
      tl.call(() => el.classList.add('zoomed'), null, .3);
      tl.to($('.intro', el), { autoAlpha: 0, y: -40, duration: .6, ease: 'power2.in' })
        .to($('.play', el), { autoAlpha: 0, scale: 1.6, duration: .5 }, 0)
        .to($('.lap', el), { scale: 1, y: 0, duration: 1.7, ease: 'expo.inOut' }, .2)
        .to($('.shade', el), { opacity: 1, duration: .8 }, 1.4)
        .to($('.ctl', el), { opacity: 1, duration: .6 }, 1.5)
        .to($('.ctl', el), { opacity: 0, duration: .8 }, 5);
      if (!DECK.building) tl.call(() => { const v = el._v; if (v.ended || v.currentTime > 199) v.currentTime = 0; v.play().catch(() => {}); }, null, 1.6);
    },
  ],
  enter(el) {
    const v = el._v, subs = $('.subs', el), fill = $('.fillbar', el), time = $('.time', el), seg = $('.seg', el), l3 = $('.l3', el);
    let l3shown = false;
    const render = () => {
      const t = v.currentTime, d = v.duration || 200.68;
      fill.style.width = `${t / d * 100}%`;
      time.textContent = `${mmss(t)} / ${mmss(d)}`;
      // baris subtitle aktif
      let L = null;
      for (const l of SUBS) { if (l.s - .12 <= t) L = l; else break; }
      if (L && t > L.e + .7) L = null;
      if (!el._zoomed) L = null;
      if (L !== el._line) {
        el._line = L;
        if (!L) gsap.to(subs, { opacity: 0, duration: .2 });
        else {
          subs.innerHTML = `<div class="sl ${L.sp}${L.key ? ' key' : ''}">${L.sp === 'P' ? '<span class="who">Pewawancara</span>' : ''}${L.w.map(w => `<span class="w" data-s="${w[0]}">${w[1]}</span>`).join(' ')}${L.key ? '<span class="ul"></span>' : ''}</div>`;
          gsap.fromTo(subs, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, ease: 'power2.out' });
        }
      }
      if (L) {
        $$('.w', subs).forEach(w => w.classList.toggle('on', t >= +w.dataset.s));
        const ul = $('.ul', subs); if (ul && t > L.s + .4) ul.classList.add('on');
      }
      // segmen pertanyaan
      let k = -1; SEGMENTS.forEach((s, j) => { if (t >= s.t - .2) k = j; });
      if (el._zoomed && k !== el._seg && !v.paused) {
        el._seg = k;
        if (k >= 1) {
          $('small', seg).textContent = `Q${k + 1} · ${SEGMENTS[k].label}`; $('b', seg).textContent = SEGMENTS[k].q || '';
          gsap.timeline().fromTo(seg, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }).to(seg, { opacity: 0, x: -20, duration: .6 }, '+=4.5');
        }
      }
      if (el._zoomed && !l3shown && t > .3 && t < 6 && !v.paused) {
        l3shown = true;
        gsap.timeline().fromTo(l3, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out' }).to(l3, { opacity: 0, duration: .7 }, '+=4.6');
      }
    };
    el._render = render; gsap.ticker.add(render);
    const seek = t => { v.currentTime = Math.max(0, Math.min(t, (v.duration || 200) - .2)); el._seg = -1; render(); };
    $('.track', el).addEventListener('click', e => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); seek((e.clientX - r.left) / r.width * (v.duration || 200.68)); });
    $$('.mk', el).forEach(m => m.addEventListener('click', e => { e.stopPropagation(); seek(SEGMENTS[+m.dataset.k].t - .3); }));
    $('.ctl', el).addEventListener('click', e => e.stopPropagation());
    let uiT; el._mm = () => { el.classList.add('ui'); clearTimeout(uiT); uiT = setTimeout(() => el.classList.remove('ui'), 2200); };
    addEventListener('mousemove', el._mm);
    el._onEnd = () => gsap.timeline().to($('.blackout', el), { opacity: 1, duration: 1.2 }).call(() => { if (DECK.i === DECK.slides.findIndex(s => s.id === 's29')) DECK.next(); });
    el._onPause = () => { el.classList.add('ui'); gsap.to($('.pz', el), { opacity: el._zoomed ? 1 : 0, duration: .3 }); };
    el._onPlay = () => { el.classList.remove('ui'); gsap.to($('.pz', el), { opacity: 0, duration: .3 }); };
    v.addEventListener('ended', el._onEnd); v.addEventListener('pause', el._onPause); v.addEventListener('play', el._onPlay);
  },
  leave(el) {
    const v = el._v; if (!v) return;
    v.pause(); gsap.ticker.remove(el._render);
    v.removeEventListener('ended', el._onEnd); v.removeEventListener('pause', el._onPause); v.removeEventListener('play', el._onPlay);
    removeEventListener('mousemove', el._mm);
    $('#vault').appendChild(v);
  },
  key(e, el) {
    const v = el._v, k = e.key.toLowerCase();
    if (k === ' ' || k === 'k') { if (!el._zoomed) DECK.next(); else if (v.paused) v.play(); else v.pause(); return true; }
    if (k === 'j' && el._zoomed) { v.currentTime = Math.max(0, v.currentTime - 5); return true; }
    if (k === 'l' && el._zoomed) { v.currentTime = Math.min(v.duration - .2, v.currentTime + 5); return true; }
    if (k === 'enter' && el._zoomed) { if (v.paused) v.play(); else v.pause(); return true; }
    return false;
  },
  click(e, el) {
    if (!el._zoomed) return false;
    const v = el._v; if (v.paused) v.play(); else v.pause(); return true;
  },
  notes: 'Tekan → / Spasi untuk memperbesar dan memutar video. Selama video: Spasi/klik = jeda, J/L = mundur/maju 5 detik, klik garis waktu untuk lompat ke pertanyaan. Saat video selesai, slide otomatis lanjut.',
});

/* ---------------- S30 · Kronologi ---------------- */
const KR = [['Tekanan hidup', 'Menurut keluarga: dua kali tertipu investasi bodong (Rp200 juta, lalu uang pensiun) dan ditagih biaya kuliah anak.'], ['Gejala awal', 'Mencuci pakaian, termasuk pakaian dalam, memakai keset. Berlangsung ±6 bulan; keluarga bertengkar karena tidak tahu itu sakit.'], ['Diagnosis', 'Dibawa ke Puskesmas Susukan (BPJS), dites psikolog lebih dari satu jam. Hasilnya hari itu juga: demensia.'], ['Rujukan & obat', 'Puskesmas belum punya alat dan dokter, jadi dirujuk ke Kesdam. Obat hanya diminum sekali, lalu dibuang.'], ['Kemampuan menurun', 'Enam bulan pertama masih bisa bicara meski tidak nyambung. Tahun kedua hanya merespons “heh, heh”.'], ['Beban keluarga', 'Jemuran basah terus diangkat sampai dipasang empat gembok. Anak-anak tidak betah di rumah.']];
const KX = k => 200 + k * 304;
DECK.add({
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

/* ---------------- S31 · Kutipan kunci ---------------- */
const QT = [[0, 'Tapi saya nggak tahu kalau sakit gitu.', 'Ibu (narasumber)', 'Keluarga tidak mengenali gejala'], [1, 'Saya cuma psikolog, bukan dokter.', 'Psikolog Puskesmas, diceritakan Ibu', 'Keterbatasan layanan di Puskesmas'], [2, 'Saya tuh sehat, ngapain minum obat?', 'Bapak, diceritakan Ibu', 'Penderita tidak sadar dirinya sakit'], [3, 'Mah, aku nggak mau di rumah deh.', 'Anak, diceritakan Ibu', 'Dampak pada anak-anak']];
DECK.add({
  id: 's31', act: 6, title: 'Kutipan kunci', bg: '#1c1c1f',
  orbs: [[1500, 720, 1000, '#B85A9C', .35], [380, 300, 800, '#F0A04B', .3]],
  html: `<div class="qm">“</div><div class="ctr">1 / 4</div>
    <div class="kicker pre" style="position:absolute;left:260px;top:250px"><b>06</b><span>Studi kasus · kutipan kunci</span></div>
    ${QT.map((q, k) => `<div class="qwrap q${k}"><div class="qt">${quoteWords('“' + q[1] + '”')}</div><div class="who pre">— ${q[2]} · menit ${mmss(keyTime(q[0]))}</div><div class="mean pre"><i></i>${q[3]}</div></div>`).join('')}`,
  init(el) { gsap.set($$('.qwrap', el).slice(1), { autoAlpha: 0 }); },
  intro(el, tl) {
    tl.from($('.qm', el), { autoAlpha: 0, scale: .6, rotation: -10, duration: 1.4, ease: 'expo.out' }, 0);
    FX.fade(tl, $('.kicker', el), .2);
    showQ(el, tl, 0, .5);
  },
  steps: [1, 2, 3].map(k => (el, tl) => {
    tl.to($(`.q${k - 1}`, el), { autoAlpha: 0, y: -40, filter: 'blur(10px)', duration: .6, ease: 'power2.in' });
    tl.set($(`.q${k}`, el), { autoAlpha: 1 });
    tl.call(() => { $('.ctr', el).textContent = `${k + 1} / 4`; });
    tl.fromTo($('.qm', el), { rotation: 0 }, { rotation: 8, duration: .6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
    showQ(el, tl, k, .5);
  }),
  notes: 'Bacakan pelan. Setiap kutipan menunjukkan satu masalah: tidak mengenali gejala, keterbatasan layanan, penolakan obat, dampak pada anak.',
});
function showQ(el, tl, k, at) {
  const w = $$(`.q${k} .qt .w`, el);
  tl.from(w, { autoAlpha: 0, y: 30, filter: 'blur(10px)', duration: .6, ease: 'power3.out', stagger: .12 }, at);
  FX.fade(tl, $(`.q${k} .who`, el), at + w.length * .12 + .2);
  tl.fromTo($(`.q${k} .mean`, el), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: .6 }, at + w.length * .12 + .5);
}

/* ---------------- S32 · Analisis ---------------- */
const AN = [
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
DECK.add({
  id: 's32', act: 6, title: 'Analisis: kasus ↔ materi', bg: '#1f1f22',
  orbs: [[1520, 520, 900, '#F0A04B', .32], [380, 820, 800, '#7A6BB0', .35]],
  html: `${HD('06', 'Studi kasus · analisis', 'Kasus <span class="ol">&amp;</span> materi')}
    <svg class="links" viewBox="0 0 1920 1080"></svg>
    <div class="finds">${[0, 1].map(p => `<div class="page p${p}">${AN.slice(p * 4, p * 4 + 4).map((a, j) => `<div class="f pre"><span class="nd">${p * 4 + j + 1}</span><div><h4>${a[0]}</h4><p>${a[1]}</p>${a[3] ? `<span class="bp">${a[3]}</span>` : ''}</div></div>`).join('')}</div>`).join('')}</div>
    <div class="chips">${BAB.map(b => `<div class="bab pre"><b>${b[0]}</b><span>${b[1]}</span></div>`).join('')}</div>`,
  init(el) {
    const fs = $$('.f', el), bs = $$('.bab', el), finds = $('.finds', el), chips = $('.chips', el);
    const fy = j => finds.offsetTop + fs[j].offsetTop + fs[j].offsetHeight / 2;
    const by = j => chips.offsetTop + bs[j].offsetTop + bs[j].offsetHeight / 2;
    let h = '';
    AN.forEach((a, k) => a[2].forEach(b => { const y1 = fy(k), y2 = by(b); h += `<path data-k="${k}" d="M1120 ${y1} C 1260 ${y1}, 1280 ${y2}, 1420 ${y2}"/>`; }));
    $('.links', el).innerHTML = h;
    $$('.links path', el).forEach(p => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
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
      tl.to($$('.links path', el).filter(p => +p.dataset.k < 4), { opacity: 0, duration: .4 }, 0);
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

/* ---------------- S33 · Pelajaran & diskusi ---------------- */
const LS = [['Kenali gejala sejak dini', 'Perilaku aneh yang menetap bisa jadi tanda gangguan jiwa, bukan sekadar kebiasaan buruk.'], ['Manfaatkan layanan yang ada', 'Puskesmas dan BPJS bisa menjadi pintu awal diagnosis dan rujukan.'], ['Pengobatan butuh pendampingan', 'Penderita yang merasa sehat cenderung menolak obat; keluarga dan tenaga kesehatan perlu bekerja sama.'], ['Keluarga juga perlu dirawat', 'Pendamping menanggung beban fisik dan mental, butuh dukungan lingkungan dan pemerintah.']];
const DQ = ['Apa yang bisa berubah jika keluarga sejak awal tahu bahwa perilaku aneh Bapak adalah gejala sakit?', 'Bagaimana cara membantu penderita yang menolak minum obat karena merasa sehat?', 'Dukungan apa yang dibutuhkan keluarga pendamping dari lingkungan sekitar dan pemerintah?'];
DECK.add({
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

/* ---------------- S34 · Payung hukum ---------------- */
const LAW = [['1945', 'UUD 1945 Pasal 28H & 28I', 'Hak hidup sejahtera lahir batin dan memperoleh layanan kesehatan; hak bebas dari perlakuan diskriminatif.'], ['1999', 'UU No. 39 tentang HAM', 'Menjamin martabat dan hak asasi setiap manusia, termasuk ODGJ.'], ['2011', 'UU No. 19 (CRPD)', 'Pengesahan Konvensi PBB tentang Hak Penyandang Disabilitas.'], ['2016', 'UU No. 8 Penyandang Disabilitas', 'Gangguan jiwa jangka panjang termasuk disabilitas mental yang dilindungi.'], ['2017', 'Permenkes No. 54', 'Penanggulangan pemasungan pada orang dengan gangguan jiwa.'], ['2023', 'UU No. 17 tentang Kesehatan', 'Pasal 74–85 mengatur upaya kesehatan jiwa.']];
DECK.add({
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
  steps: [...LAW.slice(1).map((l, k) => (el, tl) => {
    tl.to($('.rail', el), { x: -(k + 1) * 640, duration: 1.3, ease: 'expo.inOut' });
    activate(el, tl, k + 1, .6);
  }), (el, tl) => {
    FX.up(tl, $('.pasal', el), 0);
    tl.from($$('.pasal .pp', el), { autoAlpha: 0, x: 30, duration: .6, stagger: .2 }, .4);
  }],
  notes: 'Dari UUD 1945 sampai UU Kesehatan 2023. Sorot UU 17/2023 Pasal 76 (larangan pasung) dan Pasal 77 (tanggung jawab pemerintah).',
});
function activate(el, tl, k, at) {
  const ys = $$('.yr', el);
  ys.forEach((y, j) => tl.to(y, { opacity: j === k ? 1 : .28, duration: .6 }, at));
  tl.to($('.y', ys[k]), { color: '#fff', duration: 1, ease: 'power2.inOut' }, at);
  tl.fromTo($('.pt', ys[k]), { scale: 0 }, { scale: 1, duration: .5, ease: 'back.out(3)' }, at + .2);
}

/* ---------------- S35 · Hak ODGJ ---------------- */
const IC = {
  hp: '<circle cx="25" cy="25" r="20"/><path d="M25 15v20M15 25h20"/>',
  in: '<circle cx="25" cy="25" r="20"/><path d="M25 22v13"/><path d="M25 15.5v.5"/>',
  ch: '<path d="M9 31 l7-7 a6 6 0 0 1 8.5 8.5 l-2.5 2.5 a6 6 0 0 1 -8.5 0"/><path d="M41 19 l-7 7 a6 6 0 0 1 -8.5 -8.5 l2.5 -2.5 a6 6 0 0 1 8.5 0"/><path d="M22 10 l2 5M28 40 l-2 -5"/>',
  bk: '<rect x="8" y="16" width="34" height="24" rx="4"/><path d="M18 16v-5h14v5M8 26h34"/>',
  vt: '<path d="M9 24h32v17H9z"/><path d="M17 13 l6 6 11-11"/>',
};
const HAK = [['hp', 'Layanan kesehatan jiwa', 'Aman, bermutu, dan terjangkau.'], ['in', 'Informasi yang jujur', 'Tentang kondisi dan pengobatannya.'], ['ch', 'Bebas pasung & kekerasan', 'Bebas dari penelantaran dan perlakuan merendahkan.'], ['bk', 'Pendidikan & pekerjaan', 'Dan kehidupan sosial yang setara.'], ['vt', 'Hak warga negara', 'Termasuk hak pilih.']];
DECK.add({
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

/* ---------------- S36 · Empat upaya ---------------- */
const RC = { x: 700, y: 640, r: 240 };
const LBL = [[700, 352], [1078, 640], [700, 928], [300, 640]];
const UP = [['Promotif', -90, 'Edukasi kesehatan jiwa di sekolah, kampus, tempat kerja, dan media.', '', 'sekolah · kampus · kerja · media'], ['Preventif', 0, 'Deteksi dini dan skrining, misalnya lewat program Cek Kesehatan Gratis.', [71.86, 2, ' juta'], 'penduduk sudah diskrining kesehatan jiwanya'], ['Kuratif', 90, 'Pengobatan oleh dokter, psikiater, dan psikolog di Puskesmas atau rumah sakit.', [6549, 0, ''], 'Puskesmas (64%) mampu memberi layanan kesehatan jiwa · Okt 2026'], ['Rehabilitatif', 180, 'Pemulihan agar ODGJ bisa kembali mandiri, bekerja, dan bersosialisasi.', '', 'mandiri · bekerja · bersosialisasi']];
const pt = a => [RC.x + RC.r * Math.cos(a * Math.PI / 180), RC.y + RC.r * Math.sin(a * Math.PI / 180)];
DECK.add({
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
    tl.call(() => FX.loop(gsap.to($('.dot', el), { attr: { r: 17 }, duration: .9, yoyo: true, repeat: -1, ease: 'sine.inOut' })), null, 2.2);
  },
  steps: UP.map((u, k) => (el, tl) => {
    const dot = $('.dot', el), sts = $$('.st', el), pcs = $$('.pc:not(.pi)', el);
    const target = 270 + k * 90;
    if (k === 0) el._a.a = -90;
    tl.to(el._a, { a: target, duration: k === 0 ? 1.8 : 1.1, ease: 'power2.inOut', onUpdate: () => { const [x, y] = pt(el._a.a); dot.setAttribute('cx', x); dot.setAttribute('cy', y); } });
    tl.call(() => sts.forEach((s, j) => s.classList.toggle('on', j === k)), null, k === 0 ? 1.6 : .9);
    tl.fromTo(sts[k], { scale: 1 }, { scale: 1.12, duration: .3, yoyo: true, repeat: 1 }, k === 0 ? 1.6 : .9);
    tl.to(k ? pcs[k - 1] : $('.pi', el), { autoAlpha: 0, x: -30, duration: .4 }, .3);
    tl.fromTo(pcs[k], { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: .7, ease: 'power3.out' }, k === 0 ? 1.4 : .7);
    if (u[3]) FX.count(tl, $('.c', pcs[k]), u[3][0], { dec: u[3][1], suf: u[3][2], dur: 1.6 }, 1);
  }),
  notes: 'Promotif (edukasi), preventif (skrining — 71,86 juta penduduk), kuratif (pengobatan — 6.549 Puskesmas mampu), rehabilitatif (pemulihan).',
});

/* ---------------- S37 · Siapa berperan ---------------- */
const RL = [['Keluarga', 300, ['Bawa ke layanan sejak gejala awal', 'Dampingi dan pastikan obat diminum rutin', 'Sabar, tidak menyalahkan, tidak memasung'], [140, 310, 500, 610], 'Lingkar 1 · paling dekat'], ['Masyarakat', 500, ['Terima ODGJ yang sudah pulih', 'Laporkan ODGJ telantar atau terpasung ke Puskesmas, Dinsos, atau desa', 'Hidupkan kader dan desa siaga sehat jiwa'], [680, 310, 500, 610], 'Lingkar 2 · lingkungan'], ['Mahasiswa', 700, ['Stop memakai “gila” sebagai candaan', 'Jangan rekam & sebar video ODGJ', 'Peka pada teman yang depresi', 'Tidak self-diagnose dari internet', 'Ikut kampanye 10 Oktober'], [1220, 310, 560, 610], 'Lingkar 3 · kita']];
const MHS = [['Stop candaan “gila”', 'Berhenti memakai kata “gila” atau nama gangguan jiwa sebagai ejekan.'], ['Jangan rekam & sebar', 'Tidak merekam, menertawakan, atau menyebarkan video ODGJ di media sosial.'], ['Peka pada teman', 'Arahkan teman yang menunjukkan tanda depresi ke konseling kampus atau profesional.'], ['Tidak self-diagnose', 'Jangan mendiagnosis diri atau orang lain hanya dari konten internet.'], ['Kampanye anti-stigma', 'Ikut Hari Kesehatan Jiwa Sedunia setiap 10 Oktober.']];
DECK.add({
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

/* ---------------- S38 · Kesimpulan ---------------- */
const KS = ['ODGJ mengalami gangguan pikiran, perasaan, dan perilaku yang mengganggu fungsi hidupnya. Gangguan ini punya penyebab ilmiah dan <span class="kw">bisa diobati</span>.', 'Di Indonesia jumlahnya besar, tetapi banyak yang belum tertangani karena <span class="kw">stigma</span>, mitos, dan keterbatasan layanan.', 'Pasung dan diskriminasi adalah <span class="kw">pelanggaran HAM</span> yang sudah dilarang undang-undang.', 'Nilai budaya seperti <span class="kw">gotong royong</span> dan kekeluargaan dapat menjadi kekuatan untuk mendukung pemulihan.'];
DECK.add({
  id: 's38', act: 9, title: 'Kesimpulan',
  orbs: [[1500, 300, 1000, '#7A6BB0', .45], [400, 920, 900, '#B85A9C', .4], [1700, 950, 700, '#F0A04B', .35]],
  html: `${HD('09', 'Penutup', 'Kesimpu<span class="ol">lan</span>')}
    <div class="rows">${KS.map((k, j) => `<div class="card pre"><span class="nd warm">${j + 1}</span><p>${k}</p></div>`).join('')}</div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: KS.map((k, j) => (el, tl) => {
    const c = $$('.rows .card', el)[j];
    tl.fromTo(c, { autoAlpha: 0, x: -60, filter: 'blur(10px)' }, { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: .8, ease: 'power3.out' });
    tl.to($('.kw', c), { backgroundSize: '100% 100%', duration: .8, ease: 'power2.inOut' }, .6);
  }),
  notes: 'Empat kesimpulan: bisa diobati, stigma, pelanggaran HAM, gotong royong.',
});

/* ---------------- S39 · Saran (morph) ---------------- */
const FROM = 'AIB YANG DISEMBUNYIKAN', TO = 'SAKIT YANG PERLU DIOBATI';
const spans = s => [...s].map(ch => `<span>${ch === ' ' ? ' ' : ch}</span>`).join('');
DECK.add({
  id: 's39', act: 9, title: 'Saran: aib → sakit yang perlu diobati',
  orbs: [[960, 480, 1200, '#7A6BB0', .5], [380, 920, 800, '#B85A9C', .4], [1600, 920, 800, '#F0A04B', .4]],
  html: `<div class="lbl"><div class="kicker pre"><b>09</b><span>Saran · keluarga & masyarakat perlu mengganti cara pandang</span></div></div>
    <div class="morph"><div class="mline disp from" style="font-size:70px">${spans(FROM)}</div><div class="mline disp to" style="font-size:70px">${spans(TO)}</div></div>
    <p class="small pre cap" style="position:absolute;left:0;right:0;top:520px;text-align:center;font-size:22px">dari sesuatu yang disembunyikan, menjadi sesuatu yang ditangani bersama</p>
    <p class="gov pre">Pemerintah perlu <b>menambah tenaga dan layanan kesehatan jiwa</b> sampai ke desa.</p>`,
  init(el) {
    const S = $$('.from span', el), T = $$('.to span', el), used = new Set();
    gsap.set(T, { opacity: 0 });
    el._pairs = T.map((t, j) => {
      if (t.textContent === ' ') return null;
      const i = S.findIndex((s, k) => !used.has(k) && s.textContent === t.textContent);
      if (i < 0) return null; used.add(i); return i;
    });
    el._unusedS = S.map((s, k) => k).filter(k => !used.has(k) && S[k].textContent !== ' ');
  },
  intro(el, tl) {
    FX.fade(tl, $('.lbl .kicker', el), 0);
    tl.from($$('.from span', el), { autoAlpha: 0, yPercent: 60, duration: .8, ease: 'expo.out', stagger: .035 }, .2);
  },
  steps: [
    (el, tl) => {
      const S = $$('.from span', el), T = $$('.to span', el), m = $('.morph', el);
      const ox = e => e.offsetLeft + e.parentElement.offsetLeft;
      S.forEach(s => gsap.set(s, { x: 0 }));
      el._pairs.forEach((i, j) => {
        if (i == null) return;
        const dx = ox(T[j]) - ox(S[i]), d = Math.random() * .5;
        tl.to(S[i], { x: dx, rotation: 360, duration: 1.8, ease: 'expo.inOut' }, .2 + d);
        tl.to(S[i], { keyframes: { y: [0, -90 - Math.random() * 60, 0] }, duration: 1.8, ease: 'sine.inOut' }, .2 + d);
        tl.to(S[i], { color: '#fff', webkitTextStrokeColor: 'rgba(255,255,255,0)', duration: 1, ease: 'power2.inOut' }, 1 + d);
      });
      el._unusedS.forEach(k => tl.to(S[k], { y: gsap.utils.random(-260, 260), x: gsap.utils.random(-200, 200), rotation: gsap.utils.random(-180, 180), scale: .3, opacity: 0, duration: 1.2, ease: 'power3.in' }, .1));
      T.forEach((t, j) => { if (el._pairs[j] == null && t.textContent !== ' ') tl.fromTo(t, { opacity: 0, scale: 0, rotation: gsap.utils.random(-180, 180), y: -60 }, { opacity: 1, scale: 1, rotation: 0, y: 0, duration: .9, ease: 'back.out(2)' }, 1.5 + Math.random() * .4); });
      tl.call(() => { el._pairs.forEach((i, j) => { if (i != null) { gsap.set(T[j], { opacity: 1 }); gsap.set(S[i], { opacity: 0 }); } }); }, null, 2.6);
      tl.to(m, { scale: 1.04, duration: .4, yoyo: true, repeat: 1, ease: 'power2.out' }, 2.6);
      FX.fade(tl, $('.cap', el), 2.8);
    },
    (el, tl) => FX.up(tl, $('.gov', el)),
  ],
  notes: 'Momen puncak: "aib yang disembunyikan" berubah menjadi "sakit yang perlu diobati". Lalu saran untuk pemerintah.',
});

/* ---------------- S40 · Daftar pustaka ---------------- */
const REF = [['Kementerian Kesehatan RI · 2025', 'Kepmenkes No. HK.01.07/MENKES/970/2025 tentang PNPK Tata Laksana Skizofrenia'], ['Badan Kebijakan Pembangunan Kesehatan, Kemenkes RI · 2024', 'Survei Kesehatan Indonesia (SKI) 2023 — factsheet kesehatan jiwa'], ['Republik Indonesia · 2014', 'Undang-Undang No. 18 Tahun 2014 tentang Kesehatan Jiwa'], ['Republik Indonesia · 2023', 'Undang-Undang No. 17 Tahun 2023 tentang Kesehatan'], ['Kementerian Kesehatan RI · 2017', 'Permenkes No. 54 Tahun 2017 tentang Penanggulangan Pemasungan pada ODGJ'], ['Rusdi Maslim', 'Buku Saku Diagnosis Gangguan Jiwa: Rujukan Ringkas PPDGJ-III dan DSM-5'], ['Kumparan · 2025', 'Kemenkes Catat Ada 1.750 Kasus Pemasungan di Indonesia pada 2024'], ['Metro TV News · 13 Oktober 2026', 'Kemenkes: 9 dari 10 Penderita Depresi Belum Tertangani Medis'], ['RCTI+ / IDX Channel · 11 Oktober 2026', 'Kemenkes: Penderita Depresi yang Terima Layanan Kesehatan Baru 12,7 Persen'], ['detikHealth · 2024', 'Kemenkes RI Ungkap Kemungkinan Pemicu Kasus Skizofrenia Tinggi di Yogyakarta'], ['Antara · 2026', 'Kemenkes Sebut Ada 1.443 Kasus Pemasungan pada 2026'], ['SIP Law Firm', 'Penanganan Kesehatan Mental menurut UU 17/2023']];
DECK.add({
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

/* ---------------- S41 · Terima kasih ---------------- */
DECK.add({
  id: 's41', cls: 'cover s41', act: 9, title: 'Terima kasih', hud: false, morph: 2,
  bg: '#4a3d58',
  orbs: [[260, 300, 1500, '#7A6BB0', .95], [980, 700, 1300, '#B85A9C', .9], [1720, 380, 1400, '#F0A04B', .85], [1300, 1020, 900, '#D9283F', .5]],
  html: `<div class="big"><svg class="sw"><text font-size="400" style="fill:#fff">ODGJ</text></svg></div>
    <div class="disp tk pre" style="position:absolute;left:0;right:0;top:330px;text-align:center;font-size:150px">Terima kasih</div>
    <div class="tag pre" style="top:620px">Memandang manusia, bukan labelnya.</div>
    <div class="meta-l pre">${I.matkul}<br>${I.tahun}</div>
    <div class="meta-r pre"><b>${I.kelompok}</b>${I.anggota.join(' · ')}<br>Dosen: ${I.dosen}</div>`,
  init(el) { el._t = FX.svgText($('svg', el)); },
  intro(el, tl) {
    tl.from(el._t, { yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .12 }, .3);
    tl.fromTo(el._t, { fill: 'rgba(255,255,255,0)' }, { fill: 'rgba(255,255,255,1)', duration: 1.2, stagger: .12 }, .5);
    tl.to(el._t, { y: -80, opacity: 0, filter: 'blur(14px)', duration: .8, ease: 'power3.in', stagger: .08 }, 3);
    FX.rise(tl, $('.tk', el), 3.5, { stagger: .04 });
    FX.fade(tl, $('.tag', el), 4.4, { duration: 1.2 });
    tl.fromTo($('.meta-r', el), { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, 4.6);
    tl.fromTo($('.meta-l', el), { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, 4.6);
  },
  notes: 'Callback ke cover: ODGJ kini terisi penuh (solid). Terima kasih — buka sesi tanya jawab.',
});
})();
