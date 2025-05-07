import React from 'react';
import styles from './main-layout.module.scss';
import Image from 'next/image';
import { ASSETS } from '@/constant/assets.constant';
import ConnectWalletButton from '@/components/features/web3/connect-wallet-button/connect-wallet-button';
import { Link } from 'next-view-transitions';
import { APP_ROUTE } from '@/constant/routes.constant';

function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={styles['main-layout']}
			data-lenis-prevent>
			<div className={styles['main-layout-header']}>
				<div className={styles['main-layout-header-left']}>
					<Link
						href={APP_ROUTE.HOME}
						className={styles['main-layout-header-logo']}>
						AeroTropy
					</Link>
				</div>
				<div className={styles['main-layout-header-right']}>
					<ConnectWalletButton />
				</div>
			</div>
			<div className={styles['main-layout-con']}>{children}</div>
			<div className={styles['bg']}>
				<Image
					src={ASSETS.BG.GRAIN2}
					alt='grain'
					priority
					fill
					objectFit='cover'
				/>
			</div>
		</div>
	);
}

export default MainLayout;
