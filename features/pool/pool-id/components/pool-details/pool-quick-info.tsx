import { PoolInfo } from '@/constant/data/pool-info.constant';
import { PoolStats } from '@/types/web3/pool.types';
import React, { useMemo } from 'react';
import styles from '../../style/pool-id.module.scss';
import '@prototype/number.prototype';
import clsx from 'clsx';

function PoolQuickInfo({
	poolInfo,
	poolStats,
}: {
	poolInfo: PoolInfo;
	poolStats: PoolStats;
}) {
	const poolMap = useMemo(() => {
		return [
			{
				title: 'TVL',
				value: poolStats.tvl.formatWithSuffix() + '+',
			},
			{
				title: 'Active Investors',
				value: poolStats.activeInvestors.formatWithSuffix() + '+',
			},
			{
				title: 'APR',
				value: poolStats.apr + '%',
			},
			{
				title: 'Risk Type',
				value: poolInfo.risk,
			},
		];
	}, [poolStats, poolInfo]);
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
