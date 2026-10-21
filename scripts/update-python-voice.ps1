[CmdletBinding()]
param(
    [string]$ManifestPath,
    [string]$NodePath
)

# This is an in-place, normal-user update. It never runs an installer, writes a
# registry key, changes a shortcut, kills a process, or recursively deletes files.
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$updateRoot = [IO.Path]::GetFullPath((Join-Path $projectRoot 'python-voice-update'))
$targetRoot = [IO.Path]::GetFullPath('E:\ai\python-learning')
$backupRoot = [IO.Path]::GetFullPath((Join-Path $updateRoot 'private-backups'))
$utf8 = New-Object Text.UTF8Encoding($false)

function Assert-InRoot([string]$Candidate, [string]$Root, [bool]$AllowRoot = $false) {
    $absolute = [IO.Path]::GetFullPath($Candidate)
    $base = [IO.Path]::GetFullPath($Root).TrimEnd('\', '/')
    if (($AllowRoot -and $absolute.Equals($base, [StringComparison]::OrdinalIgnoreCase)) -or
        $absolute.StartsWith($base + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { return $absolute }
    throw "Path is outside its permitted directory: $absolute"
}

function Assert-NoReparsePath([string]$Candidate) {
    $cursor = [IO.Path]::GetFullPath($Candidate)
    while ($cursor) {
        if (Test-Path -LiteralPath $cursor) {
            $item = Get-Item -LiteralPath $cursor -Force
            if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) { throw "Reparse points are not permitted: $cursor" }
        }
        $parent = [IO.Path]::GetDirectoryName($cursor)
        if ($parent -eq $cursor) { break }
        $cursor = $parent
    }
}

function Resolve-RelativeFile([string]$Root, [string]$Relative) {
    if ([string]::IsNullOrWhiteSpace($Relative) -or [IO.Path]::IsPathRooted($Relative)) { throw 'Expected a nonempty relative file path.' }
    foreach ($part in ($Relative -split '[\\/]')) {
        if (!$part -or $part -eq '.' -or $part -eq '..' -or $part.IndexOfAny([IO.Path]::GetInvalidFileNameChars()) -ge 0 -or $part.EndsWith('.') -or $part.EndsWith(' ')) { throw "Invalid payload path: $Relative" }
    }
    $absolute = Assert-InRoot (Join-Path $Root $Relative) $Root
    Assert-NoReparsePath $absolute
    return $absolute
}

function Assert-FileRecord($Entry) {
    if ($Entry.path -isnot [string] -or $Entry.sha256 -notmatch '^[a-f0-9]{64}$' -or
        $Entry.size -isnot [ValueType] -or $Entry.size -lt 0 -or [double]$Entry.size -ne [math]::Truncate([double]$Entry.size)) { throw 'Malformed manifest file record.' }
}

function Get-Sha256([string]$File) { return (Get-FileHash -LiteralPath $File -Algorithm SHA256).Hash.ToLowerInvariant() }

function Test-FileMatches([string]$File, $Entry) {
    if (!(Test-Path -LiteralPath $File -PathType Leaf)) { return $false }
    return (Get-Item -LiteralPath $File).Length -eq [long]$Entry.size -and (Get-Sha256 $File) -eq $Entry.sha256
}

function Get-TargetProcesses([string]$Executable) {
    foreach ($candidate in Get-Process) {
        try { $candidatePath = $candidate.Path } catch { continue }
        if ($candidatePath -and $candidatePath.Equals($Executable, [StringComparison]::OrdinalIgnoreCase)) { $candidate }
    }
}

function Close-TargetNormally([string]$Executable) {
    $running = @(Get-TargetProcesses $Executable)
    foreach ($candidate in $running) {
        try { if ($candidate.MainWindowHandle -ne [IntPtr]::Zero) { [void]$candidate.CloseMainWindow() } } catch {
            if (!$candidate.HasExited) { throw }
        }
    }
    $deadline = [DateTime]::UtcNow.AddSeconds(15)
    while (@(Get-TargetProcesses $Executable).Count -gt 0 -and [DateTime]::UtcNow -lt $deadline) { Start-Sleep -Milliseconds 250 }
    if (@(Get-TargetProcesses $Executable).Count -gt 0) { throw 'Python is still running after a normal close request. Close it manually, then rerun this script. No process was forcibly terminated.' }
}

if (!$ManifestPath) { $ManifestPath = Join-Path $projectRoot 'releases\python-1.0.5-manifest.json' }
$ManifestPath = Assert-InRoot $ManifestPath (Join-Path $projectRoot 'releases')
Assert-NoReparsePath $ManifestPath
$manifest = [IO.File]::ReadAllText($ManifestPath, [Text.Encoding]::UTF8) | ConvertFrom-Json
if ($manifest.schemaVersion -ne 1 -or $manifest.product.version -ne '1.0.5' -or
    $manifest.product.appId -ne 'python-learning' -or
    !([IO.Path]::GetFullPath($manifest.product.installDirectory)).Equals($targetRoot, [StringComparison]::OrdinalIgnoreCase) -or
    $manifest.product.executable -ne '像学习语文一样学习编程.exe') { throw 'This updater only supports Python 1.0.5 at E:\ai\python-learning.' }
if ($manifest.narration.voice.speaker -ne 'zh-CN-XiaoxiaoNeural' -or $manifest.narration.voice.engine -ne 'Microsoft Edge Online TTS' -or
    $manifest.narration.voice.synthesisRate -ne '+0%' -or $manifest.narration.voice.playbackRate -ne 1) { throw 'The prepared Python payload must use the new normal-speed Xiaoxiao recordings.' }
if ($manifest.narration.manifestSha256 -ne '992e522bf121f4ecc0c5aa75a1b582873959bc92d24a6fd071df0495560be196' -or
    $manifest.narration.unchangedFromPython104 -ne $true) { throw 'This layout update must retain the released Python 1.0.4 narration unchanged.' }
if ($manifest.voicePatchGuards.onlyGuardedVoiceAndLayoutRangesChanged -ne $true -or
    $manifest.voicePatchGuards.courseDataAndAIByteIdentical -ne $true -or
    $manifest.voicePatchGuards.layoutUpdated -ne $true -or
    $manifest.voicePatchGuards.legacyAudioMapAndVoiceRouterRemoved -ne $true -or
    @($manifest.voicePatchGuards.guardedBundleRanges).Count -lt 2 -or
    $manifest.layout.stylesheetSha256 -notmatch '^[a-f0-9]{64}$') { throw 'The prepared Python voice/layout byte guards are missing.' }
$stageRelative = $manifest.stage
if ($manifest.PSObject.Properties.Name -contains 'payload' -and $manifest.payload.PSObject.Properties.Name -contains 'stage') { $stageRelative = $manifest.payload.stage }
$stageRoot = Resolve-RelativeFile $updateRoot $stageRelative
foreach ($directory in @($updateRoot, $stageRoot, $targetRoot, $backupRoot)) { Assert-NoReparsePath $directory }
if (!(Test-Path -LiteralPath $stageRoot -PathType Container) -or !(Test-Path -LiteralPath $targetRoot -PathType Container)) { throw 'Both the prepared stage and existing target installation must exist.' }
$executable = Resolve-RelativeFile $targetRoot $manifest.product.executable
if (!(Test-Path -LiteralPath $executable -PathType Leaf) -or !(Test-Path -LiteralPath (Join-Path $targetRoot 'resources\app.asar') -PathType Leaf)) { throw 'The existing Python installation is incomplete.' }
$previousVersion = (Get-Item -LiteralPath $executable).VersionInfo.ProductVersion
if ($previousVersion -notin @('1.0.4', '1.0.5')) { throw 'Expected the existing Python 1.0.4 installation (or an idempotent 1.0.5 retry).' }

$seen = New-Object 'Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
$records = @($manifest.files)
if ($records.Count -eq 0) { throw 'The payload is empty.' }
foreach ($entry in $records) {
    Assert-FileRecord $entry
    if (!$seen.Add($entry.path)) { throw "Duplicate payload path: $($entry.path)" }
    $source = Resolve-RelativeFile $stageRoot $entry.path
    [void](Resolve-RelativeFile $targetRoot $entry.path)
    if (!(Test-FileMatches $source $entry)) { throw "Prepared payload hash/size mismatch: $($entry.path)" }
}
if (!$seen.Contains('resources/app.asar') -or !$seen.Contains($manifest.product.executable)) { throw 'The executable and ASAR must both be in the payload.' }
$legacyPath = Join-Path $updateRoot 'legacy-audio-manifest.json'
Assert-NoReparsePath $legacyPath
$legacy = [IO.File]::ReadAllText($legacyPath, [Text.Encoding]::UTF8) | ConvertFrom-Json
if ($legacy.schemaVersion -ne 1 -or @($legacy.files).Count -ne 1016) { throw 'Expected the fixed 1016-file original audio manifest.' }
$baselinePath = Join-Path $projectRoot 'voice-baseline\python\baseline-manifest.json'
Assert-NoReparsePath $baselinePath
if ($legacy.source -ne 'voice-baseline/python/baseline-manifest.json' -or (Get-Sha256 $baselinePath) -ne $legacy.sourceManifestSha256) { throw 'The original audio baseline manifest changed.' }
$baseline = [IO.File]::ReadAllText($baselinePath, [Text.Encoding]::UTF8) | ConvertFrom-Json
if (@($baseline.files).Count -ne 1016) { throw 'The portable original audio baseline is incomplete.' }
$originalAudio = @{}
foreach ($entry in $baseline.files) { $originalAudio[('resources/app.asar.unpacked/dist/' + $entry.path)] = $entry }
$legacySeen = New-Object 'Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
foreach ($entry in $legacy.files) {
    Assert-FileRecord $entry
    if ($entry.path -notmatch '^resources/app\.asar\.unpacked/dist/audio/[a-f0-9]{8}\.mp3$' -or !$legacySeen.Add($entry.path) -or $seen.Contains($entry.path)) { throw 'Unsafe or conflicting legacy audio path.' }
    $original = $originalAudio[$entry.path]
    if (!$original -or $original.sha256 -ne $entry.sha256 -or [long]$original.size -ne [long]$entry.size) { throw 'Legacy recording does not match the fixed original baseline.' }
    [void](Resolve-RelativeFile $targetRoot $entry.path)
}
# This frozen, safe subset of the prior published payload remains available even
# when old releases are archived. Only exact known files may be moved.
$yaoyaoManifestPath = Join-Path $updateRoot 'legacy-yaoyao-audio-manifest.json'
Assert-NoReparsePath $yaoyaoManifestPath
if ((Get-Sha256 $yaoyaoManifestPath) -ne 'a6484db49de96e1a7a081dfcc1716363a02f33e53db4c4d6bc3bb4d2dd1b8f08') { throw 'The fixed prior Yaoyao cleanup manifest changed.' }
$yaoyaoPayload = [IO.File]::ReadAllText($yaoyaoManifestPath, [Text.Encoding]::UTF8) | ConvertFrom-Json
if ($yaoyaoPayload.schemaVersion -ne 1 -or $yaoyaoPayload.sourceVersion -ne '1.0.3' -or
    $yaoyaoPayload.sourceManifestSha256 -ne 'f97235ab7be0b2f41bb30b87b7b5237145ff445948223aa916ea2529370594fe' -or
    $yaoyaoPayload.sourceVoice.speaker -ne 'Microsoft Yaoyao' -or
    $yaoyaoPayload.sourceNarrationManifestSha256 -ne 'b78fb99b04d4cafe5e7d0fb135200ca3e63ab047cf0b921db69a085f48ff8b44') { throw 'The fixed Python 1.0.3 Yaoyao release metadata changed.' }
$yaoyaoFiles = @($yaoyaoPayload.files)
if ($yaoyaoFiles.Count -ne 460) { throw 'Expected all 460 prior Yaoyao recordings.' }
$obsoleteFamily = @{}
foreach ($entry in $legacy.files) { $obsoleteFamily[$entry.path] = 'originalXiaoxiao' }
foreach ($entry in $yaoyaoFiles) {
    Assert-FileRecord $entry
    if ($entry.path -notmatch '^resources/app\.asar\.unpacked/dist/narration/clips/yaoyao-[a-f0-9]{24}\.mp3$' -or
        !$legacySeen.Add($entry.path) -or $seen.Contains($entry.path)) { throw 'Unsafe or conflicting prior Yaoyao path.' }
    [void](Resolve-RelativeFile $targetRoot $entry.path)
    $obsoleteFamily[$entry.path] = 'yaoyao103'
}
$obsoleteFiles = @($legacy.files) + @($yaoyaoFiles)
if (!$NodePath) {
    $command = Get-Command node.exe -ErrorAction SilentlyContinue
    if ($command) { $NodePath = $command.Source }
    else { $NodePath = Join-Path ([Environment]::GetFolderPath('UserProfile')) '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
}
if (!(Test-Path -LiteralPath $NodePath -PathType Leaf)) { throw 'Node.js is required to verify the installed app; pass -NodePath explicitly.' }
$verifier = Join-Path $PSScriptRoot 'verify-python-installation.cjs'
if (!(Test-Path -LiteralPath $verifier -PathType Leaf)) { throw 'Installation verifier is missing.' }

# There have been no writes to the installation before every source hash passes.
Close-TargetNormally $executable
$stamp = [DateTime]::UtcNow.ToString('yyyyMMddTHHmmssfffZ') + '-' + [Guid]::NewGuid().ToString('N').Substring(0,8)
$backupDirectory = Assert-InRoot (Join-Path $backupRoot $stamp) $backupRoot
Assert-NoReparsePath $backupDirectory
[void][IO.Directory]::CreateDirectory($backupDirectory)
$ledgerPath = Join-Path $backupDirectory 'deployment.json'
$ledger = [ordered]@{
    schemaVersion = 1; startedAt = [DateTime]::UtcNow.ToString('o'); version = '1.0.5'; previousVersion = $previousVersion; deployment = 'in-place-files'
    directory = $targetRoot; stage = $stageRoot; backupDirectory = $backupDirectory
    payloadManifestSha256 = Get-Sha256 $ManifestPath; registryModified = $false; shortcutModified = $false
    copyOrder = 'New MP3 files first; other changed files next; resources/app.asar last.'
    payloadVerified = $false; filesCopied = 0; filesUnchanged = 0; filesBackedUp = 0
    replaced = @(); added = @(); legacyAudio = [ordered]@{moved = 0; skipped = 0; missing = 0; files = @();
        yaoyaoCleanupManifestSha256 = (Get-Sha256 $yaoyaoManifestPath); yaoyaoReleaseManifestSha256 = $yaoyaoPayload.sourceManifestSha256
        families = [ordered]@{originalXiaoxiao = [ordered]@{known=1016;moved=0;skipped=0;missing=0};yaoyao103 = [ordered]@{known=460;moved=0;skipped=0;missing=0}}
    }
    verificationPassed = $false; ok = $false
}
function Save-Ledger { [IO.File]::WriteAllText($ledgerPath, ($ledger | ConvertTo-Json -Depth 12), $utf8) }
Save-Ledger
try {
    $ordered = $records | Sort-Object @{Expression={ if ($_.path -ieq 'resources/app.asar') { 2 } elseif ($_.path -match '\.mp3$') { 0 } else { 1 } }}, @{Expression={$_.path}}
    foreach ($entry in $ordered) {
        $source = Resolve-RelativeFile $stageRoot $entry.path
        $destination = Resolve-RelativeFile $targetRoot $entry.path
        if (Test-FileMatches $destination $entry) { $ledger.filesUnchanged++; continue }
        if (Test-Path -LiteralPath $destination) {
            if (!(Test-Path -LiteralPath $destination -PathType Leaf)) { throw "Payload file conflicts with an existing directory: $($entry.path)" }
            $previousHash = Get-Sha256 $destination
            $previousSize = (Get-Item -LiteralPath $destination).Length
            $backup = Resolve-RelativeFile $backupDirectory ('replaced/' + $entry.path)
            [void][IO.Directory]::CreateDirectory((Split-Path -Parent $backup))
            Copy-Item -LiteralPath $destination -Destination $backup
            if ((Get-Item -LiteralPath $backup).Length -ne $previousSize -or (Get-Sha256 $backup) -ne $previousHash) { throw 'Backup integrity verification failed.' }
            $ledger.replaced += [ordered]@{path=$entry.path; size=$previousSize; sha256=$previousHash; backup=('replaced/' + $entry.path)}
            $ledger.filesBackedUp++
        } else { $ledger.added += $entry.path }
        Save-Ledger
        # Recheck the source immediately before each copy, including ASAR last.
        if (!(Test-FileMatches $source $entry)) { throw 'Prepared source changed during the update.' }
        [void][IO.Directory]::CreateDirectory((Split-Path -Parent $destination))
        Copy-Item -LiteralPath $source -Destination $destination -Force
        if (!(Test-FileMatches $destination $entry)) { throw "Copied file failed verification: $($entry.path)" }
        $ledger.filesCopied++
        Save-Ledger
    }
    foreach ($entry in $records) { if (!(Test-FileMatches (Resolve-RelativeFile $targetRoot $entry.path) $entry)) { throw "Final payload verification failed: $($entry.path)" } }
    $ledger.payloadVerified = $true
    Save-Ledger

    # Only known original/1.0.3 recordings can be moved, after the entire new
    # payload passes. User-modified or unrelated files are deliberately retained.
    foreach ($entry in $obsoleteFiles) {
        $family = $obsoleteFamily[$entry.path]
        $familyLedger = $ledger.legacyAudio.families[$family]
        $old = Resolve-RelativeFile $targetRoot $entry.path
        if (!(Test-Path -LiteralPath $old)) { $ledger.legacyAudio.missing++; $familyLedger.missing++; continue }
        if (!(Test-FileMatches $old $entry)) {
            $ledger.legacyAudio.skipped++
            $familyLedger.skipped++
            $ledger.legacyAudio.files += [ordered]@{path=$entry.path; family=$family; action='skipped-content-differs'}
            continue
        }
        $backup = Resolve-RelativeFile $backupDirectory ('legacy/' + $entry.path)
        [void][IO.Directory]::CreateDirectory((Split-Path -Parent $backup))
        Move-Item -LiteralPath $old -Destination $backup
        if (!(Test-FileMatches $backup $entry)) { throw 'Moved legacy recording failed backup verification.' }
        $ledger.legacyAudio.moved++
        $familyLedger.moved++
        $ledger.legacyAudio.files += [ordered]@{path=$entry.path; family=$family; action='moved'; backup=('legacy/' + $entry.path); sha256=$entry.sha256; size=$entry.size}
        Save-Ledger
    }
    Save-Ledger
    & $NodePath $verifier --manifest $ManifestPath --deployment-ledger $ledgerPath
    if ($LASTEXITCODE -ne 0) { throw "Installed application verification failed ($LASTEXITCODE). Restorable backups were retained." }
    $ledger.verificationPassed = $true
    $ledger.ok = $true
    $ledger.completedAt = [DateTime]::UtcNow.ToString('o')
    Save-Ledger
    Write-Output ("Python 1.0.5 verified. Copied: {0}; unchanged: {1}; old Yaoyao recordings moved: {2}; differing legacy files retained: {3}." -f $ledger.filesCopied,$ledger.filesUnchanged,$ledger.legacyAudio.families.yaoyao103.moved,$ledger.legacyAudio.skipped)
    Write-Output ("Private recovery ledger: " + $ledgerPath)
} catch {
    $ledger.error = $_.Exception.Message
    $ledger.failedAt = [DateTime]::UtcNow.ToString('o')
    Save-Ledger
    throw
}
