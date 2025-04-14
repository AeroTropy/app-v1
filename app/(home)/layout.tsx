import GradientHome from '@/components/background/gradient-home/gradient-home';
import HomeHeader from '@/components/header/home-header/home-header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='relative'>
			<GradientHome />
			<HomeHeader />
			<div className='max-w-max-width m-auto'>{children}</div>
		</section>
	);
}

export default layout;
