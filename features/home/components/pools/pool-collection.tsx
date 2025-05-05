import React from 'react';
import styles from './pool-collection.module.scss';
import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import PoolCard from './pool-card';
import { POOL_INFO } from './pool.constant';

function PoolCollection() {
	return (
		<div className={styles.poolCon}>
			<div className={styles.poolBody}>
				{POOL_ADDRESSES.map((address) => (
					<PoolCard
						key={address}
						poolInfo={POOL_INFO[address]}
						address={address}
					/>
				))}
			</div>
		</div>
	);
}

export default PoolCollection;
