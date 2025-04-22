'use client';

import { useRef } from 'react';
import HomeHero from './components/home-hero';
import HomeSecondSection from './components/home-second-section';
import { useScroll } from 'framer-motion';
import ChatInputWrapper from '@/components/container/chat-input/chat-input-wrapper';

function HomeView() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	return (
		<>
			<div
				className='relative h-[200vh]'
				ref={containerRef}>
				<HomeHero scrollYProgress={scrollYProgress} />
				<HomeSecondSection scrollYProgress={scrollYProgress} />
			</div>
			<div
				className='fixed left-1/2 bottom-[30px] z-50'
				style={{ transform: 'translateX(-50%)' }}>
				<ChatInputWrapper />
			</div>
		</>
	);
}

export default HomeView;
