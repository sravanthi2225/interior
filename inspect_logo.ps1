Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\shiva\.gemini\antigravity\brain\8bda3341-4a53-4926-80bb-50782d1b81ec\.user_uploaded\media_1795094686854_997ffacf.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($filePath)
Write-Output "Size: $($bmp.Width) x $($bmp.Height)"
$p1 = $bmp.GetPixel(10, 10)
$p2 = $bmp.GetPixel(500, 10)
Write-Output "Pixel 10,10: R=$($p1.R), G=$($p1.G), B=$($p1.B)"
Write-Output "Pixel 500,10: R=$($p2.R), G=$($p2.G), B=$($p2.B)"
$bmp.Dispose()

