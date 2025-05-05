import { MotionValue, useTransform, motion, useScroll } from 'framer-motion';
import React, { useRef } from 'react';
import PoolCollection from './pools/pool-collection';

function HomeSecondSection({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue;
}) {
	const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
	const y = useTransform(scrollYProgress, [0, 1], [-70, 0]);
	const borderRadius = useTransform(scrollYProgress, [0, 1], [10, 10]);
	const padding = useTransform(scrollYProgress, [0, 1], [0, 5]);

	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress: containerScrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	return (
		<motion.div
			data-scroll-id='home-second-section'
			style={{ scale, y, padding }}
			ref={containerRef}
			className='h-[300vh] w-screen relative z-2'>
			<motion.div
				style={{ borderRadius }}
				className='w-full h-[calc(100vh-10px)] sticky top-[5px]  overflow-hidden'>
				<PoolCollection scrollYProgress={containerScrollYProgress} />
			</motion.div>
		</motion.div>
	);
}

export default HomeSecondSection;
