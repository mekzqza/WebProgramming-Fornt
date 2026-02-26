# 🐳 Docker Deployment Guide

Complete guide for deploying the AI Chat application to VPS using Docker, Nginx, and PocketBase.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Configuration](#configuration)
5. [Deployment to VPS](#deployment-to-vps)
6. [SSL/HTTPS Setup](#sslhttps-setup)
7. [Maintenance](#maintenance)
8. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────┐
│         VPS Server (Port 80/443)    │
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐   │
│  │  Nginx Reverse Proxy         │   │
│  │  - Port 80/443               │   │
│  │  - SSL Termination           │   │
│  │  - Load Balancing            │   │
│  └──────────────────────────────┘   │
│           │         │         │      │
│    ┌──────┘         │         └───┐  │
│    ▼                ▼             ▼  │
│  ┌────────┐  ┌───────────┐  ┌─────┐ │
│  │Next.js │  │PocketBase │  │Static│ │
│  │:3000   │  │:8090      │  │Assets│ │
│  └────────┘  └───────────┘  └─────┘ │
│               (Database)             │
└─────────────────────────────────────┘
```

**Services:**
- **Nginx**: Reverse proxy, SSL, static file serving
- **Next.js**: Frontend + API routes (port 3000)
- **PocketBase**: Database + Backend API (port 8090)

**URL Routes:**
- `/` → Next.js application
- `/api/` → Next.js API routes
- `/pb/` → PocketBase REST API
- `/_/` → PocketBase Admin UI

---

## ✅ Prerequisites

**On VPS:**
- Ubuntu 20.04+ or Debian 11+
- Docker 20.10+
- Docker Compose 2.0+
- 1GB+ RAM
- 10GB+ disk space

**On Local Machine:**
- Git
- SSH access to VPS
- Domain name (optional, for SSL)

---

## 🚀 Quick Start

### 1. Local Testing

```bash
# Clone repository (or upload files to VPS)
cd webprogramming-back

# Copy environment file
cp .env.docker.example .env.local

# Edit .env.local with your credentials
nano .env.local

# Build and start Docker containers
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**Access the application:**
- Frontend: http://localhost
- PocketBase Admin: http://localhost/_/
- PocketBase API: http://localhost/pb/

### 2. Stop Services

```bash
docker-compose down

# Remove all data (careful!)
docker-compose down -v
```

---

## ⚙️ Configuration

### Environment Variables (.env.local)

```bash
# GenAI API
AGENT_SHORT_ID=your_agent_id
ACCESS_TOKEN=your_token

# PocketBase Admin
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=secure_password_123

# Production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Nginx Configuration

Edit `nginx/nginx.conf` for:
- Rate limiting
- Client max body size
- Timeout values
- Caching rules

### Docker Compose Customization

Edit `docker-compose.yml` for:
- Port mappings
- Volume locations
- Resource limits
- Health check intervals

---

## 🌐 Deployment to VPS

### Step 1: Prepare VPS

```bash
# SSH to your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Step 2: Upload Project

**Option A: Using Git**
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

**Option B: Using SCP**
```bash
# On local machine
scp -r ./webprogramming-back root@your-vps-ip:/root/
```

**Option C: Using rsync**
```bash
rsync -avz --exclude 'node_modules' --exclude '.next' \
  ./webprogramming-back root@your-vps-ip:/root/
```

### Step 3: Configure Environment

```bash
cd /root/webprogramming-back

# Copy environment file
cp .env.docker.example .env.local

# Edit with nano or vi
nano .env.local

# Set production values
# - AGENT_SHORT_ID
# - ACCESS_TOKEN
# - POCKETBASE_ADMIN_EMAIL
# - POCKETBASE_ADMIN_PASSWORD
# - NEXT_PUBLIC_APP_URL (your domain)
```

### Step 4: Deploy

**Option A: Using deploy script**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Option B: Manual deployment**
```bash
# Build and start services
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f nextjs
docker-compose logs -f pocketbase
docker-compose logs -f nginx
```

### Step 5: Configure Firewall

```bash
# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH
ufw enable
```

### Step 6: Point Domain to VPS

In your domain registrar:
```
A Record:  @  →  your-vps-ip
A Record:  www  →  your-vps-ip
```

Wait for DNS propagation (5-60 minutes).

---

## 🔒 SSL/HTTPS Setup

### Using Certbot (Let's Encrypt - FREE)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Stop nginx container temporarily
docker-compose stop nginx

# Get SSL certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificates will be saved to:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

### Update docker-compose.yml

```yaml
nginx:
  volumes:
    - /etc/letsencrypt:/etc/letsencrypt:ro
    # ... rest of volumes
```

### Enable SSL in Nginx

Edit `nginx/conf.d/ssl.conf` and uncomment SSL configuration:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # ... rest of config
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### Restart services

```bash
docker-compose restart nginx
```

### Auto-renewal

```bash
# Test renewal
certbot renew --dry-run

# Setup cron job for auto-renewal
crontab -e

# Add this line (runs twice daily)
0 0,12 * * * certbot renew --quiet && docker-compose restart nginx
```

---

## 🔧 Maintenance

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nextjs
docker-compose logs -f pocketbase
docker-compose logs -f nginx

# Last 100 lines
docker-compose logs --tail=100
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart nextjs
```

### Update Application

```bash
# Pull latest code (if using git)
git pull

# Rebuild and restart
docker-compose up -d --build

# Or use deploy script
./deploy.sh
```

### Backup PocketBase Data

```bash
# Backup database
docker exec pocketbase tar czf /tmp/pb_backup.tar.gz /pb_data
docker cp pocketbase:/tmp/pb_backup.tar.gz ./backups/pb_backup_$(date +%Y%m%d).tar.gz

# Or backup volume directly
docker run --rm -v webprogramming-back_pocketbase_data:/data -v $(pwd)/backups:/backup \
  alpine tar czf /backup/pb_data_$(date +%Y%m%d).tar.gz -C /data .
```

### Restore Backup

```bash
# Stop services
docker-compose down

# Restore data
docker run --rm -v webprogramming-back_pocketbase_data:/data -v $(pwd)/backups:/backup \
  alpine tar xzf /backup/pb_data_20260226.tar.gz -C /data

# Start services
docker-compose up -d
```

### Monitor Resources

```bash
# Container stats
docker stats

# Disk usage
docker system df

# Clean up unused resources
docker system prune -a
```

---

## 🐛 Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs

# Check if ports are in use
netstat -tulpn | grep -E '80|443|3000|8090'

# Check container status
docker ps -a
```

### Cannot connect to PocketBase

```bash
# Check if PocketBase is running
docker-compose ps pocketbase

# Check logs
docker-compose logs pocketbase

# Verify network connectivity
docker-compose exec nextjs ping pocketbase
```

### Nginx 502 Bad Gateway

```bash
# Check if Next.js is running
docker-compose ps nextjs

# Check Next.js logs
docker-compose logs nextjs

# Test Next.js from inside nginx container
docker-compose exec nginx wget --spider http://nextjs:3000
```

### SSL Certificate Issues

```bash
# Renew certificates manually
certbot renew

# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/yourdomain.com/fullchain.pem -noout -dates

# Restart nginx
docker-compose restart nginx
```

### Out of disk space

```bash
# Check disk usage
df -h

# Clean up Docker resources
docker system prune -a
docker volume prune

# Remove old logs
truncate -s 0 /var/lib/docker/containers/*/*-json.log
```

### Performance issues

```bash
# Monitor resources
docker stats

# Limit container resources in docker-compose.yml:
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 1G
    reservations:
      memory: 512M
```

---

## 📊 Monitoring

### Health Checks

```bash
# Check application health
curl http://localhost/health

# Check all services
docker-compose ps
```

### Automated Monitoring (Optional)

Consider installing:
- **Portainer**: Docker management UI
- **Grafana + Prometheus**: Metrics visualization
- **Uptime Kuma**: Uptime monitoring

---

## 🎯 Production Checklist

- [ ] Environment variables configured in `.env.local`
- [ ] Strong PocketBase admin password
- [ ] Firewall configured (UFW)
- [ ] SSL certificate installed
- [ ] HTTP to HTTPS redirect enabled
- [ ] Backup script configured
- [ ] Auto-renewal for SSL certificates
- [ ] Monitoring setup
- [ ] Domain pointing to VPS
- [ ] All services running and healthy
- [ ] Logs being collected

---

## 📞 Support

If you encounter issues:

1. Check logs: `docker-compose logs -f`
2. Review this guide's troubleshooting section
3. Check Docker documentation
4. Verify all environment variables

---

## 🔗 Useful Commands Cheat Sheet

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Execute command in container
docker-compose exec nextjs sh

# View resource usage
docker stats

# Clean up
docker system prune -a
```

---

**Created:** February 2026  
**Version:** 1.0.0
