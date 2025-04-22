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
			<AnimatePresence>
				{!isModalOpen && (
					<ChatInputCta
						isModalOpen={isModalOpen}
						onClick={toggleModal}
					/>
				)}
				{isModalOpen && (
					<>
						<motion.div
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}>
							<ChatView />
						</motion.div>
						<motion.div
							className={styles['cross-con']}
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							whileHover={{ rotate: '90deg' }}
							exit={{ opacity: 0, scale: 0 }}>
							<X
								size={12}
								onClick={toggleModal}
							/>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default ChatInputWrapper;
