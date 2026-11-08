/* Pengaturan subtitle video (slide 29) dan kutipan (slide 31).
   Pencocokan teks mengabaikan huruf besar/kecil dan tanda baca.
   Setelah mengubah file ini atau "Timeline 1.srt": bun run subs */

export interface QuoteCfg {
  /** potongan teks di SRT; baris yang memuatnya diberi penekanan (★) dan tidak dipecah */
  cari: string;
  /** teks rapi yang ditampilkan di slide 31 */
  teks: string;
  siapa: string;
  makna: string;
}

export interface SubtitleConfig {
  /** awal ucapan pewawancara; berlanjut sampai akhir kalimatnya */
  pewawancara: string[];
  /** kutipan kunci, urut sesuai slide 31 */
  kutipan: QuoteCfg[];
  /** baris yang isinya persis ini tidak ditampilkan */
  sembunyikan: string[];
  /** baris baru selalu dimulai dari sini */
  potong: string[];
  /** label penanda Q1..Qn di garis waktu video */
  segmen: string[];
  /** panjang baris ideal (huruf) */
  targetHuruf: number;
  /** panjang baris maksimum (huruf) */
  maksHuruf: number;
  /** kalimat pendek berurutan digabung kalau totalnya <= ini */
  gabungMaks: number;
  /** jeda (detik) yang selalu memulai baris baru */
  jedaPaksa: number;
}

export const CONFIG: SubtitleConfig = {
  pewawancara: ['Untuk gejala awal Bapak', 'Kalau misal Ibu ada kayak kendala komunikasi', 'Kalau misal ini ada obat', 'Kalau kendala atau kesulitan'],
  kutipan: [
    { cari: 'tapi saya nggak tahu kalau sakit', teks: 'Tapi saya nggak tahu kalau sakit gitu.', siapa: 'Ibu (narasumber)', makna: 'Keluarga tidak mengenali gejala' },
    { cari: 'saya cuma psikolog bukan dokter', teks: 'Saya cuma psikolog, bukan dokter.', siapa: 'Psikolog Puskesmas, diceritakan Ibu', makna: 'Keterbatasan layanan di Puskesmas' },
    { cari: 'saya tuh sehat', teks: 'Saya tuh sehat, ngapain minum obat?', siapa: 'Bapak, diceritakan Ibu', makna: 'Penderita tidak sadar dirinya sakit' },
    { cari: 'aku nggak mau di rumah', teks: 'Mah, aku nggak mau di rumah deh.', siapa: 'Anak, diceritakan Ibu', makna: 'Dampak pada anak-anak' },
  ],
  sembunyikan: ['Iya.'],
  potong: ['Awalnya?', 'Iya.', 'Ya, iya.'],
  segmen: ['Gejala awal', 'Komunikasi', 'Obat', 'Kendala mendampingi'],
  targetHuruf: 38,
  maksHuruf: 58,
  gabungMaks: 30,
  jedaPaksa: 1.5,
};
