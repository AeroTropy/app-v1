'use client';
import React from 'react';
import styles from '../../style/pool-id.module.scss';
import { usePoolFormStore } from '../../store/pool-form.store';
import { usePoolStore } from '@/store/usePoolStore';
import PoolQuickInfo from './pool-quick-info';
import PoolSecurity from './pool-security';
import PoolCharts from './pool-charts';
function PoolDetails() {
	const poolId = usePoolFormStore((state) => state.poolId);
	const { poolDetails } = usePoolStore();
	const currentPool = poolDetails?.[poolId];
	const poolInfo = {
		name: currentPool?.name,
		description: currentPool?.description,
		risk: currentPool?.riskLevel,
	};

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
					poolStats={poolDetails?.[poolId]}
				/>
				<PoolCharts poolStats={poolDetails?.[poolId]} />
			</div>
			<PoolSecurity />
		</div>
	);
}

export default PoolDetails;
