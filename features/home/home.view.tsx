'use client';
import SplitTextAnimation from '@/components/animation/split-text/split-text.animation';
import HomeInputWrapper from '@/components/container/home-input/home-input-wrapper';

import React from 'react';

function HomeView() {
	const [inputValue, setInputValue] = React.useState('');
	return (
		<div className='h-full w-full flex flex-col items-center justify-center mt-10 gap-10'>
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
		</div>
	);
}

export default HomeView;
