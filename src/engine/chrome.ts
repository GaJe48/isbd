/* HUD, progress bar, hash URL, catatan pembicara, mode ikhtisar. */
import { gsap } from 'gsap';
import { ACTS } from '../config';
import { $, $$ } from '../fx/dom';
import { DECK } from './state';

const pad2 = (n: number) => String(n).padStart(2, '0');

export function updateChrome() {
  const def = DECK.slides[DECK.i], a = ACTS[def.act];
  const hud = $('#hud'), prog = $('#progress');
  $('.a', hud).textContent = `${a.n} — ${a.name}`;
  $('.n', hud).textContent = `${pad2(DECK.i + 1)} / ${DECK.slides.length}`;
  gsap.to(hud, { autoAlpha: def.hud === false ? 0 : 1, duration: 0.4 });
  gsap.to(prog, { width: `${((DECK.i + 1) / DECK.slides.length) * 100}%`, backgroundColor: a.col, duration: 0.8, ease: 'power3.out' });
  gsap.to(prog, { autoAlpha: def.hud === false ? 0 : 0.8, duration: 0.4 });
  history.replaceState(null, '', `#${DECK.i + 1}${DECK.step ? '.' + DECK.step : ''}`);
  updateNotes();
  $$('#ov .t').forEach((t, k) => t.classList.toggle('cur', k === DECK.i));
}

/* ---------- catatan pembicara (jendela terpisah) ---------- */
let notesWin: Window | null = null;
let t0 = Date.now();

export function openNotes(onKey: (e: KeyboardEvent) => void) {
  notesWin = window.open('', 'odgj-notes', 'width=980,height=700');
  if (!notesWin) return;
  const d = notesWin.document;
  d.title = 'Catatan Pembicara — ODGJ';
  d.body.innerHTML = `<style>
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
  d.getElementById('bp')!.onclick = () => DECK.prev();
  d.getElementById('bn')!.onclick = () => DECK.next();
  d.getElementById('br')!.onclick = () => { t0 = Date.now(); };
  d.addEventListener('keydown', onKey);
  updateNotes();
}

setInterval(() => {
  if (!notesWin || notesWin.closed) return;
  const s = Math.floor((Date.now() - t0) / 1000);
  notesWin.document.getElementById('c')!.textContent = `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
}, 1000);

function updateNotes() {
  if (!notesWin || notesWin.closed) return;
  const d = notesWin.document, def = DECK.slides[DECK.i], nx = DECK.slides[DECK.i + 1], a = ACTS[def.act];
  d.getElementById('t')!.textContent = `${pad2(DECK.i + 1)} · ${def.title}`;
  d.getElementById('m')!.textContent = `${a.n} ${a.name} · langkah ${DECK.step}/${(def.steps || []).length}`;
  d.getElementById('n')!.textContent = def.notes || '—';
  d.getElementById('x')!.innerHTML = nx ? `Berikutnya: <b>${nx.title}</b>` : 'Slide terakhir';
}

/* ---------- ikhtisar semua slide ---------- */
export function buildOverview() {
  const ov = $('#ov');
  ov.innerHTML = `<h3>IKHTISAR · ${DECK.slides.length} SLIDE</h3><div class="g">${DECK.slides.map((s, k) =>
    `<div class="t" data-k="${k}"><div class="o" style="background:${s.orbs?.[0]?.[3] || '#555'}"></div><b>${pad2(k + 1)}</b><span>${s.title}</span><small>${ACTS[s.act].n} ${ACTS[s.act].name}</small></div>`).join('')}</div>`;
  ov.addEventListener('click', e => {
    const t = (e.target as Element).closest<HTMLElement>('.t');
    if (t) { toggleOverview(false); DECK.go(+t.dataset.k!, 0, 'fwd'); }
  });
}

export const overviewOpen = () => $('#ov').classList.contains('on');
export const toggleOverview = (on?: boolean) => $('#ov').classList.toggle('on', on ?? !overviewOpen());
