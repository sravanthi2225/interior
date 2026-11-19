Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\shiva\.gemini\antigravity\brain\8bda3341-4a53-4926-80bb-50782d1b81ec\.user_uploaded\media_1795094686854_997ffacf.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)

# Sample a letter pixel
$minR = 255; $minG = 255; $minB = 255
$textPixels = @()
for ($y = 485; $y -le 525; $y++) {
    for ($x = 180; $x -le 850; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 120 -and $c.G -lt 130 -and $c.B -lt 120) {
            $textPixels += $c
        }
    }
}

Write-Output "Found $($textPixels.Count) text pixels."
if ($textPixels.Count -gt 0) {
    $sample = $textPixels[0]
    Write-Output "Text pixel sample: R=$($sample.R), G=$($sample.G), B=$($sample.B)"
}
$bmp.Dispose()

