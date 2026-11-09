/* Video wawancara untuk PPTX: subtitle karaoke (src/data/subs.ts) dibakar ke video lewat ffmpeg/libass,
   karena PowerPoint tidak bisa menjalankan subtitle per kata seperti slide 29 di web.
   Hasil: out/pptx/wawancara.mp4 (dipakai build.ts kalau ada). Pakai: bun tools/pptx/video.ts [--ass] */
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { SUBS } from '../../src/data/subs';

const ROOT = path.resolve(import.meta.dir, '..', '..');
const OUT = path.join(ROOT, 'out', 'pptx');
mkdirSync(OUT, { recursive: true });
const SRC = [path.join(ROOT, 'Timeline 1.mp4'), path.join(ROOT, 'media', 'wawancara.mp4')].find(f => existsSync(f))!;

const ts = (t: number) => {
  t = Math.max(0, t);
  const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
  return `${h}:${String(m).padStart(2, '0')}:${s.toFixed(2).padStart(5, '0')}`;
};
/** tag karaoke ASS {\k<senti-detik>} */
const kara = (t: number) => `{${String.fromCharCode(92)}k${Math.max(0, Math.round(t * 100))}}`;

/* Gaya meniru .s29 .sl: Montserrat 600 44px, kata belum diucapkan 42% (warna sekunder karaoke),
   kotak rgba(10,10,14,.42) di bawah layar. Ukuran font libass = tinggi ascender+descender (~1,22 em Montserrat).
   Dua lapis: lapis 0 hanya kotak (teks transparan, satu kotak per baris), lapis 1 teks karaoke
   (kalau digabung, libass menggambar kotak per potongan karaoke sehingga sambungannya terlihat). */
const FS = Math.round(44 * 1.22);
// Name, Font, Size, Primary, Secondary, Outline, Back, Bold, Italic, U, S, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Align, ML, MR, MV, Enc
const style = (name: string, font: string, primary: string, secondary: string, outline: string, back: string, italic: number, border: number, ol: number, sh: number) =>
  `Style: ${name},${font},${FS},${primary},${secondary},${outline},${back},0,${italic},0,0,100,100,0,0,${border},${ol},${sh},2,246,246,142,1`;
const ass = `[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
${style('N', 'Montserrat SemiBold', '&H00FFFFFF', '&H94FFFFFF', '&HFF000000', '&H66000000', 0, 1, 0, 2)}
${style('P', 'Montserrat', '&H00F5C6CF', '&H94F5C6CF', '&HFF000000', '&H66000000', -1, 1, 0, 2)}
${style('NBox', 'Montserrat SemiBold', '&HFF000000', '&HFF000000', '&H940E0A0A', '&HFF000000', 0, 3, 14, 0)}
${style('PBox', 'Montserrat', '&HFF000000', '&HFF000000', '&H940E0A0A', '&HFF000000', -1, 3, 14, 0)}

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
