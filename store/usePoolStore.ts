/* eslint-disable @typescript-eslint/no-unused-vars */
import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import { fetchPoolSummary } from '@/lib/services/pool.service';
import {
	PoolRiskLevel,
	PoolStrategies,
	PoolStrategy,
} from '@/types/web3/pool.types';
import { create } from 'zustand';

export interface UserInvestment {
	investment: number;
	earned: number;
}

const poolTypeAddressMap = {
	[PoolRiskLevel.HIGH]: POOL_ADDRESSES[0],
	[PoolRiskLevel.MEDIUM]: POOL_ADDRESSES[1],
	[PoolRiskLevel.LOW]: POOL_ADDRESSES[2],
};

interface PoolState {
	poolDetails: Record<string, PoolStrategy> | null;
	lastUpdatedTS: number | null;
	isPoolDetailsLoading: boolean;
	setPoolDetails: (poolDetails: PoolState['poolDetails']) => void;
	getPoolDetails: () => Promise<void>;
}

export const usePoolStore = create<PoolState>((set, get) => ({
	poolDetails: null,
	lastUpdatedTS: null,
	isPoolDetailsLoading: false,
	setPoolDetails: (poolDetails) => set({ poolDetails }),
	getPoolDetails: async () => {
		const { lastUpdatedTS } = get();
		if (lastUpdatedTS) {
			const timeDiff = Date.now() - lastUpdatedTS;
			if (timeDiff < 5 * 60 * 1000) {
				return;
			}
		}

		try {
			const poolDetails = await fetchPoolSummary();
			const sanitizedData = Object.entries(
				poolDetails?.strategies || {}
			).reduce(
				(acc, [key, value]) => {
					acc[poolTypeAddressMap[key as PoolRiskLevel]] = value;
					return acc;
				},
				{} as Record<string, PoolStrategy>
			);
			set({
				poolDetails: sanitizedData,
				lastUpdatedTS: poolDetails?.timestamp,
				isPoolDetailsLoading: false,
			});
		} catch (error) {
			set({ isPoolDetailsLoading: false });
		}
	},
}));
