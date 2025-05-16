/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../chat.module.scss';
import { type Message } from '@ai-sdk/react';
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';
import If from '@/components/utils/If';
import RobotLoading from '@/assets/icons/thinking-robot.svg';
import Image from 'next/image';
import ToolRenderer from '@/components/tools/tool-renderer';
import { TOOL_NAME } from '@/constant/tools/tool.constant';
import ConnectWalletButton from '@/components/features/web3/connect-wallet-button/connect-wallet-button';
import { marked } from 'marked';
interface TipTapMessageProps {
	message: Message;
	className?: string;
	isLoading?: boolean;
}

const TipTapMessage: React.FC<TipTapMessageProps> = ({
	message,
	className,
	isLoading = false,
}) => {
	// Use a ref instead of state to track the previous content
	const prevContentRef = useRef<string>('');

	const editor = useEditor({
		extensions: [StarterKit],
		content: message.content || '',
		editable: false,
		immediatelyRender: true,
	});

	const markdownToHtml = (markdown: string) => {
		return marked(markdown, {
			breaks: true,
			gfm: true,
			async: false,
		});
	};

	useEffect(() => {
		if (editor && message.content !== prevContentRef.current) {
			// Only update if content has changed
			editor.commands.setContent(markdownToHtml(message.content));
			prevContentRef.current = message.content;
		}
	}, [message.content]);

	return (
		<div
			className={`${styles.chatMessage} ${message.role === 'user' ? styles.user : styles.ai} ${className}`}>
			{message.role !== 'user' && (
				<If isTrue={isLoading}>
					<Image
						src={RobotLoading}
						alt='Loading'
						width={24}
						height={24}
					/>
					<Bot size={24} />
				</If>
			)}
			<div className={cn(styles.messageBubble, className)}>
				<EditorContent editor={editor} />
				<ToolRenderer
					message={message}
					name={TOOL_NAME.CW}
					renderer={(_, key) => (
						<ConnectWalletButton
							btnClassName={styles['connect-wallet-button']}
							minimal
							key={key}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default TipTapMessage;
