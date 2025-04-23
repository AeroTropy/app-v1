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
			<>
				<TipTapMessage
					message={{
						id: 'init-' + Date.now(),
						role: 'assistant',
						content: `Welcome to our smart tool.
Ask us all your questions, ask us about blockchain, apr, wallet and we will do our best to answer them.`,
					}}
					className={styles.welcomeText}
				/>
				{messages.map((msg, idx) => (
					<TipTapMessage
						key={idx}
						message={msg}
					/>
				))}
			</>

			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessages;
