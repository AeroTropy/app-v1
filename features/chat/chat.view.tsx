'use client';
import React from 'react';
import { useChat } from '@ai-sdk/react';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import styles from './chat.module.scss';
import { ENDPOINTS } from '@/constant/api/endpoints.constant';
import { useWeb3User } from '@/context/web3-user.context';

const ChatView: React.FC<{ initialText?: string }> = ({ initialText }) => {
	const { address } = useWeb3User();
	const { messages, input, handleSubmit, isLoading, error, append } = useChat(
		{
			api: ENDPOINTS.CHAT.POST,
			body: { walletAddress: address || '' },
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

	return (
		<div className={styles.chatContainer}>
			<div className={styles.chatHeader}>
				<h2 className={styles.headerTitle}>AeroTropy AI Assistant</h2>
				{address && <div className={styles.walletConnected}>Wallet Connected: {address.slice(0, 6)}...{address.slice(-4)}</div>}
			</div>
			
			<div className={styles.chatContent}>
				<ChatMessages messages={messages} />
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
