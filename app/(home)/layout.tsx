import GradientHome from '@/components/background/gradient-home/gradient-home';
import HomeHeader from '@/components/header/home-header/home-header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<section className='relative max-w-max-width m-auto'>
			<GradientHome />
			<HomeHeader />
			{children}
		</section>
	);
}

export default layout;
