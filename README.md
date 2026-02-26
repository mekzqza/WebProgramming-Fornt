# AI Chat Application

A production-ready Next.js AI chat application with memory management using the Sliding Window technique to optimize token usage.

## Features

- 🤖 AI-powered chat interface
- 💾 Memory management with Sliding Window (last 6 messages)
- 🎨 Beautiful gradient UI with animations
- 📱 Responsive design
- ⚡ Production-ready architecture
- 🔒 Error handling and validation
- 📊 Logging and monitoring

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Backend:** Next.js API Routes
- **AI Provider:** DigitalOcean GenAI
- **HTTP Client:** Axios
- **Styling:** Inline Styles with CSS-in-JS

## Project Structure

```
app/
├── ai-chat/                    # Chat feature module
│   ├── components/             # Reusable components
│   │   ├── ChatHeader.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingIndicator.tsx
│   │   └── ChatStyles.tsx
│   ├── hooks/                  # Custom React hooks
│   │   └── useChatHistory.ts
│   ├── styles/                 # Style definitions
│   │   └── chat.styles.ts
│   ├── types/                  # TypeScript interfaces
│   │   └── chat.types.ts
│   ├── config/                 # Configuration
│   │   └── chat.config.ts
│   └── page.tsx               # Main chat page
│
├── api/
│   └── chat/
│       ├── route.ts           # API endpoint
│       └── config.ts          # API configuration
│
lib/
├── api/
│   └── chatApi.ts            # API client utilities
└── utils/
    └── logger.ts             # Logging utility
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
AGENT_SHORT_ID=your_agent_short_id_here
ACCESS_TOKEN=your_access_token_here
NODE_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/ai-chat](http://localhost:3000/ai-chat) in your browser.

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
# 1. Copy environment template
cp .env.docker.example .env.local

# 2. Edit .env.local with your credentials
nano .env.local

# 3. Build and start all services (Next.js, PocketBase, Nginx)
docker-compose up -d --build

# 4. Check status
docker-compose ps

# 5. View logs
docker-compose logs -f
```

**Access the application:**
- Frontend: http://localhost
- PocketBase Admin: http://localhost/_/
- PocketBase API: http://localhost/pb/
- Health Check: http://localhost/api/health

### Docker Services

- **Next.js** (port 3000): Frontend + API routes
- **PocketBase** (port 8090): Database + Backend API
- **Nginx** (port 80/443): Reverse proxy, SSL, caching

### Docker Commands

```bash
# Using NPM scripts (recommended)
npm run docker:deploy      # Build and start
npm run docker:up          # Start services
npm run docker:down        # Stop services
npm run docker:logs        # View logs
npm run docker:ps          # Check status
npm run docker:restart     # Restart services

# Using Docker Compose directly
docker-compose up -d --build
docker-compose down
docker-compose logs -f
docker-compose restart nextjs
```

### Deploy to VPS

Complete deployment guide:
- **ภาษาไทย**: [DOCKER_DEPLOYMENT_TH.md](DOCKER_DEPLOYMENT_TH.md)
- **English**: [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)
- **Quick Reference**: [DOCKER_QUICK_REFERENCE.md](DOCKER_QUICK_REFERENCE.md)

**Quick VPS deployment:**
```bash
# 1. Install Docker on VPS
curl -fsSL https://get.docker.com | sh

# 2. Upload project to VPS
scp -r ./webprogramming-back root@your-vps-ip:/root/

# 3. SSH and deploy
ssh root@your-vps-ip
cd /root/webprogramming-back
cp .env.docker.example .env.local
nano .env.local  # Edit credentials
chmod +x deploy.sh
./deploy.sh

# 4. Configure firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

## Configuration

### Chat Configuration

Edit `app/ai-chat/config/chat.config.ts`:

```typescript
export const CHAT_CONFIG: ChatConfig = {
  maxHistoryLength: 100,        // Max messages to keep in memory
  slidingWindowSize: 6,         // Messages sent to API (saves tokens)
  apiEndpoint: '/api/chat',
};
```

### UI Text

Customize all UI text in `app/ai-chat/config/chat.config.ts`:

```typescript
export const UI_TEXT = {
  title: 'AI Chat Assistant',
  subtitle: '✨ Powered by DigitalOcean GenAI',
  // ... more text options
};
```

## Architecture Highlights

### Sliding Window Technique

The app implements a sliding window to optimize API token usage:
- Keeps full chat history in the UI
- Sends only the last 6 messages to the API
- Configurable window size

### Component Structure

- **Separation of Concerns:** UI components, business logic, and styles are separate
- **Reusability:** All components are reusable and typed
- **Maintainability:** Easy to modify and extend

### Error Handling

- Comprehensive error handling in API routes
- User-friendly error messages
- Development vs. production error details
- Request timeout handling

### Logging

- Structured logging with timestamps
- Different log levels (info, warn, error, debug)
- Production-safe (only errors in production)

## Production Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Variables

Make sure to set these in your production environment:
- `AGENT_SHORT_ID`
- `ACCESS_TOKEN`
- `NODE_ENV=production`

## API Documentation

### POST `/api/chat`

Send messages to the AI assistant.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, AI!"
    }
  ]
}
```

**Response:**
```json
{
  "reply": "Hello! How can I help you today?"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Additional details (development only)"
}
```

## Customization

### Styling

Edit `app/ai-chat/styles/chat.styles.ts` to customize colors, spacing, and animations.

### Add New Features

1. Create new components in `app/ai-chat/components/`
2. Add types in `app/ai-chat/types/`
3. Create hooks for complex logic in `app/ai-chat/hooks/`
4. Update configuration in `app/ai-chat/config/`

## Performance

- Automatic message history limiting
- Efficient re-renders with React hooks
- Smooth scrolling to latest messages
- Optimized animations

## License

This project is open source and available under the MIT License.
