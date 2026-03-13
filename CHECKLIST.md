# ✅ Migration Checklist

## 🎯 Immediate Next Steps

### 1. Backend Setup (5 minutes)
- [ ] Open terminal and run: `cd server && npm install`
- [ ] Copy environment file: `cp .env.example .env`
- [ ] Get Gmail App Password from: https://myaccount.google.com/apppasswords
- [ ] Edit `server/.env` with your Gmail credentials
- [ ] Start server: `npm run dev`
- [ ] Verify you see: "✅ Email server is ready to send messages"

### 2. Frontend Setup (2 minutes)
- [ ] Copy environment file: `cp .env.example .env` (in root directory)
- [ ] Verify `.env` has: `VITE_API_URL=http://localhost:3001`
- [ ] Start frontend: `npm run dev` (in root directory)

### 3. Add Videos (varies)
- [ ] Create folder structure (already created): `public/videos/`
- [ ] Add your 16 video files (see `public/videos/README.md`)
- [ ] OR update video paths in code to match your filenames

### 4. Test Locally (3 minutes)
- [ ] Open browser to your dev URL (usually http://localhost:5173)
- [ ] Navigate to contact section
- [ ] Fill out and submit form
- [ ] Check email inbox for message
- [ ] Verify videos load on hero section

---

## 🚀 Azure Deployment Steps

### Pre-deployment
- [ ] Test everything works locally
- [ ] Compress video files if needed
- [ ] Have Azure VM credentials ready

### Backend Deployment
- [ ] SSH into Azure VM
- [ ] Install Node.js 18+
- [ ] Upload server folder
- [ ] Run `npm install --production`
- [ ] Create production `.env` file
- [ ] Install PM2: `npm install -g pm2`
- [ ] Start with PM2: `pm2 start index.js --name dushyant-studio-api`
- [ ] Configure PM2 startup: `pm2 startup && pm2 save`
- [ ] Setup Nginx reverse proxy
- [ ] Test API endpoint: `curl http://localhost:3001/api/health`

### Frontend Deployment
- [ ] Update `.env` with Azure VM URL: `VITE_API_URL=http://your-vm-ip`
- [ ] Build frontend: `npm run build`
- [ ] Upload `dist` folder to Azure VM
- [ ] Configure Nginx to serve static files
- [ ] Test production site

### Security & SSL (Recommended)
- [ ] Configure firewall rules
- [ ] Install SSL certificate with Certbot
- [ ] Update `.env` to use HTTPS: `VITE_API_URL=https://your-domain.com`
- [ ] Test HTTPS connection

---

## 📁 Files Changed - Review

### ✅ New Files Created
- `server/` - Complete backend with Express + Nodemailer
  - `index.js` - Main server
  - `package.json` - Dependencies
  - `.env.example` - Configuration template
  - `.gitignore` - Git ignore rules
  - `README.md` - Deployment guide

- `.env.example` - Frontend API configuration template
- `public/videos/` - Video storage directory
- `public/videos/README.md` - Video requirements
- `MIGRATION_NOTES.md` - Complete migration documentation
- `QUICKSTART.md` - Quick reference guide
- `SETUP_INSTRUCTIONS.md` - Detailed setup guide
- `CHECKLIST.md` - This file

### ✏️ Modified Files
- `src/components/ContactSection.tsx` ✅
  - Removed: Supabase function call
  - Added: Fetch API to new backend

- `src/components/Hero.tsx` ✅
  - Replaced: 12 Cloudinary URLs → Local video paths
  - Added: TODO comments for video placement

- `src/data/projects.ts` ✅
  - Replaced: 4 Cloudinary URLs → Local video paths
  - Added: TODO comments for video placement

- `supabase/functions/send-contact-email/index.ts` ✅
  - Added: Deprecation notice
  - Status: Can be deleted (kept for reference)

---

## 🎉 Benefits of Migration

### Cost Savings
- ✅ No more Cloudinary subscription fees
- ✅ No more Supabase Edge Function invocation costs
- ✅ All costs covered by $100 Azure credit

### Performance
- ✅ Videos served directly from your VM
- ✅ No external API dependency for emails
- ✅ Full control over delivery and caching

### Control & Flexibility
- ✅ Complete control over email templates
- ✅ Easy to modify and extend
- ✅ Add attachments, CC, BCC as needed
- ✅ Switch SMTP providers anytime

---

## 📞 Need Help?

### Email Issues
1. Check `server/.env` has correct SMTP settings
2. Verify Gmail App Password (not regular password)
3. Check PM2 logs: `pm2 logs dushyant-studio-api`
4. Test SMTP with: `npm run test` (in server folder)

### Video Issues
1. Verify files are in `public/videos/`
2. Check case-sensitive filenames
3. Ensure MP4 format (H.264 codec)
4. Test with smaller file first

### Deployment Issues
1. Check Node.js version: `node --version` (need 18+)
2. Verify firewall allows port 3001
3. Check Nginx configuration: `sudo nginx -t`
4. Review server logs: `pm2 logs`

---

## 📚 Documentation Reference

- **Quick Start**: `QUICKSTART.md`
- **Detailed Setup**: `SETUP_INSTRUCTIONS.md`
- **Full Migration Guide**: `MIGRATION_NOTES.md`
- **Server Deployment**: `server/README.md`
- **Video Requirements**: `public/videos/README.md`

---

**Last Updated**: March 11, 2026  
**Status**: Ready for local testing → Azure deployment

**🎯 Start with Step 1 above!**
