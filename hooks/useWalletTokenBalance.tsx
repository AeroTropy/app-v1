import { useReadContract } from 'wagmi';
import tokenAbi from '@/web3/abi/token.abi.json';

import '@prototype/bigint.prototype';
import { Web3Address } from '@/types/web3/web3.types';
import { useWeb3User } from '@/context/web3-user.context';

interface TokenBalanceParams {
	decimals?: number;
	address?: Web3Address;
}

/**
 * Hook to fetch and format token balance for a single token
 */
export const useWalletTokenBalance = (
	tokenAddress: Web3Address | undefined,
	{ decimals = 18, address }: TokenBalanceParams = {}
) => {
	const { address: walletAccount } = useWeb3User();
	const wAccount = address ?? walletAccount;

	const { data, isError, isLoading, isSuccess, error, refetch, queryKey } =
		useReadContract({
			address: tokenAddress,
			abi: tokenAbi,
			functionName: 'balanceOf',
			args: [wAccount],
			query: {
				enabled: !!wAccount,
				refetchOnMount: true,
				refetchOnWindowFocus: true,
			},
		});

	return {
		data: data as bigint,
		formatted: (data as bigint)?.formatBalance(decimals),
		formattedNumber: (data as bigint)?.format(decimals),
		isError,
		isLoading,
		isSuccess,
		error,
		refetch,
		queryKey,
	};
};
