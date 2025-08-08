# Deployment Guide for TechStore E-commerce

## Option 1: Vercel (Recommended - Free)

### Prerequisites
1. GitHub account
2. MongoDB Atlas account (free tier)

### Steps:

1. **Set up MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account
   - Create new cluster
   - Get connection string

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Any random string for security
   - Deploy!

## Option 2: Railway (Free Tier)

1. **Sign up at Railway**
   - Go to [Railway](https://railway.app)
   - Connect GitHub account

2. **Deploy**
   - Create new project
   - Select your GitHub repo
   - Add environment variables
   - Deploy automatically

## Option 3: Heroku (Paid - $7/month)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Add MongoDB**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## Environment Variables Needed

Create a `.env` file or set these in your hosting platform:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techstore
JWT_SECRET=your-secret-key-here
NODE_ENV=production
PORT=3000
```

## Database Setup

After deployment, you'll need to seed the database:

1. **For Vercel/Railway**: Use the admin panel or run seed script
2. **For Heroku**: 
   ```bash
   heroku run npm run seed
   ```

## Demo Accounts After Deployment

- **Admin**: admin@techstore.com / admin123
- **User**: user@techstore.com / user123

## Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check MongoDB URI
   - Ensure IP whitelist includes 0.0.0.0/0

2. **Build Errors**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json

3. **Environment Variables**
   - Double-check all required variables are set
   - Restart deployment after adding variables

## Cost Comparison

| Platform | Cost | Features |
|----------|------|----------|
| Vercel | Free | Easy deployment, good performance |
| Railway | Free | Good for Node.js, MongoDB support |
| Heroku | $7/month | Reliable, good support |
| DigitalOcean | $5/month | More control, learning opportunity |

## Recommended for Beginners

**Start with Vercel** - it's free, easy to use, and perfect for learning deployment.
