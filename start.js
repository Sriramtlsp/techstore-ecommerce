const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 TechStore E-commerce Setup & Start');
console.log('=====================================\n');

// Check if MongoDB is required
const checkMongoDB = () => {
  console.log('📋 Checking system requirements...');
  
  // Check if .env exists
  if (!fs.existsSync('.env')) {
    console.log('❌ .env file not found!');
    console.log('Please make sure you have a .env file with MongoDB connection details.');
    return false;
  }
  
  console.log('✅ .env file found');
  return true;
};

// Run database seed
const runSeed = () => {
  return new Promise((resolve, reject) => {
    console.log('\n🌱 Seeding database with sample data...');
    
    const seedProcess = spawn('node', ['server/seed.js'], {
      stdio: 'inherit'
    });
    
    seedProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Database seeded successfully!');
        resolve();
      } else {
        console.log(`❌ Seeding failed with exit code ${code}`);
        reject(new Error(`Seed process failed with code ${code}`));
      }
    });
    
    seedProcess.on('error', (error) => {
      console.error('❌ Error running seed script:', error.message);
      reject(error);
    });
  });
};

// Start the server
const startServer = () => {
  console.log('\n🚀 Starting TechStore server...');
  console.log('Server will be available at: http://localhost:3000');
  console.log('\n📋 Demo Accounts:');
  console.log('   Admin: admin@techstore.com / admin123');
  console.log('   User: user@techstore.com / user123');
  console.log('\nPress Ctrl+C to stop the server\n');
  
  const serverProcess = spawn('node', ['server/server.js'], {
    stdio: 'inherit'
  });
  
  serverProcess.on('error', (error) => {
    console.error('❌ Error starting server:', error.message);
  });
};

// Main execution
const main = async () => {
  try {
    if (!checkMongoDB()) {
      process.exit(1);
    }
    
    // Ask user if they want to seed the database
    console.log('\n🤔 Do you want to seed the database with sample data?');
    console.log('   This will create sample products, users, and orders.');
    console.log('   (Recommended for first-time setup)');
    
    // For now, we'll automatically seed. In a real scenario, you might want to prompt the user.
    await runSeed();
    
    // Start the server
    startServer();
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
};

main();