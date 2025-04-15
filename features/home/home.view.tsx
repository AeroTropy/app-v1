'use client';
import SplitTextAnimation from '@/components/animation/split-text/split-text.animation';
import React from 'react';

function HomeView() {
	return (
		<div className='h-full w-full flex flex-col items-center justify-center mt-10'>
			<SplitTextAnimation
				parentClassName='flex justify-center flex-wrap max-w-[700px] '
				text='All crypto finance, right here.'
				className='text-[72px] font-medium text-text-secondary'
			/>
		</div>
	);
}

export default HomeView;
