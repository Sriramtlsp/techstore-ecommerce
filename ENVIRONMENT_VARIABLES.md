# Environment Variables for Vercel Deployment

## 🔧 Required Environment Variables

You need to set these environment variables in your Vercel dashboard:

### 1. **MONGODB_URI** (Required)
**Purpose**: Database connection string for MongoDB Atlas

**Value Format**:
```
mongodb+srv://username:password@cluster.mongodb.net/techstore?retryWrites=true&w=majority
```

**How to get this**:
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Replace `<dbname>` with `techstore`

**Example**:
```
mongodb+srv://techstore:myPassword123@cluster0.abc123.mongodb.net/techstore?retryWrites=true&w=majority
```

### 2. **JWT_SECRET** (Required)
**Purpose**: Secret key for user authentication tokens

**Value**: Any random string (32+ characters recommended)

**Example**:
```
techstore-secret-key-2024-jwt-token-secure
```

### 3. **NODE_ENV** (Optional)
**Purpose**: Set environment to production

**Value**:
```
production
```

### 4. **PORT** (Optional)
**Purpose**: Server port (Vercel sets this automatically)

**Value**:
```
3000
```

## 🚀 How to Set Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Select your project

### Step 2: Add Environment Variables
1. Go to **Settings** tab
2. Click **Environment Variables**
3. Add each variable:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://...` | Production |
| `JWT_SECRET` | `your-secret-key` | Production |
| `NODE_ENV` | `production` | Production |

### Step 3: Deploy
1. Go to **Deployments** tab
2. Click **Redeploy** to apply new environment variables

## 📋 Complete Environment Setup

### For Local Development (.env file)
Create a `.env` file in your project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techstore?retryWrites=true&w=majority
JWT_SECRET=techstore-secret-key-2024-jwt-token-secure
NODE_ENV=development
PORT=3000
```

### For Vercel Production
Set these in Vercel dashboard:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techstore?retryWrites=true&w=majority
JWT_SECRET=techstore-secret-key-2024-jwt-token-secure
NODE_ENV=production
```

## 🔐 Security Best Practices

### JWT_SECRET
- Use a long, random string
- Never share or commit to GitHub
- Change it if compromised

**Generate a secure secret**:
```bash
# On Windows PowerShell
$random = -join ((33..126) | Get-Random -Count 32 | ForEach-Object {[char]$_})
echo $random
```

### MONGODB_URI
- Use MongoDB Atlas (free tier)
- Enable network access for all IPs (0.0.0.0/0)
- Use strong database password
- Never commit to GitHub

## 🛠️ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create new project

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier
3. Select cloud provider (AWS/Google Cloud/Azure)
4. Choose region close to you
5. Click "Create"

### Step 3: Set Up Database Access
1. Go to **Database Access**
2. Click "Add New Database User"
3. Username: `techstore`
4. Password: Create strong password
5. Role: "Read and write to any database"
6. Click "Add User"

### Step 4: Set Up Network Access
1. Go to **Network Access**
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to **Database**
2. Click "Connect"
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` with your password
6. Replace `<dbname>` with `techstore`

## ✅ Verification Checklist

Before deploying, ensure:

- [ ] MongoDB Atlas cluster is running
- [ ] Database user is created
- [ ] Network access allows all IPs
- [ ] Connection string is correct
- [ ] JWT_SECRET is set
- [ ] Environment variables are added to Vercel
- [ ] Project is redeployed after adding variables

## 🆘 Troubleshooting

### Common Issues:

1. **"MongoDB connection failed"**
   - Check MONGODB_URI format
   - Verify username/password
   - Ensure network access allows all IPs

2. **"JWT_SECRET not defined"**
   - Add JWT_SECRET to Vercel environment variables
   - Redeploy after adding

3. **"Authentication failed"**
   - Check database user credentials
   - Verify user has read/write permissions

4. **"Network timeout"**
   - Check MongoDB Atlas cluster status
   - Verify network access settings

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test MongoDB connection locally first
4. Check MongoDB Atlas cluster status

Your ecommerce site will be live once all environment variables are properly configured! 🎉
