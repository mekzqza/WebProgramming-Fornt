import React from 'react';
import { styles } from '../styles/chat.styles';
import { UI_TEXT } from '../config/chat.config';

export const LoadingIndicator: React.FC = () => {
  return (
    <div style={{ ...styles.messageWrapper, ...styles.messageWrapperAi }}>
      <div style={styles.messageContent}>
        <div style={{ ...styles.avatar, ...styles.avatarAi }}>🤖</div>
        <div className="bubble" style={{ ...styles.bubble, ...styles.bubbleAi }}>
          <p style={styles.bubbleLabel}>{UI_TEXT.aiLabel}</p>
          <div style={styles.loadingDots}>
            <span className="dot" style={styles.dot}></span>
            <span className="dot" style={styles.dot}></span>
            <span className="dot" style={styles.dot}></span>
            <span
              style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: '#666',
                fontStyle: 'italic',
              }}
            >
              {UI_TEXT.loadingText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
