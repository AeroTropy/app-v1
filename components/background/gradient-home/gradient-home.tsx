import React from 'react';
import styles from './gradient-home.module.scss';
import Image from 'next/image';
import bgImage from '@/assets/background/page_background.webp';

function GradientHome() {
	return (
		<>
			<div className={styles['gradient-con']}>
				<div className={styles['gradient-image']}>
					<Image
						src={bgImage}
						alt='gradient'
						fill
						objectFit='cover'
					/>
				</div>
			</div>
			<div className={styles['gradient-line-con']}>
				<div className={styles['gradient-line']}></div>
			</div>
		</>
	);
}

export default GradientHome;
