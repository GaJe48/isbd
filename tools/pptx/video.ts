/* Video wawancara untuk PPTX: subtitle karaoke dari "Timeline 1.ass" dibakar ke video lewat ffmpeg/libass,
   karena PowerPoint tidak bisa menjalankan subtitle per kata seperti slide 29 di web.
   Teks, timing, dan gaya (font, ukuran, warna, kotak, margin) semuanya dari "Timeline 1.ass".
   Hasil: out/pptx/wawancara.mp4 (dipakai build.ts kalau ada). Pakai: bun tools/pptx/video.ts [--ass] */
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { buildSubtitles, STYLE_FIELDS, type AssStyle } from '../subtitle/core';

const ROOT = path.resolve(import.meta.dir, '..', '..');
const OUT = path.join(ROOT, 'out', 'pptx');
mkdirSync(OUT, { recursive: true });
const { subs: SUBS, styles, warnings } = buildSubtitles(await Bun.file(path.join(ROOT, 'Timeline 1.ass')).text());
warnings.forEach(w => console.warn(`! Timeline 1.ass ${w}`));
const SRC = [path.join(ROOT, 'Timeline 1.mp4'), path.join(ROOT, 'media', 'wawancara.mp4')].find(f => existsSync(f))!;

const ts = (t: number) => {
  t = Math.max(0, t);
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
  return `${h}:${String(m).padStart(2, '0')}:${s.toFixed(2).padStart(5, '0')}`;
};
/** tag karaoke ASS {\k<senti-detik>} */
const kara = (t: number) => `{${String.fromCharCode(92)}k${Math.max(0, Math.round(t * 100))}}`;

/* Dua lapis per baris: lapis 0 hanya kotak/garis tepi (teks transparan), lapis 1 teks karaoke tanpa kotak.
   Kalau digabung, libass menggambar kotak per potongan karaoke sehingga sambungannya terlihat.
   Satu-satunya tambahan di luar .ass: bayangan lembut di teks (meniru text-shadow di web). */
const TRANSPARENT = '&HFF000000';
const line = (st: AssStyle, name: string, over: Record<string, string | number>) =>
  `Style: ${STYLE_FIELDS.map(k => k === 'name' ? name : (over[k] ?? st.raw[k])).join(',')}`;
const styleLines = (['N', 'P'] as const).flatMap(sp => [
  line(styles[sp], sp, { outlinecolour: TRANSPARENT, backcolour: '&H66000000', borderstyle: 1, outline: 0, shadow: 2 }),
  line(styles[sp], sp + 'Box', { primarycolour: TRANSPARENT, secondarycolour: TRANSPARENT }),
]).join(String.fromCharCode(10));
const ass = `[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
${styleLines}

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
${SUBS.map((L, i) => {
  // muncul 0,12 dtk lebih awal, hilang 0,7 dtk setelah selesai (atau saat baris berikut muncul) — seperti di web
  const start = L.s - 0.12, end = Math.min(L.e + 0.7, (SUBS[i + 1]?.s ?? Infinity) - 0.12);
  const k = L.w.map(([t, w], j) => `${kara((L.w[j + 1]?.[0] ?? end) - t)}${w}`).join(' ');
  const st = L.sp === 'P' ? 'P' : 'N';
  return `Dialogue: 0,${ts(start)},${ts(end)},${st}Box,,0,0,0,,${L.w.map(w => w[1]).join(' ')}\n` +
    `Dialogue: 1,${ts(start)},${ts(end)},${st},,0,0,0,,${kara(L.w[0][0] - start)}${k}`;
}).join('\n')}
`;
await Bun.write(path.join(OUT, 'wawancara.ass'), ass);
if (process.argv.includes('--ass')) process.exit(0); // hanya tulis .ass (untuk mencoba gaya)

// jalan di out/pptx supaya jalur filter subtitles tidak memuat "C:" (titik dua = pemisah opsi ffmpeg)
const args = ['-y', '-hide_banner', '-loglevel', 'error', '-stats', '-i', SRC,
  '-vf', 'scale=1280:720:flags=lanczos,subtitles=wawancara.ass:fontsdir=fonts',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', 'wawancara.mp4'];
const p = Bun.spawn(['ffmpeg', ...args], { cwd: OUT, stdout: 'inherit', stderr: 'inherit' });
if ((await p.exited) !== 0) process.exit(1);
console.log(`-> ${path.relative(ROOT, path.join(OUT, 'wawancara.mp4'))} (${((await Bun.file(path.join(OUT, 'wawancara.mp4')).size) / 1e6).toFixed(1)} MB) dari ${path.relative(ROOT, SRC)}`);
