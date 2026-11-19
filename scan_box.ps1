Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\shiva\.gemini\antigravity\brain\8bda3341-4a53-4926-80bb-50782d1b81ec\.user_uploaded\media_1795094686854_997ffacf.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

# Sample background color roughly 237, 227, 218
for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        # Background is roughly brightness > 215 and R > 220, G > 210, B > 200
        $diff = [Math]::Abs($c.R - 236) + [Math]::Abs($c.G - 226) + [Math]::Abs($c.B - 217)
        # If pixel is significantly different from background (the green arch, stone, or dark green text)
        if ($diff -gt 35 -or ($c.R -lt 200 -and $c.G -lt 200 -and $c.B -lt 200)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Logo bounding box: X = $minX to $maxX (width: $($maxX - $minX)), Y = $minY to $maxY (height: $($maxY - $minY))"
$bmp.Dispose()

