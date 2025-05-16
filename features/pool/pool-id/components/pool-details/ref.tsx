import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from 'recharts';
import { PieChart, Pie, Legend, Sector } from 'recharts';
import { TrendingUp, AlertTriangle, DollarSign, BarChart2 } from 'lucide-react';

export default function HighRiskFund() {
	const [activePool, setActivePool] = useState(null);
	const [activePieIndex, setActivePieIndex] = useState(0);

	// This would come from your API in a real app
	const poolsData = [
		{
			id: '0xaf2baac6d043d22f9ce14439228fbbf90c108a1dc809e32ad4e7e9e13fc941ac',
			token0: {
				symbol: 'VIRTUAL',
				name: 'Virtual Protocol',
				address: '0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b',
			},
			token1: {
				symbol: 'USDC',
				name: 'USD Coin',
				address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			},
			feeTier: '3000',
			apr: 267.94,
			tvl: '43334.92',
			volatility: 80.71,
			sharpeRatio: 1.93,
			volume7d: '62700.46',
		},
		{
			id: '0x438c7f6a3b32fdcf043ad3285dbc128486df894a1f3d448b1da38b2f2a1a43cb',
			token0: {
				symbol: 'USDC',
				name: 'USD Coin',
				address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			},
			token1: {
				symbol: 'KTA',
				name: 'Keeta',
				address: '0xc0634090f2fe6c6d75e61be2b949464abb498973',
			},
			feeTier: '10000',
			apr: 62.22,
			tvl: '378754.74',
			volatility: 23.89,
			sharpeRatio: 2.38,
			volume7d: '53839.74',
		},
		{
			id: '0xe070797535b13431808f8fc81fdbe7b41362960ed0b55bc2b6117c49c51b7eb9',
			token0: {
				symbol: 'ETH',
				name: 'Ethereum',
				address: '0x0000000000000000000000000000000000000000',
			},
			token1: {
				symbol: 'USDC',
				name: 'USD Coin',
				address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			},
			feeTier: '3000',
			apr: 21.39,
			tvl: '81133.03',
			volatility: 8.24,
			sharpeRatio: 4.0,
			volume7d: '24179.01',
		},
		{
			id: '0x4ccd3870f433dcdca5cd160dcdc2ad7d6b1fb456cd151c9aa76448ae994d6026',
			token0: {
				symbol: 'FLOCK',
				name: 'FLock.io',
				address: '0x5ab3d4c385b400f3abb49e80de2faf6a88a7b691',
			},
			token1: {
				symbol: 'USDC',
				name: 'USD Coin',
				address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
			},
			feeTier: '10000',
			apr: 18.72,
			tvl: '62139.56',
			volatility: 2.62,
			sharpeRatio: 8.13,
			volume7d: '3648.25',
		},
	];

	// Calculate total TVL for the fund
	const totalTVL = poolsData.reduce(
		(sum, pool) => sum + parseFloat(pool.tvl),
		0
	);

	// Calculate weighted average APR for the fund
	const weightedAPR = poolsData.reduce((sum, pool) => {
		const weight = parseFloat(pool.tvl) / totalTVL;
		return sum + pool.apr * weight;
	}, 0);

	// Calculate weighted average volatility
	const weightedVolatility = poolsData.reduce((sum, pool) => {
		const weight = parseFloat(pool.tvl) / totalTVL;
		return sum + pool.volatility * weight;
	}, 0);

	// Calculate weighted average Sharpe ratio
	const weightedSharpeRatio = poolsData.reduce((sum, pool) => {
		const weight = parseFloat(pool.tvl) / totalTVL;
		return sum + pool.sharpeRatio * weight;
	}, 0);

	// Prepare data for the TVL allocation pie chart
	const tvlAllocationData = poolsData.map((pool) => ({
		name: `${pool.token0.symbol}-${pool.token1.symbol}`,
		value: parseFloat(pool.tvl),
		color: getPoolColor(pool.token0.symbol, pool.token1.symbol),
	}));

	// Function to generate consistent colors based on token pairs
	function getPoolColor(token0, token1) {
		const colors = [
			'#FF6384',
			'#36A2EB',
			'#FFCE56',
			'#4BC0C0',
			'#9966FF',
			'#FF9F40',
		];
		const combinedTokens = `${token0}-${token1}`;

		// Simple hash function to get consistent color index
		const hash = combinedTokens
			.split('')
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return colors[hash % colors.length];
	}

	// Format numbers with commas
	const formatNumber = (num) => {
		return parseFloat(num).toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	// Calculate risk level based on volatility
	const getRiskLevel = (volatility) => {
		if (volatility < 10) return 'Low';
		if (volatility < 30) return 'Medium';
		return 'High';
	};

	const renderActiveShape = (props) => {
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
					y={ey}
					dy={18}
					textAnchor={textAnchor}
					fill='#999'>
					{`(${(percent * 100).toFixed(2)}%)`}
				</text>
			</g>
		);
	};

	const onPieEnter = (_, index) => {
		setActivePieIndex(index);
	};

	return (
		<div className='bg-gray-50 min-h-screen p-6'>
			<div className='max-w-6xl mx-auto'>
				{/* Fund Header */}
				<div className='bg-white rounded-lg shadow-md p-6 mb-6'>
					<div className='flex items-center justify-between mb-4'>
						<h1 className='text-2xl font-bold'>High Risk Fund</h1>
						<div className='flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full'>
							<AlertTriangle className='w-4 h-4 mr-1' />
							<span className='text-sm font-medium'>
								High Risk
							</span>
						</div>
					</div>

					{/* Fund overview metrics */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						<div className='bg-gray-50 p-4 rounded-lg'>
							<p className='text-gray-500 text-sm'>
								Total Value Locked
							</p>
							<div className='flex items-center'>
								<DollarSign className='text-blue-500 w-5 h-5 mr-1' />
								<p className='text-xl font-bold'>
									${formatNumber(totalTVL)}
								</p>
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<p className='text-gray-500 text-sm'>Average APR</p>
							<div className='flex items-center'>
								<TrendingUp className='text-green-500 w-5 h-5 mr-1' />
								<p className='text-xl font-bold'>
									{weightedAPR.toFixed(2)}%
								</p>
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<p className='text-gray-500 text-sm'>Volatility</p>
							<div className='flex items-center'>
								<BarChart2 className='text-purple-500 w-5 h-5 mr-1' />
								<p className='text-xl font-bold'>
									{weightedVolatility.toFixed(2)}
								</p>
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg'>
							<p className='text-gray-500 text-sm'>
								Sharpe Ratio
							</p>
							<div className='flex items-center'>
								<div className='w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-1'>
									S
								</div>
								<p className='text-xl font-bold'>
									{weightedSharpeRatio.toFixed(2)}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Fund Allocation */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
					<div className='bg-white rounded-lg shadow-md p-6'>
						<h2 className='text-lg font-semibold mb-4'>
							TVL Allocation
						</h2>
						<div className='h-64'>
							<ResponsiveContainer
								width='100%'
								height='100%'>
								<PieChart>
									<Pie
										activeIndex={activePieIndex}
										activeShape={renderActiveShape}
										data={tvlAllocationData}
										cx='50%'
										cy='50%'
										innerRadius={60}
										outerRadius={80}
										fill='#8884d8'
										dataKey='value'
										onMouseEnter={onPieEnter}>
										{tvlAllocationData.map(
											(entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={entry.color}
												/>
											)
										)}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div className='bg-white rounded-lg shadow-md p-6'>
						<h2 className='text-lg font-semibold mb-4'>
							Key Metrics Comparison
						</h2>
						<div className='h-64'>
							<ResponsiveContainer
								width='100%'
								height='100%'>
								<BarChart
									data={poolsData.map((pool) => ({
										name: `${pool.token0.symbol}-${pool.token1.symbol}`,
										apr: pool.apr,
										sharpeRatio: pool.sharpeRatio * 10, // Scale up for visibility
										volatility: pool.volatility,
									}))}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5,
									}}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip
										formatter={(value, name) => {
											if (name === 'sharpeRatio') {
												return [
													(value / 10).toFixed(2),
													'Sharpe Ratio',
												];
											}
											return [
												value.toFixed(2),
												name === 'apr' ? 'APR (%)' : (
													'Volatility'
												),
											];
										}}
									/>
									<Legend />
									<Bar
										dataKey='apr'
										fill='#82ca9d'
										name='APR (%)'
									/>
									<Bar
										dataKey='volatility'
										fill='#ff7a7a'
										name='Volatility'
									/>
									<Bar
										dataKey='sharpeRatio'
										fill='#8884d8'
										name='Sharpe Ratio'
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>

				{/* Underlying Pools */}
				<div className='bg-white rounded-lg shadow-md p-6'>
					<h2 className='text-lg font-semibold mb-4'>
						Underlying Pools
					</h2>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Pool
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										APR
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										TVL
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Allocation
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Risk Level
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										7D Volume
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{poolsData.map((pool) => {
									const allocation = (
										(parseFloat(pool.tvl) / totalTVL) *
										100
									).toFixed(2);
									const riskLevel = getRiskLevel(
										pool.volatility
									);

									return (
										<tr
											key={pool.id}
											className={`hover:bg-gray-50 cursor-pointer ${activePool === pool.id ? 'bg-blue-50' : ''}`}
											onClick={() =>
												setActivePool(
													pool.id === activePool ?
														null
													:	pool.id
												)
											}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='ml-4'>
														<div className='text-sm font-medium text-gray-900'>
															{pool.token0.symbol}
															-
															{pool.token1.symbol}
														</div>
														<div className='text-sm text-gray-500'>
															Fee Tier:{' '}
															{parseInt(
																pool.feeTier
															) / 10000}
															%
														</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{pool.apr.toFixed(2)}%
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													${formatNumber(pool.tvl)}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{allocation}%
												</div>
												<div className='w-full bg-gray-200 rounded-full h-2 mt-1'>
													<div
														className='bg-blue-600 h-2 rounded-full'
														style={{
															width: `${allocation}%`,
														}}></div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<span
													className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
								riskLevel === 'Low' ?
									'bg-green-100 text-green-800'
								: riskLevel === 'Medium' ?
									'bg-yellow-100 text-yellow-800'
								:	'bg-red-100 text-red-800'
							}`}>
													{riskLevel}
												</span>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												${formatNumber(pool.volume7d)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>

				{/* Selected Pool Details */}
				{activePool && (
					<div className='bg-white rounded-lg shadow-md p-6 mt-6'>
						<h2 className='text-lg font-semibold mb-4'>
							Pool Details
						</h2>
						{(() => {
							const pool = poolsData.find(
								(p) => p.id === activePool
							);
							if (!pool) return null;

							return (
								<div>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
										<div>
											<h3 className='font-medium text-gray-700 mb-2'>
												Pool Information
											</h3>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													Pair:
												</span>{' '}
												{pool.token0.name} /{' '}
												{pool.token1.name}
											</p>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													Symbols:
												</span>{' '}
												{pool.token0.symbol} /{' '}
												{pool.token1.symbol}
											</p>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													Fee Tier:
												</span>{' '}
												{parseInt(pool.feeTier) / 10000}
												%
											</p>
											<p className='text-sm text-gray-600 mb-1 truncate'>
												<span className='font-medium'>
													Pool ID:
												</span>{' '}
												{pool.id}
											</p>
										</div>
										<div>
											<h3 className='font-medium text-gray-700 mb-2'>
												Performance Metrics
											</h3>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													APR:
												</span>{' '}
												{pool.apr.toFixed(2)}%
											</p>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													TVL:
												</span>{' '}
												${formatNumber(pool.tvl)}
											</p>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													Volatility:
												</span>{' '}
												{pool.volatility.toFixed(2)}
											</p>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													Sharpe Ratio:
												</span>{' '}
												{pool.sharpeRatio.toFixed(2)}
											</p>
											<p className='text-sm text-gray-600 mb-1'>
												<span className='font-medium'>
													7D Volume:
												</span>{' '}
												${formatNumber(pool.volume7d)}
											</p>
										</div>
									</div>

									<div className='mt-4'>
										<h3 className='font-medium text-gray-700 mb-2'>
											Token Information
										</h3>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div className='border rounded-lg p-4'>
												<h4 className='font-medium'>
													{pool.token0.symbol}
												</h4>
												<p className='text-sm text-gray-600 mb-1'>
													{pool.token0.name}
												</p>
												<p className='text-sm text-gray-500 truncate'>
													{pool.token0.address}
												</p>
											</div>
											<div className='border rounded-lg p-4'>
												<h4 className='font-medium'>
													{pool.token1.symbol}
												</h4>
												<p className='text-sm text-gray-600 mb-1'>
													{pool.token1.name}
												</p>
												<p className='text-sm text-gray-500 truncate'>
													{pool.token1.address}
												</p>
											</div>
										</div>
									</div>
								</div>
							);
						})()}
					</div>
				)}
			</div>
		</div>
	);
}
