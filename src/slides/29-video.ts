import { defineSlide, type SlideEl, type Sub } from '../types';
import { FX, $, $$, gsap, mmss } from '../fx';
import { DECK } from '../engine/state';
import { SUBS, SEGMENTS } from '../data/subs';
import './29-video.css';

/* ---------------- S29 · VIDEO ----------------
   Video wawancara dengan subtitle karaoke (data dari src/data/subs.ts, dibuat oleh bun run subs).
   Elemen <video id="vid"> hidup di #vault (index.html) supaya tidak dimuat ulang tiap slide dibangun. */

/** durasi cadangan sebelum metadata video terbaca: akhir subtitle terakhir */
const FALLBACK = Math.ceil(SUBS.at(-1)!.e);
const dur = (v: HTMLVideoElement) => v.duration || FALLBACK;
const pct = (t: number, d: number) => `${(t / d) * 100}%`;

const video = (el: SlideEl): HTMLVideoElement => el._v;

function togglePlay(v: HTMLVideoElement) {
  if (v.paused) v.play().catch(() => {});
  else v.pause();
}

function subLine(L: Sub) {
  const who = L.sp === 'P' ? '<span class="who">Pewawancara</span>' : '';
  const words = L.w.map(([t, w]) => `<span class="w" data-s="${t}">${w}</span>`).join(' ');
  return `<div class="sl ${L.sp}${L.key ? ' key' : ''}">${who}${words}${L.key ? '<span class="ul"></span>' : ''}</div>`;
}

export default defineSlide({
  id: 's29', act: 6, title: '▶ Video wawancara (3:20)', hud: false, bg: '#141416',
  orbs: [[960, 600, 1300, '#F0A04B', .22], [300, 200, 600, '#7A6BB0', .2]],
  html: `<div class="intro"><div class="kicker"><b>06</b><span>Studi kasus · video wawancara</span></div><div class="disp">Wawancara keluarga ODGJ</div></div>
    <div class="lap"><div class="bezel"></div><div class="base"></div><div class="scr"><div class="vslot" style="position:absolute;inset:0"></div>
      <div class="play"><svg viewBox="0 0 80 80" width="80" height="80"><path d="M28 18 L62 40 L28 62 Z" fill="#18181b"/></svg></div></div></div>
    <div class="shade"></div>
    <div class="l3"><i></i><div><b>Wawancara keluarga ODGJ</b><span>Studi kasus demensia · istri pendamping ± 6 tahun</span></div></div>
    <div class="seg"><small>Q1</small><b></b></div>
    <div class="subs"></div>
    <div class="ctl" data-noclick><div class="track"><div class="fillbar"></div>${SEGMENTS.map((s, k) => `<span class="mk" data-k="${k}" style="left:${pct(s.t, FALLBACK)}"></span>`).join('')}</div>
      ${SEGMENTS.map((s, k) => `<span class="mkl" style="left:${pct(s.t, FALLBACK)}">Q${k + 1} ${s.label}</span>`).join('')}<span class="time">0:00 / ${mmss(FALLBACK)}</span></div>
    <div class="pz"><svg viewBox="0 0 60 60" width="60" height="60"><rect x="14" y="12" width="11" height="36" rx="3" fill="#fff"/><rect x="35" y="12" width="11" height="36" rx="3" fill="#fff"/></svg></div>
    <div class="blackout"></div>`,

  init(el) {
    const v = $<HTMLVideoElement>('#vid');
    $('.vslot', el).appendChild(v);
    v.muted = false;
    v.playbackRate = 1;
    el._v = v; el._line = null; el._seg = -1; el._zoomed = false;
    gsap.set($('.lap', el), { scale: .56, y: 40 });
    if (!DECK.building && v.currentTime < .3) { try { v.currentTime = .4; } catch { /* metadata belum siap */ } }
  },

  intro(el, tl) {
    FX.fade(tl, $('.intro .kicker', el), 0);
    FX.rise(tl, $('.intro .disp', el), .1);
    tl.from($('.lap', el), { autoAlpha: 0, y: 160, duration: 1.3, ease: 'expo.out' }, .2);
    tl.fromTo($('.play', el), { autoAlpha: 0, scale: .5 }, { autoAlpha: 1, scale: 1, duration: .6, ease: 'back.out(2)' }, 1);
    tl.call(() => { FX.loop(gsap.to($('.play', el), { scale: 1.08, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' })); });
  },

  steps: [
    // perbesar laptop sampai video memenuhi layar, lalu putar
    (el, tl) => {
      el._zoomed = true;
      tl.call(() => { el.classList.add('zoomed'); }, undefined, .3);
      tl.to($('.intro', el), { autoAlpha: 0, y: -40, duration: .6, ease: 'power2.in' })
        .to($('.play', el), { autoAlpha: 0, scale: 1.6, duration: .5 }, 0)
        .to($('.lap', el), { scale: 1, y: 0, duration: 1.7, ease: 'expo.inOut' }, .2)
        .to($('.shade', el), { opacity: 1, duration: .8 }, 1.4)
        .to($('.ctl', el), { opacity: 1, duration: .6 }, 1.5)
        .to($('.ctl', el), { opacity: 0, duration: .8 }, 5);
      if (!DECK.building) tl.call(() => {
        const v = video(el);
        if (v.ended || v.currentTime > dur(v) - 1) v.currentTime = 0;
        v.play().catch(() => {});
      }, undefined, 1.6);
    },
  ],

  enter(el) {
    const v = video(el), subs = $('.subs', el), fill = $('.fillbar', el), time = $('.time', el), seg = $('.seg', el), l3 = $('.l3', el);
    let l3shown = false;

    // penanda Q1..Qn mengikuti durasi video sebenarnya
    const placeMarkers = () => {
      const d = dur(v);
      $$('.mk', el).forEach((m, k) => { m.style.left = pct(SEGMENTS[k].t, d); });
      $$('.mkl', el).forEach((m, k) => { m.style.left = pct(SEGMENTS[k].t, d); });
    };
    if (v.readyState >= 1) placeMarkers(); else v.addEventListener('loadedmetadata', placeMarkers, { once: true });

    const render = () => {
      const t = v.currentTime, d = dur(v);
      fill.style.width = pct(t, d);
      time.textContent = `${mmss(t)} / ${mmss(d)}`;

      // baris subtitle aktif
      let L: Sub | null = null;
      for (const l of SUBS) { if (l.s - .12 <= t) L = l; else break; }
      if (!el._zoomed || (L && t > L.e + .7)) L = null;
      if (L !== el._line) {
        el._line = L;
        if (!L) gsap.to(subs, { opacity: 0, duration: .2 });
        else {
          subs.innerHTML = subLine(L);
          gsap.fromTo(subs, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .25, ease: 'power2.out' });
        }
      }
      if (L) {
        $$('.w', subs).forEach(w => w.classList.toggle('on', t >= +w.dataset.s!));
        const ul = subs.querySelector('.ul');
        if (ul && t > L.s + .4) ul.classList.add('on');
      }

      // kartu pertanyaan saat segmen berganti
      let k = -1;
      SEGMENTS.forEach((s, j) => { if (t >= s.t - .2) k = j; });
      if (el._zoomed && k !== el._seg && !v.paused) {
        el._seg = k;
        if (k >= 1) {
          $('small', seg).textContent = `Q${k + 1} · ${SEGMENTS[k].label}`;
          $('b', seg).textContent = SEGMENTS[k].q;
          gsap.timeline().fromTo(seg, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }).to(seg, { opacity: 0, x: -20, duration: .6 }, '+=4.5');
        }
      }
      if (el._zoomed && !l3shown && t > .3 && t < 6 && !v.paused) {
        l3shown = true;
        gsap.timeline().fromTo(l3, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out' }).to(l3, { opacity: 0, duration: .7 }, '+=4.6');
      }
    };
    el._render = render;
    gsap.ticker.add(render);

    const seek = (t: number) => { v.currentTime = Math.max(0, Math.min(t, dur(v) - .2)); el._seg = -1; render(); };
    $('.track', el).addEventListener('click', e => {
      e.stopPropagation();
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      seek(((e.clientX - r.left) / r.width) * dur(v));
    });
    $$('.mk', el).forEach(m => m.addEventListener('click', e => { e.stopPropagation(); seek(SEGMENTS[+m.dataset.k!].t - .3); }));
    $('.ctl', el).addEventListener('click', e => e.stopPropagation());

    let uiT: ReturnType<typeof setTimeout>;
    el._mm = () => { el.classList.add('ui'); clearTimeout(uiT); uiT = setTimeout(() => el.classList.remove('ui'), 2200); };
    addEventListener('mousemove', el._mm);
    el._onEnd = () => gsap.timeline().to($('.blackout', el), { opacity: 1, duration: 1.2 }).call(() => { if (DECK.el === el) DECK.next(); });
    el._onPause = () => { el.classList.add('ui'); gsap.to($('.pz', el), { opacity: el._zoomed ? 1 : 0, duration: .3 }); };
    el._onPlay = () => { el.classList.remove('ui'); gsap.to($('.pz', el), { opacity: 0, duration: .3 }); };
    v.addEventListener('ended', el._onEnd);
    v.addEventListener('pause', el._onPause);
    v.addEventListener('play', el._onPlay);
  },

  leave(el) {
    const v = video(el);
    if (!v) return;
    v.pause();
    gsap.ticker.remove(el._render);
    v.removeEventListener('ended', el._onEnd);
    v.removeEventListener('pause', el._onPause);
    v.removeEventListener('play', el._onPlay);
    removeEventListener('mousemove', el._mm);
    $('#vault').appendChild(v);
  },

  key(e, el) {
    const v = video(el), k = e.key.toLowerCase();
    if (k === ' ' || k === 'k') { if (!el._zoomed) DECK.next(); else togglePlay(v); return true; }
    if (!el._zoomed) return false;
    if (k === 'j') { v.currentTime = Math.max(0, v.currentTime - 5); return true; }
    if (k === 'l') { v.currentTime = Math.min(dur(v) - .2, v.currentTime + 5); return true; }
    if (k === 'enter') { togglePlay(v); return true; }
    return false;
  },

  click(_e, el) {
    if (!el._zoomed) return false;
    togglePlay(video(el));
    return true;
  },

  notes: 'Tekan → / Spasi untuk memperbesar dan memutar video. Selama video: Spasi/klik = jeda, J/L = mundur/maju 5 detik, klik garis waktu untuk lompat ke pertanyaan. Saat video selesai, slide otomatis lanjut.',
});
