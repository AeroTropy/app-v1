'use client';
import React from 'react';
import styles from '../../style/pool-id.module.scss';
import { usePoolFormStore } from '../../store/pool-form.store';
import { POOL_INFO } from '@/constant/data/pool-info.constant';
import { usePoolStore } from '@/store/usePoolStore';
import PoolQuickInfo from './pool-quick-info';
import PoolSecurity from './pool-security';
function PoolDetails() {
	const poolId = usePoolFormStore((state) => state.poolId);
	const { poolDetails: poolStats } = usePoolStore();
	const poolInfo = POOL_INFO[poolId];

	return (
		<div className={styles.poolDetails}>
			<div className={styles.poolDetailsHeader}>
				<div className={styles.poolDetailsHeader_title}>
					{poolInfo.name}
				</div>
				<div className={styles.poolDetailsHeader_description}>
					{poolInfo.description}
				</div>
				<PoolQuickInfo
					poolInfo={poolInfo}
					poolStats={poolStats[poolId]}
				/>
			</div>
			<PoolSecurity />
		</div>
	);
}

export default PoolDetails;
