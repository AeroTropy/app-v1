/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoolData, PoolStrategy } from '@/types/web3/pool.types';
import { usePoolStore } from '@/store/usePoolStore';
import React, { useState, useMemo } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
	PieChart,
	Pie,
	Legend,
	Sector,
} from 'recharts';
import styles from '../../style/pool-id.module.scss';

function PoolCharts({ poolStats }: { poolStats?: PoolStrategy }) {
	const { isPoolDetailsLoading } = usePoolStore();
	const [activePieIndex, setActivePieIndex] = useState(0);
	const [activePool, setActivePool] = useState<string | null>(null);

	// Format numbers with commas
	const formatNumber = (num: string | number) => {
		return parseFloat(num.toString()).toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	// Determine risk level based on volatility
	const getRiskLevel = (volatility: number) => {
		if (volatility < 0.2) return 'Low';
		if (volatility < 0.5) return 'Medium';
		return 'High';
	};

	// Function to generate consistent colors based on token pairs
	const getPoolColor = (token0: string, token1: string) => {
		const colors = [
			'#992777',
			'#B0348B',
			'#CC9C7B',
			'#5C4990',
			'#FCFCFC',
			'#ffd7b2',
		];
		const combinedTokens = `${token0}-${token1}`;

		// Simple hash function to get consistent color index
		const hash = combinedTokens
			.split('')
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return colors[hash % colors.length];
	};

	// Prepare data for the TVL allocation pie chart
	const tvlAllocationData = useMemo(() => {
		if (!poolStats?.topPools || isPoolDetailsLoading) {
			// Return placeholder data when loading or no data
			return [{ name: 'Loading...', value: 100, color: '#cccccc' }];
		}

		return poolStats.topPools.map((pool: PoolData) => ({
			name: `${pool.token0.symbol}-${pool.token1.symbol}`,
			value: parseFloat(pool.tvl),
			color: getPoolColor(pool.token0.symbol, pool.token1.symbol),
		}));
	}, [poolStats, isPoolDetailsLoading]);

	// Prepare data for metrics comparison chart
	const metricsComparisonData = useMemo(() => {
		if (!poolStats?.topPools || isPoolDetailsLoading) {
			return [];
		}

		return poolStats.topPools.map((pool: PoolData) => ({
			name: `${pool.token0.symbol}-${pool.token1.symbol}`,
			apr: pool.apr,
			sharpeRatio: pool.sharpeRatio * 10, // Scale up for visibility
			volatility: pool.volatility,
		}));
	}, [poolStats, isPoolDetailsLoading]);

	// Calculate total TVL and weighted average APR
	const { totalTVL, weightedAPR } = useMemo(() => {
		if (!poolStats?.topPools || isPoolDetailsLoading) {
			return { totalTVL: 0, weightedAPR: 0 };
		}

		let total = 0;
		let aprSum = 0;

		poolStats.topPools.forEach((pool: PoolData) => {
			const tvl = parseFloat(pool.tvl);
			total += tvl;
			aprSum += tvl * pool.apr;
		});

		return {
			totalTVL: total,
			weightedAPR: total > 0 ? aprSum / total : 0,
		};
	}, [poolStats, isPoolDetailsLoading]);

	// Custom active shape for pie chart

	const renderActiveShape = (props: any) => {
		const RADIAN = Math.PI / 180;
		const {
			cx,
			cy,
			midAngle,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle,
			fill,
			payload,
			percent,
			value,
		} = props;
		const sin = Math.sin(-RADIAN * midAngle);
		const cos = Math.cos(-RADIAN * midAngle);
		const sx = cx + (outerRadius + 10) * cos;
		const sy = cy + (outerRadius + 10) * sin;
		const mx = cx + (outerRadius + 30) * cos;
		const my = cy + (outerRadius + 30) * sin;
		const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		const ey = my;
		const textAnchor = cos >= 0 ? 'start' : 'end';

		return (
			<g>
				<text
					x={cx}
					y={cy}
					dy={8}
					textAnchor='middle'
					fill={fill}>
					{payload.name}
				</text>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
				/>
				<Sector
					cx={cx}
					cy={cy}
					startAngle={startAngle}
					endAngle={endAngle}
					innerRadius={outerRadius + 6}
					outerRadius={outerRadius + 10}
					fill={fill}
				/>
				<path
					d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
					stroke={fill}
					fill='none'
				/>
				<circle
					cx={ex}
					cy={ey}
					r={2}
					fill={fill}
					stroke='none'
				/>
				<text
					x={ex + (cos >= 0 ? 1 : -1) * 12}
					y={ey}
					textAnchor={textAnchor}
					fill='#333'>
					{`$${formatNumber(value)}`}
				</text>
				<text
					x={ex + (cos >= 0 ? 1 : -1) * 12}
					y={ey + 20}
					textAnchor={textAnchor}
					fill='#999'>
					{`(${(percent * 100).toFixed(2)}%)`}
				</text>
			</g>
		);
	};

	return (
		<div className={styles.chartsContainer}>
			{isPoolDetailsLoading ?
				<div className={styles.loadingState}>
					<p>Loading charts data...</p>
				</div>
			: !poolStats?.topPools ?
				<div className={styles.errorState}>
					<p>No chart data available</p>
				</div>
			:	<>
					{/* Summary Stats */}
					<div className={styles.summaryStats}>
						<div className={styles.statCard}>
							<h3>Total TVL</h3>
							<p className={styles.statValue}>
								${formatNumber(totalTVL)}
							</p>
						</div>
						<div className={styles.statCard}>
							<h3>Weighted APR</h3>
							<p className={styles.statValue}>
								{weightedAPR.toFixed(2)}%
							</p>
						</div>
					</div>

					{/* Charts Grid */}
					<div className={styles.chartsGrid}>
						{/* TVL Allocation Pie Chart */}
						<div className={styles.chartCard}>
							<h3 className={styles.chartTitle}>
								TVL Allocation
							</h3>
							<div className={styles.chartContainer}>
								<ResponsiveContainer
									width='100%'
									height={300}>
									<PieChart>
										<Pie
											data={tvlAllocationData}
											cx='50%'
											cy='50%'
											labelLine={false}
											activeIndex={activePieIndex}
											activeShape={renderActiveShape}
											outerRadius={100}
											innerRadius={60}
											dataKey='value'
											onMouseEnter={(_, index) =>
												setActivePieIndex(index)
											}>
											{tvlAllocationData.map(
												(entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={entry.color}
													/>
												)
											)}
										</Pie>
										<Tooltip
											formatter={(value: any) => [
												`$${formatNumber(value)}`,
												'TVL',
											]}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
						</div>

						{/* Metrics Comparison Bar Chart */}
						<div className={styles.chartCard}>
							<h3 className={styles.chartTitle}>
								Key Metrics Comparison
							</h3>
							<div className={styles.chartContainer}>
								<ResponsiveContainer
									width='100%'
									height={300}>
									<BarChart
										data={metricsComparisonData}
										margin={{
											top: 20,
											right: 30,
											left: 20,
											bottom: 40,
										}}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis
											dataKey='name'
											angle={-45}
											textAnchor='end'
											height={70}
										/>
										<YAxis />
										<Tooltip
											contentStyle={{
												backgroundColor:
													'rgba(0, 0, 0, 0.8)',
												color: '#fff',
												borderRadius: '8px',
											}}
											formatter={(
												value: string,
												name: string
											) => {
												if (name === 'sharpeRatio') {
													return [
														(
															Number(value) / 10
														).toFixed(2),
														'Sharpe Ratio',
													];
												}
												return [
													Number(value).toFixed(2),
													name === 'apr' ? 'APR (%)'
													:	'Volatility',
												];
											}}
										/>
										<Legend />
										<Bar
											dataKey='apr'
											fill='#902579'
											name='APR (%)'
										/>
										<Bar
											dataKey='volatility'
											fill='#CD9C7B'
											name='Volatility'
										/>
										<Bar
											dataKey='sharpeRatio'
											fill='#7F669C'
											name='Sharpe Ratio'
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>

					{/* Underlying Pools Table */}
					<div className={styles.poolsTableCard}>
						<h3 className={styles.chartTitle}>Underlying Pools</h3>
						<div className={styles.tableContainer}>
							<table className={styles.poolsTable}>
								<thead>
									<tr>
										<th>Pool</th>
										<th>APR</th>
										<th>TVL</th>
										<th>Allocation</th>
										<th>Risk Level</th>
										<th>7D Volume</th>
									</tr>
								</thead>
								<tbody>
									{poolStats.topPools.map(
										(pool: PoolData) => {
											const allocation = (
												(parseFloat(pool.tvl) /
													totalTVL) *
												100
											).toFixed(2);
											const riskLevel = getRiskLevel(
												pool.volatility
											);

											return (
												<tr
													key={pool.id}
													className={`${styles.tableRow} ${activePool === pool.id ? styles.activeRow : ''}`}
													onClick={() =>
														setActivePool(
															(
																pool.id ===
																	activePool
															) ?
																null
															:	pool.id
														)
													}>
													<td>
														<div
															className={
																styles.poolInfo
															}>
															<div
																className={
																	styles.poolName
																}>
																{
																	pool.token0
																		.symbol
																}
																-
																{
																	pool.token1
																		.symbol
																}
															</div>
															<div
																className={
																	styles.feeTier
																}>
																Fee Tier:{' '}
																{parseInt(
																	pool.feeTier
																) / 10000}
																%
															</div>
														</div>
													</td>
													<td>
														<div
															className={
																styles.aprValue
															}>
															{pool.apr.toFixed(
																2
															)}
															%
														</div>
													</td>
													<td>
														<div>
															$
															{formatNumber(
																pool.tvl
															)}
														</div>
													</td>
													<td>
														<div>{allocation}%</div>
														<div
															className={
																styles.allocationBar
															}>
															<div
																className={
																	styles.allocationFill
																}
																style={{
																	width: `${allocation}%`,
																}}></div>
														</div>
													</td>
													<td>
														<span
															className={`${styles.riskBadge} ${
																(
																	riskLevel ===
																	'Low'
																) ?
																	styles.lowRisk
																: (
																	riskLevel ===
																	'Medium'
																) ?
																	styles.mediumRisk
																:	styles.highRisk
															}`}>
															{riskLevel}
														</span>
													</td>
													<td>
														<div>
															$
															{formatNumber(
																pool.volume7d
															)}
														</div>
													</td>
												</tr>
											);
										}
									)}
								</tbody>
							</table>
						</div>
					</div>

					{/* Selected Pool Details */}
					{activePool && (
						<div className={styles.poolDetailsCard}>
							<h3 className={styles.chartTitle}>Pool Details</h3>
							{(() => {
								const pool = poolStats.topPools.find(
									(p: PoolData) => p.id === activePool
								);
								if (!pool) return null;

								return (
									<div className={styles.poolDetailsGrid}>
										<div
											className={
												styles.poolDetailsSection
											}>
											<h4>Pool Information</h4>
											<p>
												<span>Pair:</span>{' '}
												{pool.token0.name} /{' '}
												{pool.token1.name}
											</p>
											<p>
												<span>Symbols:</span>{' '}
												{pool.token0.symbol} /{' '}
												{pool.token1.symbol}
											</p>
											<p>
												<span>Fee Tier:</span>{' '}
												{parseInt(pool.feeTier) / 10000}
												%
											</p>
											<p className={styles.truncate}>
												<span>Pool ID:</span> {pool.id}
											</p>
										</div>
										<div
											className={
												styles.poolDetailsSection
											}>
											<h4>Performance Metrics</h4>
											<p>
												<span>APR:</span>{' '}
												{pool.apr.toFixed(2)}%
											</p>
											<p>
												<span>TVL:</span> $
												{formatNumber(pool.tvl)}
											</p>
											<p>
												<span>Volatility:</span>{' '}
												{pool.volatility.toFixed(4)}
											</p>
											<p>
												<span>Sharpe Ratio:</span>{' '}
												{pool.sharpeRatio.toFixed(2)}
											</p>
											<p>
												<span>7D Volume:</span> $
												{formatNumber(pool.volume7d)}
											</p>
										</div>
									</div>
								);
							})()}
						</div>
					)}
				</>
			}
		</div>
	);
}

export default PoolCharts;
