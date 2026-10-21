$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$products = Get-Content -LiteralPath (Join-Path $projectRoot 'products.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$desktopPath = [Environment]::GetFolderPath('Desktop')
$shell = New-Object -ComObject WScript.Shell
$results = @()
foreach ($language in @('c','cpp')) {
  $product = $products.$language
  $destination = Join-Path 'E:\vkk' $product.installDirectory
  $executable = Join-Path $destination $product.executable
  $running = @(Get-Process | Where-Object { $_.Path -eq $executable })
  foreach ($process in $running) { if ($process.MainWindowHandle -ne 0) { [void]$process.CloseMainWindow() } }
  if ($running.Count -gt 0) { Start-Sleep -Seconds 2 }
  if (@(Get-Process | Where-Object { $_.Path -eq $executable }).Count -gt 0) { throw "Software is still open: $executable" }
  $installer = Join-Path $projectRoot ('releases\' + $product.name + ' Setup ' + $product.version + '.exe')
  $install = Start-Process -FilePath $installer -ArgumentList @('/S',('/D=' + $destination)) -WindowStyle Hidden -PassThru -Wait
  if ($install.ExitCode -ne 0) { throw "Installer failed: $language ($($install.ExitCode))" }
  $registration = Get-ItemProperty -LiteralPath ('HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\' + $product.appId)
  if ($registration.DisplayVersion -ne $product.version -or $registration.InstallLocation -ne $destination) { throw "Registration mismatch: $language" }
  $linkPath = Join-Path $desktopPath ($product.name + '.lnk')
  if (-not (Test-Path -LiteralPath $linkPath)) { throw "Desktop shortcut missing: $language" }
  $shortcut = $shell.CreateShortcut($linkPath)
  if ($shortcut.TargetPath -ne $executable) { throw "Desktop shortcut target mismatch: $language" }
  if ((Get-Item -LiteralPath $executable).VersionInfo.ProductVersion -notlike ($product.version + '*')) { throw "Executable version mismatch: $language" }
  $results += [pscustomobject]@{language=$language;version=$registration.DisplayVersion;directory=$destination;shortcut=$linkPath;target=$shortcut.TargetPath;icon=$shortcut.IconLocation}
  Write-Output ("Installed and desktop shortcut verified: " + $product.name + ' ' + $product.version)
}
$results | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $projectRoot 'test-results\desktop-shortcuts.json') -Encoding UTF8
