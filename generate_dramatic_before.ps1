Add-Type -AssemblyName System.Drawing

function Create-CleanArchitecturalBefore {
    param(
        [string]$afterPath,
        [string]$beforePath,
        [string]$roomCode,
        [string]$roomName
    )

    if (-not (Test-Path $afterPath)) { return }

    $src = [System.Drawing.Bitmap]::FromFile($afterPath)
    $w = $src.Width
    $h = $src.Height

    $dest = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $destData = $dest.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $stride = $srcData.Stride
    $bytes = [Math]::Abs($stride) * $h
    $srcRgbValues = New-Object byte[] $bytes
    $destRgbValues = New-Object byte[] $bytes

    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcRgbValues, 0, $bytes)

    $rnd = New-Object System.Random(1337)

    # Convert to cold industrial raw cast concrete substrate (Pristine, no ladders, no artificial lines)
    for ($y = 0; $y -lt $h; $y++) {
        $row = $y * $stride
        $isCeiling = $y -lt [int]($h * 0.38)
        $isFloor = $y -gt [int]($h * 0.65)

        for ($x = 0; $x -lt $w; $x++) {
            $idx = $row + ($x * 4)
            $b = $srcRgbValues[$idx]
            $gCol = $srcRgbValues[$idx + 1]
            $r = $srcRgbValues[$idx + 2]

            # Luminance
            $lum = (0.299 * $r + 0.587 * $gCol + 0.114 * $b) / 255.0

            # Subtle mineral roughness
            $grit = $rnd.Next(-8, 9)

            # Contrast curve for authentic raw architectural concrete
            $val = [Math]::Pow($lum, 1.20) * 255.0 + $grit

            # Cold slate / concrete tone
            $outR = [int]($val * 0.74)
            $outG = [int]($val * 0.78)
            $outB = [int]($val * 0.83)

            # Raw cement darkness on upper ceiling envelope
            if ($isCeiling) {
                $outR = [int]($outR * 0.80)
                $outG = [int]($outG * 0.84)
                $outB = [int]($outB * 0.88)
            }

            # Clamp
            $destRgbValues[$idx] = [byte][Math]::Min(255, [Math]::Max(0, $outB))
            $destRgbValues[$idx + 1] = [byte][Math]::Min(255, [Math]::Max(0, $outG))
            $destRgbValues[$idx + 2] = [byte][Math]::Min(255, [Math]::Max(0, $outR))
            $destRgbValues[$idx + 3] = 255
        }
    }

    [System.Runtime.InteropServices.Marshal]::Copy($destRgbValues, 0, $destData.Scan0, $bytes)
    $src.UnlockBits($srcData)
    $dest.UnlockBits($destData)

    # NO LADDER (removed per user request)
    # NO ARTIFICIAL RED LINES

    # Obliterate any potential watermark in bottom right corner with deep smooth vignette
    $brushCorner = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        (New-Object System.Drawing.Point ([int]($w * 0.70), [int]($h * 0.70))),
        (New-Object System.Drawing.Point ($w, $h)),
        [System.Drawing.Color]::Transparent,
        [System.Drawing.Color]::FromArgb(250, 10, 12, 14)
    )
    $g.FillRectangle($brushCorner, [int]($w * 0.70), [int]($h * 0.70), [int]($w * 0.30), [int]($h * 0.30))

    # Save to disk
    $dest.Save($beforePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    # Cleanup
    $brushCorner.Dispose()
    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()

    Write-Host "Created clean before (no ladder): $beforePath ($w x $h)"
}

Create-CleanArchitecturalBefore "public/collections/collection_1.jpg" "public/collections/collection_1_before.jpg" "01-LR" "LIVING SUITE"
Create-CleanArchitecturalBefore "public/collections/collection_2.jpg" "public/collections/collection_2_before.jpg" "02-LN" "SALON LOUNGE"
Create-CleanArchitecturalBefore "public/collections/collection_3.jpg" "public/collections/collection_3_before.jpg" "03-MB" "MONOLITHIC HAVEN"
Create-CleanArchitecturalBefore "public/collections/collection_4.jpg" "public/collections/collection_4_before.jpg" "04-DN" "DINING GALLERY"
Create-CleanArchitecturalBefore "public/collections/collection_5.jpg" "public/collections/collection_5_before.jpg" "05-PH" "PENTHOUSE CORE"
