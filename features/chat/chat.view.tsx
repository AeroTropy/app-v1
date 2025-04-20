'use client';
import React, { useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import styles from './chat.module.scss';

const API_URL = '/chat/api';

const ChatView: React.FC<{ initialText?: string }> = ({ initialText }) => {
	const { messages, input, handleSubmit, isLoading, error, append } = useChat(
		{
			api: API_URL,
			initialMessages:
				initialText ?
					[
						{
							id: 'init-' + Date.now(),
							role: 'user',
							content: initialText,
						},
					]
				:	[],
		}
	);

	// Use messages directly from AI SDK
	useEffect(() => {
		console.log('ChatView received messages from useChat:', messages);
	}, [messages]);

	return (
		<div className={styles.chatContainer}>
			<ChatMessages messages={messages} />
			{error && (
				<div className={styles.errorState}>
					{typeof error === 'string' ? error : error.message}
				</div>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (input.trim()) handleSubmit();
				}}>
				<ChatInput
					onSend={(msg) => append({ role: 'user', content: msg })}
					loading={isLoading}
				/>
			</form>
		</div>
	);
};

export default ChatView;
