/* eslint-disable @typescript-eslint/no-unused-vars */
import { ENDPOINTS } from '@/constant/api/endpoints.constant';
import { axiosInstance } from '../axios';
import { Web3Address } from '@/types/web3/web3.types';
import { toast } from 'sonner';
import { PortfolioPool } from '@/types/portfolio/portfolio.types';

export const fetchUserPortfolio = async (
	walletAddress: Web3Address
): Promise<PortfolioPool[] | undefined> => {
	try {
		const response = await axiosInstance.get(
			ENDPOINTS.PORTFOLIO.GET(walletAddress)
		);
		return response.data;
	} catch (e) {
		toast.error('Failed to fetch portfolio data');
	}
};
