/* =========================================================
   S01–S13 · Pembuka, Pendahuluan, Pengertian
   ========================================================= */
(() => {
const { $, $$ } = FX;
const I = window.INFO;
/* header standar: kicker + judul */
window.HD = (n, label, title, size = 'h3', sub = '') =>
  `<header class="hd"><div class="kicker"><b>${n}</b><span>${label}</span></div><h2 class="disp ${size} ttl" style="margin-top:26px">${title}</h2>${sub ? `<p class="lead sub" style="margin-top:22px;max-width:1200px">${sub}</p>` : ''}</header>`;
window.hdIn = (el, tl, at = 0) => {
  FX.fade(tl, $('.hd .kicker', el), at, { duration: .7 });
  FX.rise(tl, $('.hd .ttl', el), at + .1);
  const s = $('.hd .sub', el); if (s) FX.up(tl, s, at + .45);
};
const geq = `<svg viewBox="0 0 100 100" style="height:.7em;width:.7em;vertical-align:-.02em;margin-right:.18em"><path d="M14 8 L86 36 L14 64 M14 92 H86" stroke="#fff" stroke-width="15" fill="none"/></svg>`;
window.GEQ = geq;
const ARROW = `<svg viewBox="0 0 40 40" width="38" height="38"><path d="M6 20 H32 M22 10 L32 20 L22 30" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
window.ARROW = ARROW;

/* ---------------- S01 · Cover ---------------- */
DECK.add({
  id: 's01', cls: 'cover', act: 0, title: 'Cover', hud: false,
  bg: '#5b5b60',
  orbs: [[230, 380, 1600, '#A3A3A8', .95], [960, 620, 1250, '#D9283F', .9], [1720, 420, 1500, '#2F6FD6', .95], [1200, 980, 900, '#B85A9C', .55]],
  html: `<div class="black"></div><div class="dot"></div>
    <div class="big"><svg class="sw"><text font-size="400" y="0">ODGJ</text></svg></div>
    <div class="full pre">Orang Dengan Gangguan Jiwa</div>
    <div class="tag pre">Memandang manusia, bukan labelnya.</div>
    <div class="meta-l pre">${I.matkul}<br>${I.tahun}</div>
    <div class="meta-r pre">Dipresentasikan oleh<b>${I.kelompok}</b>Dosen: ${I.dosen}</div>`,
  init(el) { el._t = FX.svgText($('svg', el)); },
  intro(el, tl) {
    const dot = $('.dot', el), black = $('.black', el);
    tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: .6, ease: 'back.out(3)' })
      .to(dot, { scale: 1.25, duration: .5, yoyo: true, repeat: 1, ease: 'sine.inOut' })
      .to(dot, { scale: 95, duration: 1.5, ease: 'expo.in' })
      .to(black, { autoAlpha: 0, duration: 1, ease: 'power2.out' }, '-=.5')
      .set(dot, { autoAlpha: 0 });
    FX.draw(tl, el._t, '-=.4', { dur: 2.4, stagger: .22, len: 2600 });
    tl.fromTo($('.full', el), { autoAlpha: 0, letterSpacing: '.08em' }, { autoAlpha: 1, letterSpacing: '.5em', duration: 1.8, ease: 'expo.out' }, '-=1.2');
    FX.fade(tl, $('.tag', el), '-=1', { duration: 1.2 });
    tl.fromTo($('.meta-r', el), { autoAlpha: 0, x: 90 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, '-=.7');
    tl.fromTo($('.meta-l', el), { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 1.1, ease: 'power3.out' }, '<');
  },
  notes: 'Pembukaan. Perkenalkan kelompok. Tekankan judulnya: kita akan belajar memandang manusia, bukan labelnya. Huruf ODGJ sengaja berongga — nanti terisi di akhir.',
});

/* ---------------- S02 · Agenda ---------------- */
const AG = ['Pendahuluan', 'Pengertian ODGJ', 'Data & fakta', 'Faktor penyebab', 'Perspektif sosial budaya', 'Studi kasus: wawancara', 'Hak & dasar hukum', 'Upaya & peran', 'Penutup'];
const AGX = ['latar & rumusan', 'UU 18/2014 · PPDGJ-III', 'SKI 2023 · Kemenkes', 'biopsikososial', 'stigma · mitos · pasung', 'video 3:20', '1945 → 2023', 'keluarga · masyarakat · kita', 'kesimpulan & saran'];
DECK.add({
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

/* ---------------- S03 · Bab 01 ---------------- */
const quoteWords = (txt, last) => txt.split(' ').map((w, k, a) => `<span class="w${k === a.length - 1 && last ? ' ' + last : ''}">${w}</span>`).join(' ');
window.quoteWords = quoteWords;
DECK.add({
  id: 's03', cls: 'divider s03', act: 1, title: 'Bab 01 · Kutipan pembuka', divider: true, hud: false,
  orbs: [[1500, 300, 1250, '#2F6FD6', .8], [380, 900, 950, '#7A6BB0', .5]],
  html: `<div class="num" style="left:-40px;top:190px"><svg class="sw" style="height:560px"><text font-size="700">01</text></svg></div>
    <div class="body" style="left:1000px;top:300px">
      <div class="kicker pre"><b>01</b><span>Pendahuluan</span></div>
      <div class="q" style="margin-top:44px">${quoteWords('Tidak ada kesehatan tanpa kesehatan jiwa.', 'jw ol')}</div>
      <p class="small pre" style="margin-top:40px;font-size:22px">“No health without mental health” — prinsip WHO</p>
    </div>`,
  init(el) { el._t = FX.svgText($('svg', el)); $$('svg text', el).forEach(t => t.style.stroke = 'rgba(255,255,255,.55)'); },
  intro(el, tl) {
    tl.from($('.num svg', el), { x: 1300, duration: 1.8, ease: 'expo.out' }, 0);
    FX.draw(tl, el._t, 0, { dur: 2, stagger: .25 });
    FX.fade(tl, $('.kicker', el), .6);
    tl.from($$('.q .w', el), { autoAlpha: 0, y: 30, filter: 'blur(10px)', duration: .6, stagger: .14, ease: 'power3.out' }, .9);
    FX.fill(tl, $$('.q .jw', el), '+=.3', { dur: 1.2 });
    tl.to($('.q .jw', el), { textShadow: '0 0 40px rgba(47,111,214,.9)', duration: 1, yoyo: true, repeat: 1 }, '<');
    FX.fade(tl, $('.small', el), '-=.8');
  },
  notes: 'Kesehatan jiwa bagian dari kesehatan utuh. Kata "jiwa" yang terisi = memberi isi pada hal yang sering diabaikan.',
});

/* ---------------- S04 · Latar belakang ---------------- */
const MYTH = [['GUNA-GUNA', 1080, 118, 62, -4], ['KERASUKAN', 880, 245, 104, 2], ['KUTUKAN', 1250, 400, 70, -3], ['KURANG IMAN', 140, 430, 62, 3]];
DECK.add({
  id: 's04', act: 1, title: 'Latar belakang: cara masyarakat memandang',
  orbs: [[1600, 250, 1000, '#2F6FD6', .55], [280, 280, 900, '#7A6BB0', .45], [1000, 1040, 1100, '#D9283F', .28]],
  html: `${HD('01', 'Pendahuluan · Latar belakang', 'Cara masyarakat<br>memandang')}
    ${MYTH.map(m => `<div class="myth pre" style="left:${m[1]}px;top:${m[2]}px;font-size:${m[3]}px">${m[0]}</div>`).join('')}
    <div class="effect"><p class="lead pre">Akibatnya, banyak ODGJ tidak dibawa berobat. Mereka justru…</p>
      <div class="triple"><span class="pre">dikucilkan</span><span class="sep pre">·</span><span class="pre">ditelantarkan</span><span class="sep pre">·</span><span class="pre">dipasung</span></div></div>
    <div class="isbd"><span class="lbl pre">Kaitan<br>dengan ISBD</span>${['nilai', 'norma', 'stigma', 'keadilan sosial'].map(p => `<span class="pill pre">${p}</span>`).join('')}</div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: [
    (el, tl) => {
      const ms = $$('.myth', el);
      const from = [[-300, -200], [400, -300], [500, 200], [-400, 200]];
      ms.forEach((m, k) => tl.fromTo(m, { autoAlpha: 0, x: from[k][0], y: from[k][1], rotation: from[k][0] / 20, filter: 'blur(14px)' },
        { autoAlpha: 1, x: 0, y: 0, rotation: MYTH[k][4], filter: 'blur(0px)', duration: 1.4, ease: 'expo.out' }, k * .18));
      tl.call(() => ms.forEach(m => FX.loop(gsap.to(m, { y: 'random(-16,16)', x: 'random(-12,12)', rotation: '+=random(-2,2)', duration: 'random(2.6,4)', yoyo: true, repeat: -1, ease: 'sine.inOut' }))));
    },
    (el, tl) => {
      tl.to($$('.myth', el), { opacity: .3, duration: .8 });
      FX.up(tl, $('.effect .lead', el), 0);
      const t = $$('.triple span', el);
      tl.fromTo(t, { autoAlpha: 0, scale: 1.6, filter: 'blur(10px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: .55, ease: 'power4.out', stagger: .28 }, .5);
    },
    (el, tl) => {
      FX.fade(tl, $('.isbd .lbl', el), 0);
      tl.fromTo($$('.isbd .pill', el), { autoAlpha: 0, y: 30, scale: .8 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .12 }, .1);
    },
  ],
  notes: 'Mitos yang beredar: guna-guna, kerasukan, kutukan, kurang iman. Akibatnya ODGJ dikucilkan, ditelantarkan, bahkan dipasung. ISBD mengkaji ini lewat nilai, norma, stigma, dan keadilan sosial.',
});

/* ---------------- S05 · Rumusan masalah ---------------- */
const RM = [['Apa yang dimaksud dengan ODGJ?', 'Bab 02'], ['Bagaimana kondisi ODGJ di Indonesia saat ini?', 'Bab 03'], ['Bagaimana pandangan sosial budaya masyarakat terhadap ODGJ?', 'Bab 05 · 06'], ['Apa hak ODGJ dan bagaimana peran masyarakat?', 'Bab 07 · 08']];
DECK.add({
  id: 's05', act: 1, title: 'Rumusan masalah',
  orbs: [[1500, 280, 1100, '#2F6FD6', .6], [350, 850, 900, '#A8DDA0', .22], [960, 1080, 900, '#7A6BB0', .4]],
  html: `${HD('01', 'Pendahuluan', 'Rumusan <span class="ol">masalah</span>', 'h2', 'Empat pertanyaan yang akan kita jawab bersama.')}
    <div class="cards4">${RM.map((r, k) => `<div class="card"><div class="nd">${k + 1}</div><p>${r[0]}</p><div class="ft">→ ${r[1]}</div></div>`).join('')}</div>`,
  intro(el, tl) {
    hdIn(el, tl);
    FX.up(tl, $$('.cards4 .card', el), .5, { stagger: .16 });
    tl.fromTo($$('.cards4 .nd', el), { scale: .4 }, { scale: 1, duration: .8, ease: 'elastic.out(1.2,.45)', stagger: .16 }, .7);
  },
  notes: 'Empat rumusan masalah. Tiap kartu menunjuk bab yang menjawabnya.',
});

/* ---------------- S06 · Kesehatan jiwa ---------------- */
const BALLS = [['Fisik', '#2F6FD6', -200, -200, 0, -275], ['Mental', '#7A6BB0', 200, -200, 300, 0], ['Spiritual', '#B85A9C', -200, 200, -300, 0], ['Sosial', '#55b38f', 200, 200, 0, 275]];
DECK.add({
  id: 's06', act: 2, title: 'Apa itu kesehatan jiwa?',
  orbs: [[380, 280, 1000, '#2F6FD6', .5], [1450, 540, 1150, '#7A6BB0', .42]],
  html: `${HD('02', 'Pengertian', 'Kesehatan <span class="ol">jiwa</span>')}
    <blockquote class="quote pre">Kesehatan Jiwa adalah kondisi dimana seorang individu dapat berkembang secara <b>fisik, mental, spiritual, dan sosial</b> sehingga individu tersebut menyadari kemampuan sendiri, dapat mengatasi tekanan, dapat bekerja secara produktif, dan mampu memberikan kontribusi untuk komunitasnya.<span class="cite">UU No. 18 Tahun 2014 · Pasal 1 angka 1</span></blockquote>
    <div class="goo">${BALLS.map(b => `<div class="ball pre" style="background:${b[1]}"></div>`).join('')}<div class="ball merged pre" style="background:linear-gradient(135deg,#2F6FD6,#7A6BB0 40%,#B85A9C 70%,#55b38f)"></div></div>
    <div class="lbls">${BALLS.map(b => `<div class="lb cc pre">${b[0]}</div>`).join('')}<div class="core cc pre">SEHAT<br>JIWA</div></div>
    <div class="abil">${['menyadari kemampuan', 'mengatasi tekanan', 'produktif', 'berkontribusi'].map(p => `<span class="pill pre">${p}</span>`).join('')}</div>`,
  intro(el, tl) {
    hdIn(el, tl);
    FX.up(tl, $('.quote', el), .5);
    const bs = $$('.ball:not(.merged)', el), ls = $$('.lb', el);
    BALLS.forEach((b, k) => {
      tl.fromTo(bs[k], { autoAlpha: 1, x: b[2] * 2.2, y: b[3] * 2.2, scale: 0 }, { x: b[2], y: b[3], scale: 1, duration: 1.4, ease: 'expo.out' }, .7 + k * .12);
      tl.fromTo(ls[k], { autoAlpha: 0, x: b[2], y: b[3] }, { autoAlpha: 1, duration: .6 }, 1.2 + k * .12);
    });
  },
  steps: [
    (el, tl) => {
      const bs = $$('.ball:not(.merged)', el), ls = $$('.lb', el), mg = $('.merged', el);
      tl.fromTo(mg, { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1.75, duration: 1.1, ease: 'expo.out' }, 1.2);
      tl.to(bs, { x: 0, y: 0, duration: 1.5, ease: 'expo.inOut', stagger: .05 }, 0)
        .to(bs, { scale: 1.75, duration: 1, ease: 'expo.out' }, 1.3);
      BALLS.forEach((b, k) => tl.to(ls[k], { x: b[4], y: b[5], duration: 1.5, ease: 'expo.inOut' }, 0));
      tl.fromTo($('.core', el), { autoAlpha: 0, scale: .6 }, { autoAlpha: 1, scale: 1, duration: .8, ease: 'back.out(2)' }, 1.5);
      tl.call(() => FX.loop(gsap.to([...bs, mg], { scale: 1.85, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
    },
    (el, tl) => tl.fromTo($$('.abil .pill', el), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'back.out(2)', stagger: .12 }),
  ],
  notes: 'Definisi UU 18/2014: sehat jiwa = berkembang utuh secara fisik, mental, spiritual, sosial. Empat aspek ini menyatu. Ciri orang sehat jiwa: sadar kemampuan, mampu mengatasi tekanan, produktif, berkontribusi.',
});

/* ---------------- S07 · ODMK vs ODGJ ---------------- */
const card7 = (ab, nm, q, ps, ex) => `<div class="card"><div class="ab">${ab}<span class="bk">${ab}</span></div><div class="nm">${nm}</div><blockquote>“${q}”</blockquote><div class="ps">${ps}</div><div class="ex">${ex.map(e => `<span class="chip">${e}</span>`).join('')}</div></div>`;
DECK.add({
  id: 's07', act: 2, title: 'ODMK vs ODGJ',
  orbs: [[480, 620, 1000, '#2F6FD6', .5], [1460, 620, 1000, '#D9283F', .32], [960, 90, 800, '#7A6BB0', .4]],
  html: `${HD('02', 'Pengertian · UU No. 18 Tahun 2014', 'Dua tahap <span class="ol">kondisi</span>')}
    <div class="pair">
      <div class="pre L">${card7('ODMK', 'Orang Dengan Masalah Kejiwaan', 'orang yang mempunyai masalah fisik, mental, sosial, pertumbuhan dan perkembangan, dan/atau kualitas hidup sehingga memiliki risiko mengalami gangguan jiwa', 'Pasal 1 angka 2 · berisiko', ['korban bencana', 'berduka berat', 'korban perundungan', 'terkena PHK'])}</div>
      <div class="pre R">${card7('ODGJ', 'Orang Dengan Gangguan Jiwa', 'orang yang mengalami gangguan dalam pikiran, perilaku, dan perasaan yang termanifestasi dalam bentuk sekumpulan gejala dan/atau perubahan perilaku yang bermakna, serta dapat menimbulkan penderitaan dan hambatan dalam menjalankan fungsi orang sebagai manusia', 'Pasal 1 angka 3 · mengalami gangguan', ['skizofrenia', 'depresi', 'gangguan bipolar'])}</div>
    </div><div class="arrow cc pre">${ARROW}</div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: [
    (el, tl) => tl.fromTo($('.pair .L', el), { autoAlpha: 0, x: -160, rotationY: 12 }, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.1, ease: 'expo.out' }),
    (el, tl) => {
      tl.fromTo($('.pair .R', el), { autoAlpha: 0, x: 160, rotationY: -12 }, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.1, ease: 'expo.out' });
      tl.fromTo($('.arrow', el), { autoAlpha: 0, scale: 0, rotation: -90 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: .8, ease: 'back.out(2)' }, .5);
    },
  ],
  notes: 'ODMK = berisiko (contoh: korban bencana, PHK). ODGJ = sudah mengalami gangguan yang bermakna dan mengganggu fungsi. Keduanya tahapan, bukan kotak permanen.',
});

/* ---------------- S08 · Spektrum ---------------- */
DECK.add({
  id: 's08', act: 2, title: 'Spektrum dua arah',
  orbs: [[260, 560, 900, '#2F6FD6', .6], [1660, 560, 900, '#D9283F', .42], [960, 160, 800, '#7A6BB0', .32]],
  html: `${HD('02', 'Pengertian', 'Spektrum <span class="ol">dua arah</span>')}
    <div class="spec"></div>
    ${[['Sehat jiwa', 'kondisi utuh', 330], ['ODMK', 'berisiko', 960], ['ODGJ', 'mengalami gangguan', 1590]].map(s => `<div class="stop cc pre" style="left:${s[2]}px"><div class="lbl"><b>${s[0]}</b><small>${s[1]}</small></div><i></i></div>`).join('')}
    <div class="spark pre"></div>
    <div class="dirs"><span class="l pre">← pulih dengan pengobatan</span><span class="r pre">tidak tertangani →</span></div>
    <div class="pulih"><b class="disp pre">Bisa <span class="hl">pulih.</span></b></div>
    <p class="src pre">UU No. 18/2014 kini digantikan UU No. 17/2023 tentang Kesehatan, tetapi istilah ODMK dan ODGJ tetap dipakai.</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    tl.from($('.spec', el), { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, .4);
    tl.fromTo($$('.stop', el), { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'back.out(2)', stagger: .35 }, .7);
    tl.fromTo($('.spark', el), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: .6 }, 1.7);
    tl.call(() => FX.loop(gsap.to($('.spark', el), { scale: 1.25, duration: .8, yoyo: true, repeat: -1, ease: 'sine.inOut' })));
  },
  steps: [
    (el, tl) => {
      const sp = $('.spark', el);
      tl.to(sp, { left: 1590, duration: 2.6, ease: 'power2.inOut' })
        .to(sp, { background: 'radial-gradient(closest-side,#fff,#D9283F 45%,transparent)', duration: 2.6 }, 0);
      FX.fade(tl, $('.dirs .r', el), 1.4);
    },
    (el, tl) => {
      const sp = $('.spark', el);
      tl.to(sp, { left: 330, duration: 2.6, ease: 'power2.inOut' })
        .to(sp, { background: 'radial-gradient(closest-side,#fff,#A8DDA0 45%,transparent)', duration: 2.6 }, 0);
      FX.fade(tl, $('.dirs .l', el), 1.2);
      tl.fromTo($('.pulih b', el), { autoAlpha: 0, scale: .8, filter: 'blur(12px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'expo.out' }, 1.8);
      FX.fade(tl, $('.src', el), 2.4);
    },
  ],
  notes: 'Posisi seseorang bisa bergeser dua arah. ODMK yang tidak tertangani bisa menjadi ODGJ; ODGJ yang diobati bisa pulih dan kembali berfungsi.',
});

/* ---------------- S09 · Meme ---------------- */
const SPK = `<svg viewBox="0 0 40 40"><path d="M20 0 C22 14 26 18 40 20 C26 22 22 26 20 40 C18 26 14 22 0 20 C14 18 18 14 20 0Z" fill="#fff"/></svg>`;
DECK.add({
  id: 's09', act: 2, title: 'Makna di balik istilah (meme)',
  orbs: [[380, 320, 1000, '#2F6FD6', .5], [1500, 820, 1000, '#7A6BB0', .42], [1400, 200, 700, '#A8DDA0', .16]],
  html: `<div class="ttl"><div class="kicker"><b>02</b><span>Pengertian</span></div>
      <div class="disp t1" style="margin-top:30px">Makna</div><div class="disp t2">di balik</div><div class="disp ol t3">istilah</div>
      <p class="sub pre">Kata yang kita pilih untuk menyebut seseorang ikut menentukan cara kita memperlakukannya.</p></div>
    <div class="glow"></div>
    <div class="meme pre"><div class="grid">
      <div class="cellT c1"><div class="og pre">ORANG<br>GILA</div><div class="og2 pre">sinting · gendeng</div>
        <svg class="stamp pre" viewBox="0 0 250 250"><path d="M45 45 L205 205"/><path d="M205 45 L45 205"/></svg></div>
      <div class="face no"></div>
      <div class="cellT c2"><div class="yes1 pre">ODGJ</div><div class="yes2 pre">Orang Dengan Gangguan Jiwa</div></div>
      <div class="face yes" style="position:relative"><div class="sparkle pre" style="left:30px;top:40px">${SPK}</div><div class="sparkle pre" style="right:24px;top:90px;width:34px;height:34px">${SPK}</div><div class="sparkle pre" style="left:150px;bottom:30px;width:28px;height:28px">${SPK}</div></div>
      <div class="gl v"></div><div class="gl h"></div>
    </div></div>
    <div class="exp">
      <div class="card pre"><h4>“Orang gila”</h4><p><em>Gila</em> dijadikan <b>jati diri</b> seseorang: terkesan berbahaya, menyimpang, dan tidak bisa sembuh.</p></div>
      <div class="card yes pre"><h4>“Orang dengan gangguan jiwa”</h4><p>Gangguan adalah <b>kondisi yang sedang dialami</b>, seperti <em>orang dengan diabetes</em>. Bisa diobati, dan orangnya tetap manusia seutuhnya.</p></div>
    </div>
    <div class="final" style="left:140px;top:850px"><div class="disp pre">Bahasa ikut membentuk <span class="ol sk">sikap.</span></div>
      <p class="small pre">Istilah ODGJ resmi dipakai sejak UU No. 18 Tahun 2014, menggantikan sebutan yang diskriminatif.</p></div>`,
  init(el) { gsap.set($$('.face', el), { opacity: 0 }); },
  intro(el, tl) {
    FX.fade(tl, $('.ttl .kicker', el), 0);
    FX.rise(tl, [$('.t1', el), $('.t2', el)], .1);
    tl.from($('.t3', el), { autoAlpha: 0, x: -60, duration: 1.2, ease: 'expo.out' }, .5);
    FX.up(tl, $('.ttl .sub', el), .7);
    tl.fromTo($('.meme', el), { autoAlpha: 0, y: 80, rotation: 8, scale: .9 }, { autoAlpha: 1, y: 0, rotation: 2, scale: 1, duration: 1.2, ease: 'expo.out' }, .6);
    tl.from($('.gl.v', el), { scaleY: 0, duration: .8, ease: 'power3.inOut' }, 1.2);
    tl.from($('.gl.h', el), { scaleX: 0, duration: .8, ease: 'power3.inOut' }, 1.4);
  },
  steps: [
    (el, tl) => {
      tl.fromTo($('.og', el), { autoAlpha: 0, scale: .7 }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)' });
      FX.fade(tl, $('.og2', el), .3);
      tl.fromTo($('.face.no', el), { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: .5, ease: 'power3.out' }, .2);
      tl.to($('.face.no', el), { keyframes: { x: [0, -14, 14, -12, 12, -6, 0] }, duration: .7, ease: 'none' }, .75);
      tl.fromTo($('.stamp', el), { autoAlpha: 0, scale: 2.8, rotation: -25 }, { autoAlpha: 1, scale: 1, rotation: -8, duration: .32, ease: 'power4.in' }, 1.35);
      tl.to($('.meme', el), { keyframes: { x: [0, 10, -8, 5, 0], y: [0, 6, -4, 2, 0] }, duration: .3, ease: 'none' }, 1.67);
      tl.to($('.og', el), { opacity: .45, duration: .4 }, 1.7);
    },
    (el, tl) => {
      tl.fromTo($('.yes1', el), { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'expo.out' });
      tl.fromTo($('.yes2', el), { autoAlpha: 0, letterSpacing: '0em' }, { autoAlpha: 1, letterSpacing: '.2em', duration: 1.2, ease: 'expo.out' }, .25);
      tl.fromTo($('.face.yes', el), { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: .55, ease: 'power4.out' }, .3);
      tl.fromTo($$('.sparkle', el), { autoAlpha: 0, scale: 0, rotation: -90 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: .5, ease: 'back.out(3)', stagger: .1 }, .6);
      tl.to($$('.sparkle', el), { autoAlpha: 0, scale: .4, duration: .5, stagger: .1 }, 1.6);
      tl.to($('.glow', el), { opacity: 1, duration: 1.2, ease: 'power2.out' }, .3);
    },
    (el, tl) => {
      tl.to($('.ttl', el), { autoAlpha: 0, y: -40, duration: .6, ease: 'power2.in' });
      tl.to($('.meme', el), { x: -900, y: 0, scale: .78, rotation: -2, duration: 1.3, ease: 'expo.inOut' }, .1);
      tl.to($('.glow', el), { x: -900, scale: .8, duration: 1.3, ease: 'expo.inOut' }, .1);
      FX.up(tl, $$('.exp .card', el), .9, { stagger: .2 });
    },
    (el, tl) => {
      FX.rise(tl, $('.final .disp', el), 0);
      FX.fill(tl, $$('.final .sk', el), .9, { dur: 1.2 });
      FX.fade(tl, $('.final .small', el), 1.4);
    },
  ],
  notes: 'Meme! Yang ditertawakan adalah KATA "orang gila", bukan orangnya. "Orang gila" menjadikan gila sebagai jati diri; "orang dengan gangguan jiwa" menempatkannya sebagai kondisi, seperti orang dengan diabetes. Bahasa membentuk sikap.',
});

/* ---------------- S10 · PPDGJ-III ---------------- */
const PP = [['F0', 'F00–F09', 'Gangguan mental organik', 'Demensia, delirium', 'studi kasus'], ['F1', 'F10–F19', 'Akibat zat psikoaktif', 'Ketergantungan alkohol, NAPZA'], ['F2', 'F20–F29', 'Skizofrenia & gangguan waham', 'Skizofrenia, psikotik akut', 'psikosis'], ['F3', 'F30–F39', 'Gangguan suasana perasaan (mood)', 'Depresi, bipolar', 'depresi'], ['F4', 'F40–F48', 'Neurotik, somatoform & terkait stres', 'Cemas, fobia, OCD, PTSD'],
  ['F5', 'F50–F59', 'Sindrom perilaku terkait faktor fisiologis', 'Gangguan makan, gangguan tidur'], ['F6', 'F60–F69', 'Gangguan kepribadian & perilaku dewasa', 'Borderline, antisosial'], ['F7', 'F70–F79', 'Retardasi mental (disabilitas intelektual)', 'Ringan hingga berat'], ['F8', 'F80–F89', 'Gangguan perkembangan psikologis', 'Autisme, gangguan bicara'], ['F9', 'F90–F98', 'Perilaku & emosi onset kanak / remaja', 'ADHD, gangguan tingkah laku']];
DECK.add({
  id: 's10', act: 2, title: '10 kelompok PPDGJ-III',
  orbs: [[1620, 200, 1000, '#7A6BB0', .45], [280, 920, 1000, '#2F6FD6', .45]],
  html: `${HD('02', 'Pengertian · PPDGJ-III (1993) mengikuti ICD-10 WHO', '10 kelompok <span class="ol">gangguan jiwa</span>')}
    <div class="tiles">${PP.map(p => `<div class="tile" data-noclick><div class="ring"></div>${p[4] ? `<span class="tag">${p[4]}</span>` : ''}<div class="c">${p[0]}</div><div class="r">${p[1]}</div><div class="g">${p[2]}</div><div class="e">${p[3]}</div></div>`).join('')}</div>
    <div class="msg pre">Tidak semua ODGJ itu <span class="ol thin" style="font-family:var(--disp);font-stretch:125%;font-weight:900">“orang gila”</span> di jalan.
      <p class="small" style="margin-top:10px;font-size:22px">Orang dengan depresi atau gangguan cemas juga termasuk ODGJ, dan banyak yang tetap bisa bekerja serta kuliah bila ditangani.</p></div>`,
  intro(el, tl) {
    hdIn(el, tl);
    tl.from($$('.tile', el), { autoAlpha: 0, y: 60, rotationX: -50, scale: .9, transformPerspective: 900, duration: .9, ease: 'expo.out', stagger: { grid: [2, 5], from: 'start', amount: .9 } }, .4);
  },
  steps: [
    (el, tl) => {
      const t = $$('.tile', el), hot = [0, 2, 3];
      tl.to(t.filter((_, k) => !hot.includes(k)), { opacity: .42, duration: .6 });
      hot.forEach((k, j) => {
        tl.to($('.ring', t[k]), { opacity: 1, duration: .6 }, .2 + j * .15);
        tl.fromTo($('.tag', t[k]), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .5 }, .3 + j * .15);
        tl.fromTo(t[k], { scale: 1 }, { scale: 1.05, duration: .35, yoyo: true, repeat: 1, ease: 'power2.out' }, .2 + j * .15);
      });
    },
    (el, tl) => { tl.to($$('.tile', el), { opacity: 1, duration: .5 }); FX.up(tl, $('.msg', el), .1); },
  ],
  click(e, el) {
    const t = e.target.closest('.tile'); if (!t) return false;
    const big = t.classList.toggle('big');
    $$('.tile', el).forEach(o => { if (o !== t) { o.classList.remove('big'); gsap.to(o, { scale: 1, duration: .4 }); } });
    gsap.to(t, { scale: big ? 1.32 : 1, duration: .5, ease: 'expo.out' });
    return true;
  },
  notes: 'PPDGJ-III = acuan diagnosis resmi Indonesia, 10 kelompok F0–F9. Sorot F0 (demensia — studi kasus kita), F2 (skizofrenia), F3 (depresi). Ubin bisa diklik untuk diperbesar.',
});

/* ---------------- S11 · Psikosis ---------------- */
const LEAF = ['Skizofrenia', 'Gangguan bipolar', 'Depresi berat', 'Narkoba', 'Penyakit otak'];
DECK.add({
  id: 's11', act: 2, title: 'Psikosis: gejala, bukan penyakit',
  orbs: [[380, 820, 1000, '#7A6BB0', .45], [1500, 500, 1100, '#2F6FD6', .4]],
  html: `${HD('02', 'Pengertian · istilah sebelum data', 'Psikosis = <span class="ol">gejala</span>')}
    <div class="def"><p class="lead pre">Kehilangan kontak dengan kenyataan: <b>halusinasi</b> (mendengar bisikan yang tidak ada) atau <b>waham</b> (yakin dirinya sedang diikuti).</p></div>
    <div class="icon">
      <svg class="th" viewBox="0 0 300 300"><path d="M128 60 a22 22 0 0 1 44 0 v118 a44 44 0 1 1 -44 0 z"/><line x1="150" y1="92" x2="150" y2="205"/><line x1="182" y1="80" x2="200" y2="80"/><line x1="182" y1="112" x2="200" y2="112"/><line x1="182" y1="144" x2="200" y2="144"/></svg>
      <svg class="hd2" viewBox="0 0 300 300"><path d="M104 272 v-44 c-36 -18 -58 -54 -58 -96 c0 -62 48 -108 110 -108 c58 0 100 42 100 98 c0 22 -6 32 4 48 l16 26 c4 8 -2 12 -8 12 h-14 v26 c0 16 -12 26 -28 26 h-26 v12"/><path d="M110 120 q20 -24 40 0 t40 0"/><path d="M118 156 q16 -18 32 0 t32 0"/></svg>
    </div>
    <p class="analog pre">Ibaratnya <b>demam</b>: penyebabnya bisa macam-macam.</p>
    <div class="tree"><svg viewBox="0 0 800 700">${LEAF.map(() => `<path/>`).join('')}</svg>
      <div class="node cc root pre" style="left:70px;top:350px">PSIKOSIS</div>
      ${LEAF.map((l, k) => `<div class="node cc leaf pre" style="left:610px;top:${70 + k * 140}px">${l}</div>`).join('')}</div>`,
  init(el) {
    gsap.set($('.hd2', el), { autoAlpha: 0 }); gsap.set($$('.th > *', el), { strokeDasharray: 900, strokeDashoffset: 900 });
    // cabang dihitung dari ukuran kotak sebenarnya: mulai tepat di tepi kanan PSIKOSIS, berakhir tepat di tepi kiri tiap label
    const root = $('.root', el), x0 = root.offsetLeft + root.offsetWidth / 2, y0 = root.offsetTop;
    $$('.tree path', el).forEach((p, k) => {
      const lf = $$('.leaf', el)[k], x1 = lf.offsetLeft - lf.offsetWidth / 2, y1 = lf.offsetTop, mx = (x0 + x1) / 2;
      p.setAttribute('d', `M${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`);
    });
    gsap.set($$('.tree path', el), { autoAlpha: 0 });
  },
  intro(el, tl) { hdIn(el, tl); FX.up(tl, $('.def .lead', el), .5); },
  steps: [
    (el, tl) => {
      const th = $$('.th > *', el), hd = $$('.hd2 > *', el);
      tl.fromTo(th, { strokeDasharray: 900, strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: .1 });
      FX.up(tl, $('.analog', el), .6);
      tl.to($('.th', el), { autoAlpha: 0, scale: .7, rotation: -20, duration: .7, ease: 'power2.in' }, 1.9);
      tl.set($('.hd2', el), { autoAlpha: 1 }, 2.4);
      tl.fromTo(hd, { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: .15 }, 2.4);
    },
    (el, tl) => {
      tl.fromTo($('.root', el), { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'back.out(2)' });
      $$('.tree path', el).forEach((p, k) => { const L = p.getTotalLength(); tl.fromTo(p, { autoAlpha: 1, strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: .9, ease: 'power2.inOut' }, .5 + k * .14); });
      tl.fromTo($$('.leaf', el), { autoAlpha: 0, x: -30, scale: .8 }, { autoAlpha: 1, x: 0, scale: 1, duration: .6, ease: 'back.out(2)', stagger: .14 }, 1.1);
    },
  ],
  notes: 'Data nasional memakai label "psikosis/skizofrenia". Psikosis itu gejala (seperti demam), penyebabnya bisa skizofrenia, bipolar, depresi berat, narkoba, atau penyakit otak.',
});

/* ---------------- S12 · Skizofrenia ---------------- */
const bars = Array.from({ length: 11 }, (_, k) => `<rect x="${k * 26}" y="${60 - [14, 30, 48, 22, 56, 36, 50, 18, 42, 26, 12][k] / 2 * 2}" width="14" height="${[14, 30, 48, 22, 56, 36, 50, 18, 42, 26, 12][k] * 2}" rx="7" fill="#111"/>`).join('');
const dots = Array.from({ length: 15 }, (_, k) => `<circle cx="${(k % 5) * 40 + 20}" cy="${Math.floor(k / 5) * 40 + 20}" r="9" fill="#111"/>`).join('');
DECK.add({
  id: 's12', act: 2, title: 'Skizofrenia: 3 kelompok gejala',
  orbs: [[300, 300, 900, '#2F6FD6', .45], [1600, 820, 1000, '#7A6BB0', .45]],
  html: `${HD('02', 'Pengertian · penyebab psikosis paling umum', 'Skizo<span class="ol">frenia</span>', 'h3', 'Gangguan jiwa berat jangka panjang: sulit membedakan mana yang nyata dan mana yang tidak.')}
    <div class="three">
      <div class="card pre c1"><div class="sym">+</div><h4>Gejala positif</h4><div class="vis"><svg viewBox="0 0 290 120">${bars}</svg></div><p><b>Muncul</b> hal yang seharusnya tidak ada: halusinasi, waham, bicara kacau.</p></div>
      <div class="card pre c2"><div class="sym">−</div><h4>Gejala negatif</h4><div class="vis"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="none" stroke="#111" stroke-width="6"/><circle class="ey" cx="40" cy="48" r="7" fill="#111"/><circle class="ey" cx="80" cy="48" r="7" fill="#111"/><path class="mo" d="M34 76 q26 22 52 0" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/><path class="mf" d="M36 82 h48" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0"/></svg></div><p><b>Hilang</b> hal yang seharusnya ada: ekspresi datar, malas bicara, menarik diri.</p></div>
      <div class="card pre c3"><div class="sym">?</div><h4>Gejala kognitif</h4><div class="vis"><svg viewBox="0 0 200 120">${dots}</svg></div><p>Sulit <b>berkonsentrasi</b> dan <b>mengingat</b>.</p></div>
    </div>
    <div class="strip"><span class="pill pre">Muncul akhir remaja – awal 30-an</span><span class="pill pre">Paling sering kambuh karena putus obat</span><span class="pill pre"><b class="no">Bukan</b>&nbsp;kepribadian ganda</span></div>`,
  intro(el, tl) { hdIn(el, tl); },
  steps: [
    (el, tl) => { FX.up(tl, $('.c1', el)); tl.from($$('.c1 rect', el), { scaleY: 0, transformOrigin: '50% 50%', duration: .6, ease: 'back.out(3)', stagger: .05 }, .4); tl.call(() => FX.loop(gsap.to($$('.c1 rect', el), { scaleY: 'random(.4,1.3)', transformOrigin: '50% 50%', duration: .35, repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut', stagger: .04 }))); },
    (el, tl) => { FX.up(tl, $('.c2', el)); tl.to($$('.c2 .ey', el), { opacity: .15, duration: 1.2 }, 1).to($('.c2 .mo', el), { opacity: 0, duration: 1 }, 1.2).to($('.c2 .mf', el), { opacity: .35, duration: 1 }, 1.4); },
    (el, tl) => { FX.up(tl, $('.c3', el)); tl.to($$('.c3 circle', el), { x: 'random(-30,30)', y: 'random(-25,25)', opacity: 'random(.15,.8)', duration: 1.6, ease: 'power2.inOut', stagger: .03 }, .7); },
    (el, tl) => tl.fromTo($$('.strip .pill', el), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'back.out(2)', stagger: .15 }),
  ],
  notes: 'Positif = ada yang muncul (halusinasi, waham). Negatif = ada yang hilang (ekspresi, minat bicara). Kognitif = konsentrasi & ingatan. Bisa dikendalikan dengan obat rutin; bukan kepribadian ganda.',
});

/* ---------------- S13 · Depresi ---------------- */
DECK.add({
  id: 's13', act: 2, title: 'Depresi: lebih dari sekadar sedih',
  orbs: [[1450, 520, 1200, '#2F6FD6', .85], [300, 920, 800, '#7A6BB0', .4]],
  html: `${HD('02', 'Pengertian', 'Depresi: lebih dari <span class="ol">sekadar sedih</span>')}
    <div class="big pre" style="font-size:112px">${GEQ}2 minggu</div>
    <div class="cal">${Array.from({ length: 14 }, (_, k) => `<i><b>${k + 1}</b></i>`).join('')}</div>
    <p class="lead pre" style="position:absolute;left:140px;top:760px;width:820px;font-size:26px">Rasa sedih atau hampa yang <b>menetap minimal dua minggu</b>, sampai mengganggu kegiatan sehari-hari.</p>
    <div class="signs" style="left:1080px">
      ${[['Sedih atau hampa', 'menetap hampir sepanjang hari'], ['Hilang minat', 'hal yang dulu disukai terasa hambar'], ['Mudah lelah', 'energi turun, aktivitas terganggu']].map((s, k) => `<div class="card dark pre"><div class="nd">${k + 1}</div><div><h4>${s[0]}</h4><p>${s[1]}</p></div></div>`).join('')}
    </div>
    <p class="note lead pre" style="left:1080px;top:820px;font-size:25px">Depresi berat juga bisa disertai <b>psikosis</b>.</p>`,
  intro(el, tl) {
    hdIn(el, tl);
    FX.up(tl, $('.big', el), .4);
    tl.from($$('.cal i', el), { autoAlpha: 0, scale: .6, duration: .4, stagger: .04 }, .6);
    tl.to($$('.cal i', el), { '--f': 1, duration: .5, ease: 'power1.inOut', stagger: .2 }, 1.2);
    tl.to(FX.orb(0), { color: '#5d6070', opacity: .55, duration: 4.5, ease: 'power1.inOut', overwrite: 'auto' }, 1.4);
    FX.up(tl, $('.lead.pre', el), 2.4);
  },
  steps: [
    (el, tl) => FX.up(tl, $$('.signs .card', el), 0, { stagger: .2 }),
    (el, tl) => FX.up(tl, $('.note', el)),
  ],
  notes: 'Bukan sedih biasa: menetap minimal 2 minggu, ditambah hilang minat dan mudah lelah, sampai mengganggu kegiatan. Orb latar sengaja meredup.',
});
})();
