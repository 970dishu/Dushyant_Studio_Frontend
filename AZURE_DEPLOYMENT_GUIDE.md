# 🚀 Azure VM Deployment Guide - Complete Setup

## Prerequisites
- ✅ Azure account with $100 credit
- ✅ Local backend and frontend tested successfully
- ✅ Video files ready to upload
- ✅ Domain name (optional, but recommended)

---

## Part 1: Create Azure Virtual Machine

### Step 1: Create VM in Azure Portal

1. **Login to Azure Portal**
   - Go to: https://portal.azure.com
   - Sign in with your account

2. **Create Virtual Machine**
   - Click "Create a resource"
   - Search for "Virtual Machine"
   - Click "Create"

3. **Basic Configuration**
   ```
   Subscription: Your subscription
   Resource Group: Create new → "dushyant-studio-rg"
   VM Name: dushyant-studio-vm
   Region: Choose closest to you (e.g., East US, West Europe)
   Image: Ubuntu Server 22.04 LTS - Gen2
   Size: Standard B2s (2 vCPU, 4 GB RAM) - Good for portfolio
         OR Standard B1ms (1 vCPU, 2 GB RAM) - Budget option
   ```

4. **Administrator Account**
   ```
   Authentication type: SSH public key (recommended)
   Username: azureuser
   SSH public key source: Generate new key pair
   Key pair name: dushyant-studio-key
   ```
   
   **Important:** Download the .pem key file when prompted! You need this to connect.

5. **Inbound Port Rules**
   - Select: SSH (22), HTTP (80), HTTPS (443)

6. **Disks**
   - OS disk type: Standard SSD (good balance of cost/performance)
   - Size: 30 GB (default is fine)

7. **Networking**
   - Keep defaults
   - Note: A public IP will be created automatically

8. **Review + Create**
   - Click "Review + create"
   - Click "Create"
   - **SAVE THE PRIVATE KEY (.pem file)** when download popup appears!

9. **Wait for Deployment** (2-5 minutes)
   - Click "Go to resource" when done
   - **Note down your Public IP address** (you'll need this!)

---

## Part 2: Connect to Your VM

### Step 1: Set Correct Permissions for SSH Key

```bash
# On your Mac
cd ~/Downloads
chmod 400 dushyant-studio-key.pem
```

### Step 2: Connect via SSH

```bash
# Replace YOUR_PUBLIC_IP with actual IP from Azure portal
ssh -i ~/Downloads/dushyant-studio-key.pem azureuser@YOUR_PUBLIC_IP
```

**First time connection:**
- Type `yes` when asked about fingerprint
- You should see: `azureuser@dushyant-studio-vm:~$`

✅ **You're now inside your Azure VM!**

---

## Part 3: Install Required Software

### Step 1: Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Node.js 20.x

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version    # Should show v20.x.x
npm --version     # Should show 10.x.x
```

### Step 3: Install Nginx

```bash
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

**Test:** Open browser → http://YOUR_PUBLIC_IP → Should see "Welcome to nginx!"

### Step 4: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Verify
pm2 --version
```

### Step 5: Configure Firewall

```bash
# Allow necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3001/tcp  # Backend API (internal)

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Part 4: Deploy Backend Server

### Step 1: Create Project Directory

```bash
# Create directory
mkdir -p ~/dushyant-studio
cd ~/dushyant-studio
```

### Step 2: Upload Backend Files from Your Mac

**Option A: Using SCP (Recommended)**

Open a **new terminal on your Mac** (not SSH session):

```bash
# Navigate to your project
cd /Users/970dishu/Developer/Dushyant.studio

# Upload server folder
scp -i ~/Downloads/dushyant-studio-key.pem -r server azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/

# This will upload your entire server folder
```

**Option B: Using Git (Alternative)**

```bash
# On Azure VM
cd ~/dushyant-studio
git clone https://github.com/970dishu/Dushyant.studio.git .
```

### Step 3: Install Backend Dependencies

```bash
# On Azure VM
cd ~/dushyant-studio/server
npm install --production
```

### Step 4: Create Production .env File

```bash
cd ~/dushyant-studio/server
nano .env
```

**Add your production configuration:**
```env
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dushyantdishugarg@gmail.com
SMTP_PASS=mlvm clkd ooxo bxov
RECIPIENT_EMAIL=dushyantdishugarg@gmail.com
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### Step 5: Test Backend

```bash
cd ~/dushyant-studio/server
node index.js
```

Should see:
```
🚀 Server running on http://localhost:3001
✅ Email server is ready to send messages
```

Press `Ctrl+C` to stop.

### Step 6: Start Backend with PM2

```bash
cd ~/dushyant-studio/server
pm2 start index.js --name dushyant-studio-api

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
# Copy and run the command it shows you (starts with sudo)

# Check status
pm2 status
pm2 logs dushyant-studio-api
```

✅ **Backend is now running permanently!**

---

## Part 5: Deploy Frontend

### Step 1: Build Frontend on Your Mac

**In new terminal on your Mac:**

```bash
cd /Users/970dishu/Developer/Dushyant.studio

# Create production .env
nano .env
```

**Update with your Azure VM IP:**
```env
VITE_API_URL=http://YOUR_PUBLIC_IP
```

**Save and build:**
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Step 2: Upload Frontend to Azure VM

**From your Mac terminal:**

```bash
# Upload dist folder
scp -i ~/Downloads/dushyant-studio-key.pem -r dist azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/

# Upload videos folder
scp -i ~/Downloads/dushyant-studio-key.pem -r public/videos azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/public/
```

### Step 3: Configure Nginx

**On Azure VM:**

```bash
sudo nano /etc/nginx/sites-available/dushyant-studio
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name YOUR_PUBLIC_IP;  # Or your-domain.com if you have one
    
    # Frontend - Serve static files
    root /home/azureuser/dushyant-studio/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API - Reverse proxy
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Serve videos
    location /videos {
        alias /home/azureuser/dushyant-studio/public/videos;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

**Save:** `Ctrl+X`, `Y`, `Enter`

### Step 4: Enable Site and Restart Nginx

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/dushyant-studio /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Part 6: Test Your Deployment

### 1. Test Backend API

```bash
# On Azure VM
curl http://localhost:3001/api/health
```

Should return: `{"status":"ok","message":"Server is running"}`

### 2. Test from Browser

Open: **http://YOUR_PUBLIC_IP**

You should see your portfolio website! 🎉

### 3. Test Contact Form

1. Fill out contact form
2. Submit
3. Check your email inbox
4. Should receive the email!

---

## Part 7: Add Custom Domain (Optional)

### Step 1: Point Domain to Azure VM

In your domain registrar (GoDaddy, Namecheap, etc.):

**Add A Record:**
```
Type: A
Name: @ (or www)
Value: YOUR_PUBLIC_IP
TTL: 3600
```

### Step 2: Update Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/dushyant-studio
```

Change `server_name YOUR_PUBLIC_IP;` to:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

Restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Step 3: Install SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter your email
# - Agree to terms
# - Choose: Redirect HTTP to HTTPS (option 2)
```

**Update frontend .env on your Mac:**
```env
VITE_API_URL=https://yourdomain.com
```

**Rebuild and upload:**
```bash
npm run build
scp -i ~/Downloads/dushyant-studio-key.pem -r dist azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/
```

✅ **Your site is now HTTPS!**

---

## Part 8: Maintenance Commands

### On Azure VM:

```bash
# Check backend status
pm2 status
pm2 logs dushyant-studio-api

# Restart backend
pm2 restart dushyant-studio-api

# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# View backend logs
pm2 logs dushyant-studio-api --lines 50
```

### Update Backend Code:

```bash
# On Mac - upload new files
scp -i ~/Downloads/dushyant-studio-key.pem server/index.js azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/server/

# On Azure VM - restart
pm2 restart dushyant-studio-api
```

### Update Frontend:

```bash
# On Mac
npm run build
scp -i ~/Downloads/dushyant-studio-key.pem -r dist azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/

# No restart needed - Nginx serves static files
```

---

## Troubleshooting

### Website not loading
```bash
# Check Nginx status
sudo systemctl status nginx

# Check configuration
sudo nginx -t

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### Contact form not working
```bash
# Check backend is running
pm2 status

# Check backend logs
pm2 logs dushyant-studio-api

# Test API directly
curl http://localhost:3001/api/health
```

### Out of disk space
```bash
# Check disk usage
df -h

# Clean up
sudo apt autoremove
sudo apt clean
pm2 flush  # Clear logs
```

### Can't SSH connect
```bash
# Check key permissions
chmod 400 ~/Downloads/dushyant-studio-key.pem

# Verify IP address in Azure portal
# Check firewall allows port 22
```

---

## Cost Optimization Tips

1. **Use B-series VMs** - Burstable, cost-effective
2. **Stop VM when not needed** - In Azure portal, you can stop/start VM
3. **Monitor bandwidth** - Compress videos
4. **Set up alerts** - Get notified before credit runs out

---

## Summary Checklist

- [ ] Azure VM created and running
- [ ] SSH connection working
- [ ] Node.js, Nginx, PM2 installed
- [ ] Backend deployed and running with PM2
- [ ] Frontend built and uploaded
- [ ] Nginx configured as reverse proxy
- [ ] Website accessible via IP
- [ ] Contact form sending emails
- [ ] (Optional) Domain configured
- [ ] (Optional) SSL certificate installed

---

## Quick Reference

**Your VM Details:**
- IP: `YOUR_PUBLIC_IP`
- Username: `azureuser`
- SSH Key: `~/Downloads/dushyant-studio-key.pem`

**Connect to VM:**
```bash
ssh -i ~/Downloads/dushyant-studio-key.pem azureuser@YOUR_PUBLIC_IP
```

**Upload files from Mac:**
```bash
scp -i ~/Downloads/dushyant-studio-key.pem -r [local-folder] azureuser@YOUR_PUBLIC_IP:~/dushyant-studio/
```

**Important Directories on VM:**
- Backend: `~/dushyant-studio/server`
- Frontend: `~/dushyant-studio/dist`
- Videos: `~/dushyant-studio/public/videos`
- Nginx config: `/etc/nginx/sites-available/dushyant-studio`

---

**Need help? Check error logs:**
- Backend: `pm2 logs dushyant-studio-api`
- Nginx: `sudo tail -f /var/log/nginx/error.log`

🎉 **Your portfolio is now live on Azure!**
