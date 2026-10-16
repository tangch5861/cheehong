$ErrorActionPreference = 'Stop'
$source = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$repo = (Resolve-Path (Join-Path $source '..')).Path
if (-not $source.StartsWith($repo, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Source path is outside the repository: $source"
}
Push-Location $source
try {
  & node .\node_modules\typescript\bin\tsc --noEmit
  if ($LASTEXITCODE -ne 0) { throw 'TypeScript check failed' }
  & node .\node_modules\vite\bin\vite.js build
  if ($LASTEXITCODE -ne 0) { throw 'Vite build failed' }
} finally {
  Pop-Location
}
$dist = Join-Path $source 'dist'
foreach ($name in @('assets', 'characters')) {
  $target = Join-Path $repo $name
  if (Test-Path -LiteralPath $target) {
    $full = [System.IO.Path]::GetFullPath($target)
    if (-not $full.StartsWith($repo + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
      throw "Refusing to replace path outside repository: $full"
    }
    Remove-Item -LiteralPath $full -Recurse -Force
  }
}
Copy-Item -LiteralPath (Join-Path $dist 'index.html'), (Join-Path $dist 'favicon.svg'), (Join-Path $dist 'Tang-Chee-Hong-Resume.pdf') -Destination $repo -Force
Copy-Item -LiteralPath (Join-Path $dist 'assets') -Destination $repo -Recurse -Force
$characterOutput = Join-Path $repo 'characters'
New-Item -ItemType Directory -Path $characterOutput | Out-Null
Get-ChildItem -LiteralPath (Join-Path $dist 'characters') -File | Where-Object { $_.Name -match '-frame-\d+\.(png|webp)$' } | Copy-Item -Destination $characterOutput -Force
New-Item -ItemType File -Path (Join-Path $repo '.nojekyll') -Force | Out-Null
Write-Host "Built and copied the site to $repo"
