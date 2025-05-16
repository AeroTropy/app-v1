import { create } from 'zustand';
import { Portfolio } from '@/types/portfolio/portfolio.types';
import { fetchUserPortfolio } from '@/lib/services/portfolio.service';
import { Web3Address } from '@/types/web3/web3.types';

interface UserPortfolioState {
	portfolioData: Portfolio | null;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string | null;
	getPortfolioData: (walletAddress: Web3Address) => Promise<void>;
	resetPortfolioData: () => void;
}

export const useUserPortfolio = create<UserPortfolioState>((set) => ({
	portfolioData: null,
	isLoading: false,
	isError: false,
	errorMessage: null,

	getPortfolioData: async (walletAddress: Web3Address) => {
		try {
			set({ isLoading: true, isError: false, errorMessage: null });
			const data = await fetchUserPortfolio(walletAddress);

			if (data) {
				set({ portfolioData: data, isLoading: false });
			} else {
				set({
					isLoading: false,
					isError: true,
					errorMessage: 'No portfolio data available',
				});
			}
		} catch (error) {
			set({
				isLoading: false,
				isError: true,
				errorMessage:
					error instanceof Error ?
						error.message
					:	'Failed to fetch portfolio data',
			});
		}
	},

	resetPortfolioData: () => {
		set({
			portfolioData: null,
			isLoading: false,
			isError: false,
			errorMessage: null,
		});
	},
}));
