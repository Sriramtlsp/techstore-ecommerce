# TechStore E-commerce Website

A full-featured e-commerce website for laptop accessories, computer peripherals, and printer accessories.

## Features

- 🛍️ Product catalog with advanced filtering and search
- 🛒 Shopping cart functionality
- 👤 User authentication and profiles
- 📦 Order management and tracking
- 💬 Live chat support
- 📱 Responsive design
- 👨‍💼 Admin dashboard for managing products, orders, and users

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone or download the project**
   ```bash
   cd ecommerce-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - The `.env` file should already be configured for local MongoDB
   - If using MongoDB Atlas, update the `MONGODB_URI` in `.env`

4. **Start the application**
   ```bash
   npm run setup
   ```
   This will:
   - Seed the database with sample data
   - Start the server
   - Make the site available at http://localhost:3000

## Alternative Commands

- **Seed database only**: `npm run seed`
- **Start server only**: `npm start`
- **Development mode**: `npm run dev` (with auto-restart)
- **Debug admin data**: `node debug-admin.js`

## Demo Accounts

After seeding the database, you can use these accounts:

- **Admin**: admin@techstore.com / admin123
- **User**: user@techstore.com / user123

## Project Structure

```
ecommerce-site/
├── client/                 # Frontend files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Images
│   ├── index.html         # Home page
│   ├── dashboard.html     # Admin dashboard
│   └── ...                # Other HTML pages
├── server/                # Backend files
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Main server file
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Get all users

## Features Overview

### Customer Features
- Browse products with filtering and search
- Add products to cart
- User registration and login
- Place orders with shipping details
- Track order status
- Live chat support
- Contact forms

### Admin Features
- Dashboard with statistics
- Product management (CRUD operations)
- Order management and status updates
- User management
- Bulk operations
- Export functionality

## Troubleshooting

### "Loading..." in Admin Dashboard
1. Make sure MongoDB is running
2. Run `npm run seed` to add sample data
3. Check browser console for errors
4. Run `node debug-admin.js` to check database content

### Database Connection Issues
1. Ensure MongoDB is running on localhost:27017
2. Check the `MONGODB_URI` in `.env` file
3. For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change the `PORT` in `.env` file to a different port (e.g., 3001)

## Development

For development with auto-restart:
```bash
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Update `JWT_SECRET` to a secure random string
3. Configure production MongoDB URI
4. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server/server.js --name "techstore"
   ```

## Support

For issues or questions, please check the troubleshooting section above or contact the development team.