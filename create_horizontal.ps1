Add-Type -AssemblyName System.Drawing
$door = [System.Drawing.Bitmap]::FromFile("public\exact_door_mark.png")
$full = [System.Drawing.Bitmap]::FromFile("public\exact_logo_dark.png")

$textH = 420 - 280
$textW = 664
$textBmp = New-Object System.Drawing.Bitmap $textW, $textH
$gText = [System.Drawing.Graphics]::FromImage($textBmp)
$srcRect = New-Object System.Drawing.Rectangle 0, 280, $textW, $textH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $textW, $textH
$gText.DrawImage($full, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gText.Dispose()

$scaleFactor = 0.5
$finalDoorW = [int]($door.Width * $scaleFactor)
$finalDoorH = [int]($door.Height * $scaleFactor)

$finalTextW = [int]($textW * $scaleFactor)
$finalTextH = [int]($textH * $scaleFactor)

$spacing = 18
$totalW = $finalDoorW + $spacing + $finalTextW
$totalH = [Math]::Max($finalDoorH, $finalTextH)

$horizBmp = New-Object System.Drawing.Bitmap $totalW, $totalH
$g = [System.Drawing.Graphics]::FromImage($horizBmp)

$doorY = [int](($totalH - $finalDoorH) / 2)
$doorDest = New-Object System.Drawing.Rectangle 0, $doorY, $finalDoorW, $finalDoorH
$doorSrc = New-Object System.Drawing.Rectangle 0, 0, $door.Width, $door.Height
$g.DrawImage($door, $doorDest, $doorSrc, [System.Drawing.GraphicsUnit]::Pixel)

$textX = $finalDoorW + $spacing
$textY = [int](($totalH - $finalTextH) / 2)
$textDest = New-Object System.Drawing.Rectangle $textX, $textY, $finalTextW, $finalTextH
$textSrc = New-Object System.Drawing.Rectangle 0, 0, $textW, $textH
$g.DrawImage($textBmp, $textDest, $textSrc, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$horizBmp.Save("public\exact_logo_horizontal.png", [System.Drawing.Imaging.ImageFormat]::Png)

$horizBmp.Dispose()
$textBmp.Dispose()
$door.Dispose()
$full.Dispose()
Write-Output "Successfully created public\exact_logo_horizontal.png ($totalW x $totalH)"
