Add-Type -AssemblyName System.Drawing

function Generate-BeforeImage($afterPath, $beforePath) {
    if (-not (Test-Path $afterPath)) { return }
    $src = [System.Drawing.Bitmap]::FromFile($afterPath)
    $w = $src.Width
    $h = $src.Height
    $dest = New-Object System.Drawing.Bitmap $w, $h
    
    # Process pixels: convert to raw architectural concrete & structural construction state
    $rnd = New-Object System.Random(42)
    
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            $lum = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
            
            # Subtle concrete grit noise
            $noise = $rnd.Next(-6, 7)
            
            # Concrete color grading: cool slate industrial concrete
            # Raw cast concrete is cool neutral-grey with slight blue-cyan undertone
            $rawR = [Math]::Max(0, [Math]::Min(255, [int]($lum * 0.88 + $noise)))
            $rawG = [Math]::Max(0, [Math]::Min(255, [int]($lum * 0.90 + $noise)))
            $rawB = [Math]::Max(0, [Math]::Min(255, [int]($lum * 0.93 + $noise)))
            
            # Add subtle architectural chalk laser guideline at y = h*0.48 (red/orange laser guide)
            if ($y -eq [int]($h * 0.48) -or $y -eq [int]($h * 0.48) + 1) {
                if ($x % 6 -lt 4) {
                    $rawR = [Math]::Min(255, $rawR + 90)
                    $rawG = [Math]::Max(0, $rawG - 30)
                    $rawB = [Math]::Max(0, $rawB - 30)
                }
            }
            
            $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($rawR, $rawG, $rawB))
        }
    }
    
    # Save as high-quality JPEG
    $dest.Save($beforePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dest.Dispose()
    $src.Dispose()
    Write-Output "Generated matching before image: $beforePath ($w x $h)"
}

Generate-BeforeImage "public\collections\collection_1.jpg" "public\collections\collection_1_before.jpg"
Generate-BeforeImage "public\collections\collection_2.jpg" "public\collections\collection_2_before.jpg"
Generate-BeforeImage "public\collections\collection_3.jpg" "public\collections\collection_3_before.jpg"
Generate-BeforeImage "public\collections\collection_4.jpg" "public\collections\collection_4_before.jpg"
Generate-BeforeImage "public\collections\collection_5.jpg" "public\collections\collection_5_before.jpg"

