@echo off
echo ========================================
echo CloudBlitz - One-Time Setup and Run
echo ========================================
echo.

REM Step 1: Build Frontend
echo Step 1: Building Frontend...
cd frontend
call npm install
call npm run build
echo Frontend built successfully!
echo.

REM Step 2: Install Backend Dependencies
echo Step 2: Installing Backend Dependencies...
cd ..\backend
call npm install
echo Backend dependencies installed!
echo.

REM Step 3: Run Backend (serves frontend)
echo Step 3: Starting Backend Server...
echo Backend will serve the frontend on: http://localhost:5000
echo API available at: http://localhost:5000/api
echo.
echo Press Ctrl+C to stop the server
echo.

set NODE_ENV=production
npm run dev

REM Alternative: Use this for compiled version
REM npm start
