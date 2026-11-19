Add-Type -AssemblyName System.Drawing

function Create-ArchitecturalBefore($afterPath, $outPath, $roomName, $specText) {
    if (-not (Test-Path $afterPath)) { return }
    $src = [System.Drawing.Bitmap]::FromFile($afterPath)
    $w = $src.Width
    $h = $src.Height
    $dest = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    # 1. Convert to cool architectural slate/concrete tone
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            $lum = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
            
            # Cool matte cement tone
            $r = [int]($lum * 0.85)
            $gCol = [int]($lum * 0.88)
            $b = [int]($lum * 0.92)
            
            $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($r, $gCol, $b))
        }
    }

    # 2. Draw subtle technical drafting overlay (Architectural CAD / Schematic look)
    $penGrid = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(25, 255, 255, 255)), 1
    $penGrid.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    
    # Grid lines every 80px
    for ($gx = 60; $gx -lt $w; $gx += 80) {
        $g.DrawLine($penGrid, $gx, 0, $gx, $h)
    }
    for ($gy = 60; $gy -lt $h; $gy += 80) {
        $g.DrawLine($penGrid, 0, $gy, $w, $gy)
    }

    # 3. Structural crosshairs and measurement callouts
    $fontMono = New-Object System.Drawing.Font "Arial", 11, [System.Drawing.FontStyle]::Bold
    $brushText = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 245, 242, 235))
    $brushAccent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 197, 168, 128))

    # Watermark-free bottom right gradient shield
    $brushDark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 12, 14, 16))
    $g.FillRectangle($brushDark, [int]($w * 0.82), [int]($h * 0.88), [int]($w * 0.18), [int]($h * 0.12))

    # Corner technical stamp
    $g.DrawString("STRUCTURAL SCHEMATIC · $roomName", $fontMono, $brushAccent, 24, 24)
    $fontSmall = New-Object System.Drawing.Font "Arial", 9, [System.Drawing.FontStyle]::Regular
    $g.DrawString("SPEC: $specText", $fontSmall, $brushText, 24, 44)
    $g.DrawString("TOLERANCE: +/- 2.5mm · RAW CONCRETE CORE", $fontSmall, $brushText, 24, 60)

    $penGrid.Dispose()
    $fontMono.Dispose()
    $fontSmall.Dispose()
    $brushText.Dispose()
    $brushAccent.Dispose()
    $brushDark.Dispose()
    $g.Dispose()

    $dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dest.Dispose()
    $src.Dispose()
    Write-Output "Created $outPath"
}

Create-ArchitecturalBefore "public\collections\collection_1.jpg" "public\collections\collection_1_before.jpg" "SUITE 01 LIVING" "HONED TRAVERTINE MONOLITH & OAK BEAMS"
Create-ArchitecturalBefore "public\collections\collection_2.jpg" "public\collections\collection_2_before.jpg" "SUITE 02 LOUNGE" "FLUTED OAK WALL JOINERY & COVE OPTICS"
Create-ArchitecturalBefore "public\collections\collection_3.jpg" "public\collections\collection_3_before.jpg" "SUITE 03 SANCTUARY" "TRAVERTINE HEADBOARD CORE & LED CHANNEL"
Create-ArchitecturalBefore "public\collections\collection_4.jpg" "public\collections\collection_4_before.jpg" "SUITE 04 DINING" "CYLINDRICAL STONE PLINTHS & PARQUET"
Create-ArchitecturalBefore "public\collections\collection_5.jpg" "public\collections\collection_5_before.jpg" "SUITE 05 PENTHOUSE" "FULL RESIDENCE PARQUET & RECESSED BEAMS"

