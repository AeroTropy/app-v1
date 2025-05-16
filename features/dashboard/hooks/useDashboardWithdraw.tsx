import { useState, useEffect, useMemo } from 'react';
import {
	useWithdrawModalStore,
	WithdrawTransactionStatus,
} from '../store/withdraw-modal.store';
import { PoolManagerModel } from '@/lib/model/pool-manager.model';
import { TokenModel } from '@/lib/model/token.model';
import { useAccount, useWriteContract } from 'wagmi';
import { Web3Address } from '@/types/web3/web3.types';
import { toast } from 'sonner';
import { useUserPortfolio } from '@/store/useUserPortfolio';
import { useWeb3User } from '@/context/web3-user.context';

function useDashboardWithdraw() {
	const {
		poolAddress,
		withdrawAmount,
		currentInvestment,
		setIsLoading,
		setTransactionStatus,
		transactionStatus,
		closeModal,
		selectedToken,
	} = useWithdrawModalStore((state) => state);
	const { address: walletAddress } = useAccount();
	const { writeContractAsync, isPending } = useWriteContract();
	const { getPortfolioData } = useUserPortfolio();
	const { address } = useWeb3User();

	const [isDisabled, setIsDisabled] = useState(true);

	// Validate withdraw amount
	useEffect(() => {
		if (!selectedToken) {
			setIsDisabled(true);
			return;
		}

		const numAmount = parseFloat(withdrawAmount || '0');
		const tokenBalanceNum = parseFloat(selectedToken.balance || '0');

		setIsDisabled(
			numAmount <= 0 ||
				numAmount > tokenBalanceNum ||
				withdrawAmount === '' ||
				!walletAddress
		);
	}, [withdrawAmount, selectedToken, walletAddress]);

	// Handle withdraw action
	const handleWithdraw = async () => {
		if (!poolAddress || !selectedToken || !walletAddress || isDisabled)
			return;

		// Create toast ID outside try/catch for scope access
		let toastId: string | number = '';

		try {
			setIsLoading(true);
			setTransactionStatus(WithdrawTransactionStatus.PROCESSING);

			// Show processing toast
			toastId = toast.loading(
				`Withdrawing ${withdrawAmount} ${selectedToken.token.symbol}...`,
				{
					duration: 60000, // Long duration as transactions can take time
					className: 'withdraw-toast',
				}
			);

			// Create token model instance
			const tokenModel = new TokenModel(
				selectedToken.token.address as Web3Address,
				selectedToken.token.decimals,
				BigInt(selectedToken.token.tokenId)
			);

			// Create pool manager instance
			const poolManager = new PoolManagerModel(
				poolAddress as Web3Address
			);

			// Get withdraw parameters
			const withdrawParams = poolManager.getWithdrawParams({
				token: tokenModel,
				amount: withdrawAmount,
				receiver: walletAddress as Web3Address,
				owner: walletAddress as Web3Address,
			});

			// Execute the withdraw transaction
			const txHash = await writeContractAsync(withdrawParams);
			console.log('Withdraw transaction submitted:', txHash);

			setTransactionStatus(WithdrawTransactionStatus.SUCCESS);

			toast.success(
				`Successfully withdrew ${withdrawAmount} ${selectedToken.token.symbol}`,
				{
					id: toastId,
					duration: 5000,
				}
			);
			setTimeout(() => {
				getPortfolioData(address as Web3Address);
				closeModal();
			}, 2000);
		} catch (error) {
			setTransactionStatus(WithdrawTransactionStatus.FAILED);

			// Update toast with error message
			toast.error(
				`Withdrawal failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
				{
					id: toastId,
					duration: 5000,
				}
			);
		} finally {
			setIsLoading(false);
		}
	};

	// Determine button text based on transaction status and validation
	const buttonText = useMemo(() => {
		// If we're in a transaction process
		if (
			transactionStatus === WithdrawTransactionStatus.PROCESSING ||
			isPending
		) {
			return 'Processing...';
		}

		// If the transaction failed
		if (transactionStatus === WithdrawTransactionStatus.FAILED) {
			return 'Try Again';
		}

		// If the transaction succeeded
		if (transactionStatus === WithdrawTransactionStatus.SUCCESS) {
			return 'Success!';
		}

		// If no token is selected
		if (!selectedToken) {
			return 'Select Token';
		}

		// Validation states
		if (withdrawAmount === '') {
			return 'Enter Amount';
		}

		if (parseFloat(withdrawAmount) <= 0) {
			return 'Invalid Amount';
		}

		if (
			selectedToken &&
			parseFloat(withdrawAmount) > parseFloat(selectedToken.balance)
		) {
			return 'Insufficient Balance';
		}

		// Default state - ready to withdraw
		return 'Withdraw';
	}, [withdrawAmount, selectedToken, transactionStatus, isPending]);

	return {
		poolAddress,
		withdrawAmount,
		currentInvestment,
		setIsLoading,
		setTransactionStatus,
		closeModal,
		isDisabled,
		handleWithdraw,
		buttonText,
		selectedToken,
	};
}

export default useDashboardWithdraw;
