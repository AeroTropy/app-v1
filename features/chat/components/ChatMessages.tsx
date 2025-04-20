import React, { useEffect, useRef } from 'react';
import TipTapMessage from './TipTapMessage';
import styles from '../chat.module.scss';
import type { ChatMessageType } from '../types';

interface ChatMessagesProps {
	messages: ChatMessageType[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
						content={msg.message}
						from={msg.from}
					/>
				))
			}
			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessages;
