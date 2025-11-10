# 🔨 Build Commands for Render

## What Render Will Run

When you deploy to Render, it will execute these commands automatically:

### Build Command
```bash
npm install && npm run build:all
```

This does:
1. Installs backend dependencies
2. Builds frontend (React → static files in `frontend/dist`)
3. Builds backend (TypeScript → JavaScript in `backend/dist`)

### Start Command
```bash
npm start
```

This does:
1. Sets `NODE_ENV=production`
2. Runs `node dist/server.js`
3. Starts Express server
4. Serves API at `/api/*`
5. Serves React app at `/*`

---

## Test These Commands Locally

Before deploying, test that these commands work:

```bash
# Navigate to backend folder
cd cloudblitz-enquiry-system/backend

# Run the build command (same as Render)
npm install && npm run build:all

# Run the start command (same as Render)
npm start
```

Then visit http://localhost:5000

---

## What Gets Built

### Frontend Build Output (`frontend/dist/`)
```
frontend/dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-[hash].js    # Bundled JavaScript
│   └── index-[hash].css   # Bundled CSS
└── vite.svg               # Static assets
```

### Backend Build Output (`backend/dist/`)
```
backend/dist/
├── server.js              # Main server file
├── config/
│   └── db.js
├── controllers/
│   ├── auth.js
│   ├── enquiry.js
│   └── admin.js
├── middlewares/
│   ├── auth.js
│   ├── role.js
│   └── validate.js
├── models/
│   ├── User.js
│   └── Enquiry.js
├── routes/
│   ├── auth.js
│   ├── enquiry.js
│   └── admin.js
├── validators/
│   ├── auth.validator.js
│   ├── enquiry.validator.js
│   └── user.validator.js
└── utils/
    └── generateToken.js
```

---

## Build Script Breakdown

### `npm run build:all` (in backend/package.json)
```json
{
  "scripts": {
    "build:frontend": "cd ../frontend && npm install && npm run build",
    "build": "tsc",
    "build:all": "npm run build:frontend && npm run build"
  }
}
```

**Step by step:**
1. `build:frontend`: Goes to frontend, installs deps, builds React
2. `build`: Compiles TypeScript backend to JavaScript
3. `build:all`: Runs both in sequence

### `npm start` (in backend/package.json)
```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node dist/server.js"
  }
}
```

**What it does:**
- Sets environment to production
- Runs the compiled server.js
- Server serves both API and frontend

---

## Render Configuration

Copy these exact values into Render:

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install && npm run build:all` |
| **Start Command** | `npm start` |

---

## Environment Variables for Render

Add these in Render dashboard:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_key_here_min_32_chars
```

---

## Troubleshooting Build Issues

### Build fails at frontend step
```bash
# Test frontend build locally
cd frontend
npm install
npm run build
# Check for errors
```

### Build fails at backend step
```bash
# Test backend build locally
cd backend
npm install
npm run build
# Check for TypeScript errors
```

### Build succeeds but app doesn't start
```bash
# Check if dist folders exist
ls backend/dist
ls frontend/dist

# Test start command locally
cd backend
npm start
```

### App starts but shows errors
```bash
# Check environment variables
echo $NODE_ENV
# Should be "production"

# Check if frontend dist is accessible
ls ../frontend/dist
# Should show index.html and assets/
```

---

## Build Time Expectations

- **Frontend build**: 1-3 minutes
- **Backend build**: 30 seconds - 1 minute
- **Total build time**: 2-5 minutes
- **First deploy**: May take longer (5-10 minutes)

---

## After Successful Build

Render will:
1. ✅ Show "Build succeeded" in logs
2. ✅ Start your application
3. ✅ Show "Live" status (green)
4. ✅ Make your app accessible at your Render URL

You should see in logs:
```
🚀 Server running on port 5000
📦 Environment: production
🌐 Serving frontend from: /opt/render/project/src/frontend/dist
```

---

## Quick Reference

```bash
# Local development
npm run dev                    # Start dev server

# Production build (test locally)
npm run build:all              # Build everything
npm start                      # Run production server

# Render will run
npm install && npm run build:all   # Build phase
npm start                          # Start phase
```

---

**Ready to deploy?** Go to [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)!
