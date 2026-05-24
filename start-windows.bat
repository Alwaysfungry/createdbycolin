@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 start-server.py
  goto :eof
)
where python >nul 2>nul
if %errorlevel%==0 (
  python start-server.py
  goto :eof
)
echo Python is not installed. Install Python 3, then run this file again.
pause
