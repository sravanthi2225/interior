Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\shiva\.gemini\antigravity\brain\8bda3341-4a53-4926-80bb-50782d1b81ec\.user_uploaded\media_1795094686854_997ffacf.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)

# Scan Door Symbol X range (Y: 180-440)
$doorMinX = 1000; $doorMaxX = 0; $doorMinY = 1000; $doorMaxY = 0
for ($y = 175; $y -le 445; $y++) {
    for ($x = 350; $x -le 650; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $diff = [Math]::Abs($c.R - 236) + [Math]::Abs($c.G - 226) + [Math]::Abs($c.B - 217)
        if ($diff -gt 25) {
            if ($x -lt $doorMinX) { $doorMinX = $x }
            if ($x -gt $doorMaxX) { $doorMaxX = $x }
            if ($y -lt $doorMinY) { $doorMinY = $y }
            if ($y -gt $doorMaxY) { $doorMaxY = $y }
        }
    }
}

# Scan FRAME STONE text X range (Y: 475-530)
$textMinX = 1000; $textMaxX = 0; $textMinY = 1000; $textMaxY = 0
for ($y = 475; $y -le 530; $y++) {
    for ($x = 100; $x -le 950; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $diff = [Math]::Abs($c.R - 236) + [Math]::Abs($c.G - 226) + [Math]::Abs($c.B - 217)
        if ($diff -gt 25) {
            if ($x -lt $textMinX) { $textMinX = $x }
            if ($x -gt $textMaxX) { $textMaxX = $x }
            if ($y -lt $textMinY) { $textMinY = $y }
            if ($y -gt $textMaxY) { $textMaxY = $y }
        }
    }
}

# Scan Subtitle X range (Y: 555-590)
$subMinX = 1000; $subMaxX = 0
for ($y = 555; $y -le 590; $y++) {
    for ($x = 100; $x -le 950; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $diff = [Math]::Abs($c.R - 236) + [Math]::Abs($c.G - 226) + [Math]::Abs($c.B - 217)
        if ($diff -gt 20) {
            if ($x -lt $subMinX) { $subMinX = $x }
            if ($x -gt $subMaxX) { $subMaxX = $x }
        }
    }
}

Write-Output "Door Mark: X=$doorMinX to $doorMaxX (width $($doorMaxX - $doorMinX)), Y=$doorMinY to $doorMaxY (height $($doorMaxY - $doorMinY))"
Write-Output "FRAME STONE: X=$textMinX to $textMaxX (width $($textMaxX - $textMinX)), Y=$textMinY to $textMaxY (height $($textMaxY - $textMinY))"
Write-Output "Subtitle: X=$subMinX to $subMaxX (width $($subMaxX - $subMinX))"
$bmp.Dispose()

