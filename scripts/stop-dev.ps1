$ErrorActionPreference = "SilentlyContinue"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$serverPath = [regex]::Escape((Join-Path $root "server"))
$clientPath = [regex]::Escape((Join-Path $root "client"))
$ports = @(5000, 5173, 5174)

$portProcessIds = Get-NetTCPConnection -LocalPort $ports |
  Where-Object { $_.OwningProcess -gt 0 } |
  Select-Object -ExpandProperty OwningProcess -Unique

$wrapperProcessIds = Get-CimInstance Win32_Process |
  Where-Object {
    ($_.CommandLine -match $serverPath -and $_.CommandLine -match "nodemon|server\.js|npm-cli\.js") -or
    ($_.CommandLine -match $clientPath -and $_.CommandLine -match "vite|npm-cli\.js")
  } |
  Select-Object -ExpandProperty ProcessId -Unique

$processIds = @($portProcessIds + $wrapperProcessIds) |
  Where-Object { $_ -and $_ -ne $PID } |
  Sort-Object -Unique

if (-not $processIds.Count) {
  Write-Host "No dev processes found on ports 5000, 5173, or 5174."
  exit 0
}

foreach ($processId in $processIds) {
  Stop-Process -Id $processId -Force
  Write-Host "Stopped process $processId"
}

Start-Sleep -Seconds 1
Write-Host "Dev ports released."
