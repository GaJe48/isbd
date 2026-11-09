/* out/pptx/dump.json (+ img/, fonts/, wawancara.mp4) -> out/pptx/presentasi.pptx, ditulis langsung sebagai XML PresentationML.
   Satu slide PowerPoint per langkah klik, tanpa animasi/transisi. Urutan lengkap: lihat "pptx" di package.json.
   Semua teks tetap teks yang bisa diedit. Font (Archivo, Montserrat) ditanam seperti ekspor PPTX Canva:
   satu keluarga per varian, EOT tanpa kompresi, dibuat tools/pptx/fonts.py.
   Pakai: bun tools/pptx/build.ts [--reflow] [--in=dump.json] [--out=presentasi.pptx]
     --reflow    biarkan PowerPoint membungkus teks sendiri; default: putus baris persis seperti di browser (a:br) */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Fill, Para, Rgba, Run, Shape, SlideData } from './types';
import { zip } from './zip';

const ROOT = path.resolve(import.meta.dir, '..', '..');
const OUT = path.join(ROOT, 'out', 'pptx');
const REFLOW = process.argv.includes('--reflow');
/** penanda <br> dari extract.ts (U+2028, pemisah baris Unicode) */
const HARD_BREAK = String.fromCharCode(0x2028);

/** 1px kanvas 1920 = 1/144 inci = 6350 EMU = 0,5 pt */
const E = (v: number) => Math.round(v * 6350);
const PT100 = (v: number) => Math.round(v * 50);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hex = (c: Rgba) => c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
const clr = (c: Rgba) => `<a:srgbClr val="${hex(c)}">${c[3] < 0.999 ? `<a:alpha val="${Math.round(c[3] * 100000)}"/>` : ''}</a:srgbClr>`;

function fill(f: Fill | undefined): string {
  if (!f) return '<a:noFill/>';
  if (f.kind === 'solid') return `<a:solidFill>${clr(f.c)}</a:solidFill>`;
  const stops = f.kind === 'rad' && f.closest ? [...f.stops.map(([p, c]) => [p / Math.SQRT2, c] as [number, Rgba]), [1, f.stops.at(-1)![1]] as [number, Rgba]] : f.stops;
  const gs = `<a:gsLst>${stops.map(([p, c]) => `<a:gs pos="${Math.round(p * 100000)}">${clr(c)}</a:gs>`).join('')}</a:gsLst>`;
  // CSS: 0deg = ke atas, searah jarum jam; DrawingML: 0 = ke kanan, searah jarum jam
  if (f.kind === 'lin') return `<a:gradFill rotWithShape="1">${gs}<a:lin ang="${Math.round((((f.ang - 90) % 360) + 360) % 360 * 60000)}" scaled="0"/></a:gradFill>`;
  // radial: pos 0 = pusat
  return `<a:gradFill rotWithShape="1">${gs}<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path></a:gradFill>`;
}

/* ---- font tertanam: kunci run -> keluarga (fonts.py) ---- */
type FontSet = { keys: Record<string, string>; fonts: { family: string; file: string; panose: string }[] };
const FONT_DIR = path.join(OUT, 'fonts');
const FONTS: FontSet = existsSync(path.join(FONT_DIR, 'fonts.json')) ? JSON.parse(readFileSync(path.join(FONT_DIR, 'fonts.json'), 'utf8')) : { keys: {}, fonts: [] };
const missing = new Set<string>();
const fontKey = (r: Run) => `${r.font}|${+r.stretch.toFixed(2)}|${r.weight}|${r.italic ? 1 : 0}`;
/** keluarga font run; varian tidak ada di fonts.json (fonts.py belum dijalankan) -> nama font apa adanya */
function face(r: Run) {
  const tf = FONTS.keys[fontKey(r)];
  if (!tf) missing.add(fontKey(r));
  return tf || r.font;
}

type Box = { x: number; y: number; w: number; h: number };
/** gradien CSS berukuran kotak elemen (from) -> gradien PowerPoint yang membentang di kotak shape (to):
    titik henti dipetakan sepanjang arah gradien, lalu dipotong ke 0..1 */
function remap(f: Fill, from?: Box, to?: Box): Fill {
  if (f.kind !== 'lin' || !from || !to) return f;
  const a = (f.ang * Math.PI) / 180, dx = Math.sin(a), dy = -Math.cos(a);
  const span = (b: Box) => { const L = Math.abs(b.w * dx) + Math.abs(b.h * dy), c = (b.x + b.w / 2) * dx + (b.y + b.h / 2) * dy; return [c - L / 2, L]; };
  const [f0, fl] = span(from), [t0, tl] = span(to);
  if (!tl) return f;
  const st = f.stops.map(([p, c]) => [(f0 + p * fl - t0) / tl, c] as [number, Rgba]);
  const at = (q: number): Rgba => {
    const i = st.findIndex(([p]) => p >= q);
    if (i <= 0) return st[i === 0 ? 0 : st.length - 1][1];
    const [p0, c0] = st[i - 1], [p1, c1] = st[i], u = (q - p0) / (p1 - p0 || 1);
    return c0.map((v, j) => v + (c1[j] - v) * u) as Rgba;
  };
  return { ...f, stops: [[0, at(0)], ...st.filter(([p]) => p > 0 && p < 1), [1, at(1)]] };
}

function runPr(r: Run, tag = 'a:rPr', box?: Box) {
  const tf = face(r);
  // tebal/miring sudah ada di keluarga font (fonts.py), jadi b dan i selalu 0
  // kern="100": kerning mulai 1pt (default PowerPoint hanya >=12pt), seperti browser yang selalu memakai kerning
  const attrs = `lang="id-ID" sz="${PT100(r.size)}" b="0" i="0" kern="100"${r.caps ? ' cap="all"' : ''}${r.ls ? ` spc="${PT100(r.ls)}"` : ''} dirty="0"`;
  const ln = r.stroke ? `<a:ln w="${E(r.stroke.w)}"><a:solidFill>${clr(r.stroke.c)}</a:solidFill></a:ln>` : '';
  const fl = r.grad ? fill(remap(r.grad, r.gbox, box)) : r.color ? `<a:solidFill>${clr(r.color)}</a:solidFill>` : '<a:noFill/>';
  return `<${tag} ${attrs}>${ln}${fl}<a:latin typeface="${esc(tf)}"/><a:cs typeface="${esc(tf)}"/></${tag}>`;
}

function para(p: Para, box?: Box) {
  const bu = p.bullet
    ? `<a:buClr>${clr(p.bullet.c)}</a:buClr><a:buSzPct val="${Math.round(Math.min(400, (p.bullet.size / (0.62 * (p.runs[0]?.size || 20))) * 100) * 1000)}"/><a:buFont typeface="Arial"/><a:buChar char="●"/>`
    : '<a:buNone/>';
  const mar = p.bullet ? ` marL="${E(p.bullet.indent)}" indent="${-E(p.bullet.indent)}"` : ` marL="0" indent="${E(p.indent || 0)}"`;
  const pPr = `<a:pPr algn="${p.align}"${mar}><a:lnSpc><a:spcPts val="${PT100(p.lh)}"/></a:lnSpc><a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="${PT100(p.after)}"/></a:spcAft>${bu}</a:pPr>`;
  const rPr = (r: Run, tag?: string) => runPr(r, tag, box);
  const runs = p.runs.map(r => {
    // HARD_BREAK = <br> di HTML; \n = tempat browser memutus baris (dipakai juga, kecuali --reflow)
    return r.t.split(new RegExp(`(\n|${HARD_BREAK})`)).map(t =>
      t === HARD_BREAK || (t === '\n' && !REFLOW) ? `<a:br>${rPr(r)}</a:br>` : t === '\n' ? `<a:r>${rPr(r)}<a:t> </a:t></a:r>` : t ? `<a:r>${rPr(r)}<a:t>${esc(t)}</a:t></a:r>` : '').join('');
  }).join('');
  const end = p.runs.at(-1) ? rPr(p.runs.at(-1)!, 'a:endParaRPr') : '';
  return `<a:p>${pPr}${runs}${end}</a:p>`;
}

const effects = (s: Shape) => (s.shadow
  ? `<a:effectLst><a:outerShdw blurRad="${E(s.shadow.blur)}" dist="${E(Math.hypot(s.shadow.x, s.shadow.y))}" dir="${Math.round(((Math.atan2(s.shadow.y, s.shadow.x) * 180) / Math.PI + 360) % 360 * 60000)}" algn="ctr" rotWithShape="0">${clr(s.shadow.c)}</a:outerShdw></a:effectLst>`
  : '');

function shape(s: Shape, id: number) {
  let { x, y, w, h } = s;
  // garis tepi CSS ada di dalam kotak; garis DrawingML di tengah tepi -> masukkan setengah tebal
  if (s.line && s.geom !== 'line') { const d = s.line.w / 2; x += d; y += d; w -= 2 * d; h -= 2 * d; }
  const geom = s.geom === 'line' ? 'line' : s.geom === 'ellipse' ? 'ellipse' : s.rad > 0.5 ? 'roundRect' : 'rect';
  const adj = geom === 'roundRect' ? `<a:gd name="adj" fmla="val ${Math.round(Math.min(50000, (s.rad / Math.min(s.w, s.h)) * 100000))}"/>` : '';
  const ln = s.line ? `<a:ln w="${E(s.line.w)}"><a:solidFill>${clr(s.line.c)}</a:solidFill>${s.line.dash ? '<a:prstDash val="dash"/>' : ''}</a:ln>` : '<a:ln><a:noFill/></a:ln>';
  const sh = effects(s);
  const spPr = `<p:spPr><a:xfrm><a:off x="${E(x)}" y="${E(y)}"/><a:ext cx="${Math.max(0, E(w))}" cy="${Math.max(0, E(h))}"/></a:xfrm><a:prstGeom prst="${geom}"><a:avLst>${adj}</a:avLst></a:prstGeom>${s.geom === 'line' ? '<a:noFill/>' : fill(s.fill)}${ln}${sh}</p:spPr>`;
  let tx = '';
  if (s.text) {
    // inset dihitung dari kotak asli (sebelum disesuaikan untuk garis tepi)
    const [l, t, r, b] = (s.inset || [0, 0, 0, 0]).map((v, i) => Math.max(0, E(v - (s.line ? s.line.w / 2 : 0))));
    // baris persis seperti browser, PowerPoint tidak membungkus sendiri: hurufnya 2-4% lebih lebar, jadi kalau
    // dibiarkan bisa bertambah satu baris dan menimpa elemen di bawahnya
    const oneLine = !REFLOW || s.text.paras.every(p => !p.runs.some(r => r.t.includes('\n')));
    tx = `<p:txBody><a:bodyPr wrap="${oneLine ? 'none' : 'square'}" lIns="${l}" tIns="${t}" rIns="${r}" bIns="${b}" anchor="${s.text.anchor}" rtlCol="0"><a:noAutofit/></a:bodyPr><a:lstStyle/>${s.text.paras.map(p => para(p, s)).join('')}</p:txBody>`;
  }
  const txBox = s.text && !s.fill && !s.line ? ' txBox="1"' : '';
  return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="${esc(s.name)}"/><p:cNvSpPr${txBox}/><p:nvPr/></p:nvSpPr>${spPr}${tx}</p:sp>`;
}

const NS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
const GRP = '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';

/* ---- gambar & video: satu part media per file unik, dipakai bersama antar-slide ---- */
const VIDEO_SRC = [path.join(OUT, 'wawancara.mp4'), path.join(ROOT, 'media', 'wawancara.mp4')].find(f => existsSync(f));
const media = new Map<string, string>(); // file sumber -> nama part di ppt/media
const mediaPart = (src: string, ext: string) => {
  if (!media.has(src)) media.set(src, `${ext === 'mp4' ? 'media' : 'img'}${media.size + 1}.${ext}`);
  return media.get(src)!;
};
type Rel = [id: string, type: string, target: string];

const xfrm = (s: Shape) => `<a:xfrm><a:off x="${E(s.x)}" y="${E(s.y)}"/><a:ext cx="${Math.max(0, E(s.w))}" cy="${Math.max(0, E(s.h))}"/></a:xfrm>`;

function picture(s: Shape, id: number, rels: Rel[]) {
  const rid = `rId${rels.length + 1}`;
  rels.push([rid, 'image', `../media/${mediaPart(s.pic!.file!, 'png')}`]);
  let nv = '<p:nvPr/>', link = '';
  if (s.video && VIDEO_SRC) {
    const part = mediaPart(VIDEO_SRC, 'mp4'), v1 = `rId${rels.length + 1}`, v2 = `rId${rels.length + 2}`;
    rels.push([v1, 'video', `../media/${part}`], [v2, 'http://schemas.microsoft.com/office/2007/relationships/media', `../media/${part}`]);
    nv = `<p:nvPr><a:videoFile r:link="${v1}"/><p:extLst><p:ext uri="{DAA4B4D4-6D71-4841-9C94-3DE7FCFB9230}"><p14:media r:embed="${v2}"/></p:ext></p:extLst></p:nvPr>`;
    link = '<a:hlinkClick r:id="" action="ppaction://media"/>';
  }
  return `<p:pic><p:nvPicPr><p:cNvPr id="${id}" name="${esc(s.name)}">${link}</p:cNvPr><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>${nv}</p:nvPicPr><p:blipFill><a:blip r:embed="${rid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr>${xfrm(s)}<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>`;
}

/** video yang memenuhi layar diputar otomatis saat slide tampil */
const AUTOPLAY = (spid: number) => `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:par><p:cTn id="2" fill="hold"><p:stCondLst><p:cond delay="indefinite"/><p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst><p:par><p:cTn id="3" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="4" presetID="1" presetClass="mediacall" presetSubtype="0" fill="hold" nodeType="afterEffect"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:cmd type="call" cmd="playFrom(0.0)"><p:cBhvr><p:cTn id="5" dur="1" fill="hold"/><p:tgtEl><p:spTgt spid="${spid}"/></p:tgtEl></p:cBhvr></p:cmd></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par><p:video><p:cMediaNode vol="80000"><p:cTn id="6" fill="hold" display="0"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="${spid}"/></p:tgtEl></p:cMediaNode></p:video></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>`;

function slideXml(d: SlideData) {
  const rels: Rel[] = [['rId1', 'slideLayout', '../slideLayouts/slideLayout1.xml']];
  let auto = 0;
  const body = d.shapes.map((s, i) => {
    if (!s.pic) return shape(s, i + 2);
    if (s.video && VIDEO_SRC && s.w >= 1800) auto = i + 2;
    return picture(s, i + 2, rels);
  }).join('');
  const xml = `${XML}<p:sld ${NS} xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main"><p:cSld><p:bg><p:bgPr><a:solidFill>${clr(d.bg)}</a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree>${GRP}${body}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>${auto ? AUTOPLAY(auto) : ''}</p:sld>`;
  return { xml, rels };
}

/* ---------------- kerangka paket ---------------- */
const REL = (items: [id: string, type: string, target: string][]) =>
  `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${items.map(([id, t, tg]) => `<Relationship Id="${id}" Type="${t.startsWith('http') ? t : `http://schemas.openxmlformats.org/officeDocument/2006/relationships/${t}`}" Target="${tg}"/>`).join('')}</Relationships>`;

const THEME = `${XML}<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="ODGJ"><a:themeElements>
<a:clrScheme name="ODGJ"><a:dk1><a:srgbClr val="111111"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="2B2B2D"/></a:dk2><a:lt2><a:srgbClr val="BDBDBD"/></a:lt2><a:accent1><a:srgbClr val="2F6FD6"/></a:accent1><a:accent2><a:srgbClr val="7A6BB0"/></a:accent2><a:accent3><a:srgbClr val="B85A9C"/></a:accent3><a:accent4><a:srgbClr val="D9283F"/></a:accent4><a:accent5><a:srgbClr val="F0A04B"/></a:accent5><a:accent6><a:srgbClr val="A8DDA0"/></a:accent6><a:hlink><a:srgbClr val="CFC6F5"/></a:hlink><a:folHlink><a:srgbClr val="B85A9C"/></a:folHlink></a:clrScheme>
<a:fontScheme name="ODGJ"><a:majorFont><a:latin typeface="Montserrat ExtraBold"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Montserrat"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme>
<a:fmtScheme name="ODGJ"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>
<a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
<a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>
</a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>`;

const MASTER = `${XML}<p:sldMaster ${NS}><p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="2B2B2D"/></a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree>${GRP}</p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle><a:lvl1pPr><a:defRPr sz="4400"/></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr><a:defRPr sz="2400"/></a:lvl1pPr></p:bodyStyle><p:otherStyle><a:lvl1pPr><a:defRPr sz="1800"/></a:lvl1pPr></p:otherStyle></p:txStyles></p:sldMaster>`;

const LAYOUT = `${XML}<p:sldLayout ${NS} type="blank" preserve="1"><p:cSld name="Kosong"><p:spTree>${GRP}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;

function pptx(slides: SlideData[]) {
  const n = slides.length;
  const files: Record<string, string | Uint8Array> = {};
  const CT = 'application/vnd.openxmlformats-officedocument.presentationml';
  files['[Content_Types].xml'] = `${XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="mp4" ContentType="video/mp4"/><Default Extension="fntdata" ContentType="application/x-fontdata"/>
<Override PartName="/ppt/presentation.xml" ContentType="${CT}.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="${CT}.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="${CT}.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/ppt/presProps.xml" ContentType="${CT}.presProps+xml"/><Override PartName="/ppt/viewProps.xml" ContentType="${CT}.viewProps+xml"/><Override PartName="/ppt/tableStyles.xml" ContentType="${CT}.tableStyles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
${slides.map((_, k) => `<Override PartName="/ppt/slides/slide${k + 1}.xml" ContentType="${CT}.slide+xml"/>`).join('')}</Types>`;
  files['_rels/.rels'] = `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
  files['docProps/core.xml'] = `${XML}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>ODGJ — Ilmu Sosial Budaya Dasar</dc:title></cp:coreProperties>`;
  files['docProps/app.xml'] = `${XML}<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>tools/pptx/build.ts</Application><Slides>${n}</Slides></Properties>`;
  // font tertanam seperti Canva: setiap keluarga hanya punya gaya regular
  const embedded = FONTS.fonts.length ? `<p:embeddedFontLst>${FONTS.fonts.map((f, k) => `<p:embeddedFont><p:font typeface="${esc(f.family)}" panose="${f.panose}" charset="0"/><p:regular r:id="rId${n + 6 + k}"/></p:embeddedFont>`).join('')}</p:embeddedFontLst>` : '';
  files['ppt/presentation.xml'] = `${XML}<p:presentation ${NS} embedTrueTypeFonts="1"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>${slides.map((_, k) => `<p:sldId id="${256 + k}" r:id="rId${k + 2}"/>`).join('')}</p:sldIdLst><p:sldSz cx="12192000" cy="6858000"/><p:notesSz cx="6858000" cy="9144000"/>${embedded}</p:presentation>`;
  files['ppt/_rels/presentation.xml.rels'] = REL([
    ['rId1', 'slideMaster', 'slideMasters/slideMaster1.xml'],
    ...slides.map((_, k) => [`rId${k + 2}`, 'slide', `slides/slide${k + 1}.xml`] as [string, string, string]),
    [`rId${n + 2}`, 'theme', 'theme/theme1.xml'], [`rId${n + 3}`, 'presProps', 'presProps.xml'], [`rId${n + 4}`, 'viewProps', 'viewProps.xml'], [`rId${n + 5}`, 'tableStyles', 'tableStyles.xml'],
    ...FONTS.fonts.map((_, k) => [`rId${n + 6 + k}`, 'font', `fonts/font${k + 1}.fntdata`] as [string, string, string]),
  ]);
  FONTS.fonts.forEach((f, k) => (files[`ppt/fonts/font${k + 1}.fntdata`] = new Uint8Array(readFileSync(path.join(FONT_DIR, f.file)))));
  files['ppt/presProps.xml'] = `${XML}<p:presentationPr ${NS}/>`;
  files['ppt/viewProps.xml'] = `${XML}<p:viewPr ${NS}><p:normalViewPr><p:restoredLeft sz="15620"/><p:restoredTop sz="94660"/></p:normalViewPr><p:gridSpacing cx="76200" cy="76200"/></p:viewPr>`;
  files['ppt/tableStyles.xml'] = `${XML}<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`;
  files['ppt/theme/theme1.xml'] = THEME;
  files['ppt/slideMasters/slideMaster1.xml'] = MASTER;
  files['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = REL([['rId1', 'slideLayout', '../slideLayouts/slideLayout1.xml'], ['rId2', 'theme', '../theme/theme1.xml']]);
  files['ppt/slideLayouts/slideLayout1.xml'] = LAYOUT;
  files['ppt/slideLayouts/_rels/slideLayout1.xml.rels'] = REL([['rId1', 'slideMaster', '../slideMasters/slideMaster1.xml']]);
  slides.forEach((d, k) => {
    const { xml, rels } = slideXml(d);
    files[`ppt/slides/slide${k + 1}.xml`] = xml;
    files[`ppt/slides/_rels/slide${k + 1}.xml.rels`] = REL(rels);
  });
  for (const [src, part] of media) files[`ppt/media/${part}`] = new Uint8Array(readFileSync(part.endsWith('.mp4') ? src : path.join(OUT, 'img', src)));
  return zip(files);
}

const arg = (k: string, d: string) => process.argv.find(a => a.startsWith(`--${k}=`))?.slice(k.length + 3) || d;
const { slides } = (await Bun.file(path.resolve(OUT, arg('in', 'dump.json'))).json()) as { slides: SlideData[] };
const file = path.resolve(OUT, arg('out', 'presentasi.pptx'));
await Bun.write(file, pptx(slides));
if (missing.size) console.warn(`font belum dibuat untuk ${[...missing].join(', ')}: jalankan tools/pptx/fonts.py`);
console.log(`${slides.length} slide, ${slides.reduce((a, s) => a + s.shapes.length, 0)} shape -> ${path.relative(ROOT, file)}${FONTS.fonts.length ? `, ${FONTS.fonts.length} font tertanam` : ''}`);
