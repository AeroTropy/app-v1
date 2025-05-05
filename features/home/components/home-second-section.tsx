import { MotionValue, useTransform, motion } from 'framer-motion';
import React from 'react';
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

	return (
		<motion.div
			data-scroll-id='home-second-section'
			style={{ scale, y, padding }}
			className='h-screen w-screen relative z-2'>
			<motion.div
				style={{ borderRadius }}
				className='w-full h-full overflow-hidden'>
				<PoolCollection />
			</motion.div>
		</motion.div>
	);
}

export default HomeSecondSection;
