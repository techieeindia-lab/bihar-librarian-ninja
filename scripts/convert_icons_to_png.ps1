Add-Type -AssemblyName System.Drawing

$files = @(
    "assets\icon.png",
    "assets\android-icon-foreground.png",
    "assets\playstore_graphics\app_icon_512.png"
)

foreach ($relPath in $files) {
    $fullPath = Join-Path (Get-Location) $relPath
    if (Test-Path $fullPath) {
        $img = [System.Drawing.Image]::FromFile($fullPath)
        $tempPath = "$fullPath.tmp.png"
        $img.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $img.Dispose()
        Remove-Item $fullPath -Force
        Move-Item $tempPath $fullPath -Force
        Write-Host "Converted $relPath to true PNG."
    }
}
