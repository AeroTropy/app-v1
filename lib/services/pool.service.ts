/* eslint-disable @typescript-eslint/no-unused-vars */
import { PoolSummaryResponse } from '@/types/web3/pool.types';
import { axiosInstance } from '../axios';
import { ENDPOINTS } from '@/constant/api/endpoints.constant';
import { toast } from 'sonner';

export const fetchPoolSummary = async (): Promise<
	PoolSummaryResponse | undefined
> => {
	try {
		const response = await axiosInstance.get(
			ENDPOINTS.POOL.DETAILS + '?topN=50'
		);
		return response.data;
	} catch (e) {
		toast.error('Failed to fetch pool summary');
	}
};
