'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../chat.module.scss';
import { type Message } from '@ai-sdk/react';

interface TipTapMessageProps {
	message: Message;
}

const TipTapMessage: React.FC<TipTapMessageProps> = ({ message }) => {
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
			className={`${styles.chatMessage} ${message.role === 'user' ? styles.user : styles.ai}`}>
			<div className={styles.messageBubble}>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default TipTapMessage;
