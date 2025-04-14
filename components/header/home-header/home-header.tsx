import React from 'react';
import styles from './home-header.module.scss';
import { Text } from '@/components/ui/typography/Text';
import { cn } from '@/lib/utils';
import ConnectWalletButton from '@/components/features/web3/connect-wallet-button/connect-walleter-button';

function HomeHeader() {
	return (
		<div className={styles['home-header-con']}>
			<div className={cn(styles['home-header'], 'px-10 desktop:px-0')}>
				<div className={styles['header-text']}>
					<Text.Semibold24>AeroTropy</Text.Semibold24>
				</div>
				<ConnectWalletButton />
			</div>
		</div>
	);
}

export default HomeHeader;
