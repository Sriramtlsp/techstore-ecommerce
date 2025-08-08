const { spawn } = require('child_process');
const path = require('path');

console.log('🌱 Starting database seeding...');

const seedProcess = spawn('node', ['server/seed.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

seedProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Database seeded successfully!');
    console.log('\n🚀 You can now start the server with: npm start');
    console.log('\n📋 Demo Accounts:');
    console.log('   Admin: admin@techstore.com / admin123');
    console.log('   User: user@techstore.com / user123');
  } else {
    console.log(`\n❌ Seeding failed with exit code ${code}`);
  }
});

seedProcess.on('error', (error) => {
  console.error('❌ Error running seed script:', error.message);
});