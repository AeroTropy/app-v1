import React from 'react';
import styles from './chat.module.scss';

export interface ChatMessageProps {
  message: string;
  from: 'user' | 'ai';
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, from, timestamp }) => {
  return (
    <div className={`${styles.chatMessage} ${from === 'user' ? styles.user : styles.ai}`}>  
      <div className={styles.messageBubble}>
        <span>{message}</span>
        {timestamp && <span className={styles.timestamp}>{timestamp}</span>}
      </div>
    </div>
  );
};

export default ChatMessage;
