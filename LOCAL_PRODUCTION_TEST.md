# 🧪 Local Production Test Guide

Test your production build locally before deploying to Render.

## Quick Test

### Step 1: Build Everything
```bash
# From the root directory
cd cloudblitz-enquiry-system

# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build
```

### Step 2: Run in Production Mode
```bash
# Make sure you're in the backend directory
cd backend

# Run with production environment
npm run start:dev
```

Or on Windows:
```cmd
cd backend
set NODE_ENV=production && node dist/server.js
```

### Step 3: Test the Application

1. **Open browser**: http://localhost:5000
2. **You should see**: Your React app (not "Cannot GET /")
3. **Test API**: http://localhost:5000/api/health
4. **Test features**:
   - Register a new user
   - Login
   - Create enquiries
   - View enquiries

## What to Expect

✅ **Success Indicators**:
- React app loads at http://localhost:5000
- No 404 errors for routes like /login, /dashboard
- API endpoints work at http://localhost:5000/api/*
- Console shows: "🌐 Serving frontend from: ..."

❌ **Failure Indicators**:
- "Cannot GET /" error
- 404 for React routes
- API not responding
- Console errors

## Troubleshooting

### Issue: "Cannot GET /"
**Solution**: Make sure `NODE_ENV=production` is set

### Issue: API works but frontend doesn't load
**Solution**: Check if `frontend/dist` folder exists and has files

### Issue: React routes return 404
**Solution**: Verify the catch-all route in server.ts is configured

## Build Commands Reference

```bash
# Build only frontend
cd frontend && npm run build

# Build only backend
cd backend && npm run build

# Build both (from backend)
cd backend && npm run build:all

# Run production server
cd backend && npm start
```

## Environment Variables

Make sure your `backend/.env` file has:
```env
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Success!

If everything works locally, you're ready to deploy to Render! 🚀

See `RENDER_DEPLOYMENT_GUIDE.md` for deployment instructions.
