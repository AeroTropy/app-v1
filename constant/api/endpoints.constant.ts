import { Web3Address } from '@/types/web3/web3.types';

export const BE_URL = process.env.NEXT_PUBLIC_BE_URL || '';

export const ENDPOINTS = {
	CHAT: {
		POST: `${BE_URL}/v1/ai-agent/chat/stream`,
	},
	PORTFOLIO: {
		GET: (walletAddress: Web3Address) =>
			`${BE_URL}/v1/dashboard/balances/${walletAddress}`,
	},
};
