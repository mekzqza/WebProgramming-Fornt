import React from 'react';
import { styles } from '../styles/chat.styles';
import { UI_TEXT } from '../config/chat.config';

export const EmptyState: React.FC = () => {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyStateCard}>
        <div style={styles.emptyStateIcon}>💬</div>
        <p style={styles.emptyStateTitle}>{UI_TEXT.emptyStateTitle}</p>
        <p style={styles.emptyStateText}>
          Using <strong style={{ color: '#764ba2' }}>Sliding Window</strong>{' '}
          technique
          <br />
          {UI_TEXT.emptyStateDescription}
        </p>
      </div>
    </div>
  );
};
