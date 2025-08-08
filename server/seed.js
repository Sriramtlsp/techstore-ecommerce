const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@techstore.com',
      password: adminPassword,
      role: 'admin'
    });
    await admin.save();

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = new User({
      name: 'John Doe',
      email: 'user@techstore.com',
      password: userPassword,
      role: 'user'
    });
    await user.save();

    // Create sample products
    const products = [
      // Laptop Accessories
      {
        name: 'Laptop Cooling Pad',
        description: 'High-performance cooling pad with dual fans for laptops up to 17 inches',
        price: 2499,
        category: 'laptop-accessories',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop'
      },
      {
        name: 'Laptop Stand Adjustable',
        description: 'Ergonomic aluminum laptop stand with adjustable height and angle',
        price: 3999,
        category: 'laptop-accessories',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop'
      },
      {
        name: 'USB-C Hub 7-in-1',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging',
        price: 4999,
        category: 'laptop-accessories',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=200&fit=crop'
      },
      {
        name: 'Laptop Sleeve 15.6"',
        description: 'Premium leather laptop sleeve with magnetic closure for 15.6" laptops',
        price: 1999,
        category: 'laptop-accessories',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop'
      },
      {
        name: 'Wireless Laptop Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life',
        price: 1499,
        category: 'laptop-accessories',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop'
      },

      // Computer Peripherals
      {
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches and anti-ghosting',
        price: 8999,
        category: 'computer-peripherals',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop'
      },
      {
        name: 'Gaming Mouse RGB',
        description: 'High-precision gaming mouse with customizable RGB lighting and 12000 DPI',
        price: 3499,
        category: 'computer-peripherals',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop'
      },
      {
        name: 'USB Webcam 1080p',
        description: 'Full HD 1080p webcam with auto-focus and built-in microphone',
        price: 2999,
        category: 'computer-peripherals',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop'
      },
      {
        name: 'Wireless Headset',
        description: 'Bluetooth wireless headset with noise cancellation and 20-hour battery',
        price: 5999,
        category: 'computer-peripherals',
        stock: 18,
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop'
      },
      {
        name: 'External Hard Drive 1TB',
        description: 'Portable 1TB external hard drive with USB 3.0 connectivity',
        price: 4499,
        category: 'computer-peripherals',
        stock: 22,
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop'
      },

      // Printer Accessories
      {
        name: 'Ink Cartridge Set (4-Pack)',
        description: 'Compatible ink cartridge set for HP, Canon, and Epson printers',
        price: 1999,
        category: 'printer-accessories',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=200&fit=crop'
      },
      {
        name: 'Photo Paper Glossy A4',
        description: 'High-quality glossy photo paper for professional printing (100 sheets)',
        price: 899,
        category: 'printer-accessories',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop'
      },
      {
        name: 'Printer Cable USB',
        description: 'High-speed USB 2.0 printer cable with gold-plated connectors (3 meters)',
        price: 599,
        category: 'printer-accessories',
        stock: 80,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
      },
      {
        name: 'Printer Stand Mobile',
        description: 'Mobile printer stand with storage shelf and wheels',
        price: 3499,
        category: 'printer-accessories',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=200&fit=crop'
      },
      {
        name: 'Toner Cartridge Laser',
        description: 'High-yield laser toner cartridge compatible with major printer brands',
        price: 2799,
        category: 'printer-accessories',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=200&fit=crop'
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Create a sample order
    const sampleOrder = new Order({
      userId: user._id,
      products: [
        {
          productId: createdProducts[0]._id,
          quantity: 1,
          price: createdProducts[0].price
        },
        {
          productId: createdProducts[5]._id,
          quantity: 1,
          price: createdProducts[5].price
        }
      ],
      totalAmount: createdProducts[0].price + createdProducts[5].price,
      status: 'Processing',
      shippingAddress: {
        street: '123 Tech Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      }
    });

    await sampleOrder.save();
    console.log('Created sample order');

    console.log('\n=== SEED DATA CREATED SUCCESSFULLY ===');
    console.log('\nDemo Accounts:');
    console.log('Admin: admin@techstore.com / admin123');
    console.log('User: user@techstore.com / user123');
    console.log('\nSample Order ID:', sampleOrder._id);
    console.log('\nYou can now start the server with: npm start');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();