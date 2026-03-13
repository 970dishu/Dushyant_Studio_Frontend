# 🚀 Quick Azure Deployment Commands

## Before You Start
1. ✅ Make sure local backend/frontend work
2. ✅ Have your $100 Azure credit ready
3. ✅ Have videos ready to upload

---

## Step-by-Step Quick Commands

### 1. CREATE VM IN AZURE PORTAL
- Go to: https://portal.azure.com
- Create VM → Ubuntu 22.04 LTS
- Size: Standard B2s (2 vCPU, 4 GB)
- Download SSH key: `dushyant-studio-key.pem`
- **Copy your Public IP address!**

---

### 2. CONNECT TO VM (On Your Mac)

```bash
# Set key permissions
cd ~/Downloads
chmod 400 dushyant-studio-key.pem

# Connect (replace YOUR_PUBLIC_IP)
ssh -i ~/Downloads/dushyant-studio-key.pem azureuser@YOUR_PUBLIC_IP
```

---

### 3. INSTALL SOFTWARE (On Azure VM)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2
sudo npm install -g pm2

# Setup firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3001/tcp
sudo ufw enable
```

---

### 4. DEPLOY BACKEND (Split between Mac & Azure VM)

**On Your Mac (new terminal):**
```bash
cd /Users/970dishu/Developer/Dushyant.studio

# Upload backend
scp -i ~/Downloads/dushyant-studio-key.pem -r server azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/
```

**On Azure VM:**
```bash
# Install dependencies
cd ~/dushyant-studio/server
npm install --production

# Create .env file
nano .env
```

**Paste in .env:**
```
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dushyantdishugarg@gmail.com
SMTP_PASS=mlvm clkd ooxo bxov
RECIPIENT_EMAIL=dushyantdishugarg@gmail.com
```

**Save:** `Ctrl+X`, `Y`, `Enter`

**Start with PM2:**
```bash
pm2 start index.js --name dushyant-studio-api
pm2 save
pm2 startup
# Copy & run the sudo command it shows
```

---

### 5. BUILD & DEPLOY FRONTEND

**On Your Mac:**
```bash
cd /Users/970dishu/Developer/Dushyant.studio

# Update .env for production
nano .env
```

**Change to:**
```
VITE_API_URL=http://YOUR_PUBLIC_IP
```

**Build & Upload:**
```bash
# Build
npm run build

# Upload frontend
scp -i ~/Downloads/dushyant-studio-key.pem -r dist azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/

# Upload videos (if you have them)
scp -i ~/Downloads/dushyant-studio-key.pem -r public/videos azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/public/
```

---

### 6. CONFIGURE NGINX (On Azure VM)

```bash
sudo nano /etc/nginx/sites-available/dushyant-studio
```

**Paste this (replace YOUR_PUBLIC_IP):**
```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP;
    
    root /home/azureuser/dushyant-studio/dist;
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
    
    location /videos {
        alias /home/azureuser/dushyant-studio/public/videos;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Save:** `Ctrl+X`, `Y`, `Enter`

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/dushyant-studio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

### 7. TEST IT! 🎉

Open browser: **http://YOUR_PUBLIC_IP**

Test contact form → Check email!

---

## USEFUL COMMANDS

### Check if everything is running:
```bash
# Backend status
pm2 status

# Backend logs
pm2 logs dushyant-studio-api

# Nginx status
sudo systemctl status nginx
```

### Restart services:
```bash
# Restart backend
pm2 restart dushyant-studio-api

# Restart Nginx
sudo systemctl restart nginx
```

### View logs:
```bash
# Backend logs
pm2 logs dushyant-studio-api --lines 100

# Nginx error log
sudo tail -f /var/log/nginx/error.log
```

### Update code:
```bash
# On Mac - upload new files
scp -i ~/Downloads/dushyant-studio-key.pem -r dist azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/

# On VM - restart backend (if backend changed)
pm2 restart dushyant-studio-api
```

---

## TROUBLESHOOTING

**Can't connect via SSH:**
```bash
chmod 400 ~/Downloads/dushyant-studio-key.pem
```

**Website not loading:**
```bash
sudo systemctl status nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

**Contact form not working:**
```bash
pm2 logs dushyant-studio-api
curl http://localhost:3001/api/health
```

**Check disk space:**
```bash
df -h
```

---

## CONNECT TO VM ANYTIME

```bash
ssh -i ~/Downloads/dushyant-studio-key.pem azureuser@YOUR_PUBLIC_IP
```

---

## 📚 Full Guide

See: `AZURE_DEPLOYMENT_GUIDE.md` for detailed explanations.

---

**Replace `YOUR_PUBLIC_IP` with your actual Azure VM IP address everywhere!**
