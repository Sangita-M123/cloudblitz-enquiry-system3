# ✅ Deployment Checklist

Use this checklist before deploying to Render.

## Pre-Deployment

### Code Preparation
- [ ] All code changes committed
- [ ] No console.log statements in production code (or minimal)
- [ ] Environment variables documented
- [ ] .env files NOT committed to Git
- [ ] .gitignore includes .env files

### Local Testing
- [ ] Frontend builds successfully (`npm run build` in frontend/)
- [ ] Backend builds successfully (`npm run build` in backend/)
- [ ] Production mode tested locally (`npm run start:dev` in backend/)
- [ ] All features work in production mode
- [ ] No console errors in browser
- [ ] API endpoints respond correctly

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 for Render)
- [ ] Connection string tested and working
- [ ] Collections created (or will be auto-created)

### Environment Variables Ready
- [ ] `NODE_ENV` = production
- [ ] `MONGO_URI` = Your MongoDB connection string
- [ ] `JWT_SECRET` = Strong secret key (32+ characters)
- [ ] `PORT` = 5000 (optional, Render sets automatically)

## GitHub Setup

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] Repository is public or Render has access
- [ ] Latest changes pushed

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## Render Configuration

### Web Service Settings
- [ ] Service name chosen
- [ ] Region selected
- [ ] Branch: `main`
- [ ] Root Directory: `backend`
- [ ] Runtime: Node
- [ ] Build Command: `npm install && npm run build:all`
- [ ] Start Command: `npm start`
- [ ] Instance Type: Free (or paid)

### Environment Variables Added
- [ ] NODE_ENV added
- [ ] MONGO_URI added
- [ ] JWT_SECRET added

## Post-Deployment

### Initial Verification
- [ ] Build completed successfully (check Render logs)
- [ ] Service is running (green status in Render)
- [ ] App URL accessible
- [ ] Frontend loads correctly
- [ ] No 404 errors on routes

### Feature Testing
- [ ] Health check works: `/api/health`
- [ ] Registration works
- [ ] Login works
- [ ] JWT token stored in localStorage
- [ ] Dashboard accessible after login
- [ ] Enquiries page loads
- [ ] Can create new enquiry
- [ ] Can view enquiries
- [ ] Can edit enquiries
- [ ] Can delete enquiries (admin)
- [ ] Admin panel accessible (admin users)
- [ ] User management works (admin)
- [ ] Logout works

### Performance & Security
- [ ] Page load time acceptable
- [ ] API response time acceptable
- [ ] HTTPS enabled (automatic on Render)
- [ ] CORS configured correctly
- [ ] No sensitive data in console logs
- [ ] No exposed API keys or secrets

### Mobile Testing
- [ ] Responsive design works on mobile
- [ ] All features accessible on mobile
- [ ] Forms work on mobile devices

## Monitoring Setup (Optional)

- [ ] Uptime monitoring configured (UptimeRobot, etc.)
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Log monitoring configured

## Documentation

- [ ] README.md updated with live URL
- [ ] API documentation accessible
- [ ] User guide created (if needed)
- [ ] Admin guide created (if needed)

## Troubleshooting Checklist

If something doesn't work:

### Build Fails
- [ ] Check Render build logs
- [ ] Verify package.json scripts
- [ ] Test build locally
- [ ] Check for missing dependencies

### App Doesn't Load
- [ ] Verify NODE_ENV=production
- [ ] Check if frontend/dist exists
- [ ] Review server.ts static file serving
- [ ] Check Render logs for errors

### API Errors
- [ ] Verify MONGO_URI is correct
- [ ] Check MongoDB Atlas network access
- [ ] Verify JWT_SECRET is set
- [ ] Check API endpoint paths

### Database Connection Issues
- [ ] MongoDB Atlas IP whitelist includes 0.0.0.0/0
- [ ] Connection string format correct
- [ ] Database user has correct permissions
- [ ] Network access changes propagated (wait 2-3 min)

## Success Criteria

Your deployment is successful when:

✅ App loads at your Render URL
✅ All pages accessible
✅ Users can register and login
✅ Enquiries can be created and managed
✅ Admin features work
✅ No console errors
✅ Mobile responsive
✅ HTTPS working

## Next Steps After Deployment

1. **Share the URL** with your team/users
2. **Create admin account** and test admin features
3. **Monitor logs** for the first few hours
4. **Set up uptime monitoring** to keep app awake
5. **Document any issues** and fixes
6. **Plan for updates** and maintenance

## Support Resources

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Project Docs**: See RENDER_DEPLOYMENT_GUIDE.md

---

## Quick Commands Reference

```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build

# Build both
cd backend && npm run build:all

# Test production locally
cd backend && npm run start:dev

# Push to GitHub
git add . && git commit -m "Deploy" && git push

# View Render logs
# Go to Render Dashboard → Your Service → Logs
```

---

**Ready to deploy?** Follow the [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)! 🚀
