/* =========================================================
   S14–S26 · Data & Fakta, Faktor Penyebab, Sosial Budaya
   ========================================================= */
(() => {
const { $, $$ } = FX;
const PERSON = `<svg viewBox="0 0 60 120"><circle cx="30" cy="17" r="15"/><path d="M6 120 V63 a24 24 0 0 1 48 0 V120 Z"/></svg>`;

/* ---------------- S14 · 9 dari 10 ---------------- */
DECK.add({
  id: 's14', act: 3, title: 'Bab 03 · 9 dari 10', divider: true,
  orbs: [[960, 520, 1400, '#7A6BB0', .55], [280, 920, 900, '#2F6FD6', .4], [1650, 180, 800, '#D9283F', .25]],
  html: `<div class="chap">03</div>
    <div class="kicker cx pre" style="position:absolute;left:960px;top:118px"><b>03</b><span>Data & fakta</span></div>
    <div class="head"><div class="disp">9 dari 10</div></div>
    <div class="people">${Array.from({ length: 10 }, () => `<span class="pp">${PERSON}</span>`).join('')}</div>
    <div class="cap pre">penderita depresi <b>belum</b> tertangani medis</div>
    <div class="pct pre"><div class="disp"><span class="pc">0</span>%</div><div class="small">yang mendapat pengobatan</div></div>
    <p class="src">Sumber: Kemenkes, Oktober 2026</p>`,
  intro(el, tl) {
    tl.from($('.chap', el), { x: 600, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0);
    FX.fade(tl, $('.kicker', el), .2);
    FX.rise(tl, $('.head .disp', el), .3);
    tl.from($$('.pp', el), { autoAlpha: 0, y: 40, scale: .7, duration: .6, ease: 'back.out(2)', stagger: .07 }, .7);
  },
  steps: [
    (el, tl) => {
      const pp = $$('.pp', el);
      pp.slice(0, 9).forEach((p, k) => tl.to(p, { opacity: .14, scale: .94, duration: .5, ease: 'power2.out' }, k * .32));
      tl.to($('.pp:last-child path', el), { fill: '#A8DDA0', duration: .6 }, 2.8).to($('.pp:last-child circle', el), { fill: '#A8DDA0', duration: .6 }, 2.8)
        .to(pp[9], { filter: 'drop-shadow(0 0 22px rgba(168,221,160,.85))', scale: 1.08, duration: .8 }, 2.8);
      FX.up(tl, $('.cap', el), 3.1);
    },
    (el, tl) => { FX.fade(tl, $('.pct', el), 0); FX.count(tl, $('.pc', el), 12.7, { dec: 1, dur: 1.8 }, 0); },
  ],
  notes: 'Dari 10 penderita depresi, hanya sekitar 1 yang mendapat pengobatan: 12,7%. Beri jeda saat figur meredup.',
});

/* ---------------- S15 · Dashboard ---------------- */
DECK.add({
  id: 's15', act: 3, title: 'Dashboard data nasional',
  orbs: [[1620, 280, 1000, '#7A6BB0', .5], [280, 920, 900, '#2F6FD6', .45]],
  html: `${HD('03', 'Data & fakta · Survei Kesehatan Indonesia 2023', 'Dashboard <span class="ol">nasional</span>')}
    <div class="dash">
      <div class="card pre"><div class="v"><span class="c">0</span><small> / 1.000</small></div><p>rumah tangga punya anggota <b>bergejala psikosis/skizofrenia</b></p><div class="s">SKI 2023</div></div>
      <div class="card pre"><div class="v">±<span class="c">0</span><small> juta</small></div><p>perkiraan penderita <b>skizofrenia</b> di Indonesia</p><div class="s">PNPK Kemenkes 2025</div></div>
      <div class="card pre"><svg class="ring" viewBox="0 0 150 150"><circle cx="75" cy="75" r="64" stroke="rgba(17,17,17,.12)"/><circle class="arc" cx="75" cy="75" r="64" stroke="url(#gradBG)" stroke-linecap="round" transform="rotate(-90 75 75)" stroke-dasharray="402.1" stroke-dashoffset="402.1"/></svg><div class="v" style="margin-top:18px"><span class="c">0</span>%</div><p>pengidap psikosis/skizofrenia <b>sudah berobat</b></p><div class="s">SKI 2023</div></div>
      <div class="card pre"><div class="v"><span class="c">0</span>%</div><p>prevalensi <b>depresi</b> (usia 15 tahun ke atas)</p><div class="young pre"><span class="tag">usia kita</span><span style="font:700 20px var(--body)">15–24 tahun</span><span class="v2">2%</span></div><div class="s">SKI 2023</div></div>
    </div>
    <p class="src">Label “psikosis/skizofrenia” dipakai karena petugas survei hanya bisa menangkap gejala.</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    const c = $$('.dash .card', el)[0];
    FX.up(tl, c, .4); FX.count(tl, $('.c', c), 4, { dur: 1.2 }, .6);
    FX.fade(tl, $('.src', el), 1);
  },
  steps: [
    (el, tl) => { const c = $$('.dash .card', el)[1]; FX.up(tl, c, 0); FX.count(tl, $('.c', c), 2.6, { dec: 1 }, .2); },
    (el, tl) => {
      const c = $$('.dash .card', el)[2]; FX.up(tl, c, 0); FX.count(tl, $('.c', c), 62.9, { dec: 1 }, .2);
      tl.to($('.arc', c), { strokeDashoffset: 402.1 * (1 - .629), duration: 1.6, ease: 'power2.out' }, .2);
    },
    (el, tl) => {
      const c = $$('.dash .card', el)[3]; FX.up(tl, c, 0); FX.count(tl, $('.c', c), 1.4, { dec: 1 }, .2);
      tl.fromTo($('.young', c), { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: .7, ease: 'back.out(2)' }, 1.2)
        .fromTo($('.young .tag', c), { scale: .5 }, { scale: 1, duration: .7, ease: 'elastic.out(1.2,.4)' }, 1.3);
    },
  ],
  notes: '4 dari 1.000 rumah tangga punya anggota bergejala psikosis. ±2,6 juta penderita skizofrenia. 62,9% sudah berobat. Depresi 1,4%, tetapi 2% di usia 15–24: usia kita.',
});

/* ---------------- S16 · Tenaga ahli ---------------- */
DECK.add({
  id: 's16', act: 3, title: 'Kesenjangan tenaga ahli',
  orbs: [[1500, 330, 1000, '#7A6BB0', .5], [380, 880, 900, '#D9283F', .3]],
  html: `${HD('03', 'Data & fakta · Kemenkes 2026', 'Kesenjangan <span class="ol">tenaga ahli</span>')}
    <div class="bars">
      <p class="small" style="margin-bottom:10px;font-size:21px">Jumlah penduduk yang dilayani oleh <b style="color:#fff">1 psikiater</b></p>
      <div class="br r1 pre"><span class="who">WHO</span><span class="ratio">1 : 30.000</span><span class="bar" style="width:180px;background:#A8DDA0"></span></div>
      <div class="br r2 pre"><span class="who">RI</span><span class="ratio">1 : <span class="c">30.000</span></span><span class="bar" style="width:1080px;background:linear-gradient(90deg,#7A6BB0,#D9283F)"></span></div>
    </div>
    <div class="callout pre"><b>≈ 1/6</b>dari standar WHO · baru <b style="font-size:inherit;font-family:var(--body);margin:0">1.495</b> psikiater</div>
    <div class="dots pre"><canvas width="3280" height="740" style="width:1640px;height:370px"></canvas></div>
    <div class="dl pre"><b class="l">213</b> dari 3.513 psikolog klinis bertugas di <b>Puskesmas</b></div>`,
  init(el) {
    const cv = $('canvas', el), g = cv.getContext('2d'), N = 3513, LIT = 213, cols = 131, sp = 12.5;
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const idx = [...Array(N).keys()]; for (let k = N - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [idx[k], idx[j]] = [idx[j], idx[k]]; }
    const lit = new Set(idx.slice(0, LIT)), order = idx.slice(0, LIT);
    el._dots = { p: 0, l: 0 };
    el._draw = () => {
      const { p, l } = el._dots; g.setTransform(2, 0, 0, 2, 0, 0); g.clearRect(0, 0, 1640, 370);
      const shown = Math.floor(p * N), on = new Set(order.slice(0, Math.floor(l * LIT)));
      for (let k = 0; k < shown; k++) {
        const x = (k % cols) * sp + 6, y = Math.floor(k / cols) * sp + 6;
        g.beginPath(); g.arc(x, y, on.has(k) ? 4.4 : 3.4, 0, 6.283);
        g.fillStyle = on.has(k) ? '#A8DDA0' : 'rgba(255,255,255,.2)'; g.fill();
      }
    };
    el._lit = lit;
  },
  intro(el, tl) { hdIn(el, tl); FX.fade(tl, $('.bars .small', el), .4); tl.fromTo($('.r1', el), { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: .7 }, .6).from($('.r1 .bar', el), { scaleX: 0, duration: .8, ease: 'power3.out' }, .8); },
  steps: [
    (el, tl) => {
      tl.fromTo($('.r2', el), { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: .6 });
      tl.from($('.r2 .bar', el), { scaleX: 1 / 6, duration: 2.4, ease: 'power2.inOut' }, .4);
      FX.count(tl, $('.r2 .c', el), 180000, { from: 30000, dur: 2.4, ease: 'power2.inOut' }, .4);
    },
    (el, tl) => FX.up(tl, $('.callout', el)),
    (el, tl) => {
      tl.to([$('.bars', el), $('.callout', el)], { autoAlpha: 0, y: -40, duration: .6, ease: 'power2.in' });
      FX.fade(tl, $('.dots', el), .5, { duration: .2 });
      tl.to(el._dots, { p: 1, duration: 1.6, ease: 'power1.inOut', onUpdate: el._draw }, .6);
      tl.to(el._dots, { l: 1, duration: 2, ease: 'power2.out', onUpdate: el._draw }, 2.3);
      FX.up(tl, $('.dl', el), 2.3);
    },
  ],
  notes: 'Standar WHO 1 psikiater untuk 30.000 penduduk; di Indonesia 1 : 180.000, baru ±1/6 standar (1.495 psikiater). Dari 3.513 psikolog klinis, hanya 213 yang ada di Puskesmas — titik hijau.',
});

/* ---------------- S17 · Provinsi ---------------- */
const PROV = [['DI Yogyakarta', 9.3, 'linear-gradient(90deg,#B85A9C,#D9283F)'], ['Jawa Tengah', 6.5, 'linear-gradient(90deg,#5d4f99,#7A6BB0)'], ['Sulawesi Barat', 5.9, 'linear-gradient(90deg,#1f4fa8,#2F6FD6)']];
DECK.add({
  id: 's17', act: 3, title: 'Provinsi tertinggi',
  orbs: [[1550, 620, 1000, '#D9283F', .32], [300, 300, 900, '#7A6BB0', .5]],
  html: `${HD('03', 'Data & fakta · SKI 2023', 'Provinsi <span class="ol">tertinggi</span>', 'h3', 'Proporsi rumah tangga dengan anggota bergejala psikosis/skizofrenia, per mil (‰).')}
    <div class="chart">${PROV.map(p => `<div class="pr"><span class="nm">${p[0]}</span><div class="track"><div class="bar" style="width:${p[1] / 10 * 1180}px;background:${p[2]}"><span class="c">0</span></div></div></div>`).join('')}
      <div class="avg pre" style="left:${400 + 4 / 10 * 1180}px"><span>rata-rata nasional ±4‰</span></div></div>
    <p class="lead pre" style="position:absolute;left:140px;top:880px;font-size:27px">DI Yogyakarta: lebih dari <b>dua kali</b> rata-rata nasional.</p>
    <p class="src" style="left:auto;right:140px">Sumber: SKI 2023 · detikHealth 2024</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    $$('.pr', el).forEach((r, k) => {
      tl.from($('.nm', r), { autoAlpha: 0, x: -30, duration: .6 }, .5 + k * .25);
      tl.from($('.bar', r), { scaleX: 0, duration: 1.4, ease: 'expo.out' }, .6 + k * .25);
      FX.count(tl, $('.c', r), PROV[k][1], { dec: 1, dur: 1.4, suf: '‰' }, .6 + k * .25);
    });
    FX.fade(tl, $('.src', el), 1.2);
  },
  steps: [(el, tl) => { tl.fromTo($('.avg', el), { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, duration: .8, ease: 'expo.out' }); FX.up(tl, $('.lead.pre', el), .4); }],
  notes: 'DIY 9,3‰, Jawa Tengah 6,5‰, Sulawesi Barat 5,9‰. Rata-rata nasional 4 per 1.000 rumah tangga.',
});

/* ---------------- S18 · Biopsikososial ---------------- */
const VN = [
  ['Biologis', '#2F6FD6', 960, 470, 960, 370, ['Riwayat keluarga (genetik)', 'Ketidakseimbangan zat kimia otak', 'Komplikasi kehamilan atau kelahiran', 'Infeksi otak, cedera kepala', 'Narkoba dan alkohol'], 'left:1300px;top:250px'],
  ['Psikologis', '#9d8fe0', 830, 690, 745, 750, ['Trauma masa kecil', 'Pola asuh penuh kekerasan atau penelantaran', 'Peristiwa hidup yang sangat menekan', 'Cara mengelola stres yang kurang sehat'], 'left:140px;top:600px;width:440px'],
  ['Sosial', '#F0A04B', 1090, 690, 1175, 750, ['Kemiskinan, pengangguran', 'Konflik keluarga', 'Perundungan, diskriminasi', 'Dukungan sosial lemah', 'Tempat tinggal buruk'], 'left:1380px;top:600px;width:420px'],
];
DECK.add({
  id: 's18', act: 4, title: 'Model biopsikososial', morph: 1.9,
  orbs: [[960, 470, 640, '#2F6FD6', .7], [830, 690, 640, '#7A6BB0', .7], [1090, 690, 640, '#F0A04B', .6]],
  html: `${HD('04', 'Faktor penyebab', 'Model <span class="ol">biopsikososial</span>')}
    <svg class="venn" viewBox="0 0 1920 1080">${VN.map(v => `<g class="vc"><circle cx="${v[2]}" cy="${v[3]}" r="210" stroke="${v[1]}" fill="${v[1]}" fill-opacity=".1"/></g>`).join('')}
      <circle class="core" cx="960" cy="617" r="14" fill="#fff"/></svg>
    ${VN.map(v => `<div class="vl cc pre" style="left:${v[4]}px;top:${v[5]}px;color:${v[1]}">${v[0]}</div>`).join('')}
    ${VN.map(v => `<div class="list pre" style="${v[7]};color:${v[1]}"><h5>${v[0]}</h5><ul>${v[6].map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}`,
  init(el) { $$('.vc circle', el).forEach(c => gsap.set(c, { strokeDasharray: 1320, strokeDashoffset: 1320 })); gsap.set($('.core', el), { autoAlpha: 0 }); },
  intro(el, tl) {
    hdIn(el, tl);
    tl.to($$('.vc circle', el), { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: .2 }, .5);
    tl.fromTo($$('.vl', el), { autoAlpha: 0, scale: .7 }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .15 }, 1.2);
    tl.to($('.core', el), { autoAlpha: 1, duration: .4 }, 2).to($('.core', el), { attr: { r: 22 }, duration: .6, yoyo: true, repeat: 1 }, 2);
    tl.call(() => FX.loop(gsap.to($('.core', el), { opacity: .4, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
  },
  steps: VN.map((v, k) => (el, tl) => {
    const cs = $$('.vc circle', el), ls = $$('.list', el);
    cs.forEach((c, j) => tl.to(c, { attr: { r: j === k ? 232 : 210 }, fillOpacity: j === k ? .28 : .07, duration: .8, ease: 'expo.out' }, 0));
    ls.slice(0, k).forEach(l => tl.to(l, { opacity: .5, duration: .5 }, 0));
    FX.up(tl, ls[k], .2);
    tl.from($$('li', ls[k]), { autoAlpha: 0, x: -20, duration: .5, stagger: .08 }, .4);
    tl.to(FX.orb(k), { scale: .8, opacity: .9, duration: 1, ease: 'expo.out', overwrite: 'auto' }, 0);
    [0, 1, 2].filter(j => j !== k).forEach(j => tl.to(FX.orb(j), { scale: .6, opacity: .5, duration: 1, overwrite: 'auto' }, 0));
  }),
  notes: 'Gangguan jiwa hampir tidak pernah satu sebab. Biologis (genetik, zat kimia otak), psikologis (trauma, pola asuh), sosial (kemiskinan, bullying). Ketiganya saling tumpang-tindih.',
});

/* ---------------- S19 · Pesan kunci ---------------- */
DECK.add({
  id: 's19', act: 4, title: 'Pesan kunci: bukan guna-guna',
  orbs: [[960, 560, 1300, '#7A6BB0', .42], [380, 180, 700, '#2F6FD6', .3]],
  html: `${['Bukan guna-guna.', 'Bukan kutukan.', 'Bukan kurang iman.'].map((t, k) => `<div class="ln o disp ol l${k} ${k ? 'pre' : ''}" style="font-size:96px"><span class="strike">${t}<i></i></span></div>`).join('')}
    <div class="fin" style="top:430px"><div class="disp pre f1">Bisa dialami</div><div class="disp pre f2">siapa saja.</div><div class="disp pre f3"><span class="hlw">Bisa diobati.</span></div></div>`,
  intro(el, tl) { FX.rise(tl, $('.l0', el), .2, { stagger: .035 }); },
  steps: [0, 1, 2].map(k => (el, tl) => {
    const ln = $(`.l${k}`, el);
    FX.strike(tl, $('.strike', ln), 0, { dur: .55 });
    tl.to(ln, { y: -290 + k * 56, scale: .42, opacity: .45, duration: 1, ease: 'expo.inOut' }, .7);
    if (k < 2) FX.rise(tl, $(`.l${k + 1}`, el), 1.2, { stagger: .035 });
    else {
      ['.f1', '.f2'].forEach((s, j) => FX.rise(tl, $(s, el), 1.3 + j * .25));
      tl.fromTo($('.f3', el), { autoAlpha: 0, scale: .8, filter: 'blur(12px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' }, 2.1);
    }
  }),
  notes: 'Ucapkan tiap kalimat lalu klik untuk mencoretnya. Pesan akhir: bisa dialami siapa saja, dan bisa diobati.',
});

/* ---------------- S20 · Bab 05 ---------------- */
DECK.add({
  id: 's20', cls: 'divider s20', act: 5, title: 'Bab 05 · Perspektif sosial budaya', divider: true, hud: false,
  bg: '#232327',
  orbs: [[1500, 300, 1250, '#1f3f8f', .85], [380, 860, 1000, '#7A6BB0', .55]],
  html: `<div class="num" style="left:-40px;top:190px"><svg class="sw" style="height:560px"><text font-size="700">05</text></svg></div>
    <div class="body" style="left:1000px;top:280px">
      <div class="kicker pre"><b>05</b><span>Perspektif sosial budaya</span></div>
      <div class="q" style="margin-top:44px;font-size:62px">${quoteWords('Cara budaya memaknai gangguan jiwa menentukan cara masyarakat memperlakukannya.', 'jw ol')}</div>
      <p class="small pre" style="margin-top:40px;font-size:22px">Inti kaitan ODGJ dengan ISBD: dari pengucilan sampai pemasungan.</p>
    </div>`,
  init(el) { el._t = FX.svgText($('svg', el)); $$('svg text', el).forEach(t => t.style.stroke = 'rgba(255,255,255,.55)'); },
  intro(el, tl) {
    tl.from($('.num svg', el), { x: 1300, duration: 1.8, ease: 'expo.out' }, 0);
    FX.draw(tl, el._t, 0, { dur: 2, stagger: .25 });
    FX.fade(tl, $('.kicker', el), .6);
    tl.from($$('.q .w', el), { autoAlpha: 0, y: 30, filter: 'blur(10px)', duration: .6, stagger: .11, ease: 'power3.out' }, .9);
    FX.fill(tl, $$('.q .jw', el), '+=.3', { dur: 1.2 });
    FX.fade(tl, $('.small', el), '-=.6');
  },
  notes: 'Masuk ke inti ISBD: budaya memberi makna pada gangguan jiwa, dan makna itu menentukan perlakuan.',
});

/* ---------------- S21 · Empat wajah stigma ---------------- */
const STG = [['Stigma publik', 'Masyarakat menganggap ODGJ berbahaya, malas, tidak bisa sembuh, atau aib keluarga.', 'berbahaya', -6], ['Stigma diri', 'ODGJ ikut percaya label itu, merasa malu, lalu menolak berobat.', 'malu', 5], ['Stigma keluarga', 'Keluarga menyembunyikan anggota yang sakit karena takut dikucilkan tetangga.', 'aib', -4], ['Stigma dalam bahasa', 'Kata “gila”, “sinting”, atau “stres” dipakai sebagai ejekan dan candaan, termasuk di media sosial.', 'gila lu!', 7]];
DECK.add({
  id: 's21', act: 5, title: 'Empat wajah stigma', bg: '#28282b',
  orbs: [[1500, 300, 1000, '#1f3f8f', .7], [700, 920, 1000, '#7A6BB0', .5], [280, 200, 600, '#D9283F', .22]],
  html: `<div class="vt"><div class="disp" style="font-size:140px">Stig<span class="ol">ma</span></div></div>
    <div class="quad">${STG.map((s, k) => `<div class="card pre"><span class="sticker" style="transform:rotate(${s[3]}deg)">${s[2]}</span><div class="ix">0${k + 1}</div><h4>${s[0]}</h4><p>${s[1]}</p></div>`).join('')}</div>`,
  intro(el, tl) { FX.rise(tl, $('.vt .disp', el), 0, { stagger: .05 }); },
  steps: STG.map((s, k) => (el, tl) => {
    const c = $$('.quad .card', el)[k];
    FX.up(tl, c, 0);
    tl.fromTo($('.sticker', c), { scale: 2.2, autoAlpha: 0, rotation: s[3] * 3 }, { scale: 1, autoAlpha: 1, rotation: s[3], duration: .4, ease: 'power4.in' }, .5)
      .to(c, { keyframes: { y: [0, 5, 0] }, duration: .25 }, .9);
  }),
  notes: 'Stigma = label negatif. Empat bentuk: publik, diri sendiri, keluarga, dan bahasa sehari-hari (termasuk candaan "gila lu").',
});

/* ---------------- S22 · Mitos vs fakta ---------------- */
const MF = [
  ['Gangguan jiwa disebabkan guna-guna, kerasukan, atau kutukan', 'Gangguan jiwa punya penyebab biologis, psikologis, dan sosial yang bisa dijelaskan secara ilmiah.', 'Punya penyebab ilmiah'],
  ['ODGJ pasti berbahaya dan suka mengamuk', 'Sebagian besar ODGJ tidak melakukan kekerasan. Mereka justru lebih sering menjadi korban kekerasan.', 'Lebih sering jadi korban'],
  ['Gangguan jiwa tidak bisa sembuh', 'Dengan pengobatan rutin dan dukungan keluarga, banyak ODGJ bisa pulih dan kembali beraktivitas.', 'Bisa pulih'],
  ['Depresi hanya tanda kurang bersyukur atau kurang iman', 'Depresi adalah gangguan kesehatan yang nyata dan butuh penanganan, sama seperti penyakit fisik.', 'Depresi = gangguan nyata'],
  ['Ke psikolog atau psikiater berarti “orang gila”', 'Konsultasi kesehatan jiwa sama wajarnya dengan periksa ke dokter umum.', 'Konsultasi itu wajar'],
];
const ROT = [0, -2.5, 2, -1.5, 1.5];
const mfSteps = [];
MF.forEach((m, k) => {
  mfSteps.push((el, tl) => {
    const c = $$('.fc', el)[k];
    tl.to(c, { rotationY: 180, duration: 1.1, ease: 'expo.inOut' }).to(c, { keyframes: { scale: [1, 1.06, 1] }, duration: 1.1, ease: 'sine.inOut' }, 0);
  });
  if (k < MF.length - 1) mfSteps.push((el, tl) => {
    const cs = $$('.fc', el), c = cs[k], d = $$('.done .d', el)[k];
    tl.to(c, { x: 1100, y: -150 + k * 110, scale: .3, autoAlpha: 0, duration: .9, ease: 'expo.in' });
    FX.up(tl, d, .6);
    cs.slice(k + 1).forEach((o, j) => tl.to(o, { y: j * 16, scale: 1 - j * .035, rotation: j ? ROT[k + 1 + j] : 0, duration: .8, ease: 'expo.out' }, .5));
  });
});
DECK.add({
  id: 's22', act: 5, title: 'Mitos vs fakta (kuis)',
  orbs: [[640, 560, 1100, '#2F6FD6', .5], [1600, 300, 900, '#7A6BB0', .45]],
  html: `${HD('05', 'Perspektif sosial budaya · kuis', 'Mitos <span class="ol">atau</span> fakta?')}
    <div class="deck" style="left:140px;width:1000px;height:540px">${MF.map((m, k) => `<div class="fc" style="z-index:${10 - k}"><div class="face m"><div class="lb"><span>Mitos?</span><span>${k + 1} / 5</span></div><div class="tx">${m[0]}</div><div class="qz">Mitos atau fakta? Tebak dulu…</div></div><div class="face f"><div class="lb"><span>Fakta</span><span>${k + 1} / 5</span></div><div class="tx">${m[1]}</div></div></div>`).join('')}</div>
    <div class="done" style="left:1260px">${MF.map((m, k) => `<div class="d pre"><i>${k + 1}</i>${m[2]}</div>`).join('')}</div>`,
  init(el) { $$('.fc', el).forEach((c, k) => gsap.set(c, { y: k * 16, scale: 1 - k * .035, rotation: ROT[k], transformPerspective: 2200 })); },
  intro(el, tl) { hdIn(el, tl); tl.from($$('.fc', el).reverse(), { autoAlpha: 0, y: 140, rotation: 10, duration: .9, ease: 'expo.out', stagger: .08 }, .4); },
  steps: mfSteps,
  notes: 'Kuis ke audiens: bacakan mitosnya, minta audiens menebak, lalu klik untuk membalik. Klik berikutnya memindahkan kartu dan memunculkan mitos baru.',
});

/* ---------------- S23 · Pasung ---------------- */
DECK.add({
  id: 's23', act: 5, title: 'Pasung', bg: '#111113', grain: .2,
  orbs: [[960, 520, 1100, '#5e0f1d', .6]],
  morph: 2,
  html: `<div class="bar t"></div><div class="bar b"></div>
    <div class="ttl"><div class="kicker pre" style="justify-content:center"><b>05</b><span>Perspektif sosial budaya</span></div><div class="disp ol" style="margin-top:30px">Pasung</div></div>
    <div class="defn"><p class="lead pre">Tindakan membatasi gerak ODGJ, misalnya dengan:</p>
      <div class="forms"><span class="pre">merantai</span><span class="pre">memasang balok kayu di kaki</span><span class="hot pre">mengurung di kamar / kandang<small>kini juga dihitung pasung</small></span></div></div>
    <div class="nums">
      <div class="pre"><div class="n"><span class="gh">6,6%</span><span class="gh">6,6%</span><span class="gh">6,6%</span><span class="c">0</span></div><p>rumah tangga pernah memasung anggota dengan psikosis/skizofrenia</p></div>
      <div class="pre"><div class="n"><span class="gh">1.750</span><span class="gh">1.750</span><span class="gh">1.750</span><span class="c">0</span></div><p>kasus pemasungan tercatat pada 2024</p></div>
      <div class="pre"><div class="n"><span class="gh">±1.443</span><span class="gh">±1.443</span><span class="gh">±1.443</span><span class="c">0</span></div><p>kasus pada triwulan I 2026</p></div>
    </div>
    <p class="note pre">Angka sebenarnya diyakini lebih besar: banyak keluarga enggan melapor.</p>
    <p class="src pre">Sumber: SKI 2023 · Kemenkes via Kumparan (2025) dan Antara (2026)</p>`,
  init(el) { gsap.set($$('.gh', el), { opacity: 0 }); },
  intro(el, tl) {
    tl.from($('.bar.t', el), { x: -1920, duration: 2.4, ease: 'power3.inOut' }, 0)
      .from($('.bar.b', el), { x: 1920, duration: 2.4, ease: 'power3.inOut' }, 0)
      .to([$('.bar.t', el), $('.bar.b', el)], { keyframes: { scaleY: [1, 2.5, 1] }, duration: .3 }, 2.4);
    FX.fade(tl, $('.ttl .kicker', el), .4, { duration: 1 });
    tl.from($('.ttl .disp', el), { autoAlpha: 0, letterSpacing: '.5em', duration: 2.4, ease: 'power2.out' }, .4);
  },
  steps: [
    (el, tl) => {
      FX.up(tl, $('.defn .lead', el), 0, { duration: 1.2 });
      tl.fromTo($$('.forms span', el), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', stagger: .4 }, .6);
      tl.to($('.forms .hot', el), { boxShadow: '0 0 50px rgba(217,40,63,.55)', duration: 1.2 }, 1.8);
    },
    (el, tl) => {
      tl.to($('.defn', el), { autoAlpha: 0, y: -20, duration: .8 });
      const ns = $$('.nums > div', el);
      FX.up(tl, ns, .6, { duration: 1.2, stagger: .4 });
      [[6.6, 1, '', '%'], [1750, 0, '', ''], [1443, 0, '±', '']].forEach((v, k) => FX.count(tl, $('.c', ns[k]), v[0], { dec: v[1], pre: v[2], suf: v[3], dur: 2.6, ease: 'power1.out' }, .8 + k * .4));
    },
    (el, tl) => {
      FX.up(tl, $('.note', el), 0, { duration: 1.2 });
      $$('.nums .n', el).forEach((n, k) => $$('.gh', n).forEach((g, j) => tl.fromTo(g, { opacity: 0, scale: 1, x: 0 }, { opacity: .55 - j * .14, scale: 1 + (j + 1) * .12, x: (j + 1) * 14 * (k - 1), y: -(j + 1) * 10, duration: 2, ease: 'power2.out' }, .6 + j * .25)));
      tl.call(() => $$('.nums .gh', el).forEach((g, j) => FX.loop(gsap.to(g, { opacity: '-=.2', duration: 'random(1.5,2.5)', yoyo: true, repeat: -1, ease: 'sine.inOut' }))));
      FX.fade(tl, $('.src', el), 1);
    },
  ],
  notes: 'Slide paling berat. Pelan, tanpa foto. Pasung = merantai, balok kayu, dan kini pengurungan juga dihitung. 6,6% rumah tangga pernah memasung. Angka asli kemungkinan jauh lebih besar.',
});

/* ---------------- S24 · Alasan & dampak ---------------- */
const RS = ['Takut ODGJ melukai diri atau orang lain', 'Malu, ingin menyembunyikan aib keluarga', 'Tidak tahu gangguan jiwa bisa diobati', 'Biaya, jarak, dan akses layanan sulit', 'Pernah berobat, putus obat, lalu kambuh'];
const IM = ['Luka dan kerusakan otot', 'Kondisi jiwa makin buruk', 'Trauma', 'Kehilangan martabat', 'Tersingkir dari kehidupan sosial'];
DECK.add({
  id: 's24', act: 5, title: 'Mengapa memasung & dampaknya', bg: '#1a1a1d',
  orbs: [[960, 640, 900, '#6b1020', .5], [300, 300, 700, '#7A6BB0', .3]],
  html: `${HD('05', 'Pasung · sebab dan akibat', 'Mengapa <span class="ol">memasung?</span>')}
    <svg class="flow" viewBox="0 0 1920 1080"></svg>
    <div class="side l"><h5 class="pre">Alasan keluarga</h5>${RS.map(r => `<div class="it pre">${r}</div>`).join('')}</div>
    <div class="hub cc pre">PASUNG</div>
    <div class="side r"><h5 class="pre">Dampak</h5>${IM.map(r => `<div class="it pre">${r}</div>`).join('')}</div>`,
  init(el) {
    const svg = $('.flow', el), L = $('.side.l', el), R = $('.side.r', el), hub = $('.hub', el);
    const pos = (side, it) => side.offsetTop + it.offsetTop + it.offsetHeight / 2;
    const hy = pos(L, $$('.it', L)[2]); hub.style.top = hy + 'px';
    let h = '';
    $$('.it', L).forEach(it => { const y = pos(L, it); h += `<path class="pl" d="M700 ${y} C 790 ${y}, 760 ${hy}, 850 ${hy}" stroke="rgba(255,255,255,.4)"/>`; });
    $$('.it', R).forEach(it => { const y = pos(R, it); h += `<path class="pr" d="M1070 ${hy} C 1160 ${hy}, 1130 ${y}, 1220 ${y}" stroke="rgba(217,40,63,.75)"/>`; });
    svg.innerHTML = h;
    $$('path', svg).forEach(p => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
  },
  intro(el, tl) { hdIn(el, tl); FX.fade(tl, $('.side.l h5', el), .4); FX.up(tl, $$('.side.l .it', el), .5, { stagger: .12 }); },
  steps: [
    (el, tl) => {
      tl.to($$('.pl', el), { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: .1 });
      tl.fromTo($('.hub', el), { autoAlpha: 0, scale: .4 }, { autoAlpha: 1, scale: 1, duration: .8, ease: 'back.out(2)' }, .8);
      tl.call(() => FX.loop(gsap.to($('.hub', el), { boxShadow: '0 0 80px rgba(217,40,63,.6)', duration: 1.5, yoyo: true, repeat: -1 })));
    },
    (el, tl) => {
      tl.to($$('.pr', el), { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: .1 });
      FX.fade(tl, $('.side.r h5', el), .3);
      FX.up(tl, $$('.side.r .it', el), .6, { stagger: .12 });
    },
  ],
  notes: 'Alasan memasung biasanya takut, malu, tidak tahu, akses sulit, atau putus obat. Dampaknya fisik dan mental — dan merampas martabat.',
});

/* ---------------- S25 · Diskriminasi lain ---------------- */
const DS = [['Telantar di jalan', 'Tidak diurus siapa pun, kehilangan tempat tinggal dan perawatan.'], ['Sulit bekerja dan bersekolah', 'Sulit mendapat pekerjaan, bahkan dikeluarkan dari sekolah atau kampus.'], ['Dijadikan konten', 'Direkam, ditertawakan, dan disebarkan di media sosial.'], ['Hak diabaikan', 'Hak pilih, hak waris, atau hak atas harta sering tidak dihormati.']];
DECK.add({
  id: 's25', act: 5, title: 'Bentuk diskriminasi lain',
  orbs: [[1500, 620, 1000, '#7A6BB0', .45], [300, 300, 800, '#2F6FD6', .35], [1500, 100, 600, '#D9283F', .25]],
  html: `${HD('05', 'Perspektif sosial budaya', 'Diskriminasi <span class="ol">lainnya</span>')}
    <div class="rows">${DS.map((d, k) => `<div class="card pre"><div class="nd">${k + 1}</div><div><h4>${d[0]}</h4><p>${d[1]}</p></div></div>`).join('')}</div>
    <div class="phone pre"><div class="scr"></div><div class="notch"></div><div class="rec"><i></i>REC 00:42</div>
      <svg class="silh" viewBox="0 0 60 120"><circle cx="30" cy="17" r="15"/><path d="M6 120 V63 a24 24 0 0 1 48 0 V120 Z"/></svg>
      <div class="likes"><span>♥<br>12,4 rb</span><span>➦<br>3,1 rb</span></div>
      <div class="btn"><i></i></div>
      <svg class="x" viewBox="0 0 360 720"><path d="M40 160 L320 560"/><path d="M320 160 L40 560"/></svg></div>`,
  init(el) { $$('.phone .x path', el).forEach(p => gsap.set(p, { strokeDasharray: 500, strokeDashoffset: 500 })); },
  intro(el, tl) { hdIn(el, tl); },
  steps: DS.map((d, k) => (el, tl) => {
    const c = $$('.rows .card', el)[k];
    tl.fromTo(c, { autoAlpha: 0, x: -60, filter: 'blur(10px)' }, { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: .8, ease: 'power3.out' });
    tl.fromTo($('.nd', c), { scale: .4 }, { scale: 1, duration: .7, ease: 'elastic.out(1.2,.45)' }, .2);
    if (k === 2) {
      tl.fromTo($('.phone', el), { autoAlpha: 0, y: 80, rotation: 6 }, { autoAlpha: 1, y: 0, rotation: -3, duration: 1, ease: 'expo.out' }, .2);
      tl.call(() => FX.loop(gsap.to($('.phone .rec i', el), { opacity: .15, duration: .5, yoyo: true, repeat: -1 })), null, .8);
      tl.to($$('.phone .x path', el), { strokeDashoffset: 0, duration: .45, ease: 'power3.in', stagger: .2 }, 1.8);
      tl.to($('.phone .scr', el), { filter: 'grayscale(1) brightness(.6)', duration: .6 }, 2.1);
    }
  }),
  notes: 'Telantar, sulit bekerja/sekolah, dijadikan konten (jangan merekam dan menyebarkan video ODGJ!), dan hak-hak diabaikan.',
});

/* ---------------- S26 · Budaya sebagai kekuatan ---------------- */
const CX = 1250, CY = 580;
const NET = [['Gotong royong', 'mendampingi berobat bersama-sama', CX, CY - 230], ['Kekeluargaan', 'keluarga sebagai pendamping utama', CX + 340, CY], ['Kepedulian tetangga', 'mengingatkan minum obat, menerima kembali', CX, CY + 230], ['Dukungan keagamaan', 'dukungan batin, tidak menggantikan medis', CX - 340, CY]];
DECK.add({
  id: 's26', act: 5, title: 'Budaya sebagai kekuatan', bg: '#2d2a2e', morph: 2.6,
  orbs: [[1250, 580, 1150, '#F0A04B', .58], [700, 260, 900, '#B85A9C', .55], [1720, 940, 900, '#7A6BB0', .45]],
  html: `${HD('05', 'Titik balik', 'Budaya sebagai <span class="ol">kekuatan</span>')}
    <div class="left" style="width:600px"><p class="lead pre" style="font-size:29px">Nilai budaya juga bisa menjadi bagian dari <b>solusi</b>: mendampingi ODGJ berobat, mengingatkan minum obat, dan menerima mereka kembali di lingkungan.</p></div>
    <svg class="net" viewBox="0 0 1920 1080">${NET.map((n, k) => `<line class="sp" x1="${CX}" y1="${CY}" x2="${n[2]}" y2="${n[3]}"/><line class="rg" x1="${n[2]}" y1="${n[3]}" x2="${NET[(k + 1) % 4][2]}" y2="${NET[(k + 1) % 4][3]}"/>`).join('')}</svg>
    <div class="center cc pre" style="left:${CX}px;top:${CY}px">ODGJ</div>
    ${NET.map(n => `<div class="nd2 cx pre" style="left:${n[2]}px;top:${n[3] - 55}px"><div class="b"></div><h4>${n[0]}</h4><p>${n[1]}</p></div>`).join('')}`,
  init(el) { $$('.net line', el).forEach(l => { const len = Math.hypot(l.x2.baseVal.value - l.x1.baseVal.value, l.y2.baseVal.value - l.y1.baseVal.value); gsap.set(l, { strokeDasharray: len, strokeDashoffset: len }); }); },
  intro(el, tl) {
    hdIn(el, tl, .6);
    FX.up(tl, $('.left .lead', el), 1);
    tl.fromTo($('.center', el), { autoAlpha: 0, scale: .3 }, { autoAlpha: 1, scale: 1, duration: 1, ease: 'back.out(2)' }, 1.3);
    tl.call(() => FX.loop(gsap.to($('.center', el), { scale: 1.07, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
  },
  steps: NET.map((n, k) => (el, tl) => {
    tl.to($$('.net .sp', el)[k], { strokeDashoffset: 0, duration: .7, ease: 'power2.out' });
    tl.fromTo($$('.nd2', el)[k], { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'back.out(2)' }, .4);
    if (k > 0) tl.to($$('.net .rg', el)[k - 1], { strokeDashoffset: 0, duration: .7 }, .6);
    if (k === 3) tl.to($$('.net .rg', el)[3], { strokeDashoffset: 0, duration: .7 }, 1);
  }),
  notes: 'Titik balik: warna menghangat. Gotong royong, kekeluargaan, kepedulian tetangga, dukungan keagamaan — membentuk jaring di sekitar ODGJ. Keagamaan sebagai dukungan batin, bukan pengganti medis.',
});
})();
