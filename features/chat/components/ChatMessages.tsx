import React, { useEffect, useRef } from 'react';
import TipTapMessage from './TipTapMessage';
import styles from '../chat.module.scss';
import { type Message } from '@ai-sdk/react';

// Remove duplicate interface that's already defined in TipTapMessage.tsx
interface ChatMessagesProps {
	messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [messages]);

	return (
		<div className={styles.chatMessagesWrapper}>
			{messages.length === 0 ?
				<div className={styles.emptyState}>
					No messages yet. Start the conversation!
				</div>
			:	messages.map((msg, idx) => (
					<TipTapMessage
						key={idx}
						message={msg}
					/>
				))
			}
			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessages;
