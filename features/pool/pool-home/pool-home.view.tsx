'use client';
import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import PoolCardAction from '@/features/home/components/pools/pool-card-action';
import { POOL_INFO } from '@/features/home/components/pools/pool.constant';
import React from 'react';
import styles from './pool-home.module.scss';

function PoolHomeView() {
	return (
		<div className={styles.poolCon}>
			{POOL_ADDRESSES.map((address) => (
				<div
					key={address}
					className={styles.poolCard}>
					<PoolCardAction
						key={address}
						address={address}
						poolInfo={POOL_INFO[address]}
					/>
				</div>
			))}
		</div>
	);
}

export default PoolHomeView;
