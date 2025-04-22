import React from 'react';

import { APP_ROUTE } from '@/constant/routes.constant';
import SplitTextAnimation from '@/components/animation/split-text/split-text.animation';
import ChatInputWrapper from '@/components/container/chat-input/chat-input-wrapper';
import FloatingAssets from './floating-assets/floating-assets';
import { MotionValue, useTransform, motion } from 'framer-motion';
import { useTransitionRouter } from 'next-view-transitions';

function HomeHero({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const [inputValue, setInputValue] = React.useState('');
	const router = useTransitionRouter();

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			router.push(
				`${APP_ROUTE.CHAT}?q=${encodeURIComponent(inputValue.trim())}`
			);
		}
	};
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);

	return (
		<motion.div
			style={{ scale, rotate }}
			className='sticky top-0 h-screen w-screen flex flex-col items-center justify-center gap-10 -z-1'>
			<FloatingAssets />
			<div className='flex flex-col gap-2 items-center relative z-0'>
				<SplitTextAnimation
					parentClassName='flex justify-center flex-wrap max-w-[700px] '
					text='All crypto finance, right here.'
					className='text-[72px] font-medium text-text-primary'
				/>
				<SplitTextAnimation
					text="Introducing world's best crypto finance platform"
					className='text-3xl font-regular text-text-light'
				/>
			</div>
			<div className='max-w-[400px] w-full'>
				<ChatInputWrapper
					inputProps={{
						value: inputValue,
						onChange: (e) => setInputValue(e.target.value),
						onKeyDown: handleInputKeyDown,
					}}
				/>
			</div>
		</motion.div>
	);
}

export default HomeHero;
