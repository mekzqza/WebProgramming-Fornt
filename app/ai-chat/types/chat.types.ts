export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  error?: string;
}

export interface ChatConfig {
  maxHistoryLength: number;
  slidingWindowSize: number;
  apiEndpoint: string;
  maxMessageLength: number;
}

export interface ChatState {
  isTyping: boolean;
  error: string | null;
  tokenCount?: number;
}
