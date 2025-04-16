import { MotionValue, useTransform, motion } from 'framer-motion';
import React from 'react';

function HomeSecondSection({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue;
}) {
	const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
	const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
	const borderRadius = useTransform(scrollYProgress, [0, 1], [50, 10]);
	const padding = useTransform(scrollYProgress, [0, 1], [0, 5]);

	return (
		<motion.div
			data-scroll-id='home-second-section'
			style={{ scale, y, padding }}
			className='h-screen w-screen  '>
			<motion.div
				style={{ borderRadius }}
				className='w-full h-full bg-bg-negative flex flex-col items-center justify-center gap-10'></motion.div>
		</motion.div>
	);
}

export default HomeSecondSection;
