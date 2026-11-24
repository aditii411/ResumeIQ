# CareerSync SaaS PowerShell Launcher
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Starting CareerSync SaaS — Strict Light-Theme Platform" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan

if (Get-Command python -ErrorAction SilentlyContinue) {
    python serve.py
} else {
    Write-Host "Opening index.html in default browser..." -ForegroundColor Yellow
    Start-Process "index.html"
}
