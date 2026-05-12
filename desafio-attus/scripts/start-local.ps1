# Arranca o ng serve mesmo quando existe Yarn PnP na pasta do utilizador (ex.: C:\Users\<nome>\.pnp.cjs),
# que faz o bundler do Angular rejeitar zone.js e @angular/material.
# O ficheiro é reposto automaticamente ao sair (Ctrl+C) ou se o arranque falhar.

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$pnp = Join-Path $env:USERPROFILE '.pnp.cjs'
$hold = Join-Path $env:USERPROFILE '.pnp.cjs.__desafio_attus_hold'

function Restore-Pnp {
  if (Test-Path $hold) {
    Move-Item -LiteralPath $hold -Destination $pnp -Force
    Write-Host "[start-local] Restaurado: $pnp" -ForegroundColor DarkGreen
  }
}

if (Test-Path $pnp) {
  Write-Host "[start-local] A afastar temporariamente $pnp (restaura ao terminar)." -ForegroundColor Yellow
  Move-Item -LiteralPath $pnp -Destination $hold -Force
}

try {
  Set-Location $projectRoot

  # Evita o prompt interactivo "Port 4200 is already in use" do Angular CLI.
  Get-NetTCPConnection -LocalPort 4200 -State Listen -ErrorAction SilentlyContinue |
    ForEach-Object {
      Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
    }

  npm start
} finally {
  Restore-Pnp
}
