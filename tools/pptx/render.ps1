# Render PPTX ke PNG lewat PowerPoint (COM), untuk dibandingkan dengan versi web (tools/pptx/compare.ts).
# Lewat PDF: Slide.Export (ekspor gambar COM) mengabaikan font tertanam, ekspor PDF memakainya seperti jendela PowerPoint.
# Pakai: powershell -File tools/pptx/render.ps1 [-File out/pptx/lain.pptx] [-Slides 4,5,6]
param([string]$File = 'out/pptx/presentasi.pptx', [int[]]$Slides = @())
$ErrorActionPreference = 'Stop'
$root = Resolve-Path "$PSScriptRoot/../.."
$file = Join-Path $root $File
$dir = Join-Path $root 'out/pptx/render'
$pdf = Join-Path $dir 'render.pdf'
New-Item -ItemType Directory -Force $dir | Out-Null
if (-not $Slides.Count) { Get-ChildItem $dir -Filter *.png | Remove-Item }

$running = Get-Process POWERPNT -ErrorAction SilentlyContinue
$pp = New-Object -ComObject PowerPoint.Application
try {
  # ReadOnly, Untitled, WithWindow=false
  $p = $pp.Presentations.Open($file, -1, 0, 0)
  $p.SaveCopyAs($pdf, 32) # ppSaveAsPDF
  $p.Close()
} finally {
  if (-not $running) { $pp.Quit() }
  [void][Runtime.InteropServices.Marshal]::ReleaseComObject($pp)
}

# halaman PDF -> slideN.png 1920x1080
$py = @'
import sys, pypdfium2 as pdfium
pdf, out = sys.argv[1:3]
want = {int(x) for x in ",".join(sys.argv[3:]).split(",") if x}
doc = pdfium.PdfDocument(pdf)
for i, page in enumerate(doc, 1):
    if want and i not in want:
        continue
    page.render(scale=1920 / page.get_width()).to_pil().save(f"{out}/slide{i}.png")
print(f"{len(want) or len(doc)} slide dirender ke out/pptx/render")
'@
$py | uv run --no-project --with pypdfium2 --with pillow python -I - $pdf $dir ($Slides -join ',')
