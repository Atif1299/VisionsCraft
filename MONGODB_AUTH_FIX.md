# MongoDB Authentication Fix Guide

## ❌ Current Error
```
MongoDB connection error: bad auth : authentication failed
```

This means your MongoDB username or password is incorrect in the `.env` file.

## 🔧 How to Fix

### Step 1: Get Correct MongoDB Credentials

1. **Go to MongoDB Atlas** (https://cloud.mongodb.com)
2. **Login** to your account
3. **Select your cluster** (visionscraft)
4. Click **"Database Access"** in the left sidebar
5. Find your database user (e.g., `ranaatif`)

### Step 2: Reset Password (Recommended)

1. Click the **"Edit"** button next to your user
2. Click **"Edit Password"**
3. Choose **"Autogenerate Secure Password"** OR set a simple password
4. **IMPORTANT:** Copy the password immediately!
5. Click **"Update User"**

### Step 3: Update Your .env File

Open `d:\VisionsCraft\.env` and update the `MONGODB_URI`:

**Format:**
```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

**Example with your cluster:**
```
MONGODB_URI=mongodb+srv://ranaatif:YOUR_NEW_PASSWORD@visionscraft.su582b5.mongodb.net/visionscraft?retryWrites=true&w=majority
```

**⚠️ IMPORTANT:** If your password has special characters, you MUST URL-encode them:

| Character | URL-Encoded |
|-----------|-------------|
| @         | %40         |
| :         | %3A         |
| /         | %2F         |
| ?         | %3F         |
| #         | %23         |
| [         | %5B         |
| ]         | %5D         |
| !         | %21         |
| $         | %24         |
| &         | %26         |
| '         | %27         |
| (         | %28         |
| )         | %29         |
| *         | %2A         |
| +         | %2B         |
| ,         | %2C         |
| ;         | %3B         |
| =         | %3D         |

**Example:** If password is `Pass@123!`, use `Pass%40123%21`

### Step 4: Verify IP Whitelist

1. In MongoDB Atlas, click **"Network Access"**
2. Make sure your current IP is whitelisted OR
3. Add `0.0.0.0/0` to allow all IPs (for development only)

### Step 5: Test Connection

```bash
node seed.js
```

You should see:
```
🔌 Attempting to connect to MongoDB...
✅ MongoDB connected successfully
📊 Database: visionscraft
```

## 🆘 Still Not Working?

### Option 1: Create New Database User

1. Go to **Database Access** in MongoDB Atlas
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `visionscraftuser`
5. Password: Click **"Autogenerate Secure Password"** and copy it
6. Database User Privileges: **"Atlas admin"** (for testing)
7. Click **"Add User"**
8. Update your `.env` with the new credentials

### Option 2: Use Connection String from Atlas

1. In MongoDB Atlas, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with `visionscraft`
6. Paste into your `.env` file

### Option 3: Check Database Name

Make sure the database name in your connection string matches:
- Connection string: `...mongodb.net/visionscraft?...`
- Should be: `visionscraft` (not `test` or other)

## 📝 Quick Checklist

- [ ] Username is correct (check MongoDB Atlas > Database Access)
- [ ] Password is correct (reset if unsure)
- [ ] Password is URL-encoded if it has special characters
- [ ] Database name is `visionscraft`
- [ ] Cluster URL is correct (`visionscraft.su582b5.mongodb.net`)
- [ ] IP address is whitelisted (or 0.0.0.0/0 is added)
- [ ] User has correct permissions (Read and write to any database)

## 🎯 Recommended .env Format

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@visionscraft.su582b5.mongodb.net/visionscraft?retryWrites=true&w=majority&appName=visionscraft

# Email Configuration (Gmail/SMTP)
EMAIL_USER=ranaatif1299@gmail.com
EMAIL_PASS=xaoenhyadfvcgzkv
ADMIN_EMAIL=ranaatif1299@gmail.com

# SMTP Configuration (Alternative to Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ranaatif1299@gmail.com
SMTP_PASS=xaoenhyadfvcgzkv

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server Configuration
PORT=8080
NODE_ENV=development
```

## 🔍 Debug Mode

To see the exact connection string being used (without password):

Add this to `config/db.js` temporarily:
```javascript
console.log('Connection string:', mongoURI.replace(/:[^:@]+@/, ':****@'))
```

This will show:
```
Connection string: mongodb+srv://ranaatif:****@visionscraft.su582b5.mongodb.net/visionscraft?...
```

Verify the username and cluster URL are correct!

---

**Need Help?** 
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/
- Connection String Format: https://www.mongodb.com/docs/manual/reference/connection-string/
