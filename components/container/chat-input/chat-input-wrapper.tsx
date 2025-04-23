import React, { useState } from 'react';
import styles from './chat-input-wrapper.module.scss';
import { X } from 'lucide-react';
import ChatView from '@/features/chat/chat.view';
import { AnimatePresence, motion } from 'framer-motion';
import ChatInputCta from './sub-comp/chat-input-cta';
import { cn } from '@/lib/utils';

/**
 * Props for the HomeInputWrapper component
 */
interface ChatInputWrapperProps {
	/** Optional class name for the wrapper */
	className?: string;
}

/**
 * A component that displays an input field with animated placeholder text
 * that cycles through different suggestions.
 */
function ChatInputWrapper({ className }: ChatInputWrapperProps) {
	// State for the animated placeholder text

	// State for modal open/close
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Toggle chat modal
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const variants = {
		open: {
			width: '80vw',
			height: '80vh',
		},
		close: {
			width: '400px',
			height: '80px',
		},
	};

	return (
		<motion.div
			className={cn(styles['home-input-wrapper'], className)}
			style={{ backdropFilter: 'blur(14px)' }}
			initial='close'
			whileHover={{ scale: isModalOpen ? 1 : 1.05 }}
			whileTap={{ scale: isModalOpen ? 1 : 0.98 }}
			animate={isModalOpen ? 'open' : 'close'}
			transition={{ type: 'spring', stiffness: 100 }}
			variants={variants}>
			{/* Input CTA */}
			<AnimatePresence mode='wait'>
				{!isModalOpen && (
					<motion.div
						key='input-cta'
						className={styles['home-input-cta']}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={toggleModal}
						transition={{ duration: 0.2 }}>
						<ChatInputCta isModalOpen={isModalOpen} />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Chat View */}
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						key='chat-view'
						className={styles.chatViewContainer}
						data-lenis-prevent
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{
							opacity: 0,
							transition: { delay: 0, duration: 0.1 },
						}}
						transition={{ duration: 0.3, delay: 0.2 }}>
						<ChatView />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Close Button */}
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						key='close-button'
						className={styles['cross-con']}
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ rotate: '90deg' }}
						exit={{ opacity: 0, scale: 0 }}
						onClick={toggleModal}
						transition={{ duration: 0.2 }}>
						<X size={12} />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default ChatInputWrapper;
