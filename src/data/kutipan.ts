/* Kutipan kunci slide 31, urut sesuai tampilan. Waktunya diambil dari baris "kutipan <n>" di "Timeline 1.ass"
   (kolom Effect di Aegisub), lalu digabung oleh bun run subs ke src/data/subs.ts. */
export interface Kutipan {
  /** teks rapi yang ditampilkan di slide */
  teks: string;
  siapa: string;
  makna: string;
}

export const KUTIPAN: Kutipan[] = [
  { teks: 'Tapi saya nggak tahu kalau sakit gitu.', siapa: 'Ibu (narasumber)', makna: 'Keluarga tidak mengenali gejala' },
  { teks: 'Saya cuma psikolog, bukan dokter.', siapa: 'Psikolog Puskesmas, diceritakan Ibu', makna: 'Keterbatasan layanan di Puskesmas' },
  { teks: 'Saya tuh sehat, ngapain minum obat?', siapa: 'Bapak, diceritakan Ibu', makna: 'Penderita tidak sadar dirinya sakit' },
  { teks: 'Mah, aku nggak mau di rumah deh.', siapa: 'Anak, diceritakan Ibu', makna: 'Dampak pada anak-anak' },
];
