import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils/chatUtils';
import { UI_TEXT } from '../config/chat.config';

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  isAiMessage?: boolean;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  content,
  onRegenerate,
  isAiMessage,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      gap: '6px',
      marginTop: '8px',
      opacity: 0,
      transition: 'opacity 0.2s ease',
    },
    button: {
      background: 'rgba(0, 0, 0, 0.05)',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#666',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
  };

  return (
    <div style={styles.container} className="message-actions">
      <button
        onClick={handleCopy}
        style={styles.button}
        className="action-button"
        title={copied ? UI_TEXT.copiedButton : UI_TEXT.copyButton}
      >
        <span>{copied ? '✓' : '📋'}</span>
        <span>{copied ? UI_TEXT.copiedButton : UI_TEXT.copyButton}</span>
      </button>
      {isAiMessage && onRegenerate && (
        <button
          onClick={onRegenerate}
          style={styles.button}
          className="action-button"
          title={UI_TEXT.regenerateButton}
        >
          <span>🔄</span>
          <span>{UI_TEXT.regenerateButton}</span>
        </button>
      )}
    </div>
  );
};
