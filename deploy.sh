#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  🚀 VPS Deployment Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Error: .env.local file not found!${NC}"
    echo -e "${YELLOW}Please create .env.local with your credentials${NC}"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo -e "${YELLOW}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    echo -e "${YELLOW}Installing Docker Compose...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Stop existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose down

# Remove old images (optional)
read -p "Do you want to remove old images? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🗑️  Removing old images...${NC}"
    docker system prune -af
fi

# Build and start containers
echo -e "${GREEN}🏗️  Building and starting containers...${NC}"
docker-compose up -d --build

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check container status
echo ""
echo -e "${GREEN}📊 Container Status:${NC}"
docker-compose ps

# Show logs
echo ""
echo -e "${GREEN}📋 Recent logs:${NC}"
docker-compose logs --tail=50

# Success message
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✅ Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "🌐 Application is running at:"
echo -e "   ${GREEN}Next.js:${NC} http://localhost"
echo -e "   ${GREEN}PocketBase Admin:${NC} http://localhost/_/"
echo -e "   ${GREEN}PocketBase API:${NC} http://localhost/pb/"
echo ""
echo -e "📝 Useful commands:"
echo -e "   ${YELLOW}docker-compose logs -f${NC}           # View logs"
echo -e "   ${YELLOW}docker-compose ps${NC}                # Check status"
echo -e "   ${YELLOW}docker-compose down${NC}              # Stop all services"
echo -e "   ${YELLOW}docker-compose restart${NC}           # Restart services"
echo ""
