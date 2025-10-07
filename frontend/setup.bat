@echo off
REM InsightFlow EDU Frontend Setup Script
REM Run this script to install dependencies and initialize MSW

echo ========================================
echo InsightFlow EDU - Frontend Setup
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Initializing Mock Service Worker...
call npx msw init public/ --save
if errorlevel 1 (
    echo ERROR: MSW initialization failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo To start the development server, run:
echo   npm run dev
echo ========================================
echo.
pause
