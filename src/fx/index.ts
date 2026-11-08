import * as anim from './anim';
import { $, $$ } from './dom';
import { svgText } from './svg';

export { gsap } from 'gsap';
export { $, $$ } from './dom';
export { fmt } from './anim';
export { svgText } from './svg';
export * from './templates';

/** Semua helper animasi dalam satu objek: FX.rise(...), FX.count(...), dst. */
export const FX = { ...anim, $, $$, svgText };
