import React, { useState, useEffect } from 'react';

interface ScrollToBottomProps {
  messagesContainerRef: React.RefObject<HTMLDivElement>;
  threshold?: number;
}

export const ScrollToBottom: React.FC<ScrollToBottomProps> = ({
  messagesContainerRef,
  threshold = 200,
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setShowButton(distanceFromBottom > threshold);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messagesContainerRef, threshold]);

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (!showButton) return null;

  const styles = {
    button: {
      position: 'fixed' as const,
      bottom: '120px',
      right: '30px',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      zIndex: 100,
      animation: 'fadeIn 0.3s ease',
    },
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .scroll-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }
        .scroll-button:active {
          transform: scale(0.95);
        }
      `}</style>
      <button
        onClick={scrollToBottom}
        style={styles.button}
        className="scroll-button"
        title="Scroll to bottom"
      >
        ↓
      </button>
    </>
  );
};
