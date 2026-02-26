# 🚀 Docker Quick Reference

## เริ่มต้นใช้งาน (5 นาที)

```bash
# 1. ตั้งค่า environment
cp .env.docker.example .env.local
nano .env.local  # แก้ไข AGENT_SHORT_ID, ACCESS_TOKEN, etc.

# 2. Start services
docker-compose up -d --build

# 3. ตรวจสอบ
docker-compose ps
docker-compose logs -f
```

## เข้าใช้งาน

- **แอปพลิเคชัน**: http://localhost
- **PocketBase Admin**: http://localhost/_/
- **PocketBase API**: http://localhost/pb/
- **Health Check**: http://localhost/api/health

## คำสั่งที่ใช้บ่อย

```bash
# NPM Scripts (แนะนำ)
npm run docker:deploy      # Build + Start
npm run docker:up          # Start
npm run docker:down        # Stop
npm run docker:logs        # View logs
npm run docker:ps          # Status
npm run docker:restart     # Restart

# Docker Compose (โดยตรง)
docker-compose up -d --build    # Build และ start
docker-compose down             # Stop
docker-compose logs -f          # Logs แบบ follow
docker-compose ps               # ตรวจสอบสถานะ
docker-compose restart nextjs   # Restart service เดียว
```

## Services

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| Nginx | 80, 443 | http://localhost | Reverse Proxy |
| Next.js | 3000 | http://localhost:3000 | Frontend + API |
| PocketBase | 8090 | http://localhost:8090 | Database + Backend |

## ไฟล์สำคัญ

- `Dockerfile` - Next.js container configuration
- `docker-compose.yml` - Services orchestration
- `nginx/nginx.conf` - Nginx configuration
- `.env.local` - Environment variables (สร้างจาก .env.docker.example)
- `deploy.sh` - Automated deployment script

## Troubleshooting

### Port ชน
```bash
# ตรวจสอบ port ที่ใช้อยู่
netstat -tulpn | grep -E '80|443|3000|8090'

# เปลี่ยน port ใน docker-compose.yml
ports:
  - "8080:80"  # แทนที่ port 80
```

### Container ไม่ start
```bash
# ดู logs
docker-compose logs

# ลบและสร้างใหม่
docker-compose down -v
docker-compose up -d --build
```

### PocketBase ติดต่อไม่ได้
```bash
# ทดสอบ connectivity
docker-compose exec nextjs ping pocketbase
docker-compose logs pocketbase
```

## Deploy ขึ้น VPS (สั้นๆ)

```bash
# 1. SSH to VPS
ssh root@your-vps-ip

# 2. ติดตั้ง Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. อัปโหลดโค้ด (เลือกวิธีใดวิธีหนึ่ง)
git clone https://github.com/your-repo.git
# หรือ
scp -r ./webprogramming-back root@your-vps-ip:/root/

# 4. ตั้งค่าและ deploy
cd /root/webprogramming-back
cp .env.docker.example .env.local
nano .env.local  # แก้ไขค่าต่างๆ
chmod +x deploy.sh
./deploy.sh

# 5. ตั้งค่า firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# 6. Point domain ไปที่ VPS IP
```

## SSL/HTTPS (Let's Encrypt)

```bash
# 1. ติดตั้ง Certbot
apt install certbot -y

# 2. หยุด nginx ชั่วคราว
docker-compose stop nginx

# 3. ขอ certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# 4. แก้ไข docker-compose.yml เพิ่ม volume
# nginx:
#   volumes:
#     - /etc/letsencrypt:/etc/letsencrypt:ro

# 5. เปิดใช้งาน SSL ใน nginx/conf.d/ssl.conf

# 6. Restart
docker-compose restart nginx

# 7. ตั้ง auto-renewal
echo "0 0,12 * * * certbot renew --quiet && docker-compose restart nginx" | crontab -
```

## Backup & Restore

```bash
# Backup PocketBase
docker run --rm \
  -v webprogramming-back_pocketbase_data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/pb_backup_$(date +%Y%m%d).tar.gz -C /data .

# Restore
docker-compose down
docker run --rm \
  -v webprogramming-back_pocketbase_data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar xzf /backup/pb_backup_YYYYMMDD.tar.gz -C /data
docker-compose up -d
```

## Monitoring

```bash
# Resource usage
docker stats

# Logs (realtime)
docker-compose logs -f

# Check health
curl http://localhost/api/health

# Container status
docker-compose ps
```

## Environment Variables

สำคัญที่ต้องตั้งใน `.env.local`:

```bash
# Required
AGENT_SHORT_ID=your_agent_id
ACCESS_TOKEN=your_token

# PocketBase
POCKETBASE_ADMIN_EMAIL=admin@yourdomain.com
POCKETBASE_ADMIN_PASSWORD=your_secure_password

# Production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Architecture

```
Internet (Port 80/443)
         ↓
    [ Nginx ]  ← Reverse Proxy, SSL, Caching
         ↓
   ┌─────┴─────┐
   ↓           ↓
[Next.js]  [PocketBase]
  :3000      :8090
              ↓
         [ Database ]
           (SQLite)
```

## คู่มือเต็ม

- **ภาษาไทย**: [DOCKER_DEPLOYMENT_TH.md](DOCKER_DEPLOYMENT_TH.md)
- **English**: [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

---

**Version:** 1.0.0  
**Last Updated:** February 2026
