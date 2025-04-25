import React, { useEffect, useRef } from 'react';
import TipTapMessage from './TipTapMessage';
import styles from '../chat.module.scss';
import { type Message } from '@ai-sdk/react';

interface ChatMessagesProps {
	messages: Message[];
	isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
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
						message={msg}
						isLoading={isLoading && idx === messages.length - 1}
						key={idx}
					/>
				))}
			</>

			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessages;
