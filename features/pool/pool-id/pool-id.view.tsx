'use client';
import React from 'react';
import { PoolFormProvider, usePoolFormStore } from './store/pool-form.store';
import styles from './style/pool-id.module.scss';
import PoolDetails from './components/pool-details/pool-detials';
import PoolForm from './components/pool-form/pool-form';
import { Web3Address } from '@/types/web3/web3.types';
import { WalletTokenProvider } from '@/context/wallet-token-provider';
function PoolIdView({ id }: { id: Web3Address }) {
	return (
		<PoolFormProvider poolId={id}>
			<PoolWrapper>
				<div className={styles.poolIdView}>
					<PoolDetails />
					<PoolForm />
				</div>
			</PoolWrapper>
		</PoolFormProvider>
	);
}

function PoolWrapper({ children }: { children: React.ReactNode }) {
	const token = usePoolFormStore((state) => state.token);
	return (
		<WalletTokenProvider
			tokenAddress={token?.address}
			decimals={token?.decimals}>
			{children}
		</WalletTokenProvider>
	);
}

export default PoolIdView;
