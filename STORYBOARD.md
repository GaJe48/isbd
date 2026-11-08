# Storyboard Presentasi — ODGJ: Memandang Manusia, Bukan Labelnya

ISBD · Presentasi motion graphics · Draf storyboard v2 (6 Nov 2026) — revisi: S09 memakai meme "No / Yes"

---

## A. Konsep Besar

**Judul presentasi:** *ODGJ — Memandang Manusia, Bukan Labelnya*

**Ide visual inti: "Outline → Isi"**
Referensi memakai judul ganda: satu huruf **solid** dan satu huruf **outline** (berongga). Di presentasi ini, gaya itu diberi makna:

- **Huruf outline = label/stigma.** Kosong, hanya kulit luar ("orang gila", "aib", "kutukan").
- **Huruf solid = pemahaman.** Utuh, berisi ("orang dengan gangguan jiwa", "sakit yang bisa diobati").

Sepanjang presentasi, kata-kata stigma selalu tampil sebagai outline, lalu "terisi" saat fakta muncul. Di slide penutup, judul berubah total dari outline menjadi solid.

**Alur warna (emotional arc):**
Gradasi latar ikut bercerita, dari dingin ke hangat.

| Babak | Suasana | Warna orb dominan |
| --- | --- | --- |
| Pembuka → Pengertian | Netral, ingin tahu | Abu-abu + biru (seperti cover referensi) |
| Data → Stigma → Pasung | Berat, serius | Biru tua, ungu, sedikit merah |
| Studi kasus | Personal, hening | Hampir gelap, satu orb lembut |
| Nilai budaya → Hak → Peran | Harapan | Ungu → magenta → oranye |
| Penutup | Hangat, utuh | Ungu, magenta, oranye (seperti slide "Thanks" referensi) |

---

## B. Design System (diturunkan dari referensi)

**Warna**

| Peran | Hex | Asal referensi |
| --- | --- | --- |
| Latar utama | `#2B2B2D` charcoal | Slide 2–15 |
| Kartu kaca | `#BDBDBD` 85% + blur | Kartu abu "Problem / Solution" |
| Biru | `#2F6FD6` | Orb biru |
| Ungu | `#7A6BB0` | Orb ungu, bar chart |
| Magenta | `#B85A9C` | Cover |
| Merah | `#D9283F` | Titik merah cover |
| Oranye | `#F0A04B` | Orb "Traction" |
| Hijau pastel (aksen bulatan angka) | `#A8DDA0` | Bulatan nomor di kartu |
| Teks | `#FFFFFF` / `#111111` di kartu | — |

**Tipografi**
- **Display:** *Archivo* dengan sumbu lebar diperlebar (Expanded, weight 900). Paling mirip font lebar tebal di referensi. Huruf kapital semua.
- **Display outline:** font yang sama, `-webkit-text-stroke: 1.5px #fff`, isi transparan.
- **Teks isi:** *Montserrat* 400/600/700, seperti referensi.
- **Angka besar:** Archivo Expanded 900, tabular figures.

**Tekstur:** grain/noise halus di seluruh layar (bergerak pelan 8 fps) agar terasa seperti gradasi Canva referensi, tetapi "hidup".

**Komponen berulang**
1. **Orb gradasi:** 2–3 bulatan blur besar per slide, bergerak pelan (drift 20–40 detik per siklus).
2. **Judul ganda:** solid + outline, seperti "PROBLEMS / PROBLEMS".
3. **Judul vertikal:** seperti "SOLU / TIONS" dan "ADVANTAGES".
4. **Kartu kaca abu** dengan **bulatan gradasi berisi angka** (biru-hijau).
5. **Chapter number:** angka besar `01`–`09` di pojok.
6. **Progress bar:** garis tipis 2px di bawah layar, warna mengikuti babak.

---

## C. Bahasa Gerak (Motion Language)

| Elemen | Gerakan | Durasi / easing |
| --- | --- | --- |
| Orb latar | Drift terus-menerus. **Saat pindah slide, orb tidak hilang tetapi berpindah posisi dan warna** (morph), jadi transisi terasa satu kesatuan | 1,2 s, `expo.inOut` |
| Judul solid | Mask reveal dari bawah per huruf (stagger 0,03 s) | 0,9 s, `expo.out` |
| Judul outline | Garis tepi "digambar" (stroke draw) lalu sedikit bergeser horizontal (parallax) | 1,4 s |
| Kartu | Naik 40px + fade + blur 12→0px, stagger 0,12 s | 0,8 s, `power3.out` |
| Angka statistik | Hitung naik (counter) dari 0, dengan format Indonesia (koma desimal, titik ribuan) | 1,6 s, `power2.out` |
| Kata stigma | Tampil outline → dicoret garis → "terisi" menjadi kata pengganti | 1,2 s |
| Transisi antar-bab | Layar penuh: angka bab raksasa outline melintas, orb membesar menutupi layar lalu mengecil | 1,6 s |
| Interaksi | Tiap klik/→ memunculkan satu "build" (poin berikutnya), seperti animasi PowerPoint | — |

Prinsip: **gerak melayani isi**. Slide berat (pasung, studi kasus) gerakannya lebih lambat dan minim; slide harapan gerakannya lebih lega dan cerah.

---

## D. Storyboard Per Slide

Keterangan: **[klik]** = satu langkah build saat presenter menekan → / klik.
Estimasi total: **±22–25 menit** (termasuk video 3:20), 41 slide.

---

### BABAK 0 — PEMBUKA

#### S01 · Cover
```
┌──────────────────────────────────────────────┐
│ (abu)        (merah-magenta)        (biru)   │
│                                              │
│        O D G J   (outline, sangat besar)     │
│      ORANG DENGAN GANGGUAN JIWA              │
│   Memandang manusia, bukan labelnya          │
│                                              │
│ ISBD · 2026                 Dipresentasikan  │
│                             oleh Kelompok _  │
└──────────────────────────────────────────────┘
```
- **Latar:** gradasi abu → merah → biru persis seperti cover referensi, grain bergerak.
- **Animasi:**
  1. Layar gelap, titik merah kecil muncul di tengah lalu "mekar" menjadi gradasi penuh (1,5 s).
  2. "ODGJ" outline digambar huruf demi huruf.
  3. "ORANG DENGAN GANGGUAN JIWA" muncul dengan letter-spacing melebar (seperti "P R E S E N T A T I O N").
  4. Tagline fade, info kelompok slide-in dari kanan bawah.
- **Catatan:** ODGJ sengaja outline di awal; baru solid di slide terakhir (S41).

#### S02 · Peta Presentasi (Agenda)
- **Layout:** judul vertikal "AGEN / DA" outline di kiri (gaya "SOLU/TIONS"), 9 baris bab di kanan dengan nomor 01–09.
- **Animasi:** baris muncul berurutan; garis tipis "mengalir" dari 01 sampai 09 seperti timeline.

---

### BABAK 1 — PENDAHULUAN (01)

#### S03 · Pembatas Bab 01 + Kutipan Pembuka
- **Isi:** *"Tidak ada kesehatan tanpa kesehatan jiwa."*
- **Animasi:** angka "01" outline raksasa melintas; kutipan diketik per kata, kata **"jiwa"** berubah dari outline menjadi solid.

#### S04 · Latar Belakang: Cara Masyarakat Memandang
```
┌──────────────────────────────────────────────┐
│  guna-guna      KERASUKAN        kutukan     │  ← kata-kata outline
│        kurang iman        (melayang pelan)   │
│                                              │
│  ▸ banyak ODGJ tidak dibawa berobat          │
│  ▸ dikucilkan · ditelantarkan · dipasung     │
└──────────────────────────────────────────────┘
```
- **[klik 1]** Kata-kata mitos (outline) melayang masuk dari berbagai arah, sedikit bergoyang.
- **[klik 2]** Akibatnya: 3 kata "dikucilkan · ditelantarkan · dipasung" muncul di bawah, bertekanan.
- **[klik 3]** Kaitan ISBD: "nilai · norma · stigma · keadilan sosial" dalam 4 pil kaca.

#### S05 · Rumusan Masalah
- **Layout:** 4 kartu kaca abu sejajar (gaya "Problem 1-2-3"), bulatan gradasi berisi angka 1–4.
- **Animasi:** kartu naik berurutan; bulatan angka "berdenyut" sekali saat muncul. Tiap kartu nanti jadi "chapter marker" di pojok slide bab terkait.

---

### BABAK 2 — PENGERTIAN (02)

#### S06 · Apa itu Kesehatan Jiwa?
- **Isi:** definisi UU No. 18/2014 Pasal 1 angka 1.
- **Layout:** kutipan pasal di kiri; di kanan, 4 orb kecil berlabel **Fisik · Mental · Spiritual · Sosial** yang saling menyatu menjadi satu orb besar.
- **Animasi:** 4 orb masuk dari 4 sudut → bertemu di tengah → menyatu (metaball). Lalu 4 kemampuan muncul: *menyadari kemampuan · mengatasi tekanan · produktif · berkontribusi*.

#### S07 · ODMK vs ODGJ
- **Layout:** dua kartu kaca besar berdampingan, judul ganda "ODMK" / "ODGJ".
- **Isi:** definisi singkat + contoh (korban bencana, PHK… / skizofrenia, depresi, bipolar).
- **Animasi:** kartu kiri masuk dari kiri, kanan dari kanan; kutipan pasal muncul sebagai teks kecil.

#### S08 · Spektrum Dua Arah
```
   SEHAT JIWA  ⟷  ODMK (berisiko)  ⟷  ODGJ
       ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●
              ← pulih     tak tertangani →
```
- **Animasi:** satu titik cahaya bergerak dari "Sehat" ke "ODGJ" (warna orb berubah biru → merah), **[klik]** lalu kembali ke "Sehat" sambil teks *"bisa pulih"* muncul. Menunjukkan posisi seseorang bisa berpindah ke dua arah.
- Catatan kecil di bawah: UU 18/2014 kini digantikan UU 17/2023, istilah tetap dipakai.

#### S09 · Makna di Balik Istilah — Meme "No / Yes" (revisi v2)

Memakai template `meme-no-yes.png` (2 baris: kiri kolom teks, kanan reaksi). Baris atas reaksi jijik/menolak, baris bawah reaksi kagum/setuju. Meme ini memecah suasana setelah slide-slide definisi, dan yang ditertawakan adalah **kata "orang gila"**, bukan orangnya.

```
┌──────────────────────────────────────────────────────┐
│                                   ┌───────┬───────┐  │
│  MAKNA DI BALIK                   │ ORANG │ (😖   │  │
│  ISTILAH  (judul ganda            │ GILA  │ jijik)│  │  ← outline + cap ✕ merah
│  solid + outline)                 ├───────┼───────┤  │
│                                   │ ODGJ  │ (😲   │  │  ← solid + kilau
│                                   │       │ kagum)│  │
│                                   └───────┴───────┘  │
└──────────────────────────────────────────────────────┘
```

**Penyusunan aset:**
- Dua panel reaksi (kanan atas dan kanan bawah) dipotong dari `meme-no-yes.png`. Grid 2×2 disusun ulang di HTML, sehingga teks kiri memakai font presentasi (Archivo/Montserrat) dan bisa dianimasikan.
- Meme ditampilkan sebagai **kartu putih** di atas latar charcoal, sedikit miring (±2°) dengan bayangan lembut, seperti stiker yang ditempel. Format meme tetap dikenali, tetapi menyatu dengan gaya presentasi.

**Animasi:**
- **[masuk]** Judul ganda "MAKNA DI BALIK ISTILAH" mask-reveal di kiri. Kartu meme masih kosong (hanya garis grid hitam yang tergambar).
- **[klik 1] Baris "NO":**
  - Teks **"ORANG GILA"** muncul huruf outline, dengan teks kecil di bawahnya: *sinting · gendeng*.
  - Panel reaksi jijik masuk dari kanan, lalu bergoyang kiri-kanan cepat (head-shake 2×).
  - Cap **✕ merah** (warna `#D9283F`) dihentak ke atas teks, layar bergetar halus 1 frame.
- **[klik 2] Baris "YES":**
  - Teks **"ODGJ"** muncul solid besar, di bawahnya *Orang Dengan Gangguan Jiwa* dengan letter-spacing melebar.
  - Panel reaksi kagum "zoom punch" (skala 1,15 → 1) disertai kilau/sparkle kecil dan orb biru-hijau menyala di belakang kartu.
- **[klik 3] Penjelasan:** kartu meme bergeser ke kiri dan mengecil. Di kanan muncul 2 kartu kaca:
  - **"Orang gila"** → *gila* dijadikan **jati diri**, terkesan berbahaya dan tidak bisa sembuh.
  - **"Orang dengan gangguan jiwa"** → gangguan adalah **kondisi yang dialami**, seperti *orang dengan diabetes*. Bisa diobati, orangnya tetap manusia seutuhnya.
- **[klik 4] Penutup slide:** *"Bahasa ikut membentuk sikap."* (kata **sikap** berubah dari outline menjadi solid). Catatan kecil: istilah ODGJ resmi sejak UU No. 18 Tahun 2014.

#### S10 · 10 Kelompok PPDGJ-III
- **Layout:** grid 5×2 ubin kaca, tiap ubin berisi kode besar (F0…F9), nama kelompok, contoh.
- **Animasi:** ubin muncul dengan pola gelombang diagonal; saat presenter menyebut satu kelompok, ubin itu bisa di-hover/klik untuk membesar.
- **Sorotan:** ubin F2 (skizofrenia), F3 (depresi), F0 (demensia, dipakai di studi kasus) diberi cincin gradasi.
- Pesan kunci di bawah: *"Tidak semua ODGJ itu 'orang gila' di jalan."*

#### S11 · Psikosis = Gejala, Bukan Penyakit
- **Visual:** ikon termometer "demam" bertransisi menjadi ikon kepala; analogi *psikosis seperti demam, penyebabnya bisa macam-macam*.
- **Animasi:** 5 penyebab (skizofrenia, bipolar, depresi berat, narkoba, penyakit otak) bercabang keluar dari satu titik seperti akar.

#### S12 · Skizofrenia: 3 Kelompok Gejala
- **Layout:** 3 kartu: **Positif (+)** · **Negatif (−)** · **Kognitif**.
- **Animasi:** kartu Positif menambahkan elemen (ikon gelombang suara muncul), kartu Negatif mengurangi elemen (ikon wajah memudar). Gerakan menjelaskan makna "positif = muncul, negatif = hilang".
- Strip bawah: *muncul akhir remaja–awal 30-an · kambuh paling sering karena putus obat · **bukan** kepribadian ganda*.

#### S13 · Depresi: Lebih dari Sekadar Sedih
- **Visual:** angka **"≥ 2 MINGGU"** besar; kalender 14 kotak terisi pelan.
- **Animasi:** orb biru meredup perlahan sepanjang slide (warna jadi kelabu), lalu 3 tanda (sedih/hampa, hilang minat, mudah lelah) muncul.

---

### BABAK 3 — DATA & FAKTA (03)

#### S14 · Pembatas Bab 03 — Angka Utama
```
              9 dari 10
   👤👤👤👤👤👤👤👤👤👤   (9 redup, 1 menyala)
   penderita depresi BELUM tertangani
              12,7%  yang berobat
```
- **Animasi:** 10 figur muncul; 9 meredup satu per satu dengan jeda dramatis; tersisa 1 menyala. Counter "12,7%" naik.
- Sumber kecil: Kemenkes, Okt 2026.

#### S15 · Dashboard Data Nasional
- **Layout:** 4 kartu statistik (gaya kartu referensi):
  - **4 / 1.000** rumah tangga dengan anggota bergejala psikosis/skizofrenia
  - **±2,6 juta** perkiraan penderita skizofrenia
  - **62,9%** pengidap psikosis/skizofrenia sudah berobat (cincin progress)
  - **1,4%** prevalensi depresi (usia 15–24: **2%**, disorot "usia kita")
- **Animasi:** counter angka; cincin 62,9% tergambar melingkar; label "usia mahasiswa" muncul dengan panah.
- Catatan kecil: label "psikosis/skizofrenia" dipakai karena survei hanya menangkap gejala.

#### S16 · Kesenjangan Tenaga Ahli
```
  WHO   1 : 30.000    ████
  RI    1 : 180.000   ████████████████████████
        → baru ±1/6 dari standar
  1.495 psikiater · 213 dari 3.513 psikolog klinis di Puskesmas
```
- **Animasi:** bar WHO muncul pendek, lalu bar Indonesia memanjang 6× sampai hampir keluar layar (kesan "jauh"). Lalu grid 3.513 titik kecil, hanya 213 yang menyala.

#### S17 · Provinsi Tertinggi
- **Visual:** bar horizontal (gaya chart referensi, warna merah/ungu/biru): DI Yogyakarta 9,3‰ · Jawa Tengah 6,5‰ · Sulawesi Barat 5,9‰.
- **Animasi:** bar tumbuh dari kiri, angka counter di ujung bar.
- (Opsional: siluet peta Indonesia dengan 3 titik berdenyut. Bisa dibuang jika terlalu ramai.)

---

### BABAK 4 — FAKTOR PENYEBAB (04)

#### S18 · Model Biopsikososial
```
          ( BIOLOGIS )
               ⬤
        ⬤           ⬤
   (PSIKOLOGIS)  (SOSIAL)
   → tiga orb saling tumpang-tindih (Venn)
```
- **Ini momen orb latar menjadi data:** 3 orb gradasi (biru, ungu, oranye) bergerak dari latar ke tengah dan bertumpuk membentuk diagram Venn. Irisannya bercahaya.
- **[klik ×3]** Tiap orb membesar bergiliran dan contoh faktornya muncul (genetik, zat kimia otak… / trauma, pola asuh… / kemiskinan, bullying…).

#### S19 · Pesan Kunci
- **Kinetic typography:** "BUKAN GUNA-GUNA." → "BUKAN KUTUKAN." → "BUKAN KURANG IMAN." (outline, tiap kalimat dicoret) → **"BISA DIALAMI SIAPA SAJA. BISA DIOBATI."** (solid, besar).

---

### BABAK 5 — PERSPEKTIF SOSIAL BUDAYA (05)

#### S20 · Pembatas Bab 05
- Teks: *"Cara budaya memaknai gangguan jiwa menentukan cara masyarakat memperlakukannya."*
- Palet bergeser ke biru tua dan ungu.

#### S21 · Empat Wajah Stigma
- **Layout:** kuadran 2×2 (gaya "Advantages" dengan judul vertikal "STIGMA").
- Isi: Stigma publik · Stigma diri · Stigma keluarga · Stigma dalam bahasa.
- **Animasi:** tiap kartu muncul dengan **label tempel** ("berbahaya", "malas", "aib") yang menempel miring di atas kartu seperti stiker, lalu teks penjelasan muncul.

#### S22 · Mitos vs Fakta (5 kartu balik)
```
  ┌─ MITOS ──────────────┐   [klik]   ┌─ FAKTA ──────────────┐
  │ Gangguan jiwa karena │   ──flip─▶ │ Punya penyebab       │
  │ guna-guna (outline)  │            │ ilmiah (solid)       │
  └──────────────────────┘            └──────────────────────┘
```
- **Animasi:** 5 kartu ditumpuk; tiap **[klik]** membalik kartu 3D (sisi mitos abu-outline → sisi fakta solid dengan orb hijau-biru), lalu kartu bergeser ke samping dan kartu berikutnya maju.
- Bisa dijadikan kuis interaktif ke audiens: "Mitos atau fakta?" sebelum dibalik.

#### S23 · Pasung (slide paling berat)
- **Suasana:** latar hampir hitam, orb merah tua redup, gerakan sangat lambat. **Tanpa foto pasung** (menjaga martabat); hanya tipografi dan garis.
- **Visual:** dua garis horizontal tipis seperti balok/rantai yang "mengunci" teks definisi.
- **[klik 1]** Definisi: merantai, balok kayu, **pengurungan** (disorot: kini juga dihitung pasung).
- **[klik 2]** Angka: **6,6%** rumah tangga pernah memasung · **1.750** kasus (2024) · **±1.443** kasus (triwulan I 2026), counter berjalan pelan.
- **[klik 3]** Catatan: *angka sebenarnya diyakini lebih besar.* Angka-angka lalu "berbayang" (ghost copy outline di belakangnya) untuk menggambarkan kasus tak tercatat.

#### S24 · Mengapa Keluarga Memasung & Dampaknya
- **Layout:** kiri 5 alasan (takut, malu, tidak tahu, akses sulit, putus obat), kanan 5 dampak.
- **Animasi:** alasan muncul di kiri; garis penghubung mengalir ke kanan dan memunculkan dampak, seperti sebab → akibat.

#### S25 · Bentuk Diskriminasi Lain
- **Layout:** 4 baris kartu horizontal (gaya "Solution 1-2-3"): telantar di jalan · sulit kerja/dikeluarkan · dijadikan konten · hak pilih/waris diabaikan.
- **Animasi:** kartu "dijadikan konten" memakai mockup layar ponsel (referensi slide 4) dengan ikon rekam yang dicoret.

#### S26 · Budaya Sebagai Kekuatan (titik balik warna)
- **Transisi khusus:** orb biru dingin berubah menjadi oranye-magenta hangat (perubahan warna paling terasa di seluruh presentasi).
- **Isi:** Gotong royong · Kekeluargaan · Kepedulian tetangga · Dukungan keagamaan (*tidak menggantikan medis*).
- **Animasi:** 4 orb kecil saling terhubung garis, membentuk "jaring" yang mengelilingi satu titik di tengah (ODGJ didampingi).

---

### BABAK 6 — STUDI KASUS (06)

#### S27 · Pembatas Bab 06 — "Enam Tahun Merawat"
- **Visual:** angka **"6"** outline raksasa terisi pelan; teks *"Cerita seorang istri yang merawat suaminya dengan demensia."*
- Palet: hampir gelap, satu orb hangat lembut.

#### S28 · Profil Kasus
- **Layout:** kartu profil (gaya "Business Model" dengan 3 kartu kiri + judul besar kanan): Narasumber · Pasien · Diagnosis (F00–F09) · Status UU · Lama sakit · Jalur layanan · Kondisi saat ini.
- **Animasi:** baris profil muncul seperti berkas yang dibuka.

#### S29 · ▶ VIDEO WAWANCARA (Timeline 1.mp4, 3:20, diputar langsung)
```
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │          (video wawancara)             │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│  ●━━━━━━━━━━━━━◆━━━━━━━━◆━━━━━━◆━━━━━━━━━━   │  ← progress + 4 penanda pertanyaan
│  Q1 Gejala awal  Q2 Komunikasi  Q3 Obat  Q4  │
└──────────────────────────────────────────────┘
```
- **Masuk:** video muncul di dalam mockup laptop (seperti referensi slide 4), lalu kamera "zoom in" sampai video memenuhi layar dan mulai diputar.
- **Selama video:**
  - **Lower-third** halus di awal: "Wawancara keluarga ODGJ · Studi kasus demensia".
  - **Penanda segmen** di progress bar: Q1 Gejala awal (00:01) · Q2 Komunikasi (01:42) · Q3 Obat (02:10) · Q4 Kendala mendampingi (02:42). Waktu ini diambil dari SRT dan sudah sesuai dengan video. Saat segmen berganti, judul pertanyaan muncul sebentar di pojok kiri atas.
  - **Subtitle penuh (pilihan C)** di sepertiga bawah, dari `Timeline 1.srt` yang sudah dikoreksi:
    - Gaya karaoke: tiap kata menyala tepat saat diucapkan (timing per kata dari SRT).
    - Ucapan pewawancara miring dan berwarna ungu muda; ucapan narasumber putih tegak.
    - 4 kutipan kunci (S31) diberi penekanan: teks sedikit membesar dan muncul garis gradasi tipis di bawahnya.
- **Kontrol:** spasi = play/pause, ← → tetap untuk pindah slide, klik progress bar untuk loncat ke segmen.
- **Keluar:** saat video selesai, layar memudar ke gelap dan otomatis lanjut ke S30.
- **Catatan teknis:** waktu segmen di materi (dari transkrip 03:44) tidak lagi dipakai. Penanda memakai waktu dari `Timeline 1.srt` yang durasinya sama dengan video (3:20).

#### S30 · Kronologi Perjalanan Penyakit
```
 ①────────②────────③────────④────────⑤────────⑥
 Tekanan  Gejala   Diagnosis Rujukan  Kemampuan Beban
 hidup    awal     Puskesmas & obat   menurun   keluarga
```
- **Animasi:** garis timeline tergambar kiri → kanan; tiap **[klik]** satu titik menyala dan kartu ceritanya terbuka di atas/bawah garis (zig-zag). Orb bergerak mengikuti titik aktif.

#### S31 · Kutipan Kunci
- **Kinetic typography, satu kutipan per klik** (4 terkuat dipilih):
  1. *"Tapi saya nggak tahu kalau sakit gitu."* → keluarga tidak mengenali gejala
  2. *"Saya cuma psikolog, bukan dokter."* → keterbatasan layanan Puskesmas
  3. *"Saya tuh sehat, ngapain minum obat?"* → penderita tidak sadar dirinya sakit
  4. *"Ma, aku nggak mau di rumah deh."* → dampak pada anak
- **Animasi:** kutipan muncul kata per kata (seperti ucapan), tanda kutip besar outline di belakang; makna muncul kecil di bawah.

#### S32 · Analisis: Kasus ↔ Materi
- **Visual:** peta koneksi. Kiri: 8 temuan kasus. Kanan: 8 "bab" yang sudah dibahas (chip bab 02, 03, 04, 05, 08). Garis lengkung menghubungkan temuan ke babnya.
- **Animasi:** tiap **[klik]** satu temuan menyala dan garis mengalir ke bab terkait, chip bab "berdenyut". Dibagi 2 slide (4 + 4) agar terbaca.
- **Sorotan khusus:** "Jemuran digembok empat" → ditegaskan **bukan pasung** (gembok pada jemuran, bukan pada Bapak).

#### S33 · Pelajaran & Pertanyaan Diskusi
- **Kiri:** 4 pelajaran (kenali gejala dini · manfaatkan Puskesmas/BPJS · pengobatan butuh pendampingan · keluarga juga perlu dirawat).
- **Kanan:** 3 pertanyaan diskusi, tampil satu per satu dengan tanda tanya outline besar.

---

### BABAK 7 — HAK & DASAR HUKUM (07)

#### S34 · Payung Hukum (timeline 1945 → 2023)
```
 1945 ─── 1999 ─── 2011 ─── 2016 ─── 2017 ─── 2023
 UUD     UU HAM   UU 19    UU 8     Permenkes UU 17
 28H,28I          (CRPD)  Disabilitas 54     Kesehatan
```
- **Animasi:** garis waktu bergulir horizontal seperti kamera pan; tiap tahun muncul dengan angka besar outline yang terisi; UU 17/2023 Pasal 76–77 disorot paling akhir (larangan pasung, tanggung jawab pemerintah).

#### S35 · Hak-Hak ODGJ
- **Layout:** 5 kartu dengan bulatan gradasi berisi ikon: layanan kesehatan · informasi jujur · bebas pasung & kekerasan · pendidikan & pekerjaan · hak pilih.
- **Animasi:** kartu menyebar dari tengah membentuk kipas/baris; teks utama: *"ODGJ adalah warga negara dengan hak yang sama."*

---

### BABAK 8 — UPAYA & PERAN (08)

#### S36 · Empat Upaya Kesehatan Jiwa
```
        PROMOTIF
   REHABILITATIF  ⟳  PREVENTIF
        KURATIF
```
- **Visual:** siklus melingkar 4 tahap; angka pendukung muncul di tahapnya:
  - Preventif → **71,86 juta** penduduk sudah diskrining (Cek Kesehatan Gratis)
  - Kuratif → **6.549 Puskesmas (64%)** mampu layanan jiwa
- **Animasi:** cincin tergambar, titik cahaya berputar mengelilingi siklus dan berhenti di tiap tahap saat diklik.

#### S37 · Siapa Berperan? Keluarga · Masyarakat · Mahasiswa
- **Layout:** 3 kolom kaca. Kolom **Mahasiswa** disorot (paling dekat dengan audiens) dan bisa dibuka menjadi slide tersendiri berisi 5 poin.
- **Animasi:** tiga lingkaran konsentris (keluarga di dalam, masyarakat, mahasiswa) mengembang dari tengah, lalu berubah menjadi 3 kolom.
- Poin mahasiswa yang ditonjolkan: berhenti memakai "gila" sebagai candaan · tidak merekam/menyebar video ODGJ · peka pada teman · tidak self-diagnose · ikut kampanye 10 Oktober.

---

### BABAK 9 — PENUTUP (09)

#### S38 · Kesimpulan
- **Layout:** 4 kartu horizontal bernomor (gaya "Solution").
- **Animasi:** kartu masuk berurutan; kata kunci di tiap kartu (*bisa diobati · stigma · pelanggaran HAM · gotong royong*) menyala.

#### S39 · Saran (payoff konsep Outline → Isi)
```
   AIB YANG DISEMBUNYIKAN    (outline)
            ↓ morph
   SAKIT YANG PERLU DIOBATI  (solid)
```
- **Animasi:** frasa outline perlahan pecah per huruf, huruf-huruf berputar dan tersusun ulang menjadi frasa baru yang solid. Ini momen puncak visual presentasi.
- Lalu baris kedua: *pemerintah perlu menambah tenaga dan layanan kesehatan jiwa sampai ke desa.*

#### S40 · Daftar Pustaka
- **Gaya credit film:** daftar sumber bergulir pelan ke atas di atas latar gradasi redup. Presenter bisa menghentikan gulir dengan klik.

#### S41 · Terima Kasih (callback ke cover)
- **Layout:** mencerminkan cover S01, tetapi gradasi kini **hangat** (ungu-magenta-oranye, seperti slide "Thanks" referensi).
- **Animasi:** "ODGJ" yang di cover outline kini muncul **solid**, lalu berganti menjadi **"TERIMA KASIH"**. Tagline: *Memandang manusia, bukan labelnya.* Nama kelompok di kanan bawah.

---

## E. Rencana Teknis

- **Format:** presentasi berbasis web (satu file `index.html` + folder aset), dibuka di Chrome/Edge layar penuh (F11). Animasi tingkat motion graphics (orb morph, kinetic type, flip 3D, counter) tidak bisa dicapai di PowerPoint, jadi saya pakai HTML + CSS + GSAP.
- **Offline:** font (Archivo, Montserrat) dan library GSAP disimpan lokal, jadi tetap jalan tanpa internet di kelas.
- **Video:** `Timeline 1.mp4` diputar langsung dari file di folder yang sama (tidak perlu YouTube/internet). Folder presentasi dan videonya harus disalin bersama.
- **Navigasi:** → / spasi / klik = langkah berikutnya, ← = mundur, `F` = layar penuh, `O` = mode ikhtisar semua slide, `N` = catatan pembicara di jendela terpisah (opsional).
- **Resolusi:** didesain 1920×1080 (16:9), skala otomatis ke layar/proyektor apa pun.
- **Cadangan:** jika diperlukan, saya bisa merekam presentasi menjadi video MP4 juga.

## F. Catatan Etika

Video menampilkan wajah keluarga dan pasien demensia. Untuk presentasi di kelas ini aman, tetapi sebaiknya presentasi **tidak diunggah ke publik** tanpa izin keluarga. Jika perlu, saya bisa menambahkan blur wajah di versi publik.

## G. Keputusan

1. **Nama kelompok, anggota, dosen:** menyusul. Sementara dipakai placeholder di S01 dan S41.
2. **Durasi:** waktu longgar. Semua 41 slide dipertahankan, tidak ada yang digabung.
3. **Teks di atas video:** **C, subtitle penuh.** Transkrip `Timeline 1.srt` sedang dikoreksi lewat `koreksi-subtitle.html`. Timing per kata dari SRT ternyata sudah pas dengan video (3:20), jadi waktu segmen Q1–Q4 akan diambil dari SRT ini, bukan dari materi.
4. **Format:** presentasi web (HTML + GSAP), animasi penuh.

**Pilihan untuk poin 3:**
- **A. Video bersih:** hanya video. Judul pertanyaan Q1–Q4 muncul sebentar di pojok saat segmen berganti.
- **B. Video + kutipan kunci:** seperti A, ditambah 5–6 kutipan terpenting yang muncul sebagai teks tebal di sepertiga bawah layar tepat saat diucapkan, lalu hilang setelah ±3 detik.
- **C. Subtitle penuh:** seluruh ucapan diberi teks seperti subtitle film. Paling membantu jika audio kurang jelas di kelas, tetapi butuh transkrip lengkap.
