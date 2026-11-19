Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\shiva\.gemini\antigravity\brain\8bda3341-4a53-4926-80bb-50782d1b81ec\.user_uploaded\media_1795094686854_997ffacf.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)

for ($y = 150; $y -lt 650; $y += 20) {
    $nonBgCount = 0
    for ($x = 200; $x -lt 850; $x += 5) {
        $c = $bmp.GetPixel($x, $y)
        $diff = [Math]::Abs($c.R - 236) + [Math]::Abs($c.G - 226) + [Math]::Abs($c.B - 217)
        if ($diff -gt 35) { $nonBgCount++ }
    }
    Write-Output "Y=$y : nonBgCount=$nonBgCount"
}
$bmp.Dispose()

