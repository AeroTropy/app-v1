import React, { useEffect, useRef } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import styles from './chat.module.scss';

interface ChatMessagesProps {
  messages: ChatMessageProps[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatMessagesWrapper}>
      {messages.length === 0 ? (
        <div className={styles.emptyState}>No messages yet. Start the conversation!</div>
      ) : (
        messages.map((msg, idx) => <ChatMessage key={idx} {...msg} />)
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
