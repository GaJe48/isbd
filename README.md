# ODGJ — Memandang Manusia, Bukan Labelnya

Presentasi web ISBD (41 slide, GSAP) dengan video wawancara dan subtitle karaoke.

## Presentasi

Buka `index.html` di Chrome/Edge/Brave (klik dua kali), tekan **F** untuk layar penuh.
Yang perlu dibawa: `index.html`, folder `assets/`, dan `Timeline 1.mp4`. Bun tidak diperlukan saat presentasi.

Tombol: → / Spasi / klik = lanjut · ← = mundur · O = ikhtisar · N = catatan pembicara · `12` + Enter = lompat ke slide 12.

## Mengembangkan

```bash
bun install
bun run dev      # build dev + build ulang otomatis + server di http://localhost:5173
bun run build    # build final -> assets/app.js + assets/app.css (jalankan sebelum presentasi)
bun run subs     # Timeline 1.srt -> src/data/subs.ts, lalu build
bun run test     # uji alat subtitle
bun run check    # cek tipe TypeScript
```

Build memakai format IIFE karena modul ES tidak bisa dimuat dari `file://`.

## Versi PowerPoint

Hasil: `out/pptx/presentasi.pptx`. Satu slide PowerPoint per langkah klik, tanpa animasi, semua teks bisa diedit,
font Archivo + Montserrat ditanam di dalam file (tidak perlu di-install), video wawancara dengan subtitle tertanam.

```bash
bun run pptx:video   # sekali saja (atau setelah subtitle berubah): Timeline 1.mp4 + subtitle -> out/pptx/wawancara.mp4
bun run pptx         # ekspor dari browser (Edge) -> buat font tertanam -> tulis presentasi.pptx
bun run pptx:cek     # render lewat PowerPoint dan bandingkan dengan web -> out/pptx/cmp/N.png (kiri web, kanan PPT)
```

Butuh Microsoft Edge, [uv](https://docs.astral.sh/uv/) (Python untuk font), ffmpeg (video), dan PowerPoint (hanya untuk `pptx:cek`).
Catatan: ekspor gambar PowerPoint lewat skrip mengabaikan font tertanam, jadi `pptx:cek` merender lewat PDF.

## Struktur

```
src/
  main.ts              titik masuk
  config.ts            ukuran panggung, daftar babak
  types.ts             SlideDef, Orb, Sub, ...
  engine/              navigasi, orb latar, HUD/catatan/ikhtisar, input, boot
  fx/                  helper animasi (FX.rise, FX.count, ...), templat HTML, svgText
  slides/              satu slide = NN-nama.ts + NN-nama.css; urutan di index.ts
  data/info.ts         nama kelompok, anggota, dosen
  data/subs.ts         dibuat otomatis oleh bun run subs (jangan diedit)
  styles/              base.css (panggung, tipografi, komponen), shared.css
tools/
  build.ts, dev.ts     build dan server lokal
  subtitle/            config.ts (pewawancara, kutipan, aturan baris), core.ts, cli.ts, core.test.ts
  pptx/                export.ts + extract.ts (browser -> dump.json), fonts.py (font tertanam), build.ts (-> .pptx),
                       video.ts (subtitle dibakar ke video), render.ps1 + compare.ts (cek hasil)
assets/                font, gambar, dan hasil build
media/                 video wawancara versi web (cadangan kalau Timeline 1.mp4 tidak ada)
out/                   hasil ekspor PPTX (tidak masuk git)
```

Alat uji di build dev: `?tick` (animasi tetap jalan di jendela tersembunyi), `?shot` (panggung untuk screenshot),
dan `test(29, 1)` di konsol untuk lompat ke slide 29 langkah 1.
