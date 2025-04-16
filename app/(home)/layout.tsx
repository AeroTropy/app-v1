import GradientHome from '@/components/background/gradient-home/gradient-home';
import HomeHeader from '@/components/header/home-header/home-header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='relative'>
			<GradientHome />
			<HomeHeader />
			{children}
		</div>
	);
}

export default layout;
