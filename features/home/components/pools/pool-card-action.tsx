import React, { useMemo } from 'react';
import { PoolInfo } from './pool.constant';
import { Web3Address } from '@/types/web3/web3.types';
import PoolCardBgWrapper from '../bg-wrapper/card-bg-wrapper';
import styles from './pool-collection.module.scss';
import { usePoolStore } from '@/store/usePoolStore';
import {
	ArrowCircleUpRight,
	CurrencyDollar,
	Pulse,
	SealCheck,
	TrendUp,
	UsersThree,
} from '@phosphor-icons/react';
import '@prototype/number.prototype';
import { useTransitionRouter } from 'next-view-transitions';
import { APP_ROUTE } from '@/constant/routes.constant';

function PoolCardAction({
	address,
	poolInfo,
}: {
	address: Web3Address;
	poolInfo: PoolInfo;
}) {
	const { poolDetails } = usePoolStore();
	const poolStats = poolDetails[address];
	const router = useTransitionRouter();

	const poolMap = useMemo(() => {
		return [
			{
				title: 'TVL',
				value: poolStats.tvl.formatWithSuffix() + '+',
				I: CurrencyDollar,
			},
			{
				title: 'Active Investors',
				value: poolStats.activeInvestors.formatWithSuffix() + '+',
				I: UsersThree,
			},
			{
				title: 'APR',
				value: poolStats.apr + '%',
				I: TrendUp,
			},
			{
				title: 'Risk Type',
				value: poolInfo.risk,
				I: Pulse,
			},
		];
	}, [poolStats, poolInfo]);

	const handlePoolClick = () => {
		router.push(APP_ROUTE.POOL.HOME(address));
	};

	return (
		<div
			className={styles.poolCardAction}
			onClick={handlePoolClick}>
			<PoolCardBgWrapper />
			<div className={styles.aprCon}>
				<p>APR</p>
				<p className={styles.aprText}>{poolStats.apr}</p>
				<p>%</p>
			</div>
			<div className={styles.heading}>{poolInfo.name}</div>
			<div className={styles.gridCon}>
				{poolMap.map((item, idx) => (
					<div
						key={idx}
						className={styles.gridItem}>
						<div className={styles.svg}>
							<item.I size={16} />
						</div>
						<div className={styles.gridItemText}>
							<p>{item.title}</p>
							<p>{item.value}</p>
						</div>
					</div>
				))}
			</div>
			<div className={styles.footer}>
				<ul className={styles.footerText}>
					<li>100% Secured</li>
					<li>24/7 Monitored</li>
					<li>Smart Contract Audited</li>
				</ul>
				<SealCheck
					size={48}
					color='#F0E9FF'
				/>
			</div>
			<div className={styles.arrowCon}>
				<ArrowCircleUpRight size={24} />
			</div>
		</div>
	);
}

export default PoolCardAction;
