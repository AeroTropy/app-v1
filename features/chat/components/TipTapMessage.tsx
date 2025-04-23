'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../chat.module.scss';
import { type Message } from '@ai-sdk/react';
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';

interface TipTapMessageProps {
	message: Message;
	className?: string;
}

const TipTapMessage: React.FC<TipTapMessageProps> = ({
	message,
	className,
}) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: message.content,
		editable: false,
	});

	useEffect(() => {
		if (editor) {
			editor.commands.setContent(message.content);
		}
	}, [message.content]);

	return (
		<div
			className={`${styles.chatMessage} ${message.role === 'user' ? styles.user : styles.ai} ${className}`}>
			{message.role !== 'user' && <Bot size={24} />}
			<div className={cn(styles.messageBubble, className)}>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default TipTapMessage;
