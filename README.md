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
assets/                font, gambar, dan hasil build
```

Alat uji di build dev: `?tick` (animasi tetap jalan di jendela tersembunyi), `?shot` (panggung untuk screenshot),
dan `test(29, 1)` di konsol untuk lompat ke slide 29 langkah 1.
