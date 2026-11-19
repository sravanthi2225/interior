Add-Type -AssemblyName System.Drawing

function Create-LuxuryArchitecturalBefore {
    param(
        [string]$afterPath,
        [string]$beforePath,
        [string]$roomCode,
        [string]$roomTitle
    )

    if (-not (Test-Path $afterPath)) {
        Write-Error "File not found: $afterPath"
        return
    }

    $src = [System.Drawing.Bitmap]::FromFile($afterPath)
    $w = $src.Width
    $h = $src.Height

    # Create destination bitmap
    $dest = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    # Lock bits for fast, high-performance pixel transformation
    $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $destData = $dest.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $stride = $srcData.Stride
    $bytes = [Math]::Abs($stride) * $h
    $srcRgbValues = New-Object byte[] $bytes
    $destRgbValues = New-Object byte[] $bytes

    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcRgbValues, 0, $bytes)

    # Convert to rich architectural raw concrete / limestone substrate
    for ($y = 0; $y -lt $h; $y++) {
        $row = $y * $stride
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $row + ($x * 4)
            $b = $srcRgbValues[$idx]
            $gCol = $srcRgbValues[$idx + 1]
            $r = $srcRgbValues[$idx + 2]

            # High-fidelity luminance
            $lum = (0.299 * $r + 0.587 * $gCol + 0.114 * $b) / 255.0

            # Architectural concrete tone mapping with rich contrast
            $contrastLum = [Math]::Pow($lum, 1.15)

            # Slate raw microcement palette: cool neutral grey with slight architectural stone warmth
            $rawR = [int]($contrastLum * 165.0)
            $rawG = [int]($contrastLum * 172.0)
            $rawB = [int]($contrastLum * 180.0)

            # Clamp
            $destRgbValues[$idx] = [byte][Math]::Min(255, [Math]::Max(0, $rawB))
            $destRgbValues[$idx + 1] = [byte][Math]::Min(255, [Math]::Max(0, $rawG))
            $destRgbValues[$idx + 2] = [byte][Math]::Min(255, [Math]::Max(0, $rawR))
            $destRgbValues[$idx + 3] = 255
        }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($destRgbValues, 0, $destData.Scan0, $bytes)
    $src.UnlockBits($srcData)
    $dest.UnlockBits($destData)

    # 1. Subtle Architectural Golden Laser Plumb Lines (Warm Amber #c5a880)
    $laserPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(45, 197, 168, 128)), [single]1.0
    $laserPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash

    # Vertical architectural axis line at 25% and 75%
    $g.DrawLine($laserPen, [int]($w * 0.25), 0, [int]($w * 0.25), $h)
    $g.DrawLine($laserPen, [int]($w * 0.75), 0, [int]($w * 0.75), $h)

    # Horizontal datum level at 50%
    $g.DrawLine($laserPen, 0, [int]($h * 0.5), $w, [int]($h * 0.5))

    # 2. Minimalist Architectural Alignment Crosshairs
    $crosshairPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 197, 168, 128)), [single]1.5
    $cx1 = [int]($w * 0.25)
    $cy1 = [int]($h * 0.5)
    $g.DrawLine($crosshairPen, $cx1 - 8, $cy1, $cx1 + 8, $cy1)
    $g.DrawLine($crosshairPen, $cx1, $cy1 - 8, $cx1, $cy1 + 8)

    $cx2 = [int]($w * 0.75)
    $g.DrawLine($crosshairPen, $cx2 - 8, $cy1, $cx2 + 8, $cy1)
    $g.DrawLine($crosshairPen, $cx2, $cy1 - 8, $cx2, $cy1 + 8)

    # 3. Clean Architectural Stamp in Top-Left
    $fontSans = New-Object System.Drawing.Font "Arial", [single]10, [System.Drawing.FontStyle]::Bold
    $fontMono = New-Object System.Drawing.Font "Consolas", [single]9, [System.Drawing.FontStyle]::Regular
    $brushGold = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 197, 168, 128))
    $brushMuted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(170, 240, 240, 240))
    $brushDarkPlate = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(190, 12, 14, 16))

    # Small refined glass pill in top left
    $g.FillRectangle($brushDarkPlate, 32, 32, 320, 52)
    $plateBorderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70, 197, 168, 128)), [single]1.0
    $g.DrawRectangle($plateBorderPen, 32, 32, 320, 52)

    $g.DrawString("FRAME STONE // RAW SUBSTRATE", $fontSans, $brushGold, [single]44, [single]40)
    $g.DrawString("SPEC $roomCode · $roomTitle", $fontMono, $brushMuted, [single]44, [single]60)

    # 4. Obliterate any watermark in bottom right corner with smooth architectural dark gradient
    $brushCorner = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point ([int]($w * 0.70), [int]($h * 0.70))),
        (New-Object System.Drawing.Point ($w, $h)),
        [System.Drawing.Color]::Transparent,
        [System.Drawing.Color]::FromArgb(245, 12, 14, 16)
    )
    $g.FillRectangle($brushCorner, [int]($w * 0.70), [int]($h * 0.70), [int]($w * 0.30), [int]($h * 0.30))

    # Save to disk
    $dest.Save($beforePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    # Cleanup
    $laserPen.Dispose()
    $crosshairPen.Dispose()
    $fontSans.Dispose()
    $fontMono.Dispose()
    $brushGold.Dispose()
    $brushMuted.Dispose()
    $brushDarkPlate.Dispose()
    $plateBorderPen.Dispose()
    $brushCorner.Dispose()
    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()

    Write-Host "Generated luxury architectural before: $beforePath ($w x $h)"
}

Create-LuxuryArchitecturalBefore "public/collections/collection_1.jpg" "public/collections/collection_1_before.jpg" "01-LR" "LIVING SALON SUBSTRATE"
Create-LuxuryArchitecturalBefore "public/collections/collection_2.jpg" "public/collections/collection_2_before.jpg" "02-LN" "LOUNGE ENVELOPE"
Create-LuxuryArchitecturalBefore "public/collections/collection_3.jpg" "public/collections/collection_3_before.jpg" "03-MB" "BEDROOM CORE"
Create-LuxuryArchitecturalBefore "public/collections/collection_4.jpg" "public/collections/collection_4_before.jpg" "04-DN" "DINING GALLERY VOLUME"
Create-LuxuryArchitecturalBefore "public/collections/collection_5.jpg" "public/collections/collection_5_before.jpg" "05-PH" "PENTHOUSE SHELL"
