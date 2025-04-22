import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../chat-input-wrapper.module.scss';
import { cn } from '@/lib/utils';
import { MessageCircleMore } from 'lucide-react';

/**
 * Animation timing constants (in milliseconds)
 */
const ANIMATION_TIMING = {
	TYPING: 80,
	PAUSE_BEFORE_DELETE: 1000,
	INITIAL_DELAY: 100,
} as const;

/**
 * Placeholder suggestions that will rotate in the input
 */
const PLACEHOLDER_SUGGESTIONS = [
	'invest my money',
	'choose a vault for me',
	'what is my risk appetite',
];

function ChatInputCta({ isModalOpen }: { isModalOpen: boolean }) {
	const [placeholderText, setPlaceholderText] = useState<string>(
		PLACEHOLDER_SUGGESTIONS[0]
	);
	const [suggestionIndex, setSuggestionIndex] = useState<number>(0);
	const [isTypingPhase, setIsTypingPhase] = useState<boolean>(false);
	const [animationSpeed, setAnimationSpeed] = useState<number>(
		ANIMATION_TIMING.INITIAL_DELAY
	);

	// Reference to the animation interval
	const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * Handles the typing/deleting animation for the placeholder text
	 */
	const animatePlaceholderText = useCallback(() => {
		const currentSuggestion = PLACEHOLDER_SUGGESTIONS[suggestionIndex];

		// If text is empty and we're in delete phase, move to next suggestion
		if (placeholderText === '' && !isTypingPhase) {
			setSuggestionIndex(
				(prev) => (prev + 1) % PLACEHOLDER_SUGGESTIONS.length
			);
			setIsTypingPhase(true);
			setAnimationSpeed(ANIMATION_TIMING.TYPING);
			return;
		}

		// If text is complete and we're in typing phase, pause then start deleting
		if (placeholderText === currentSuggestion && isTypingPhase) {
			setIsTypingPhase(false);
			setAnimationSpeed(ANIMATION_TIMING.PAUSE_BEFORE_DELETE);
			return;
		}

		// Set animation speed for typing/deleting
		setAnimationSpeed(ANIMATION_TIMING.TYPING);

		// Either add or remove characters based on phase
		if (isTypingPhase) {
			// Add next character from the current suggestion
			setPlaceholderText((prev) => prev + currentSuggestion[prev.length]);
		} else {
			// Remove last character
			setPlaceholderText((prev) => prev.slice(0, -1));
		}
	}, [suggestionIndex, placeholderText, isTypingPhase]);

	/**
	 * Start the animation interval
	 */
	const startAnimationInterval = useCallback(() => {
		// Clear any existing interval first
		if (animationIntervalRef.current) {
			clearInterval(animationIntervalRef.current);
		}

		// Start a new interval
		animationIntervalRef.current = setInterval(
			animatePlaceholderText,
			animationSpeed
		);
	}, [animatePlaceholderText, animationSpeed]);

	/**
	 * Stop the animation interval
	 */
	const stopAnimationInterval = useCallback(() => {
		if (animationIntervalRef.current) {
			clearInterval(animationIntervalRef.current);
			animationIntervalRef.current = null;
		}
	}, []);

	useEffect(() => {
		// Only run animation when modal is closed
		if (!isModalOpen) {
			startAnimationInterval();
		} else {
			stopAnimationInterval();
		}

		return () => {
			stopAnimationInterval();
		};
	}, [startAnimationInterval, stopAnimationInterval, isModalOpen]);

	return (
		<>
			<div className={cn(styles['home-input-box'])}>
				<p className={styles['home-input-placeholder']}>
					Ask about {placeholderText}
				</p>
			</div>
			<div className={styles['home-chat-icon-con']}>
				<MessageCircleMore size={18} />
			</div>
		</>
	);
}

export default ChatInputCta;
