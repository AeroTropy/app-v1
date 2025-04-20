import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../chat.module.scss';

interface TipTapMessageProps {
	content: string;
	from: 'user' | 'ai';
}

const TipTapMessage: React.FC<TipTapMessageProps> = ({ content, from }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		editable: false,
	});

	return (
		<div
			className={`${styles.chatMessage} ${from === 'user' ? styles.user : styles.ai}`}>
			<div className={styles.messageBubble}>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};

export default TipTapMessage;
