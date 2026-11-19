Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\shiva\.gemini\antigravity\brain\8bda3341-4a53-4926-80bb-50782d1b81ec\.user_uploaded\media_1795094686854_997ffacf.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)

# 1. Extract Door Mark (X: 355 to 615, Y: 175 to 445)
$dw = 615 - 355
$dh = 445 - 175
$doorBmp = New-Object System.Drawing.Bitmap($dw, $dh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background reference is roughly R:236, G:226, B:217
for ($y = 0; $y -lt $dh; $y++) {
    for ($x = 0; $x -lt $dw; $x++) {
        $origC = $bmp.GetPixel($x + 355, $y + 175)
        # Calculate color distance to background
        $diff = [Math]::Abs($origC.R - 236) + [Math]::Abs($origC.G - 226) + [Math]::Abs($origC.B - 217)
        
        # Also check brightness
        $isBg = ($origC.R -gt 220 -and $origC.G -gt 212 -and $origC.B -gt 202 -and $diff -lt 24)
        
        if ($isBg) {
            $doorBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Smooth edge alpha
            $alpha = 255
            if ($diff -lt 40) {
                $alpha = [int]([Math]::Min(255, [Math]::Max(0, ($diff - 15) * 10)))
            }
            $doorBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $origC.R, $origC.G, $origC.B))
        }
    }
}

$doorBmp.Save("public\exact_door_mark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$doorBmp.Dispose()
Write-Output "Extracted exact_door_mark.png ($dw x $dh)"

# 2. Extract Full Exact Logo (X: 180 to 844, Y: 175 to 595)
# Let's find full exact logo boundaries
$lw = 844 - 180
$lh = 595 - 175
$fullLogo = New-Object System.Drawing.Bitmap($lw, $lh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
# Also a dark-mode luxury version where the dark text is converted to luminous ivory/gold
$darkLogo = New-Object System.Drawing.Bitmap($lw, $lh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $lh; $y++) {
    for ($x = 0; $x -lt $lw; $x++) {
        $origC = $bmp.GetPixel($x + 180, $y + 175)
        $diff = [Math]::Abs($origC.R - 236) + [Math]::Abs($origC.G - 226) + [Math]::Abs($origC.B - 217)
        $isBg = ($origC.R -gt 218 -and $origC.G -gt 210 -and $origC.B -gt 200 -and $diff -lt 26)
        
        if ($isBg) {
            $fullLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $darkLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $alpha = 255
            if ($diff -lt 45) {
                $alpha = [int]([Math]::Min(255, [Math]::Max(0, ($diff - 15) * 8.5)))
            }
            $fullLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $origC.R, $origC.G, $origC.B))
            
            # For dark logo: if this pixel is part of the text (Y > 280, dark pixel)
            if ($y -gt 280 -and $origC.R -lt 140 -and $origC.G -lt 140) {
                # Convert dark olive text to warm luminous ivory (#F5F2EB: 245, 242, 235) or champagne gold
                $invAlpha = [int]([Math]::Min(255, [Math]::Max(0, (140 - $origC.R) * 3)))
                $darkLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($invAlpha, 245, 242, 235))
            } else {
                # Keep the exact door mark as is!
                $darkLogo.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $origC.R, $origC.G, $origC.B))
            }
        }
    }
}

$fullLogo.Save("public\exact_logo_original.png", [System.Drawing.Imaging.ImageFormat]::Png)
$darkLogo.Save("public\exact_logo_dark.png", [System.Drawing.Imaging.ImageFormat]::Png)
$fullLogo.Dispose()
$darkLogo.Dispose()
$bmp.Dispose()
Write-Output "Extracted exact_logo_original.png and exact_logo_dark.png ($lw x $lh)"

