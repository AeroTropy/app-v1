import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import { PoolStats } from '@/types/web3/pool.types';
import { create } from 'zustand';

export interface UserInvestment {
	investment: number;
	earned: number;
}

interface PoolState {
	poolDetails: Record<string, PoolStats>;
	userInvestments: Record<string, UserInvestment>;
	setPoolDetails: (poolDetails: PoolState['poolDetails']) => void;
	setUserInvestments: (userInvestments: PoolState['userInvestments']) => void;
	updateUserInvestment: (address: string, data: Partial<UserInvestment>) => void;
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
	userInvestments: {
		[POOL_ADDRESSES[0]]: { investment: 0, earned: 0 },
		[POOL_ADDRESSES[1]]: { investment: 7580.2, earned: 663.25 },
		[POOL_ADDRESSES[2]]: { investment: 5000.25, earned: 275.5 },
	},
};

export const usePoolStore = create<PoolState>((set) => ({
	poolDetails: initialPoolState.poolDetails,
	userInvestments: initialPoolState.userInvestments,
	setPoolDetails: (poolDetails) => set({ poolDetails }),
	setUserInvestments: (userInvestments) => set({ userInvestments }),
	updateUserInvestment: (address, data) => 
		set((state) => ({
			userInvestments: {
				...state.userInvestments,
				[address]: {
					...state.userInvestments[address],
					...data
				}
			}
		}))
}));
