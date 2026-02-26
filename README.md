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
