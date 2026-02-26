import React from 'react';
import { styles } from '../styles/chat.styles';
import { UI_TEXT, CHAT_CONFIG } from '../config/chat.config';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled,
}) => {
  const charCount = value.length;
  const isNearLimit = charCount > CHAT_CONFIG.maxMessageLength * 0.8;
  const isOverLimit = charCount > CHAT_CONFIG.maxMessageLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= CHAT_CONFIG.maxMessageLength) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div style={styles.inputContainer}>
      <form onSubmit={onSubmit} style={styles.inputForm}>
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={UI_TEXT.placeholder}
            disabled={disabled}
            style={styles.textarea}
            className="input-textarea"
            rows={1}
          />
          <div style={styles.charCounter}>
            <span
              style={{
                color: isOverLimit ? '#ef4444' : isNearLimit ? '#f59e0b' : '#999',
                fontSize: '11px',
                fontWeight: isNearLimit ? 'bold' : 'normal',
              }}
            >
              {charCount} / {CHAT_CONFIG.maxMessageLength}
            </span>
          </div>
        </div>
        <button
          type="submit"
          disabled={disabled || !value.trim() || isOverLimit}
          style={styles.sendButton}
          className="send-button"
        >
          <span>{UI_TEXT.sendButton}</span>
          <span style={{ fontSize: '18px' }}>✨</span>
        </button>
      </form>
    </div>
  );
};
