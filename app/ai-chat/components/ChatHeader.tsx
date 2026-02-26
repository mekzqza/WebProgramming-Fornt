import React from 'react';
import { styles } from '../styles/chat.styles';
import { UI_TEXT } from '../config/chat.config';
import { exportChatHistory } from '@/lib/utils/chatUtils';
import { Message } from '../types/chat.types';

interface ChatHeaderProps {
  onClearChat: () => void;
  messages: Message[];
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat, messages }) => {
  const handleExport = () => {
    if (messages.length === 0) {
      alert('No messages to export');
      return;
    }
    exportChatHistory(messages);
  };

  return (
    <div style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>🤖</div>
          <div>
            <h1 style={styles.headerTitle}>{UI_TEXT.title}</h1>
            <p style={styles.headerSubtitle}>
              {UI_TEXT.subtitle}
              {messages.length > 0 && (
                <span style={{ marginLeft: '12px', opacity: 0.8 }}>
                  • {messages.length} messages
                </span>
              )}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {messages.length > 0 && (
            <button
              onClick={handleExport}
              style={styles.exportButton}
              className="export-button"
              title={UI_TEXT.exportChat}
            >
              <span>📥</span>
              <span style={{ marginLeft: '6px' }}>Export</span>
            </button>
          )}
          <button
            onClick={onClearChat}
            style={styles.clearButton}
            className="clear-button"
          >
            <span>🗑️</span>
            <span style={{ marginLeft: '6px' }}>{UI_TEXT.clearButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
