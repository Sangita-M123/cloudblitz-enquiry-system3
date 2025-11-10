# 🚀 Quick Start Guide

Get CloudBlitz up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v16+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ Internet connection (for MongoDB Atlas)

## Step 1: Install Dependencies (2 minutes)

Open your terminal in the project root directory:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Start the Servers (1 minute)

Open **TWO terminal windows**:

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ You should see: `🚀 Server running on port 5000`

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
✅ You should see: `Local: http://localhost:5173/`

## Step 3: Open the Application

Open your browser and go to:
```
http://localhost:5173
```

## Step 4: Create Your First Account

1. You'll see the **Register** page
2. Fill in:
   - Name: Your name
   - Email: your@email.com
   - Password: minimum 6 characters
3. Click **Register**
4. You'll be automatically logged in and redirected to the Dashboard

## Step 5: Test the Features

### As a Normal User:
1. Click **Enquiries** in the navigation
2. Create a new enquiry:
   - Customer Name: Test Customer
   - Email: test@example.com (optional)
   - Phone: +1234567890 (optional)
   - Message: This is a test enquiry (min 10 characters)
3. Click **Add Enquiry**
4. You'll see your enquiry in the table
5. Click **Edit** to modify the name or message
6. Notice: Status is read-only (you can't change it)

### Upgrade to Admin (for testing):
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Login with your credentials
3. Navigate to: Cluster0 → Browse Collections → cloudblitz → users
4. Find your user and click Edit
5. Change `"role": "user"` to `"role": "admin"`
6. Save
7. Logout and login again

### As an Admin:
1. Click **Admin Panel** in navigation
2. You'll see all users
3. You can change user roles
4. You can delete users
5. Go to **Enquiries**
6. You can now change status using the dropdown
7. You can delete enquiries

## 🎯 Quick Feature Test Checklist

- [ ] Register a new account
- [ ] Login successfully
- [ ] Create an enquiry
- [ ] Edit your enquiry (name and message)
- [ ] Verify status is read-only for normal users
- [ ] Upgrade to admin role in MongoDB
- [ ] Access admin panel
- [ ] Change user roles
- [ ] Update enquiry status
- [ ] Delete an enquiry

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If in use, kill the process or change port in backend/.env
```

### Frontend won't start
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Can't login
- Check backend terminal for errors
- Verify MongoDB connection is successful
- Clear browser localStorage and try again

### Enquiries not showing
- Open browser DevTools (F12)
- Check Console for errors
- Check Network tab for failed API calls
- Verify backend is running on port 5000

## 📚 Next Steps

1. Read the full [README.md](README.md) for detailed features
2. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
3. Review [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for technical details
4. See [CHANGELOG.md](CHANGELOG.md) for version history

## 🎉 You're All Set!

Your CloudBlitz Enquiry Management System is now running. Explore the features and test different user roles!

### Default Credentials
There are no default credentials. You need to:
1. Register a new account
2. Update the role in MongoDB to test admin/staff features

### API Base URL
- Backend: `http://localhost:5000/api`
- Frontend: `http://localhost:5173`

### Database
- MongoDB Atlas (already configured)
- Database: cloudblitz
- Collections: users, enquiries

---

**Need Help?** Check the [RUN_GUIDE.md](RUN_GUIDE.md) for detailed instructions.
