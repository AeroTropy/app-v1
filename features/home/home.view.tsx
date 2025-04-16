'use client';

import { useRef } from 'react';
import HomeHero from './components/home-hero';
import HomeSecondSection from './components/home-second-section';
import { useScroll } from 'framer-motion';

function HomeView() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	return (
		<>
			<div
				className='relative h-[200vh] isolate'
				ref={containerRef}>
				<HomeHero scrollYProgress={scrollYProgress} />
				<HomeSecondSection scrollYProgress={scrollYProgress} />
			</div>
		</>
	);
}

export default HomeView;
