'use client';
import React from 'react';
import { useChat } from '@ai-sdk/react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import styles from './chat.module.scss';
import type { ChatMessageType } from './types';

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

	// Map AI SDK messages to ChatMessageType for ChatMessages component
	const mappedMessages: ChatMessageType[] = messages.map((msg) => ({
		message: msg.content,
		from: msg.role === 'user' ? 'user' : 'ai',
		timestamp: new Date().toLocaleTimeString(),
	}));

	return (
		<div className={styles.chatContainer}>
			<ChatMessages messages={mappedMessages} />
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
