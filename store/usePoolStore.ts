import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import { PoolStats } from '@/types/web3/pool.types';
import { create } from 'zustand';

interface PoolState {
	poolDetails: Record<string, PoolStats>;
	setPoolDetails: (poolDetails: PoolState['poolDetails']) => void;
}

const initialPoolState = {
	poolDetails: {
		[POOL_ADDRESSES[0]]: {
			apr: 36,
			tvl: 100000,
			activeInvestors: 100,
		},
		[POOL_ADDRESSES[1]]: {
			apr: 24,
			tvl: 2500000,
			activeInvestors: 100,
		},
		[POOL_ADDRESSES[2]]: {
			apr: 12,
			tvl: 500000,
			activeInvestors: 100,
		},
	},
};

export const usePoolStore = create<PoolState>((set) => ({
	poolDetails: initialPoolState.poolDetails,
	setPoolDetails: (poolDetails) => set({ poolDetails }),
}));
