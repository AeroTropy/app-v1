'use client';
import React, { useEffect, useRef } from 'react';
import { LenisRef, ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';

function SmoothScroll({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		function update(data: { timestamp: number }) {
			const time = data.timestamp;
			lenisRef.current?.lenis?.raf(time);
		}

		frame.update(update, true);

		return () => cancelFrame(update);
	}, []);

	return (
		<ReactLenis
			ref={lenisRef}
			root
			options={{
				duration: 1.2,
				smoothWheel: true,
				autoRaf: false,
			}}>
			{children}
		</ReactLenis>
	);
}

export default SmoothScroll;
