# Quick Start Guide - Dushyant Studio

## 🚀 Local Development Setup

### 1. Backend Server Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your Gmail App Password
npm run dev
```

### 2. Frontend Setup
```bash
# In root directory
cp .env.example .env
npm run dev
```

### 3. Add Your Videos
Place your video files in `public/videos/` directory. See `public/videos/README.md` for required filenames.

## 📧 Gmail SMTP Setup

1. Enable 2-Factor Authentication: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in `server/.env`

## 🎥 Video Files

Update video paths in:
- `src/components/Hero.tsx` (12 videos)
- `src/data/projects.ts` (4 videos)

## 🔗 Important Links

- Backend API: http://localhost:3001
- Frontend: http://localhost:5173 (default Vite port)
- Health Check: http://localhost:3001/api/health

## 📖 Full Documentation

See `MIGRATION_NOTES.md` for complete migration details and Azure deployment guide.
