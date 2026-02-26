# 🚀 Quick Start Guide - AI Chat Application

## ⚡ Get Started in 3 Minutes

### 1️⃣ Install Dependencies (30 seconds)

```bash
npm install
```

### 2️⃣ Configure Environment Variables (1 minute)

Copy the example file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
AGENT_SHORT_ID=your_actual_agent_short_id
ACCESS_TOKEN=your_actual_access_token
NODE_ENV=development
```

### 3️⃣ Start Development Server (30 seconds)

```bash
npm run dev
```

🎉 Open [http://localhost:3000/ai-chat](http://localhost:3000/ai-chat)

---

## 🎨 Customization Guide

### Change Colors

Edit `app/ai-chat/config/chat.config.ts`:

```typescript
export const THEME = {
  colors: {
    primary: {
      start: '#YOUR_COLOR',  // Change gradient colors
      middle: '#YOUR_COLOR',
      end: '#YOUR_COLOR',
    },
  },
};
```

### Change Text

Edit `app/ai-chat/config/chat.config.ts`:

```typescript
export const UI_TEXT = {
  title: 'Your Custom Title',
  subtitle: 'Your Custom Subtitle',
  // ... customize all text
};
```

### Change Sliding Window Size

Edit `app/ai-chat/config/chat.config.ts`:

```typescript
export const CHAT_CONFIG: ChatConfig = {
  slidingWindowSize: 10,  // Change from 6 to 10 (sends last 10 messages)
};
```

### Change Max Message Length

```typescript
export const CHAT_CONFIG: ChatConfig = {
  maxMessageLength: 5000,  // Change from 4000 to 5000
};
```

---

## 📱 Features Overview

### 🎯 Main Features
- ✅ **Real-time Chat** with AI
- ✅ **Message Timestamps** - See when each message was sent
- ✅ **Copy Messages** - Click to copy any message
- ✅ **Regenerate Response** - Ask AI to try again
- ✅ **Export Chat** - Download conversation history
- ✅ **Character Counter** - See how many characters you've typed
- ✅ **Scroll to Bottom** - Quick navigation button
- ✅ **Clear Chat** - Start fresh anytime

### 🎨 UI Features
- ✅ **Beautiful Gradients** - Modern purple-pink theme
- ✅ **Smooth Animations** - Professional feel
- ✅ **Responsive Design** - Works on all devices
- ✅ **Message Actions** - Hover to see options
- ✅ **Status Indicators** - See message status

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
**Solution:** Restart the development server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Error: "AGENT_SHORT_ID not configured"
**Solution:** Make sure `.env.local` exists with correct values
```bash
# Check if file exists
ls .env.local

# If not, copy from example
cp .env.example .env.local
# Then edit with your credentials
```

### Chat not loading
**Solution:** Check browser console for errors
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for error messages
4. Check Network tab for API errors

### Styles not applied
**Solution:** Hard refresh the page
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

---

## 📖 Usage Tips

### Keyboard Shortcuts
- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Esc` - Clear input (future feature)

### Message Actions
- **Hover over any message** to see action buttons
- **Copy button** - Copies message text to clipboard
- **Regenerate** (AI messages only) - Get a new response

### Best Practices
1. **Keep messages concise** - Better AI responses
2. **Export regularly** - Save important conversations
3. **Clear chat when needed** - Fresh context for AI
4. **Use multiline input** - Format longer messages

---

## 🏗️ Project Structure

```
app/ai-chat/
├── components/       # UI Components
│   ├── ChatHeader.tsx
│   ├── ChatMessage.tsx
│   ├── ChatInput.tsx
│   ├── MessageActions.tsx
│   ├── ScrollToBottom.tsx
│   └── ...
├── hooks/           # Custom React Hooks
│   └── useChatHistory.ts
├── styles/          # Styling
│   └── chat.styles.ts
├── types/           # TypeScript Types
│   └── chat.types.ts
├── config/          # Configuration
│   └── chat.config.ts
└── page.tsx        # Main Page
```

---

## 🔧 Configuration Options

### Chat Config (`chat.config.ts`)

```typescript
export const CHAT_CONFIG = {
  maxHistoryLength: 100,      // Max messages to keep
  slidingWindowSize: 6,       // Messages sent to API
  apiEndpoint: '/api/chat',   // API URL
  maxMessageLength: 4000,     // Max chars per message
};
```

### UI Text Config

```typescript
export const UI_TEXT = {
  title: 'AI Chat Assistant',
  subtitle: '✨ Powered by DigitalOcean GenAI',
  clearButton: 'Clear Chat',
  sendButton: 'Send',
  // ... 20+ customizable text strings
};
```

### Theme Config

```typescript
export const THEME = {
  colors: {
    primary: { start: '#667eea', middle: '#764ba2', end: '#f093fb' },
    user: { start: '#667eea', end: '#764ba2' },
    ai: { start: '#4facfe', end: '#00f2fe' },
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
  },
};
```

---

## 📦 Production Build

### Build for Production

```bash
npm run build
```

### Test Production Build

```bash
npm run build
npm start
```

### Deploy

1. **Vercel** (Recommended for Next.js)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Other Platforms**
   - Set environment variables in platform settings
   - Deploy the `.next` folder
   - Run `npm start`

---

## 🎯 What's Next?

### Immediate Tasks
1. ✅ Configure environment variables
2. ✅ Test the chat interface
3. ✅ Customize colors/text to match your brand
4. ✅ Deploy to production

### Optional Enhancements
- [ ] Add user authentication
- [ ] Persist chat history to database
- [ ] Add dark mode
- [ ] Enable markdown rendering
- [ ] Add file upload support

---

## 📚 Documentation

- **[README.md](README.md)** - Main documentation
- **[STRUCTURE.md](STRUCTURE.md)** - Project structure (Thai)
- **[PRODUCTION_FEATURES.md](PRODUCTION_FEATURES.md)** - Feature list

---

## 💡 Tips & Tricks

### Performance
- The app uses **Sliding Window** to save API tokens
- Only the last 6 messages are sent to the AI
- Full chat history is shown in UI

### Mobile Usage
- Swipe to scroll through messages
- Tap message to see actions
- Portrait and landscape modes supported

### Export Format
- Plain text file (.txt)
- Format: `[Timestamp] Role: Message`
- Easy to share or archive

---

## 🆘 Need Help?

### Common Issues

**Issue**: TypeScript errors after editing
**Fix**: Restart VS Code or run `npm run dev`

**Issue**: Styles not updating
**Fix**: Clear browser cache (Ctrl+Shift+Del)

**Issue**: API not responding
**Fix**: Check `.env.local` credentials

### Getting Support

1. Check documentation files
2. Review error messages in console
3. Verify environment variables
4. Test API endpoint directly

---

## 🎉 You're Ready!

Your production-ready AI chat application is configured and ready to use!

**Next steps:**
1. Start the dev server: `npm run dev`
2. Open http://localhost:3000/ai-chat
3. Start chatting!

**Enjoy your new AI chat app! 🚀✨**
