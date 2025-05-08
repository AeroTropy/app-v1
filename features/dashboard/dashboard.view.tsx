'use client';
import React from 'react';
import styles from './dashboard.module.scss';
import { useWeb3User } from '@/context/web3-user.context';
import ConnectWalletButton from '@/components/features/web3/connect-wallet-button/connect-wallet-button';

import { Btn } from '@/components/ui/button';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { APP_ROUTE } from '@/constant/routes.constant';

// Mock data for the dashboard
const mockUserData = {
	totalDeposit: 12580.45,
	currentApr: 8.75,
	pools: [
		{
			id: 'stable',
			name: 'Stable Pool',
			description: 'Low risk, stable returns',
			risk: 'Low',
			tvl: 5250000,
			activeInvestors: 1250,
			apr: 5.5,
			userInvestment: 5000.25,
			earned: 275.5,
			logo: '/assets/tokens/usdc.svg',
		},
		{
			id: 'balanced',
			name: 'Balanced Pool',
			description: 'Medium risk, balanced returns',
			risk: 'Medium',
			tvl: 8750000,
			activeInvestors: 950,
			apr: 8.75,
			userInvestment: 7580.2,
			earned: 663.25,
			logo: '/assets/tokens/eth.svg',
		},
		{
			id: 'growth',
			name: 'Growth Pool',
			description: 'Higher risk, potential for higher returns',
			risk: 'High',
			tvl: 3250000,
			activeInvestors: 450,
			apr: 12.5,
			userInvestment: 0,
			earned: 0,
			logo: '/assets/tokens/wbtc.svg',
		},
	],
};

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
			:	<ConnectedDashboard userData={mockUserData} />}
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

function ConnectedDashboard({ userData }: { userData: typeof mockUserData }) {
	return (
		<>
			{/* User Stats */}
			<div className={styles.statsGrid}>
				<div className={styles.statsCard}>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Total Deposit</h3>
						<p className={styles.cardValue}>
							${userData.totalDeposit.toLocaleString()}
						</p>
					</div>
				</div>
				<div className={styles.statsCard}>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Current APR</h3>
						<p className={styles.cardValue}>
							{userData.currentApr}%
						</p>
					</div>
				</div>
				<div className={styles.statsCard}>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Active Pools</h3>
						<p className={styles.cardValue}>
							{
								userData.pools.filter(
									(p) => p.userInvestment > 0
								).length
							}{' '}
							/ {userData.pools.length}
						</p>
					</div>
				</div>
			</div>

			{/* Pools Section */}
			<div className={styles.poolsSection}>
				<div className={styles.poolsSection_title}>Your Pools</div>
				<div className={styles.poolsList}>
					{userData.pools.map((pool) => (
						<div
							key={pool.id}
							className={styles.poolCard}>
							<div className={styles.poolCard_header}>
								<div className='flex items-center gap-3'>
									{pool.logo && (
										<Image
											src={pool.logo}
											alt={pool.name}
											width={32}
											height={32}
											className='rounded-full'
										/>
									)}
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
									<Link href={APP_ROUTE.POOL.HOME(pool.id)}>
										<Btn.Primary className='!h-[40px]'>
											Deposit
										</Btn.Primary>
									</Link>
									<button
										className={cn(styles.poolCard_withdraw)}
										disabled={pool.userInvestment <= 0}>
										Withdraw
									</button>
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
