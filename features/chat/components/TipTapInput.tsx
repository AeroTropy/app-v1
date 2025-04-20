import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import styles from '../chat.module.scss';

interface TipTapInputProps {
	onSend: (msg: string) => void;
	loading?: boolean;
}

const TipTapInput: React.FC<TipTapInputProps> = ({ onSend, loading }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: 'Type your message...',
			}),
		],
		content: '',
		editable: !loading,
		autofocus: true,
	});

	const handleSend = () => {
		if (!editor) return;
		const text = editor.getText().trim();
		if (text) {
			onSend(text);
			editor.commands.clearContent();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className={styles.chatInputContainer}>
			<div
				className={styles.tiptapInput}
				onKeyDown={handleKeyDown}>
				<EditorContent editor={editor} />
			</div>
			<button
				className={styles.sendButton}
				onClick={handleSend}
				disabled={loading || !editor?.getText().trim()}>
				{loading ? 'Sending...' : 'Send'}
			</button>
		</div>
	);
};

export default TipTapInput;
