/* =========================================================
   Mesin presentasi: navigasi build-per-klik, orb morph, transisi bab,
   catatan pembicara, mode ikhtisar.
   ========================================================= */
(() => {
'use strict';
const W = 1920, H = 1080;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const ACTS = [
  { n: '00', name: 'Pembuka',            col: '#BDBDBD' },
  { n: '01', name: 'Pendahuluan',        col: '#2F6FD6' },
  { n: '02', name: 'Pengertian',         col: '#2F6FD6' },
  { n: '03', name: 'Data & Fakta',       col: '#7A6BB0' },
  { n: '04', name: 'Faktor Penyebab',    col: '#7A6BB0' },
  { n: '05', name: 'Sosial Budaya',      col: '#B85A9C' },
  { n: '06', name: 'Studi Kasus',        col: '#F0A04B' },
  { n: '07', name: 'Hak & Dasar Hukum',  col: '#B85A9C' },
  { n: '08', name: 'Upaya & Peran',      col: '#F0A04B' },
  { n: '09', name: 'Penutup',            col: '#A8DDA0' },
];

const D = window.DECK = { slides: [], i: -1, step: 0, tl: null, loops: [], ACTS, W, H };
D.add = def => D.slides.push(def);

/* ---------- FX helpers (dipakai semua slide) ---------- */
const nf = {};
const fmt = (v, dec = 0) => (nf[dec] ||= new Intl.NumberFormat('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec })).format(v);
const FX = window.FX = {
  $, $$, fmt,
  /** split ke huruf dengan mask (untuk mask-reveal) */
  chars(el, mask = true) {
    const s = SplitText.create(el, { type: 'words,chars', mask: mask ? 'chars' : undefined, charsClass: 'ch' });
    return s.chars;
  },
  words(el, mask = false) {
    const s = SplitText.create(el, { type: 'words', mask: mask ? 'words' : undefined, wordsClass: 'w' });
    return s.words;
  },
  /** judul solid: huruf naik dari bawah mask */
  rise(tl, el, at = '<', o = {}) {
    const els = typeof el === 'string' ? $$(el, D.el) : [].concat(el);
    els.forEach(e => gsap.set(e, { autoAlpha: 1 }));
    const c = els.flatMap(e => FX.chars(e));
    tl.from(c, { yPercent: 118, duration: .9, ease: 'expo.out', stagger: .028, ...o }, at);
    return c;
  },
  /** kartu/blok: naik 40px + fade + blur */
  up(tl, el, at = '<', o = {}) {
    const els = typeof el === 'string' ? $$(el, D.el) : el;
    tl.fromTo(els, { autoAlpha: 0, y: 40, filter: 'blur(12px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: .8, ease: 'power3.out', stagger: .12, ...o }, at);
    return els;
  },
  fade(tl, el, at = '<', o = {}) {
    const els = typeof el === 'string' ? $$(el, D.el) : el;
    tl.fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, ease: 'power2.out', ...o }, at);
    return els;
  },
  /** kata per kata seperti ucapan */
  speak(tl, el, at = '<', o = {}) {
    const e = typeof el === 'string' ? $(el, D.el) : el;
    gsap.set(e, { autoAlpha: 1 });
    const w = FX.words(e);
    tl.from(w, { autoAlpha: 0, y: 24, filter: 'blur(8px)', duration: .55, ease: 'power3.out', stagger: .09, ...o }, at);
    return w;
  },
  /** counter angka format Indonesia */
  count(tl, el, to, o = {}, at = '<') {
    const e = typeof el === 'string' ? $(el, D.el) : el;
    const p = { v: o.from || 0 }, dec = o.dec || 0, pre = o.pre || '', suf = o.suf || '';
    e.textContent = pre + fmt(p.v, dec) + suf;
    tl.to(p, { v: to, duration: o.dur || 1.6, ease: o.ease || 'power2.out', onUpdate: () => { e.textContent = pre + fmt(p.v, dec) + suf; } }, at);
  },
  /** outline -> solid */
  fill(tl, el, at = '<', o = {}) {
    const els = typeof el === 'string' ? $$(el, D.el) : el;
    tl.to(els, { color: o.color || 'rgba(255,255,255,1)', duration: o.dur || 1.2, ease: 'power2.inOut', stagger: o.stagger || 0 }, at);
  },
  /** coret garis merah */
  strike(tl, el, at = '<', o = {}) {
    const els = (typeof el === 'string' ? $$(el, D.el) : [].concat(el)).map(e => e.querySelector(':scope > i') || e.appendChild(Object.assign(document.createElement('i'))));
    tl.to(els, { scaleX: 1, duration: o.dur || .6, ease: 'power3.inOut', stagger: o.stagger || 0 }, at);
  },
  /** SVG teks: sesuaikan viewBox dan pecah per huruf (untuk stroke draw) */
  svgText(svg, perChar = true) {
    const t = svg.querySelector('text');
    if (perChar) {
      const str = t.textContent, n = str.length, xs = [];
      for (let k = 0; k < n; k++) xs.push(t.getStartPositionOfChar(k).x);
      const frag = document.createDocumentFragment();
      for (let k = 0; k < n; k++) {
        if (str[k] === ' ') continue;
        const c = t.cloneNode(false);
        c.setAttribute('x', xs[k]); c.setAttribute('y', t.getAttribute('y') || 0);
        c.textContent = str[k]; frag.appendChild(c);
      }
      t.replaceWith(frag);
    }
    const bb = svg.getBBox(), pad = 12;
    svg.setAttribute('viewBox', `${bb.x - pad} ${bb.y - pad} ${bb.width + pad * 2} ${bb.height + pad * 2}`);
    return $$('text', svg);
  },
  draw(tl, texts, at = '<', o = {}) {
    const L = o.len || 3000;
    tl.fromTo(texts, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: o.dur || 1.8, ease: o.ease || 'power2.inOut', stagger: o.stagger ?? .16 }, at);
  },
  /** loop ambient (dimatikan otomatis saat pindah slide) */
  loop(tw) { D.loops.push(tw); return tw; },
  orb: i => D.orbs[i],
};

/* ---------- DOM ---------- */
let stage, slidesEl, hud, prog, wipe;
function fit() {
  const s = Math.min(innerWidth / W, innerHeight / H) * (/[?&]shot/.test(location.search) ? 1 / devicePixelRatio : 1);
  const shot = /[?&]shot/.test(location.search);
  stage.style.transform = `translate(${shot ? 0 : (innerWidth - W * s) / 2}px,${shot ? 0 : (innerHeight - H * s) / 2}px) scale(${s})`;
  D.scale = s;
}

function setupOrbs() {
  D.orbs = [];
  const box = $('#orbs');
  for (let k = 0; k < 5; k++) {
    const o = document.createElement('div'); o.className = 'orb';
    const inner = document.createElement('div'); inner.className = 'orb-i';
    o.appendChild(inner); box.appendChild(o); D.orbs.push(o);
    gsap.set(o, { x: 960, y: 540, scale: .5 });
    gsap.to(inner, { x: 'random(-90,90)', y: 'random(-70,70)', scale: 'random(.86,1.14)', duration: 'random(16,30)', ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true, delay: -k * 3 });
  }
}
function morph(def, dur) {
  const cfg = def.orbs || [];
  D.orbs.forEach((o, k) => {
    const c = cfg[k];
    if (c) gsap.to(o, { x: c[0], y: c[1], scale: c[2] / 1000, color: c[3], opacity: c[4] ?? .9, duration: dur, ease: 'expo.inOut', overwrite: 'auto' });
    else gsap.to(o, { opacity: 0, duration: dur * .8, ease: 'power2.inOut', overwrite: 'auto' });
  });
  gsap.to('#bg', { backgroundColor: def.bg || '#2B2B2D', duration: dur, ease: 'power2.inOut', overwrite: 'auto' });
  gsap.to('#vignette', { opacity: def.vignette ?? 1, duration: dur });
  gsap.to('#grain', { opacity: def.grain ?? .17, duration: dur });
}

/* ---------- navigation ---------- */
function slideEl(k) { return slidesEl.children[k]; }
function reset(k) {
  const def = D.slides[k], el = slideEl(k);
  gsap.killTweensOf(el); gsap.set(el, { clearProps: 'all' });
  el.innerHTML = def.html;
  el.className = 'slide on ' + (def.cls || def.id);
  const cc = el.querySelectorAll('.cc'), cx = el.querySelectorAll('.cx');
  if (cc.length) gsap.set(cc, { xPercent: -50, yPercent: -50 });
  if (cx.length) gsap.set(cx, { xPercent: -50 });
  return el;
}
function killLoops() { D.loops.forEach(t => t.kill()); D.loops = []; }
function buildTo(def, el, upto) {
  const tl = gsap.timeline();
  if (def.intro) { const t = gsap.timeline(); def.intro(el, t, FX); tl.add(t); }
  for (let k = 0; k < upto; k++) { const t = gsap.timeline(); def.steps[k](el, t, FX); tl.add(t); }
  return tl;
}

function go(idx, step = 0, mode = 'fwd') {
  idx = Math.max(0, Math.min(D.slides.length - 1, idx));
  const def = D.slides[idx], prevIdx = D.i, prevDef = D.slides[prevIdx];
  if (D.tl) D.tl.progress(1);
  killLoops();
  if (prevDef) prevDef.leave && prevDef.leave(slideEl(prevIdx), FX);
  if (prevDef && prevIdx !== idx) {
    const pel = slideEl(prevIdx);
    if (mode === 'instant') { pel.className = 'slide'; pel.innerHTML = ''; }
    else gsap.to(pel, { autoAlpha: 0, scale: .985, filter: 'blur(10px)', duration: .45, ease: 'power2.in', onComplete: () => { if (D.i !== prevIdx) { pel.className = 'slide'; pel.innerHTML = ''; gsap.set(pel, { clearProps: 'all' }); } } });
  }
  const same = prevIdx === idx;
  D.i = idx; D.step = step;
  const el = reset(idx); D.el = el;
  def.init && def.init(el, FX);
  if (!same) morph(def, mode === 'instant' ? .5 : (def.morph || 1.4));
  D.building = mode === 'instant' || same;
  const tl = buildTo(def, el, step);
  if (D.building) { tl.progress(1); D.building = false; }
  else {
    tl.pause(0);
    const delay = prevDef ? .38 : .05;
    // transisi antar-bab: angka bab raksasa melintas
    if (prevDef && def.act !== prevDef.act && !def.divider && idx > prevIdx) chapterWipe(def.act);
    gsap.delayedCall(delay, () => tl.play());
  }
  D.tl = tl;
  def.enter && def.enter(el, FX, mode);
  updateChrome();
}
function chapterWipe(act) {
  const a = ACTS[act];
  $('.wn', wipe).textContent = a.n; $('.wl', wipe).textContent = a.name;
  gsap.timeline()
    .set(wipe, { opacity: 1 })
    .fromTo('#wipe .wn', { x: 1500 }, { x: -1500, duration: 1.7, ease: 'power3.inOut' }, 0)
    .fromTo('#wipe .wl', { opacity: 0, letterSpacing: '.2em' }, { opacity: 1, letterSpacing: '.7em', duration: .7, yoyo: true, repeat: 1, repeatDelay: .2, ease: 'power2.out' }, .1)
    .set(wipe, { opacity: 0 });
}
function next() {
  const def = D.slides[D.i];
  if (D.tl && D.tl.isActive()) { D.tl.progress(1); return; }
  if (def.steps && D.step < def.steps.length) {
    const t = gsap.timeline(); def.steps[D.step](D.el, t, FX);
    D.step++; D.tl = t; updateChrome();
  } else if (D.i < D.slides.length - 1) go(D.i + 1, 0, 'fwd');
}
function prev() {
  if (D.step > 0) go(D.i, D.step - 1, 'instant');
  else if (D.i > 0) { const p = D.slides[D.i - 1]; go(D.i - 1, (p.steps || []).length, 'instant'); }
}
D.next = next; D.prev = prev; D.go = go;
/* alat uji: ?tick = paksa ticker berjalan walau rAF dijeda (jendela tersembunyi) */
if (/[?&]tick/.test(location.search)) setInterval(() => gsap.ticker.tick(), 16);
D.test = async (n, s = 99, w = 1600) => { const d = D.slides[n - 1]; go(n - 1, Math.min(s, (d.steps || []).length), 'instant'); await new Promise(r => setTimeout(r, w)); return `${D.i + 1}.${D.step}`; };

/* ---------- chrome: HUD, progress, hash, notes ---------- */
function updateChrome() {
  const def = D.slides[D.i], a = ACTS[def.act];
  $('.a', hud).textContent = `${a.n} — ${a.name}`;
  $('.n', hud).textContent = `${String(D.i + 1).padStart(2, '0')} / ${D.slides.length}`;
  gsap.to(hud, { autoAlpha: def.hud === false ? 0 : 1, duration: .4 });
  gsap.to(prog, { width: `${((D.i + 1) / D.slides.length) * 100}%`, backgroundColor: a.col, duration: .8, ease: 'power3.out' });
  gsap.to(prog, { autoAlpha: def.hud === false ? 0 : .8, duration: .4 });
  history.replaceState(null, '', `#${D.i + 1}${D.step ? '.' + D.step : ''}`);
  updateNotes();
  $$('#ov .t').forEach((t, k) => t.classList.toggle('cur', k === D.i));
}

let notesWin = null, t0 = Date.now();
function openNotes() {
  notesWin = window.open('', 'odgj-notes', 'width=980,height=700');
  if (!notesWin) return;
  notesWin.document.title = 'Catatan Pembicara — ODGJ';
  notesWin.document.body.innerHTML = `<style>
    body{margin:0;background:#18181a;color:#eee;font:18px/1.6 Montserrat,Segoe UI,sans-serif;padding:34px 40px}
    .top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid #333;padding-bottom:14px}
    h1{font-size:30px;margin:0} .clock{font:700 34px monospace;color:#F0A04B}
    .meta{color:#999;font-size:15px;letter-spacing:.12em;text-transform:uppercase;margin-top:10px}
    .notes{font-size:24px;line-height:1.6;margin-top:26px;white-space:pre-wrap}
    .next{margin-top:34px;padding:16px 20px;border-radius:12px;background:#232326;color:#aaa}
    .next b{color:#fff} button{font:600 15px Montserrat,sans-serif;padding:10px 16px;margin-right:8px;border-radius:8px;border:0;background:#333;color:#fff;cursor:pointer}
  </style>
  <div class="top"><h1 id="t"></h1><div class="clock" id="c">00:00</div></div>
  <div class="meta" id="m"></div><div class="notes" id="n"></div><div class="next" id="x"></div>
  <p style="margin-top:30px"><button id="bp">◀ Mundur</button><button id="bn">Maju ▶</button><button id="br">Reset waktu</button></p>`;
  const d = notesWin.document;
  d.getElementById('bp').onclick = () => prev();
  d.getElementById('bn').onclick = () => next();
  d.getElementById('br').onclick = () => { t0 = Date.now(); };
  d.addEventListener('keydown', onKey);
  updateNotes();
}
setInterval(() => {
  if (!notesWin || notesWin.closed) return;
  const s = Math.floor((Date.now() - t0) / 1000);
  notesWin.document.getElementById('c').textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}, 1000);
function updateNotes() {
  if (!notesWin || notesWin.closed) return;
  const d = notesWin.document, def = D.slides[D.i], nx = D.slides[D.i + 1];
  d.getElementById('t').textContent = `${String(D.i + 1).padStart(2, '0')} · ${def.title}`;
  d.getElementById('m').textContent = `${ACTS[def.act].n} ${ACTS[def.act].name} · langkah ${D.step}/${(def.steps || []).length}`;
  d.getElementById('n').textContent = def.notes || '—';
  d.getElementById('x').innerHTML = nx ? `Berikutnya: <b>${nx.title}</b>` : 'Slide terakhir';
}

/* ---------- overview ---------- */
function buildOverview() {
  const ov = $('#ov');
  ov.innerHTML = `<h3>IKHTISAR · ${D.slides.length} SLIDE</h3><div class="g">${D.slides.map((s, k) => `<div class="t" data-k="${k}"><div class="o" style="background:${(s.orbs && s.orbs[0] && s.orbs[0][3]) || '#555'}"></div><b>${String(k + 1).padStart(2, '0')}</b><span>${s.title}</span><small>${ACTS[s.act].n} ${ACTS[s.act].name}</small></div>`).join('')}</div>`;
  ov.addEventListener('click', e => { const t = e.target.closest('.t'); if (t) { toggleOverview(false); go(+t.dataset.k, 0, 'fwd'); } });
}
function toggleOverview(on) { $('#ov').classList.toggle('on', on ?? !$('#ov').classList.contains('on')); }

/* ---------- input ---------- */
let num = '';
function onKey(e) {
  if (e.target.isContentEditable || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  const def = D.slides[D.i];
  if ($('#ov').classList.contains('on')) { if (e.key === 'Escape' || e.key.toLowerCase() === 'o') toggleOverview(false); return; }
  if (def.key && def.key(e, D.el, FX)) { e.preventDefault(); return; }
  const k = e.key;
  if (/^[0-9]$/.test(k)) { num += k; return; }
  if (k === 'Enter' && num) { go(+num - 1, 0, 'fwd'); num = ''; return; }
  num = '';
  if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown'].includes(k)) { e.preventDefault(); next(); }
  else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp'].includes(k)) { e.preventDefault(); prev(); }
  else if (k === 'Home') go(0, 0, 'instant');
  else if (k === 'End') go(D.slides.length - 1, 0, 'instant');
  else if (k.toLowerCase() === 'f') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }
  else if (k.toLowerCase() === 'o') toggleOverview(true);
  else if (k.toLowerCase() === 'n') openNotes();
  else if (k === '?' || k.toLowerCase() === 'h') $('#help').classList.toggle('on');
  else if (k === 'Escape') $('#help').classList.remove('on');
}

let hideT;
function boot() {
  stage = $('#stage'); slidesEl = $('#slides'); hud = $('#hud'); prog = $('#progress'); wipe = $('#wipe');
  fit(); addEventListener('resize', fit);
  setupOrbs();
  D.slides.forEach(() => { const s = document.createElement('section'); s.className = 'slide'; slidesEl.appendChild(s); });
  buildOverview();
  addEventListener('keydown', onKey);
  stage.addEventListener('click', e => {
    const def = D.slides[D.i];
    if (def.click && def.click(e, D.el, FX)) return;
    if (e.target.closest('[data-noclick]')) return;
    next();
  });
  stage.addEventListener('contextmenu', e => { e.preventDefault(); prev(); });
  addEventListener('mousemove', () => { document.body.classList.remove('hide-cursor'); clearTimeout(hideT); hideT = setTimeout(() => document.body.classList.add('hide-cursor'), 2500); });
  const m = /^#(\d+)(?:\.(\d+))?/.exec(location.hash);
  if (m) go(+m[1] - 1, +(m[2] || 0), 'instant'); else go(0, 0, 'fwd');
  const hint = $('#hint');
  gsap.to(hint, { autoAlpha: 0, delay: 6, duration: 1 });
}
Promise.all([
  document.fonts.load('900 100px Archivo'), document.fonts.load('400 20px Montserrat'), document.fonts.load('600 20px Montserrat'),
  document.fonts.load('700 20px Montserrat'), document.fonts.load('800 20px Montserrat'), document.fonts.load('italic 400 20px Montserrat'), document.fonts.load('italic 600 20px Montserrat'),
]).catch(() => {}).then(() => document.fonts.ready).then(boot);
})();
