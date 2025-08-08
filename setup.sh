#!/bin/bash

echo "========================================"
echo "TechStore E-commerce Setup"
echo "========================================"
echo

echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi

echo
echo "Seeding database with sample data..."
npm run seed
if [ $? -ne 0 ]; then
    echo "Error: Failed to seed database"
    echo "Make sure MongoDB is running"
    exit 1
fi

echo
echo "Starting server..."
echo
echo "Server will be available at: http://localhost:3000"
echo "Admin login: admin@techstore.com / admin123"
echo
echo "Press Ctrl+C to stop the server"
echo

npm start