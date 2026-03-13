# 🚀 Setup Instructions - Dushyant Studio

## Prerequisites
- Node.js 18+ installed
- Gmail account (or other SMTP provider)
- Your video files ready

---

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

**Expected output:**
```
added 50 packages in 3s
```

---

## Step 2: Configure Backend Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit with your details
nano .env  # or use any text editor
```

**Required settings in `server/.env`:**
```env
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com        # Your Gmail address
SMTP_PASS=xxxx xxxx xxxx xxxx         # 16-char App Password (spaces OK)
RECIPIENT_EMAIL=dushyantdishugarg@gmail.com
```

### 📧 How to Get Gmail App Password:
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to: https://myaccount.google.com/apppasswords
4. Create new app password for "Mail"
5. Copy the 16-character password
6. Paste in `server/.env` as `SMTP_PASS`

---

## Step 3: Configure Frontend Environment

```bash
# In root directory
cd ..
cp .env.example .env
```

**Content of `.env`:**
```env
VITE_API_URL=http://localhost:3001
```

---

## Step 4: Add Your Videos

1. Place video files in `public/videos/` folder
2. See `public/videos/README.md` for required filenames
3. Or update paths in `src/components/Hero.tsx` and `src/data/projects.ts`

**Quick video compression (optional):**
```bash
# Install ffmpeg if needed: brew install ffmpeg
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
```

---

## Step 5: Start Development Servers

### Terminal 1 - Backend Server:
```bash
cd server
npm run dev
```

**Expected output:**
```
🚀 Server running on http://localhost:3001
✅ Email server is ready to send messages
📧 Contact API available at http://localhost:3001/api/contact
```

### Terminal 2 - Frontend:
```bash
# In root directory
npm run dev
```

---

## Step 6: Test Everything

### Test Backend Health:
```bash
curl http://localhost:3001/api/health
```

**Expected:** `{"status":"ok","message":"Server is running"}`

### Test Contact Form:
1. Open http://localhost:5173 (or your Vite port)
2. Fill out contact form
3. Submit
4. Check your email inbox

---

## 🐛 Troubleshooting

### Backend won't start
- ❌ **Error:** `SMTP_USER is not configured`
  - ✅ Check `server/.env` file exists and has correct values

- ❌ **Error:** `Port 3001 already in use`
  - ✅ Change `PORT=3002` in `server/.env`
  - ✅ Update `.env` in root: `VITE_API_URL=http://localhost:3002`

### Email not sending
- ❌ **Error:** `Invalid login`
  - ✅ Use Gmail App Password, not regular password
  - ✅ Enable 2FA on Google account

- ❌ **Error:** `ECONNREFUSED`
  - ✅ Check firewall settings
  - ✅ Verify SMTP_HOST and SMTP_PORT

### Videos not loading
- ❌ **404 Not Found**
  - ✅ Check files are in `public/videos/` folder
  - ✅ Verify filenames match exactly (case-sensitive)

### CORS errors in browser
- ❌ **CORS policy blocked**
  - ✅ Verify backend server is running on port 3001
  - ✅ Check `VITE_API_URL` in root `.env`

---

## 📦 What's Installed

### Backend Dependencies (`server/package.json`):
- **express** - Web server framework
- **nodemailer** - Email sending
- **cors** - Enable cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Auto-reload in development

### Backend Structure:
```
server/
├── index.js          # Main server file
├── package.json      # Dependencies
├── .env             # Your configuration (not in git)
├── .env.example     # Template
├── .gitignore       # Ignore .env
└── README.md        # Deployment guide
```

---

## 🌐 Next Steps: Azure Deployment

Once everything works locally, see:
- **Full guide:** `MIGRATION_NOTES.md`
- **Server deployment:** `server/README.md`

Key deployment steps:
1. Setup Azure VM with Node.js
2. Install PM2 process manager
3. Configure Nginx reverse proxy
4. Update frontend `.env` with production API URL
5. Build and deploy frontend
6. Install SSL certificate

---

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Express.js Guide](https://expressjs.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

## ✅ Setup Complete!

You should now have:
- ✅ Backend server running on port 3001
- ✅ Frontend running and connected
- ✅ Contact form sending emails
- ✅ Videos loading from local files

**Ready to deploy to Azure VM!**
