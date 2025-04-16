import React from 'react';
import SplitTextAnimation from '@/components/animation/split-text/split-text.animation';
import HomeInputWrapper from '@/components/container/home-input/home-input-wrapper';
import { MotionValue, useTransform, motion } from 'framer-motion';

function HomeHero({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const [inputValue, setInputValue] = React.useState('');
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

	return (
		<motion.div
			style={{ scale, rotate }}
			className='sticky top-0 h-screen w-screen flex flex-col items-center justify-center gap-10 -z-1'>
			<div className='flex flex-col gap-2 items-center'>
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
			<div className='anim-popup max-w-[700px] w-full'>
				<HomeInputWrapper
					inputProps={{
						value: inputValue,
						onChange: (e) => setInputValue(e.target.value),
					}}
				/>
			</div>
		</motion.div>
	);
}

export default HomeHero;
