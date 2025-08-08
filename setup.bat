@echo off
echo ========================================
echo TechStore E-commerce Setup
echo ========================================
echo.

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Seeding database with sample data...
call npm run seed
if %errorlevel% neq 0 (
    echo Error: Failed to seed database
    echo Make sure MongoDB is running
    pause
    exit /b 1
)

echo.
echo Starting server...
echo.
echo Server will be available at: http://localhost:3000
echo Admin login: admin@techstore.com / admin123
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start