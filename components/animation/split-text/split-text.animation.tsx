import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import If from '@/components/utils/If';

interface SplitTextAnimationProps {
	text: string;
	className?: string;
	delay?: number; // Base delay in seconds
	stagger?: number; // Stagger delay between words in seconds
	parentClassName?: string;
}

function SplitTextAnimation({
	text,
	className,
	delay = 0.2,
	stagger = 0.1,
	parentClassName,
}: SplitTextAnimationProps) {
	const words = useMemo(() => text.split(' '), [text]);

	// Animation variants
	const container = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: stagger, delayChildren: delay },
		},
	};

	const child = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div
			variants={container}
			initial='hidden'
			className={parentClassName}
			animate='visible'>
			{words.map((word, index) => (
				<If
					isTrue={word === '\\n'}
					key={index}>
					<br />
					<motion.span
						data-test={word === '\n'}
						className={`${className} inline-block mr-2 mb-2`}
						variants={child}>
						{word}
					</motion.span>
				</If>
			))}
		</motion.div>
	);
}

export default SplitTextAnimation;
