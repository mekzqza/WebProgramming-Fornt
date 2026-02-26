'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { EmptyState } from './components/EmptyState';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ChatStyles } from './components/ChatStyles';
import { ScrollToBottom } from './components/ScrollToBottom';
import { useChatHistory } from './hooks/useChatHistory';
import { styles } from './styles/chat.styles';

export default function AIChatPage() {
  const {
    chatHistory,
    isLoading,
    sendMessage,
    clearHistory,
    regenerateLastMessage,
  } = useChatHistory();
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage;
    setInputMessage('');
    await sendMessage(message);
  };

  const handleClearChat = () => {
    if (chatHistory.length === 0) return;

    const confirmed = confirm(
      `Are you sure you want to clear all ${chatHistory.length} messages?`
    );
    if (confirmed) {
      clearHistory();
    }
  };

  return (
    <div style={styles.container}>
      <ChatStyles />

      <ChatHeader onClearChat={handleClearChat} messages={chatHistory} />

      <div
        ref={messagesContainerRef}
        style={styles.messagesContainer}
        className="messages-container"
      >
        <div style={styles.messagesContent}>
          {chatHistory.length === 0 && <EmptyState />}

          {chatHistory.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              onRegenerate={
                index === chatHistory.length - 1 && message.role === 'assistant'
                  ? regenerateLastMessage
                  : undefined
              }
            />
          ))}

          {isLoading && <LoadingIndicator />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ScrollToBottom messagesContainerRef={messagesContainerRef} />

      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
}
