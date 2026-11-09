"""Font tertanam untuk PPTX, dengan cara yang sama seperti ekspor PPTX Canva.

Membaca out/pptx/dump.json dan mengumpulkan varian font yang dipakai teks (font, lebar, berat, miring).
Setiap varian jadi keluarga font tersendiri bergaya "Regular" berat 400, misalnya "Montserrat SemiBold Italic"
atau "Archivo W125 Black". Dengan begitu PowerPoint tidak perlu mencocokkan tebal/miring, dan run teks
cukup memakai b="0" i="0".
Archivo diambil dari font variabel web (diinstans per lebar+berat). Montserrat memakai woff2 statis dengan
berat terdekat, mengikuti aturan pencocokan CSS.

Keluaran di out/pptx/fonts/:
  <Nama>.ttf      font biasa, bisa di-install kalau perlu
  <Nama>.fntdata  EOT 2.2 tanpa kompresi, ditanam build.ts (format yang sama dengan Canva)
  fonts.json      { "keys": { "Archivo|125|900|0": "Archivo W125 Black", ... }, "fonts": [ { family, file, panose } ] }
Catatan: ekspor gambar PowerPoint lewat COM (Slide.Export) mengabaikan font tertanam, tapi ekspor PDF dan
jendela PowerPoint memakainya. Karena itu render.ps1 merender lewat PDF.
Pakai: uv run --no-project --with fonttools --with brotli --with skia-pathops python tools/pptx/fonts.py"""
import io
import json
import struct
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.ttLib.removeOverlaps import removeOverlaps
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
SRC, OUT = ROOT / "assets/fonts", ROOT / "out/pptx/fonts"
OUT.mkdir(parents=True, exist_ok=True)
WEIGHT = {100: "Thin", 200: "ExtraLight", 300: "Light", 400: "", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black"}


def num(x: float) -> str:
    """angka seperti `${+x.toFixed(2)}` di JavaScript (kunci fonts.json dibaca build.ts)"""
    return f"{round(x, 2):g}"


def nearest(have: list[int], w: int) -> int:
    """berat terdekat yang tersedia, aturan pencocokan font CSS"""
    if w in have:
        return w
    up, down = sorted(x for x in have if x > w), sorted((x for x in have if x < w), reverse=True)
    if 400 <= w <= 500:
        return ([x for x in up if x <= 500] + down + up)[0]
    return (down + up if w < 400 else up + down)[0]


def variant(font: str, stretch: float, weight: int, italic: bool):
    """-> (nama keluarga, fungsi pemuat TTFont)"""
    if font == "Archivo":
        wd, wg = max(62, min(125, stretch)), max(100, min(900, weight))
        def load():
            f = instantiateVariableFont(TTFont(SRC / "archivo-latin-wdth-normal.woff2"), {"wdth": wd, "wght": wg})
            removeOverlaps(f)  # kontur tumpang-tindih khas font variabel
            return f
        return f"Archivo W{num(wd)} {WEIGHT[wg] or 'Regular'}", load
    files = {int(p.stem.split("-")[2]): p for p in SRC.glob(f"{font.lower()}-latin-*-{'italic' if italic else 'normal'}.woff2")}
    if not files:  # tidak ada versi miring: browser memiringkan sendiri, di sini pakai yang tegak
        files, italic = {int(p.stem.split("-")[2]): p for p in SRC.glob(f"{font.lower()}-latin-*-normal.woff2")}, False
    w = nearest(list(files), weight)
    fam = " ".join(x for x in [font, WEIGHT[w], "Italic" if italic else ""] if x)
    return fam, lambda: TTFont(files[w])


def rename(f: TTFont, fam: str):
    """keluarga tunggal bergaya Regular (berat 400, tidak miring) supaya cocok dengan run b=0 i=0"""
    ps = fam.replace(" ", "") + "-Regular"
    name = f["name"]
    for rec in list(name.names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17, 21, 22, 25):
            name.removeNames(nameID=rec.nameID)
    for nid, val in {1: fam, 2: "Regular", 3: f"{ps};odgj-pptx", 4: f"{fam} Regular", 6: ps}.items():
        name.setName(val, nid, 3, 1, 0x409)
        name.setName(val, nid, 1, 0, 0)
    for t in ("STAT", "fvar", "avar", "gvar", "cvar", "HVAR", "VVAR", "MVAR"):
        if t in f:
            del f[t]
    os2 = f["OS/2"]
    os2.usWeightClass, os2.usWidthClass, os2.fsType = 400, 5, 0
    os2.fsSelection = (os2.fsSelection & ~0b1100001) | 0b1000000
    f["head"].macStyle = 0


def eot(ttf: bytes, f: TTFont) -> bytes:
    """EOT versi 0x00020002 tanpa kompresi/XOR (seperti Canva); FontData = TTF utuh"""
    os2, name = f["OS/2"], f["name"]
    p = os2.panose
    panose = bytes([p.bFamilyType, p.bSerifStyle, p.bWeight, p.bProportion, p.bContrast, p.bStrokeVariation,
                    p.bArmStyle, p.bLetterForm, p.bMidline, p.bXHeight])
    csa = TTFont(io.BytesIO(ttf))["head"].checkSumAdjustment
    s = lambda nid: (name.getDebugName(nid) or "").encode("utf-16le")
    head = struct.pack("<II", 0x00020002, 0) + panose + struct.pack(
        "<BBIHH4I2II4I", 1, 0, 400, 0, 0x504C,
        os2.ulUnicodeRange1, os2.ulUnicodeRange2, os2.ulUnicodeRange3, os2.ulUnicodeRange4,
        os2.ulCodePageRange1, os2.ulCodePageRange2, csa, 0, 0, 0, 0)
    for nid in (1, 2, 5, 4):  # keluarga, gaya, versi, nama lengkap (tiap string didahului padding 0)
        head += struct.pack("<HH", 0, len(s(nid))) + s(nid)
    # RootString kosong; RootStringCheckSum 0x50475342, EUDCCodePage, Padding6, Signature kosong, EUDCFlags, EUDCFontSize
    head += struct.pack("<HH", 0, 0) + struct.pack("<IIHHII", 0x50475342, 0, 0, 0, 0, 0)
    return struct.pack("<II", 8 + len(head) + len(ttf), len(ttf)) + head + ttf


dump = json.loads((ROOT / "out/pptx/dump.json").read_text(encoding="utf-8"))
keys: dict[str, str] = {}
loaders = {}
for slide in dump["slides"]:
    for sh in slide["shapes"]:
        for para in (sh.get("text") or {}).get("paras", []):
            for r in para["runs"]:
                key = f"{r['font']}|{num(r['stretch'])}|{r['weight']}|{int(r['italic'])}"
                if key not in keys:
                    fam, load = variant(r["font"], r["stretch"], r["weight"], r["italic"])
                    keys[key] = fam
                    loaders.setdefault(fam, load)

fonts = []
for fam, load in sorted(loaders.items()):
    f = load()
    f.flavor = None
    rename(f, fam)
    buf = io.BytesIO()
    f.save(buf)
    ttf = buf.getvalue()
    stem = fam.replace(" ", "")
    (OUT / f"{stem}.ttf").write_bytes(ttf)
    (OUT / f"{stem}.fntdata").write_bytes(eot(ttf, TTFont(io.BytesIO(ttf))))
    p = f["OS/2"].panose
    panose = "".join(f"{v:02X}" for v in (p.bFamilyType, p.bSerifStyle, p.bWeight, p.bProportion, p.bContrast,
                                          p.bStrokeVariation, p.bArmStyle, p.bLetterForm, p.bMidline, p.bXHeight))
    fonts.append({"family": fam, "file": f"{stem}.fntdata", "panose": panose})
    print(f"{fam}: {len(ttf) // 1024} KB")
(OUT / "fonts.json").write_text(json.dumps({"keys": keys, "fonts": fonts}, indent=1), encoding="utf-8")
print(len(fonts), "font ->", OUT.relative_to(ROOT))
