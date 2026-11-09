/* Penulis ZIP minimal (deflate) — cukup untuk paket OOXML seperti .pptx. */
import { deflateRawSync } from 'node:zlib';

export function zip(files: Record<string, string | Uint8Array>): Uint8Array {
  const enc = new TextEncoder();
  const local: Uint8Array[] = [], central: Uint8Array[] = [];
  let offset = 0;
  for (const [name, content] of Object.entries(files)) {
    const raw = typeof content === 'string' ? enc.encode(content) : content;
    // media yang sudah terkompresi disimpan apa adanya (metode 0)
    const store = /\.(png|jpe?g|mp4)$/.test(name), method = store ? 0 : 8;
    const data = store ? raw : deflateRawSync(raw);
    const crc = Bun.hash.crc32(raw), fn = enc.encode(name);
    const head = (sig: number, extra: number) => {
      const b = new DataView(new ArrayBuffer(extra + fn.length));
      b.setUint32(0, sig, true);
      return b;
    };
    // header lokal
    const lh = head(0x04034b50, 30);
    [[4, 20], [6, 0], [8, method], [10, 0], [12, 0x21]].forEach(([o, v]) => lh.setUint16(o, v, true));
    lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, raw.length, true);
    lh.setUint16(26, fn.length, true); lh.setUint16(28, 0, true);
    new Uint8Array(lh.buffer).set(fn, 30);
    // entri direktori pusat
    const ch = head(0x02014b50, 46);
    [[4, 20], [6, 20], [8, 0], [10, method], [12, 0], [14, 0x21]].forEach(([o, v]) => ch.setUint16(o, v, true));
    ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true); ch.setUint32(24, raw.length, true);
    ch.setUint16(28, fn.length, true);
    ch.setUint32(42, offset, true);
    new Uint8Array(ch.buffer).set(fn, 46);
    local.push(new Uint8Array(lh.buffer), data);
    central.push(new Uint8Array(ch.buffer));
    offset += lh.byteLength + data.length;
  }
  const cdSize = central.reduce((a, b) => a + b.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, central.length, true); end.setUint16(10, central.length, true);
  end.setUint32(12, cdSize, true); end.setUint32(16, offset, true);
  return new Uint8Array(Buffer.concat([...local, ...central, new Uint8Array(end.buffer)]));
}
