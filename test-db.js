const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Testing database connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set!');
      console.log('Please set up your environment variables:');
      console.log('1. Create a .env file in your project root');
      console.log('2. Add: MONGODB_URI=your_mongodb_connection_string');
      console.log('3. Add: JWT_SECRET=your_secret_key');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Test if we can query products
    const Product = require('./server/models/Product');
    const productCount = await Product.countDocuments();
    console.log(`📦 Products in database: ${productCount}`);
    
    if (productCount === 0) {
      console.log('⚠️  No products found. Run "npm run seed" to add sample data.');
    }
    
    mongoose.connection.close();
    console.log('✅ Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check your MONGODB_URI format');
    console.log('2. Ensure MongoDB Atlas cluster is running');
    console.log('3. Verify network access allows all IPs (0.0.0.0/0)');
    console.log('4. Check username/password in connection string');
  }
};

connectDB();
