import React from 'react';
import { Message } from '../types/chat.types';
import { styles } from '../styles/chat.styles';
import { UI_TEXT } from '../config/chat.config';
import { MessageActions } from './MessageActions';
import { formatTime } from '@/lib/utils/chatUtils';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRegenerate }) => {
  const isUser = message.role === 'user';
  const hasError = message.status === 'error';

  return (
    <div
      style={{
        ...styles.messageWrapper,
        ...(isUser ? styles.messageWrapperUser : styles.messageWrapperAi),
      }}
    >
      <div
        style={{
          ...styles.messageContent,
          ...(isUser ? styles.messageContentReverse : {}),
        }}
      >
        <div
          style={{
            ...styles.avatar,
            ...(isUser ? styles.avatarUser : styles.avatarAi),
            ...(hasError ? { opacity: 0.5 } : {}),
          }}
        >
          {isUser ? '👤' : '🤖'}
        </div>
        <div style={{ flex: 1 }}>
          <div
            className="bubble"
            style={{
              ...styles.bubble,
              ...(isUser ? styles.bubbleUser : styles.bubbleAi),
              ...(hasError ? { borderLeft: '3px solid #ef4444' } : {}),
            }}
          >
            <div style={styles.bubbleHeader}>
              <p style={styles.bubbleLabel}>
                {isUser ? UI_TEXT.userLabel : UI_TEXT.aiLabel}
              </p>
              {message.timestamp && (
                <span style={styles.timestamp} title={message.timestamp.toLocaleString()}>
                  {formatTime(message.timestamp)}
                </span>
              )}
            </div>
            <p style={styles.bubbleText}>{message.content}</p>
            {hasError && message.error && (
              <div style={styles.errorBadge}>
                <span>⚠️</span>
                <span>{message.error}</span>
              </div>
            )}
            {message.status === 'sending' && (
              <div style={styles.statusBadge}>
                <span>⏳</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Sending...</span>
              </div>
            )}
          </div>
          <MessageActions
            content={message.content}
            onRegenerate={!isUser ? onRegenerate : undefined}
            isAiMessage={!isUser}
          />
        </div>
      </div>
    </div>
  );
};
