# Migration from Cloudinary + Supabase to Local Videos + Nodemailer

This document outlines the changes made to migrate the project from Cloudinary (for videos) and Supabase Edge Functions (for email) to a local video hosting solution and Nodemailer backend.

## Changes Made

### 1. Backend API with Nodemailer
✅ Created new Node.js/Express server in `/server` directory
- Professional email templates with HTML styling
- SMTP configuration for Gmail/other providers
- Complete error handling and validation
- CORS enabled for frontend communication
- Health check endpoint for monitoring

### 2. Contact Form Update
✅ Updated `src/components/ContactSection.tsx`
- Removed Supabase function call
- Replaced with fetch API to new backend endpoint
- Added environment variable support for API URL
- Maintains all existing UI/UX and animations

### 3. Video URL Migration
✅ Updated `src/components/Hero.tsx`
- Replaced all 12 Cloudinary video URLs
- Updated to use local paths: `/videos/{filename}.mp4`
- Added TODO comments for video placement

✅ Updated `src/data/projects.ts`
- Replaced 4 Cloudinary project video URLs
- Updated to use local paths: `/videos/{filename}.mp4`
- Added TODO comments for video placement

### 4. Documentation & Configuration
✅ Created comprehensive documentation
- Server README with Azure deployment guide
- Environment configuration examples
- Video folder README with file requirements
- This migration notes document

## Files Modified

### New Files Created
- `/server/index.js` - Express server with Nodemailer
- `/server/package.json` - Backend dependencies
- `/server/.env.example` - SMTP configuration template
- `/server/.gitignore` - Backend gitignore
- `/server/README.md` - Deployment and setup guide
- `/.env.example` - Frontend API URL configuration
- `/public/videos/README.md` - Video requirements guide
- `/MIGRATION_NOTES.md` - This file

### Modified Files
- `/src/components/ContactSection.tsx` - Updated to use fetch API
- `/src/components/Hero.tsx` - Replaced video URLs
- `/src/data/projects.ts` - Replaced video URLs

## Next Steps - Required Actions

### 1. Setup Backend Server Locally

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your SMTP credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=dushyantdishugarg@gmail.com
```

Start the server:
```bash
npm run dev
```

### 2. Setup Frontend Environment

```bash
# In root directory
cp .env.example .env
```

For local development, `.env` should have:
```env
VITE_API_URL=http://localhost:3001
```

### 3. Add Your Videos

Create the videos folder and add your video files:
```bash
mkdir -p public/videos
```

Copy your videos to `public/videos/` with the names specified in:
- `public/videos/README.md`

Or update the video paths in:
- `src/components/Hero.tsx`
- `src/data/projects.ts`

### 4. Test Locally

1. Start backend server: `cd server && npm run dev`
2. Start frontend: `npm run dev` (in root)
3. Test contact form submission
4. Verify videos load correctly

### 5. Deploy to Azure VM

#### Backend Deployment

1. **Setup Azure VM**
   ```bash
   # SSH into your Azure VM
   ssh user@your-azure-vm-ip
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Upload Backend Code**
   ```bash
   # From your local machine
   scp -r server user@your-azure-vm-ip:/home/user/
   ```

3. **Install Dependencies & Configure**
   ```bash
   # On Azure VM
   cd server
   npm install --production
   
   # Create .env file with production SMTP settings
   nano .env
   ```

4. **Setup PM2 Process Manager**
   ```bash
   sudo npm install -g pm2
   pm2 start index.js --name dushyant-studio-api
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx Reverse Proxy**
   ```bash
   sudo nano /etc/nginx/sites-available/dushyant-studio
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/dushyant-studio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

#### Frontend Deployment

1. **Update Environment Variables**
   
   Update `.env` or `.env.production`:
   ```env
   VITE_API_URL=https://your-azure-domain.com
   # or
   VITE_API_URL=http://your-azure-ip
   ```

2. **Build Frontend**
   ```bash
   npm run build
   ```

3. **Upload to Azure VM**
   ```bash
   scp -r dist user@your-azure-vm-ip:/var/www/dushyant-studio/
   ```

4. **Configure Nginx for Frontend**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       root /var/www/dushyant-studio/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### 6. SSL Certificate (Recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Testing Checklist

- [ ] Backend server starts without errors locally
- [ ] Contact form sends emails successfully locally
- [ ] All videos load correctly in Hero section
- [ ] Project detail videos load correctly
- [ ] Backend deploys successfully to Azure VM
- [ ] Frontend deploys successfully to Azure VM
- [ ] Contact form works on production
- [ ] Videos load on production (check bandwidth)
- [ ] SSL certificate installed (if using domain)
- [ ] PM2 keeps backend running after VM restart

## Removed Dependencies

You can now remove these if not used elsewhere:
- Supabase Edge Functions (keep client if using for other features)
- Cloudinary SDK (if installed)
- Resend package in edge functions

## Cost Savings

✅ **Before:**
- Cloudinary: Paid tier for video hosting
- Supabase: Edge function invocations

✅ **After:**
- Azure VM: $100 credit covers hosting + bandwidth
- Self-hosted videos in public folder
- Nodemailer: Free (uses your SMTP provider)

## Support & Troubleshooting

### Email Not Sending
1. Verify SMTP credentials in `.env`
2. For Gmail: Enable 2FA and use App Password
3. Check PM2 logs: `pm2 logs dushyant-studio-api`
4. Test SMTP connection manually

### Videos Not Loading
1. Verify video files are in `public/videos/`
2. Check file names match exactly
3. Ensure videos are MP4 format
4. Check Azure VM bandwidth limits

### CORS Errors
1. Update CORS origin in `server/index.js`
2. Add your production domain to allowed origins

### Server Not Starting
1. Check port 3001 is not in use
2. Verify all environment variables are set
3. Check Node.js version compatibility
4. Review error logs

## Rollback Plan

If you need to rollback to Cloudinary + Supabase:

1. Restore original imports in `ContactSection.tsx`
2. Revert video URLs in `Hero.tsx` and `projects.ts`
3. Keep the server folder for future use

---

**Migration completed on:** March 11, 2026  
**Migrated by:** GitHub Copilot  
**Status:** ✅ Ready for testing and deployment
