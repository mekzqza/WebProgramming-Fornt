import { ChatConfig } from '../types/chat.types';

export const CHAT_CONFIG: ChatConfig = {
  maxHistoryLength: 100,
  slidingWindowSize: 6, // Send only last 6 messages to save tokens
  apiEndpoint: '/api/chat',
  maxMessageLength: 4000,
};

export const UI_TEXT = {
  title: 'AI Chat Assistant',
  subtitle: '✨ Powered by DigitalOcean GenAI',
  clearButton: 'Clear Chat',
  sendButton: 'Send',
  placeholder: 'Type your message here...',
  emptyStateTitle: 'Start a conversation with AI!',
  emptyStateDescription: 'Using Sliding Window technique (last 6 messages) to optimize token usage',
  loadingText: 'AI is thinking...',
  errorMessage: 'Sorry, I encountered an error. Please try again.',
  userLabel: 'You',
  aiLabel: 'AI Assistant',
  copyButton: 'Copy',
  copiedButton: 'Copied!',
  regenerateButton: 'Regenerate',
  scrollToBottom: 'Scroll to bottom',
  characterCount: 'characters',
  exportChat: 'Export Chat',
};

export const THEME = {
  colors: {
    primary: {
      start: '#667eea',
      middle: '#764ba2',
      end: '#f093fb',
    },
    user: {
      start: '#667eea',
      end: '#764ba2',
    },
    ai: {
      start: '#4facfe',
      end: '#00f2fe',
    },
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
  },
  borderRadius: {
    small: '12px',
    medium: '20px',
    large: '30px',
  },
  shadows: {
    small: '0 2px 10px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 15px rgba(0, 0, 0, 0.15)',
    large: '0 10px 50px rgba(0, 0, 0, 0.2)',
  },
};
