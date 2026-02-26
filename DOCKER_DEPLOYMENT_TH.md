# 🐳 Docker Deployment - คู่มือการใช้งาน (ภาษาไทย)

คู่มือสำหรับ deploy แอปพลิเคชัน AI Chat ขึ้น VPS โดยใช้ Docker, Nginx และ PocketBase

---

## 📦 ไฟล์ที่สร้างขึ้น

### 1. **Dockerfile**
- Build Next.js application แบบ multi-stage
- ใช้ Node 20 Alpine (image ขนาดเล็ก)
- Build output เป็น standalone mode
- User non-root เพื่อความปลอดภัย

### 2. **docker-compose.yml**
จัดการ 3 services:
- **nextjs**: Frontend + API (port 3000)
- **pocketbase**: Database + Backend (port 8090)
- **nginx**: Reverse proxy (port 80/443)

### 3. **nginx/nginx.conf**
- Reverse proxy configuration
- Rate limiting (10 requests/second)
- Gzip compression
- Static file caching
- Security headers

### 4. **nginx/conf.d/ssl.conf**
- SSL/HTTPS configuration (สำหรับขั้นตอนต่อไป)
- HTTP to HTTPS redirect

### 5. **.dockerignore**
- ไฟล์ที่ไม่ต้อง copy เข้า Docker image
- ลดขนาด image

### 6. **.env.docker.example**
- Template สำหรับ environment variables
- คัดลอกเป็น `.env.local` และแก้ไขค่าจริง

### 7. **deploy.sh**
- Script สำหรับ deploy อัตโนมัติ
- ตรวจสอบ Docker installation
- Build และ start services

### 8. **DOCKER_DEPLOYMENT.md**
- คู่มือครบถ้วนทุกขั้นตอน (ภาษาอังกฤษ)
- Troubleshooting guide

### 9. **app/api/health/route.ts**
- Health check endpoint
- ใช้สำหรับ Docker healthcheck

### 10. **next.config.ts** (อัปเดต)
- เพิ่ม `output: 'standalone'` สำหรับ Docker
- Optimize build settings

---

## 🚀 วิธีใช้งาน

### ทดสอบบนเครื่อง Local

```bash
# 1. คัดลอก environment file
cp .env.docker.example .env.local

# 2. แก้ไข .env.local ใส่ credentials จริง
# - AGENT_SHORT_ID
# - ACCESS_TOKEN
# - POCKETBASE_ADMIN_EMAIL
# - POCKETBASE_ADMIN_PASSWORD

# 3. Build และ start
docker-compose up -d --build

# 4. ตรวจสอบสถานะ
docker-compose ps

# 5. ดู logs
docker-compose logs -f
```

**เข้าใช้งาน:**
- แอปพลิเคชัน: http://localhost
- PocketBase Admin: http://localhost/_/
- PocketBase API: http://localhost/pb/
- Health Check: http://localhost/health

### Deploy ขึ้น VPS

#### ขั้นตอนที่ 1: เตรียม VPS

```bash
# SSH เข้า VPS
ssh root@your-vps-ip

# ติดตั้ง Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# ติดตั้ง Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# ตรวจสอบ
docker --version
docker-compose --version
```

#### ขั้นตอนที่ 2: อัปโหลดโค้ด

**วิธีที่ 1: ใช้ Git**
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

**วิธีที่ 2: ใช้ SCP**
```bash
# รันบนเครื่อง local
scp -r ./webprogramming-back root@your-vps-ip:/root/
```

#### ขั้นตอนที่ 3: ตั้งค่า Environment

```bash
cd /root/webprogramming-back
cp .env.docker.example .env.local
nano .env.local

# แก้ไข:
# - AGENT_SHORT_ID=xxxxx
# - ACCESS_TOKEN=xxxxx
# - POCKETBASE_ADMIN_EMAIL=admin@yourdomain.com
# - POCKETBASE_ADMIN_PASSWORD=รหัสผ่านที่แข็งแรง
# - NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

#### ขั้นตอนที่ 4: Deploy

```bash
# ใช้ deploy script
chmod +x deploy.sh
./deploy.sh

# หรือรัน manual
docker-compose up -d --build
docker-compose ps
docker-compose logs -f
```

#### ขั้นตอนที่ 5: ตั้งค่า Firewall

```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw enable
```

#### ขั้นตอนที่ 6: Point Domain

ไปที่ Domain Registrar (Namecheap, GoDaddy, etc.)
```
A Record:  @    →  your-vps-ip
A Record:  www  →  your-vps-ip
```

รอ DNS propagate (5-60 นาที)

---

## 🔒 ตั้งค่า SSL (HTTPS)

### ใช้ Let's Encrypt (ฟรี)

```bash
# ติดตั้ง Certbot
apt install certbot -y

# หยุด nginx ชั่วคราว
docker-compose stop nginx

# ขอ certificate
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificate จะถูกบันทึกที่:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

### แก้ไข docker-compose.yml

เพิ่ม volume ใน nginx service:
```yaml
nginx:
  volumes:
    - /etc/letsencrypt:/etc/letsencrypt:ro
    # ... volumes อื่นๆ
```

### เปิดใช้งาน SSL

แก้ไข `nginx/conf.d/ssl.conf` - เอา comment ออก:

```nginx
# เปลี่ยนจาก
# server {
#   listen 443 ssl http2;
#   ...
# }

# เป็น
server {
  listen 443 ssl http2;
  server_name yourdomain.com www.yourdomain.com;
  
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
  
  # ... location blocks เหมือนเดิม
}

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

### ตั้ง Auto-renewal

```bash
# ทดสอบ renewal
certbot renew --dry-run

# ตั้ง cron job
crontab -e

# เพิ่มบรรทัดนี้ (รันวันละ 2 ครั้ง)
0 0,12 * * * certbot renew --quiet && docker-compose restart nginx
```

---

## 🔧 คำสั่งที่ใช้บ่อย

```bash
# เริ่ม services
docker-compose up -d

# หยุด services
docker-compose down

# Rebuild และ restart
docker-compose up -d --build

# ดู logs ทั้งหมด
docker-compose logs -f

# ดู logs service เดียว
docker-compose logs -f nextjs
docker-compose logs -f pocketbase
docker-compose logs -f nginx

# ตรวจสอบสถานะ
docker-compose ps

# Restart service เดียว
docker-compose restart nextjs

# เข้าไปใน container
docker-compose exec nextjs sh

# ดู resource usage
docker stats

# ลบ resources ที่ไม่ใช้
docker system prune -a
```

---

## 💾 Backup ข้อมูล PocketBase

```bash
# Backup
docker run --rm \
  -v webprogramming-back_pocketbase_data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/pb_backup_$(date +%Y%m%d).tar.gz -C /data .

# Restore
docker-compose down
docker run --rm \
  -v webprogramming-back_pocketbase_data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar xzf /backup/pb_backup_20260226.tar.gz -C /data
docker-compose up -d
```

---

## 🐛 แก้ปัญหา

### Services ไม่ start

```bash
# ดู logs
docker-compose logs

# ตรวจสอบ port ที่ใช้งานอยู่
netstat -tulpn | grep -E '80|443|3000|8090'

# ดูสถานะ container
docker ps -a
```

### ติดต่อ PocketBase ไม่ได้

```bash
# ตรวจสอบว่า PocketBase รันอยู่ไหม
docker-compose ps pocketbase

# ดู logs
docker-compose logs pocketbase

# ทดสอบ network
docker-compose exec nextjs ping pocketbase
```

### Nginx 502 Bad Gateway

```bash
# ตรวจสอบ Next.js
docker-compose ps nextjs
docker-compose logs nextjs

# ทดสอบจาก nginx container
docker-compose exec nginx wget --spider http://nextjs:3000
```

### พื้นที่ disk เต็ม

```bash
# ตรวจสอบพื้นที่
df -h

# ลบ Docker resources ที่ไม่ใช้
docker system prune -a
docker volume prune

# ลบ logs เก่า
truncate -s 0 /var/lib/docker/containers/*/*-json.log
```

---

## 📊 โครงสร้าง URL

หลังจาก deploy แล้ว:

```
https://yourdomain.com/
  ├── /                    → Next.js application
  ├── /ai-chat            → AI Chat page
  ├── /api/chat           → Next.js API (GenAI)
  ├── /api/health         → Health check
  ├── /pb/                → PocketBase REST API
  └── /_/                 → PocketBase Admin UI
```

---

## ✅ Checklist สำหรับ Production

- [ ] แก้ไข `.env.local` ด้วยค่าจริงทั้งหมด
- [ ] ตั้งรหัสผ่าน PocketBase ที่แข็งแรง
- [ ] เปิด firewall (port 80, 443)
- [ ] ติดตั้ง SSL certificate
- [ ] เปิด HTTPS redirect
- [ ] ตั้งค่า SSL auto-renewal
- [ ] Point domain ไปที่ VPS
- [ ] ทดสอบทุก endpoints
- [ ] ตั้งค่า backup schedule
- [ ] ตรวจสอบ logs

---

## 🎯 ประโยชน์ของ Docker Deployment

✅ **แยกสภาพแวดล้อม**: แต่ละ service รันใน container แยก  
✅ **ง่ายต่อการ scale**: เพิ่ม/ลด resources ได้ง่าย  
✅ **Backup ง่าย**: backup เฉพาะ volumes  
✅ **Rollback ง่าย**: ใช้ image version เก่า  
✅ **Portable**: ย้าย VPS ได้ง่าย  
✅ **Consistent**: dev, staging, production เหมือนกัน  

---

## 📞 ติดต่อ/ช่วยเหลือ

หากมีปัญหา:

1. ดู logs: `docker-compose logs -f`
2. อ่าน DOCKER_DEPLOYMENT.md (English version)
3. ตรวจสอบ environment variables
4. ตรวจสอบ firewall และ port

---

**สร้างเมื่อ:** กุมภาพันธ์ 2026  
**เวอร์ชั่น:** 1.0.0

🎉 **สำเร็จแล้ว! พร้อม deploy ขึ้น production!**
