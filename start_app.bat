@echo off
title CareerSync SaaS — Strict Light-Theme Platform
cd /d "%~dp0"
echo Starting CareerSync SaaS Platform...
python serve.py
if %ERRORLEVEL% NEQ 0 (
    echo Python not found. Opening index.html directly in default browser...
    start index.html
)
pause
