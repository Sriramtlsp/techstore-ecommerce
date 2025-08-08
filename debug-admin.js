const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./server/models/User');
const Product = require('./server/models/Product');
const Order = require('./server/models/Order');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

const debugAdminData = async () => {
  try {
    console.log('\n🔍 Debugging Admin Dashboard Data...\n');

    // Check users
    const totalUsers = await User.countDocuments({ role: 'user' });
    console.log(`👥 Total Users: ${totalUsers}`);

    // Check products
    const totalProducts = await Product.countDocuments();
    console.log(`📦 Total Products: ${totalProducts}`);

    // Check orders
    const totalOrders = await Order.countDocuments();
    console.log(`📋 Total Orders: ${totalOrders}`);

    // Calculate revenue
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    console.log(`💰 Total Revenue: ₹${totalRevenue[0]?.total || 0}`);

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .populate('products.productId', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    console.log(`\n📋 Recent Orders (${recentOrders.length}):`);
    if (recentOrders.length === 0) {
      console.log('   No orders found');
    } else {
      recentOrders.forEach((order, index) => {
        console.log(`   ${index + 1}. Order ${order._id.toString().substring(0, 8)}... - ${order.userId?.name || 'Unknown'} - ₹${order.totalAmount} - ${order.status}`);
      });
    }

    // Check if admin user exists
    const adminUser = await User.findOne({ role: 'admin' });
    console.log(`\n👨‍💼 Admin User: ${adminUser ? `${adminUser.name} (${adminUser.email})` : 'Not found'}`);

    console.log('\n✅ Debug complete!');

  } catch (error) {
    console.error('❌ Error debugging admin data:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runDebug = async () => {
  await connectDB();
  await debugAdminData();
};

runDebug();