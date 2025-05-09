'use client';
import React, { useMemo } from 'react';
import styles from './dashboard.module.scss';
import { useWeb3User } from '@/context/web3-user.context';
import ConnectWalletButton from '@/components/features/web3/connect-wallet-button/connect-wallet-button';

import { Btn } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { APP_ROUTE } from '@/constant/routes.constant';
import { POOL_ADDRESSES, POOLS } from '@/constant/web3/address/pools.constant';
import { POOL_INFO, PoolRisk } from '@/constant/data/pool-info.constant';
import { usePoolStore } from '@/store/usePoolStore';
import { useTransitionRouter } from 'next-view-transitions';

function DashboardView() {
	const { isConnected } = useWeb3User();

	return (
		<div className={styles.dashboardView}>
			<div className={styles.dashboardHeader}>
				<div className={styles.dashboardHeader_title}>Dashboard</div>
				<div className={styles.dashboardHeader_description}>
					Manage your deposits and track your earnings across all
					pools
				</div>
			</div>

			{!isConnected ?
				<NotConnectedView />
			:	<ConnectedDashboard />}
		</div>
	);
}

function NotConnectedView() {
	return (
		<div className={styles.notConnected}>
			<div className={styles.notConnected_title}>Connect Your Wallet</div>
			<div className={styles.notConnected_description}>
				Connect your wallet to view your dashboard, manage your
				deposits, and track your earnings across all pools.
			</div>
			<div className={styles.notConnected_button}>
				<ConnectWalletButton btnClassName='!h-[56px] !px-8' />
			</div>
		</div>
	);
}

function ConnectedDashboard() {
	const { poolDetails, userInvestments } = usePoolStore();
	const router = useTransitionRouter();

	// Calculate dashboard metrics
	const dashboardData = useMemo(() => {
		// Calculate total deposit
		const totalDeposit = Object.values(userInvestments).reduce(
			(sum, { investment }) => sum + investment,
			0
		);

		// Calculate weighted average APR
		let weightedAprSum = 0;
		let totalInvestment = 0;

		POOL_ADDRESSES.forEach((address) => {
			const investment = userInvestments[address]?.investment || 0;
			if (investment > 0) {
				const apr = poolDetails[address]?.apr || 0;
				weightedAprSum += investment * apr;
				totalInvestment += investment;
			}
		});

		const currentApr =
			totalInvestment > 0 ? weightedAprSum / totalInvestment : 0;

		// Count active pools
		const activePools = Object.values(userInvestments).filter(
			({ investment }) => investment > 0
		).length;

		return {
			totalDeposit,
			currentApr,
			activePools,
			totalPools: POOL_ADDRESSES.length,
		};
	}, [poolDetails, userInvestments]);

	// Prepare pool data
	const poolsData = useMemo(() => {
		return POOL_ADDRESSES.map((address) => {
			const poolInfo = POOL_INFO[address];
			const poolStats = poolDetails[address];
			const userInvestment = userInvestments[address] || {
				investment: 0,
				earned: 0,
			};

			// Find the pool id by matching the address
			const pool = POOLS.find((p) => p.address === address);
			const poolId =
				pool ? pool.name.toLowerCase().replace(/\s+/g, '-') : '';

			return {
				id: poolId,
				address,
				name: poolInfo.name,
				description: poolInfo.description,
				risk:
					poolInfo.risk === PoolRisk.HIGH ? 'High'
					: poolInfo.risk === PoolRisk.MEDIUM ? 'Medium'
					: 'Low',
				tvl: poolStats.tvl,
				activeInvestors: poolStats.activeInvestors,
				apr: poolStats.apr,
				userInvestment: userInvestment.investment,
				earned: userInvestment.earned,
			};
		});
	}, [poolDetails, userInvestments]);
	return (
		<>
			{/* User Stats */}
			<div className={styles.statsGrid}>
				<div className={styles.statsCard}>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Total Deposit</h3>
						<p className={styles.cardValue}>
							${dashboardData.totalDeposit.toLocaleString()}
						</p>
					</div>
				</div>
				<div className={styles.statsCard}>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Current APR</h3>
						<p className={styles.cardValue}>
							{dashboardData.currentApr.toFixed(2)}%
						</p>
					</div>
				</div>
				<div className={styles.statsCard}>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Active Pools</h3>
						<p className={styles.cardValue}>
							{dashboardData.activePools} /{' '}
							{dashboardData.totalPools}
						</p>
					</div>
				</div>
			</div>

			{/* Pools Section */}
			<div className={styles.poolsSection}>
				<div className={styles.poolsSection_title}>Your Pools</div>
				<div className={styles.poolsList}>
					{poolsData.map((pool) => (
						<div
							key={pool.id}
							className={styles.poolCard}>
							<div className={styles.poolCard_header}>
								<div className='flex items-center gap-3'>
									<div className={styles.poolCard_title}>
										{pool.name}
									</div>
								</div>
								<div className={styles.poolCard_risk}>
									{pool.risk} Risk
								</div>
							</div>

							<div className={styles.poolCard_stats}>
								<div className={styles.poolCard_stats_item}>
									<div
										className={
											styles.poolCard_stats_item_label
										}>
										Your Investment
									</div>
									<div
										className={
											styles.poolCard_stats_item_value
										}>
										${pool.userInvestment.toLocaleString()}
									</div>
								</div>
								<div className={styles.poolCard_stats_item}>
									<div
										className={
											styles.poolCard_stats_item_label
										}>
										Earned
									</div>
									<div
										className={
											styles.poolCard_stats_item_value
										}>
										${pool.earned.toLocaleString()}
									</div>
								</div>
								<div className={styles.poolCard_stats_item}>
									<div
										className={
											styles.poolCard_stats_item_label
										}>
										APR
									</div>
									<div
										className={
											styles.poolCard_stats_item_value
										}>
										{pool.apr}%
									</div>
								</div>
								<div className={styles.poolCard_stats_item}>
									<div
										className={
											styles.poolCard_stats_item_label
										}>
										TVL
									</div>
									<div
										className={
											styles.poolCard_stats_item_value
										}>
										${(pool.tvl / 1000000).toFixed(1)}M
									</div>
								</div>
							</div>

							<div className={styles.poolCard_actions}>
								<div className='flex gap-3'>
									<Btn.Large
										className={cn(styles.poolCard_withdraw)}
										onClick={() =>
											router.push(
												APP_ROUTE.POOL.HOME(
													pool.address
												)
											)
										}>
										Deposit
									</Btn.Large>

									<Btn.Large
										className={cn(styles.poolCard_withdraw)}
										disabled={pool.userInvestment <= 0}>
										Withdraw
									</Btn.Large>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default DashboardView;
