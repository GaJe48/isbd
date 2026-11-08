/* Keyboard, klik, dan kursor. */
import { $ } from '../fx/dom';
import { openNotes, overviewOpen, toggleOverview } from './chrome';
import { go, next, prev } from './deck';
import { DECK } from './state';

let num = '';

export function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement;
  if (t.isContentEditable || /INPUT|TEXTAREA/.test(t.tagName)) return;
  if (overviewOpen()) { if (e.key === 'Escape' || e.key.toLowerCase() === 'o') toggleOverview(false); return; }
  const def = DECK.slides[DECK.i];
  if (def.key?.(e, DECK.el)) { e.preventDefault(); return; }

  const k = e.key, lk = k.toLowerCase();
  if (/^[0-9]$/.test(k)) { num += k; return; }           // "12" + Enter = lompat ke slide 12
  if (k === 'Enter' && num) { go(+num - 1, 0, 'fwd'); num = ''; return; }
  num = '';
  if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown'].includes(k)) { e.preventDefault(); next(); }
  else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp'].includes(k)) { e.preventDefault(); prev(); }
  else if (k === 'Home') go(0, 0, 'instant');
  else if (k === 'End') go(DECK.slides.length - 1, 0, 'instant');
  else if (lk === 'f') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }
  else if (lk === 'o') toggleOverview(true);
  else if (lk === 'n') openNotes(onKey);
  else if (k === '?' || lk === 'h') $('#help').classList.toggle('on');
  else if (k === 'Escape') $('#help').classList.remove('on');
}

export function bindInput(stage: HTMLElement) {
  addEventListener('keydown', onKey);
  stage.addEventListener('click', e => {
    if (DECK.slides[DECK.i].click?.(e, DECK.el)) return;
    if ((e.target as Element).closest('[data-noclick]')) return;
    next();
  });
  stage.addEventListener('contextmenu', e => { e.preventDefault(); prev(); });
  let hideT: ReturnType<typeof setTimeout>;
  addEventListener('mousemove', () => {
    document.body.classList.remove('hide-cursor');
    clearTimeout(hideT);
    hideT = setTimeout(() => document.body.classList.add('hide-cursor'), 2500);
  });
}
