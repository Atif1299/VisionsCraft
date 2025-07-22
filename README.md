# VisionsCraft Web Project

## Deployment Instructions for Vercel

### Prerequisites
1. MongoDB Atlas account and connection string
2. Cloudinary account for file uploads
3. Gmail account with App Password for email functionality

### Environment Variables
Create these environment variables in your Vercel dashboard:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/visionscraft

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@yourdomain.com

# SMTP (Alternative to Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server
NODE_ENV=production
```

### Deployment Steps
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set the environment variables in Vercel dashboard
4. Deploy!

### Local Development
1. Copy `.env.example` to `.env`
2. Fill in your environment variables
3. Run `npm install`
4. Run `npm run dev`

### Important Notes
- Make sure your MongoDB Atlas IP whitelist includes 0.0.0.0/0 for Vercel
- Use Gmail App Passwords, not your regular password
- Cloudinary credentials should never be hardcoded
