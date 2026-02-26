import React from 'react';

export const ChatStyles: React.FC = () => {
  return (
    <style jsx global>{`
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes bounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
      
      /* Message bubbles */
      .bubble:hover {
        transform: translateY(-2px);
      }
      .bubble:hover .message-actions {
        opacity: 1;
      }
      .message-actions {
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      
      /* Action buttons */
      .action-button:hover {
        background: rgba(0, 0, 0, 0.1);
        transform: scale(1.05);
      }
      .action-button:active {
        transform: scale(0.95);
      }
      
      /* Input textarea */
      .input-textarea:focus {
        border-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }
      .input-textarea:disabled {
        background: rgba(200, 200, 200, 0.5);
        cursor: not-allowed;
      }
      
      /* Header buttons */
      .clear-button:hover,
      .export-button:hover {
        transform: scale(1.05);
        opacity: 1;
      }
      .clear-button:active,
      .export-button:active {
        transform: scale(0.95);
      }
      
      /* Send button */
      .send-button:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      }
      .send-button:active:not(:disabled) {
        transform: scale(0.95);
      }
      .send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      /* Loading dots */
      .dot:nth-child(1) {
        animation: bounce 1s infinite 0s;
      }
      .dot:nth-child(2) {
        animation: bounce 1s infinite 0.2s;
      }
      .dot:nth-child(3) {
        animation: bounce 1s infinite 0.4s;
      }
      
      /* Custom scrollbar */
      .messages-container::-webkit-scrollbar {
        width: 8px;
      }
      .messages-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
      }
      .messages-container::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
      }
      .messages-container::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
      
      /* Responsive design */
      @media (max-width: 768px) {
        .message-content {
          max-width: 85% !important;
        }
        .bubble {
          font-size: 14px !important;
        }
        .header-title {
          font-size: 22px !important;
        }
        .input-textarea {
          font-size: 14px !important;
        }
      }
      
      @media (max-width: 480px) {
        .message-content {
          max-width: 90% !important;
        }
        .avatar {
          width: 35px !important;
          height: 35px !important;
          font-size: 18px !important;
        }
        .header-buttons {
          flex-direction: column;
          width: 100%;
        }
        .clear-button,
        .export-button {
          width: 100%;
          justify-content: center;
        }
      }
      
      /* Auto-scroll smooth behavior */
      .messages-container {
        scroll-behavior: smooth;
      }
      
      /* Selection styling */
      ::selection {
        background: rgba(102, 126, 234, 0.3);
        color: inherit;
      }
      
      /* Focus visible for accessibility */
      button:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.8);
        outline-offset: 2px;
      }
    `}</style>
  );
};
