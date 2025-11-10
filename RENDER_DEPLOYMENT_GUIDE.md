# 🚀 Render Deployment Guide - CloudBlitz Enquiry System

This guide will help you deploy your full-stack application to Render with a single backend server serving both the API and React frontend.

## 📋 Prerequisites

- GitHub account
- Render account (free tier available at https://render.com)
- MongoDB Atlas account (already configured)
- Your code pushed to GitHub

---

## 🔧 Step 1: Prepare Your Code

Your application is already configured to serve the frontend from the backend in production mode.

### Verify Configuration

1. **Backend serves frontend** ✅ (Already configured in `backend/src/server.ts`)
2. **Frontend API URL** ✅ (Set to `/api` in production)
3. **Build scripts** ✅ (Configured in package.json)

---

## 📤 Step 2: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

---

## 🌐 Step 3: Deploy on Render

### 3.1 Create New Web Service

1. Go to https://render.com and sign in
2. Click **"New +"** button
3. Select **"Web Service"**
4. Connect your GitHub account if not already connected
5. Select your repository

### 3.2 Configure Build Settings

Use these exact settings:

| Setting | Value |
|---------|-------|
| **Name** | `cloudblitz-enquiry-system` (or your choice) |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build:all` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 3.3 Add Environment Variables

Click **"Advanced"** and add these environment variables:


| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Required |
| `MONGO_URI` | Your MongoDB Atlas connection string | From your .env file |
| `JWT_SECRET` | Your JWT secret key | From your .env file |
| `PORT` | `5000` | Optional (Render sets this automatically) |

**Important**: Get your `MONGO_URI` and `JWT_SECRET` from `backend/.env` file.

### 3.4 Deploy

1. Click **"Create Web Service"**
2. Render will start building your application
3. Wait for the build to complete (5-10 minutes)
4. Your app will be live at `https://your-app-name.onrender.com`

---

## ✅ Step 4: Verify Deployment

### Test Your Application

1. **Visit your app URL**: `https://your-app-name.onrender.com`
2. **Test Registration**: Create a new account
3. **Test Login**: Login with your credentials
4. **Test Enquiries**: Create and manage enquiries
5. **Check API**: Visit `https://your-app-name.onrender.com/api/health`

Expected health check response:
```json
{
  "ok": true,
  "msg": "API running ✅",
  "timestamp": "2024-11-10T12:00:00.000Z"
}
```

---

## 🔍 Troubleshooting

### Build Fails

**Problem**: Build command fails
**Solution**: Check the build logs in Render dashboard

Common issues:
- Missing dependencies: Run `npm install` in both frontend and backend locally
- TypeScript errors: Run `npm run build` locally to check for errors

### App Not Loading

**Problem**: White screen or 404 errors
**Solution**: 
1. Check if `frontend/dist` folder exists after build
2. Verify `NODE_ENV=production` is set in Render
3. Check Render logs for errors

### API Errors

**Problem**: API calls failing
**Solution**:
1. Verify `MONGO_URI` is correct in Render environment variables
2. Check MongoDB Atlas network access (allow all IPs: `0.0.0.0/0`)
3. Verify JWT_SECRET is set

### Database Connection Issues

**Problem**: Cannot connect to MongoDB
**Solution**:
1. Go to MongoDB Atlas
2. Navigate to Network Access
3. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
4. Wait 2-3 minutes for changes to propagate

---

## 🔄 Updating Your Deployment

When you make changes to your code:

```bash
# Commit your changes
git add .
git commit -m "Your update message"

# Push to GitHub
git push origin main
```

Render will automatically detect the changes and redeploy your application.

---

## 💰 Render Free Tier Limitations

- **Spin down after 15 minutes of inactivity**
- **750 hours/month free** (enough for one service running 24/7)
- **First request after spin down takes 30-60 seconds**
- **No custom domain on free tier** (use .onrender.com subdomain)

### Keep Your App Awake (Optional)

Use a service like UptimeRobot or Cron-job.org to ping your app every 10 minutes:
- URL to ping: `https://your-app-name.onrender.com/api/health`

---

## 📊 Monitoring Your App

### View Logs
1. Go to Render Dashboard
2. Click on your service
3. Click **"Logs"** tab
4. View real-time logs

### Check Metrics
1. Go to your service in Render
2. Click **"Metrics"** tab
3. View CPU, Memory, and Request metrics

---

## 🔐 Security Best Practices

1. **Never commit .env files** to GitHub
2. **Use strong JWT_SECRET** (at least 32 characters)
3. **Rotate secrets regularly**
4. **Enable MongoDB Atlas IP whitelist** (or use 0.0.0.0/0 for Render)
5. **Use HTTPS** (Render provides this automatically)

---

## 🎯 Post-Deployment Checklist

- [ ] App loads successfully
- [ ] Registration works
- [ ] Login works
- [ ] Enquiries can be created
- [ ] Enquiries can be viewed
- [ ] Enquiries can be updated
- [ ] Admin panel accessible (for admin users)
- [ ] API health check responds
- [ ] No console errors in browser
- [ ] Mobile responsive design works

---

## 📞 Support

If you encounter issues:

1. Check Render logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test API endpoints directly
5. Check MongoDB Atlas connection

---

## 🎉 Success!

Your CloudBlitz Enquiry Management System is now live and accessible worldwide!

**Your App URL**: `https://your-app-name.onrender.com`

Share this URL with your users and start managing enquiries! 🚀
