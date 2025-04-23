import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import styles from '../chat.module.scss';
import { MessageCircleMore } from 'lucide-react';
import { motion } from 'framer-motion';

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
		editorProps: {
			attributes: {
				class: styles.tiptap,
			},
		},
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
				<EditorContent
					editor={editor}
					autoFocus
					className={styles.proseMirror}
				/>
			</div>
			<motion.button
				whileHover={{ scale: 0.92 }}
				className={styles.sendButton}
				onClick={handleSend}
				disabled={loading || !editor?.getText().trim()}>
				<MessageCircleMore size={16} />
			</motion.button>
		</div>
	);
};

export default TipTapInput;
