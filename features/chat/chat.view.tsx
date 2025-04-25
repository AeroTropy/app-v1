'use client';
import React, { useEffect, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import styles from './chat.module.scss';
import { ENDPOINTS } from '@/constant/api/endpoints.constant';
import { useWeb3User } from '@/context/web3-user.context';
import { useChatStore } from '@/store/useChatStore';

const ChatView: React.FC = () => {
	const { address } = useWeb3User();
	const { messages: storedMessages, setMessages: setStoredMessages } =
		useChatStore();

	const initialMessages = useMemo(() => {
		// If there are stored messages, use those
		if (storedMessages.length > 0) {
			return storedMessages;
		}

		return [];
	}, [storedMessages]);

	const { messages, input, handleSubmit, status, error, append } = useChat({
		api: ENDPOINTS.CHAT.POST,
		body: { walletAddress: address || '' },
		initialMessages,
	});

	const isLoading = useMemo(
		() => ['streaming', 'submitted'].includes(status),
		[status]
	);

	// Sync messages with the store whenever they change
	useEffect(() => {
		if (messages.length > 0) {
			setStoredMessages(messages);
		}
	}, [messages, setStoredMessages]);

	return (
		<div className={styles.chatContainer}>
			<div className={styles.chatContent}>
				<ChatMessages
					messages={messages}
					isLoading={isLoading}
				/>
			</div>

			{error && (
				<div className={styles.errorState}>
					{typeof error === 'string' ? error : error.message}
				</div>
			)}

			<form
				className={styles.chatForm}
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
