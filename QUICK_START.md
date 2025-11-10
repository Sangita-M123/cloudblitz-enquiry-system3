# ⚡ Quick Start Guide

## Development Mode (Separate Servers)

### Terminal 1 - Backend
```bash
cd cloudblitz-enquiry-system/backend
npm install
npm run dev
```
Backend runs on: http://localhost:5000

### Terminal 2 - Frontend
```bash
cd cloudblitz-enquiry-system/frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

---

## Production Mode (Single Server)

### Build & Run
```bash
# Step 1: Build frontend
cd cloudblitz-enquiry-system/frontend
npm install
npm run build

# Step 2: Build backend
cd ../backend
npm install
npm run build

# Step 3: Run production server
npm run start:dev
```

Visit: http://localhost:5000

### Or Use One Command (from backend folder)
```bash
cd cloudblitz-enquiry-system/backend
npm run build:all
npm run start:dev
```

---

## Environment Setup

### Backend (.env file)
Create `backend/.env`:
```env
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Frontend (.env file)
Already configured:
- `.env.development` - Uses http://localhost:5000/api
- `.env.production` - Uses /api (relative path)

---

## First Time Setup

```bash
# 1. Clone/Download the project
cd cloudblitz-enquiry-system

# 2. Install all dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Configure environment variables
# Edit backend/.env with your MongoDB URI

# 4. Start development servers
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev
```

---

## Testing the Application

### 1. Register a User
- Go to http://localhost:5173 (dev) or http://localhost:5000 (prod)
- Click "Register"
- Fill in the form
- Submit

### 2. Login
- Use your registered credentials
- You'll be redirected to dashboard

### 3. Create Enquiry
- Go to "Enquiries" page
- Click "Create New Enquiry"
- Fill in the form
- Submit

### 4. Test Admin Features
- Update user role to "admin" in MongoDB
- Login again
- Access Admin Panel

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server (backend or frontend)

# Building
npm run build            # Build TypeScript/React
npm run build:all        # Build frontend + backend (backend only)

# Production
npm start                # Run production server (backend)
npm run start:dev        # Run with NODE_ENV=production (backend)

# Code Quality
npm run lint             # Run ESLint
npm run format           # Run Prettier
```

---

## Ports

- **Backend API**: 5000
- **Frontend Dev**: 5173
- **Production**: 5000 (serves both)

---

## Default Credentials

No default credentials. You must register a new user.

To make a user admin:
1. Register normally
2. Go to MongoDB Atlas
3. Find your user in the `users` collection
4. Change `role` field to `"admin"`
5. Login again

---

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Check MONGO_URI in .env
- Verify MongoDB Atlas network access (0.0.0.0/0)
- Check database user credentials

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check VITE_API_URL in frontend/.env.development
- Check browser console for CORS errors

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

---

## Project Structure

```
cloudblitz-enquiry-system/
├── backend/              # Node.js + Express + TypeScript
│   ├── src/             # Source code
│   ├── dist/            # Compiled JavaScript
│   └── .env             # Environment variables
├── frontend/            # React + Vite
│   ├── src/             # Source code
│   ├── dist/            # Production build
│   └── .env.*           # Environment configs
└── README.md            # Main documentation
```

---

## Next Steps

1. ✅ Get the app running locally
2. ✅ Test all features
3. ✅ Read [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)
4. ✅ Deploy to Render
5. ✅ Share with users

---

## Need Help?

- Check [README.md](README.md) for detailed documentation
- See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
- Review [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) before deploying

Happy coding! 🚀
