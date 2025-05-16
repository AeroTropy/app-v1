import { PoolInfo } from '@/constant/data/pool-info.constant';
import { usePoolStore } from '@/store/usePoolStore';
import { PoolStrategy } from '@/types/web3/pool.types';
import React, { useMemo } from 'react';
import styles from '../../style/pool-id.module.scss';
import '@prototype/number.prototype';
import clsx from 'clsx';

function PoolQuickInfo({
	poolInfo,
	poolStats,
}: {
	poolInfo: PoolInfo;
	poolStats?: PoolStrategy;
}) {
	const { isPoolDetailsLoading } = usePoolStore();

	const poolMap = useMemo(() => {
		return [
			{
				title: 'TVL',
				value: isPoolDetailsLoading
					? 'Loading...'
					: poolStats?.tvl
					? Number(poolStats.tvl).formatWithSuffix() + '+'
					: '2.5K+',
			},
			{
				title: 'Active Investors',
				value: isPoolDetailsLoading ? 'Loading...' : '1000+',
			},
			{
				title: 'APR',
				value: isPoolDetailsLoading
					? 'Loading...'
					: poolStats?.averageApr
					? poolStats.averageApr.toFixed(2) + '%'
					: 'N/A',
			},
			{
				title: 'Risk Type',
				value: poolInfo.risk,
			},
		];
	}, [poolStats, poolInfo, isPoolDetailsLoading]);

	return (
		<div className={styles.poolQuickInfo}>
			<div className={styles.poolQuickInfoGrid}>
				{poolMap.map((item) => (
					<div
						key={item.title}
						className={clsx(styles.poolQuickInfoCard)}>
						<div className={styles.cardContent}>
							<h3 className={styles.cardTitle}>{item.title}</h3>
							<p className={styles.cardValue}>{item.value}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default PoolQuickInfo;
