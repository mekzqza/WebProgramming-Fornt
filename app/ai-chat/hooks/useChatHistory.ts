import { useState, useCallback } from 'react';
import { Message } from '../types/chat.types';
import { CHAT_CONFIG, UI_TEXT } from '../config/chat.config';
import { generateId } from '@/lib/utils/chatUtils';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setChatHistory((prev) => {
      const updated = [...prev, message];
      if (updated.length > CHAT_CONFIG.maxHistoryLength) {
        return updated.slice(-CHAT_CONFIG.maxHistoryLength);
      }
      return updated;
    });
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setChatHistory((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  }, []);

  const clearHistory = useCallback(() => {
    setChatHistory([]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date(),
        status: 'sent',
      };

      addMessage(userMessage);
      setIsLoading(true);

      try {
        const recentHistory = [...chatHistory, userMessage].slice(
          -CHAT_CONFIG.slidingWindowSize
        );

        const response = await fetch(CHAT_CONFIG.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: recentHistory.map(({ role, content }) => ({
              role,
              content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        const aiMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
          status: 'sent',
        };

        addMessage(aiMessage);
      } catch (error: any) {
        console.error('Error:', error);
        const errorMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: UI_TEXT.errorMessage,
          timestamp: new Date(),
          status: 'error',
          error: error.message || 'Unknown error',
        };
        addMessage(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [chatHistory, addMessage]
  );

  const regenerateLastMessage = useCallback(async () => {
    if (chatHistory.length < 2) return;

    // Find the last user message
    const lastUserMessageIndex = chatHistory
      .map((msg, idx) => ({ msg, idx }))
      .reverse()
      .find(({ msg }) => msg.role === 'user')?.idx;

    if (lastUserMessageIndex === undefined) return;

    // Remove all messages after the last user message
    setChatHistory((prev) => prev.slice(0, lastUserMessageIndex + 1));

    // Resend the last user message
    const lastUserMessage = chatHistory[lastUserMessageIndex];
    await sendMessage(lastUserMessage.content);
  }, [chatHistory, sendMessage]);

  return {
    chatHistory,
    isLoading,
    sendMessage,
    clearHistory,
    regenerateLastMessage,
    updateMessage,
  };
};
