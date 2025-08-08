# Vercel Environment Variables - Quick Reference

## 🚀 Required Variables for Vercel

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/techstore?retryWrites=true&w=majority` | MongoDB Atlas connection string |
| `JWT_SECRET` | `techstore-secret-key-2024-jwt-token-secure` | Authentication secret key |

## 📋 Step-by-Step Setup

### 1. MongoDB Atlas Setup
```
1. Go to: https://www.mongodb.com/atlas
2. Create free account
3. Create new cluster (FREE tier)
4. Set up database user (username: techstore)
5. Allow network access from anywhere (0.0.0.0/0)
6. Get connection string
```

### 2. Vercel Environment Variables
```
1. Go to: https://vercel.com
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - MONGODB_URI: [your-mongodb-connection-string]
   - JWT_SECRET: [your-secret-key]
5. Redeploy project
```

## 🔑 Example Values

### MONGODB_URI
```
mongodb+srv://techstore:MyPassword123@cluster0.abc123.mongodb.net/techstore?retryWrites=true&w=majority
```

### JWT_SECRET
```
techstore-secret-key-2024-jwt-token-secure-random-string-32-chars
```

## ✅ Verification
- [ ] MongoDB Atlas cluster running
- [ ] Database user created
- [ ] Network access configured
- [ ] Environment variables set in Vercel
- [ ] Project redeployed

## 🆘 Quick Fixes
- **Connection failed**: Check MONGODB_URI format
- **Auth error**: Verify JWT_SECRET is set
- **Timeout**: Check MongoDB Atlas status
