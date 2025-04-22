import React from 'react';
import SplitTextAnimation from '@/components/animation/split-text/split-text.animation';
import FloatingAssets from './floating-assets/floating-assets';
import { MotionValue, useTransform, motion } from 'framer-motion';

function HomeHero({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);

	return (
		<motion.div
			style={{ scale, rotate }}
			className='sticky top-0 h-screen w-screen flex flex-col items-center justify-center gap-10 z-1'>
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
		</motion.div>
	);
}

export default HomeHero;
