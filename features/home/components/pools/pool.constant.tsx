import { ASSETS } from '@/constant/assets.constant';
import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';

export interface PoolInfo {
	name: string;
	description: string;
	features: { title: string }[];
	comingSoon?: boolean;
	image: string;
}

export const POOL_INFO: Record<string, PoolInfo> = {
	[POOL_ADDRESSES[0]]: {
		name: 'High Growth Pool',
		description:
			'Aggressive growth strategy focusing on emerging crypto assets and DeFi protocols with higher potential returns',
		features: [
			{ title: 'Emerging DeFi Assets' },
			{ title: 'Yield Optimization' },
			{ title: 'Active Rebalancing' },
		],
		image: ASSETS.POOL.HIGH_GROWTH,
	},
	[POOL_ADDRESSES[1]]: {
		name: 'Balanced Growth Pool',
		description:
			'Balanced approach with established crypto assets, providing moderate growth with managed risk',
		features: [
			{ title: 'Blue-chip Assets' },
			{ title: 'Risk Management' },
			{ title: 'Regular Optimization' },
		],
		image: ASSETS.POOL.BALANCED_GROWTH,
	},
	[POOL_ADDRESSES[2]]: {
		name: 'Stable Growth Pool',
		description:
			'Conservative strategy focused on capital preservation using stablecoins and established assets',
		features: [
			{ title: 'Stablecoin Focus' },
			{ title: 'Capital Protection' },
			{ title: 'Consistent Returns' },
		],
		image: ASSETS.POOL.STABLE_GROWTH,
	},
};
