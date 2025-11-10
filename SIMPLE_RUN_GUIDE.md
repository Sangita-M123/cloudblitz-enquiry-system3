# 🚀 Simple Run Guide - One Command Setup

This guide shows you how to build frontend once and run only the backend.

---

## 🎯 Quick Start (Recommended)

### Option 1: Automated Script (Easiest)

**Windows:**
```bash
setup-and-run.bat
```

**Mac/Linux:**
```bash
chmod +x setup-and-run.sh
./setup-and-run.sh
```

This will:
1. ✅ Build the frontend
2. ✅ Install backend dependencies
3. ✅ Start the backend (serving frontend)

**Done!** Open http://localhost:5000

---

## 🎯 Manual Setup (One-Time)

### Step 1: Build Frontend (One Time Only)

```bash
cd frontend
npm install
npm run build
```

**Result:** Creates `frontend/dist` folder with built files

### Step 2: Install Backend Dependencies (One Time Only)

```bash
cd backend
npm install
```

### Step 3: Run Backend (Every Time)

**Option A: Development Mode with TypeScript (Recommended)**
```bash
cd backend
npm run dev:prod
```

**Option B: Production Mode (Compiled)**
```bash
cd backend
npm run build
npm start
```

**Done!** Open http://localhost:5000

---

## 🔄 Daily Workflow

After the one-time setup, you only need to:

```bash
cd backend
npm run dev:prod
```

That's it! The backend will:
- ✅ Serve the frontend from `frontend/dist`
- ✅ Provide API at `/api`
- ✅ Run on http://localhost:5000

---

## 📝 When to Rebuild Frontend

You only need to rebuild the frontend when you change frontend code:

```bash
cd frontend
npm run build
```

Then restart the backend:
```bash
cd backend
npm run dev:prod
```

---

## 🎯 Available Backend Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run dev` | Development mode (no frontend) | When running frontend separately |
| `npm run dev:prod` | Production mode with TypeScript | **Recommended for single server** |
| `npm run build` | Build backend to JavaScript | For deployment |
| `npm start` | Run compiled backend | After `npm run build` |
| `npm run build:frontend` | Build frontend from backend folder | Convenience command |

---

## 🌐 Access Points

After running the backend:

- **Application:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health
- **API Base:** http://localhost:5000/api

---

## 🐛 Troubleshooting

### Frontend not loading?

**Check if frontend is built:**
```bash
ls frontend/dist
# Should show: index.html, assets/
```

**If not, build it:**
```bash
cd frontend
npm run build
```

### Backend won't start?

**Install dependencies:**
```bash
cd backend
npm install
```

### Port 5000 already in use?

**Change port in backend/.env:**
```
PORT=3000
```

---

## 📊 Comparison: Development vs Production Mode

### Development Mode (Separate Servers)
```bash
# Terminal 1
cd frontend
npm run dev          # Port 5173

# Terminal 2
cd backend
npm run dev          # Port 5000
```
**Pros:** Hot reload for frontend
**Cons:** Need 2 terminals

### Production Mode (Single Server) ⭐ Recommended
```bash
# Build frontend once
cd frontend
npm run build

# Run backend only
cd backend
npm run dev:prod     # Port 5000
```
**Pros:** Single command, single port, deployment-ready
**Cons:** Need to rebuild frontend for changes

---

## 🎯 Recommended Workflow

### For Development:
1. **First time:** Build frontend
2. **Every time:** Run backend with `npm run dev:prod`
3. **When changing frontend:** Rebuild and restart

### For Deployment:
1. Build frontend: `cd frontend && npm run build`
2. Build backend: `cd backend && npm run build`
3. Start: `cd backend && npm start`

---

## 📦 What Gets Built

### Frontend Build (`frontend/dist/`)
```
dist/
├── index.html           # Main HTML file
└── assets/
    ├── index-*.css      # Compiled CSS
    └── index-*.js       # Compiled JavaScript
```

### Backend Build (`backend/dist/`)
```
dist/
├── server.js            # Main server file
├── controllers/         # Compiled controllers
├── models/              # Compiled models
└── routes/              # Compiled routes
```

---

## 🚀 Quick Commands Reference

**One-Time Setup:**
```bash
# Build frontend
cd frontend && npm install && npm run build

# Install backend
cd ../backend && npm install
```

**Daily Use:**
```bash
cd backend
npm run dev:prod
```

**Open Application:**
```
http://localhost:5000
```

---

## ✅ Checklist

**One-Time Setup:**
- [ ] Frontend built (`frontend/dist` exists)
- [ ] Backend dependencies installed
- [ ] MongoDB connection configured in `backend/.env`

**Every Time:**
- [ ] Run `npm run dev:prod` in backend folder
- [ ] Open http://localhost:5000
- [ ] Test application

---

## 🎉 Benefits of This Approach

✅ **Simple:** Only one command to run
✅ **Fast:** No need to rebuild backend
✅ **Deployment-Ready:** Same setup as production
✅ **Single Port:** Everything on port 5000
✅ **No CORS Issues:** Frontend and backend on same domain

---

## 📞 Need Help?

**Common Issues:**
- Frontend not loading → Rebuild frontend
- API not working → Check backend logs
- Port in use → Change PORT in .env

**Documentation:**
- Full guide: README.md
- Testing: TEST_NOW.md
- Deployment: DEPLOYMENT_GUIDE.md

---

**Status:** ✅ Ready to Use
**Recommended Command:** `npm run dev:prod` (in backend folder)
