/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useWalletToken } from '@/context/wallet-token-provider';
import { TransactionStatus, usePoolFormStore } from '../store/pool-form.store';
import { useCallback, useMemo } from 'react';
import '@prototype/number.prototype';
import '@prototype/bigint.prototype';
import { useWriteContract } from 'wagmi';
import { TokenModel } from '@/lib/model/token.model';
import { PoolManagerModel } from '@/lib/model/pool-manager.model';
import { toast } from 'sonner';

import { useCurrentTransactionStore } from '@/store/useCurrentTransactionStore';
import { useWeb3User } from '@/context/web3-user.context';
import { useTransitionRouter } from 'next-view-transitions';
import { APP_ROUTE } from '@/constant/routes.constant';

function usePoolForm() {
	const router = useTransitionRouter();
	const { setToken, token, assetAmount, setAssetAmount, transactionStatus } =
		usePoolFormStore((state) => state);

	const {
		isError: walletBalanceError,
		isLoading: walletBalanceLoading,
		formatted: formattedWalletBalance,
		formattedNumber: formattedWalletBalanceNumber,
		isConnected,
	} = useWalletToken();

	// Maximum amount for the slider (from wallet balance)
	const MAX_AMOUNT = useMemo(() => {
		if (
			walletBalanceLoading ||
			walletBalanceError ||
			!formattedWalletBalanceNumber
		)
			return 0;
		return formattedWalletBalanceNumber;
	}, [
		formattedWalletBalanceNumber,
		walletBalanceLoading,
		walletBalanceError,
	]);

	/**
	 * Handle max button click
	 */
	const handleMaxClick = useCallback(() => {
		if (transactionStatus !== TransactionStatus.IDLE) return;
		if (walletBalanceLoading || walletBalanceError || MAX_AMOUNT <= 0)
			return;
		setAssetAmount(MAX_AMOUNT.toFixedDecimals());
	}, [
		setAssetAmount,
		walletBalanceLoading,
		walletBalanceError,
		MAX_AMOUNT,
		transactionStatus,
	]);

	const handleAmountChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (transactionStatus !== TransactionStatus.IDLE) return;
			const value = e.target.value;
			// Validate input: only allow numbers and decimals
			if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
				setAssetAmount(value);
			}
		},
		[transactionStatus]
	);

	// Check if form inputs should be disabled
	const isFormDisabled = useMemo(() => {
		return (
			walletBalanceError ||
			MAX_AMOUNT <= 0 ||
			transactionStatus !== TransactionStatus.IDLE
		);
	}, [walletBalanceError, MAX_AMOUNT, transactionStatus]);

	// Check if select is disabled
	const isSelectDisabled = useMemo(() => {
		return transactionStatus !== TransactionStatus.IDLE;
	}, [walletBalanceError, MAX_AMOUNT, transactionStatus]);

	// Check if the amount is valid (not exceeding max and not zero/empty)
	const isAmountValid = useMemo(() => {
		if (!assetAmount || assetAmount === '0' || assetAmount === '.') {
			return false;
		}
		const numAmount = parseFloat(assetAmount);
		return numAmount > 0 && numAmount <= MAX_AMOUNT;
	}, [assetAmount, MAX_AMOUNT]);

	const isButtonDisabled = useMemo(() => {
		if (walletBalanceError || !isAmountValid) return true;
		if (MAX_AMOUNT <= 0) return true;
		if (
			[
				TransactionStatus.APPROVING,
				TransactionStatus.TRANSACTION_PROCESSING,
			].includes(transactionStatus)
		)
			return true;
		return false;
	}, [isAmountValid, MAX_AMOUNT, transactionStatus]);

	// --- Deposit Logic ---
	const { address: userAddress, isConnected: isWalletConnected } =
		useWeb3User();
	const { writeContractAsync } = useWriteContract();
	const { setTransaction } = useCurrentTransactionStore();
	const setTransactionStatus = usePoolFormStore(
		(s) => s.setTransactionStatus
	);
	const setIsLoading = usePoolFormStore((s) => s.setIsLoading);
	const reset = usePoolFormStore((s) => s.reset);
	const resetStore = usePoolFormStore((s) => s.resetStore);
	const poolAddress = usePoolFormStore((s) => s.poolId);

	// Handle token approval
	const handleApprove = useCallback(async () => {
		if (!token || !assetAmount || !isWalletConnected || !userAddress) {
			toast.error('Please connect wallet and enter a valid amount.');
			return;
		}

		try {
			setTransactionStatus(TransactionStatus.APPROVING);
			setIsLoading(true);

			// Create token model and get approval parameters
			const tokenModel = new TokenModel(
				token.address,
				token.decimals,
				token.tokenId
			);
			const approveParams = tokenModel.getApproveParams({
				amount: assetAmount,
				spender: poolAddress,
			});

			// Execute the approval transaction
			const txHash = await writeContractAsync(approveParams);

			if (txHash) {
				// Set transaction in the store for monitoring
				setTransaction({
					hash: txHash,
					successToastMessage: `Approved ${token.symbol} for deposit`,
					onSuccess: () => {
						setTransactionStatus(TransactionStatus.APPROVED);
						// Automatically proceed to deposit after approval
						handleDepositAfterApproval();
					},
					onError: () => {
						setTransactionStatus(
							TransactionStatus.TRANSACTION_FAILED
						);
						toast.error(`Failed to approve ${token.symbol}`);
						setIsLoading(false);
					},
				});

				// Show initial info toast
				toast.info(`Approving ${token.symbol} tokens...`);
			}
		} catch (error: any) {
			console.error('Error approving tokens:', error);
			toast.error(
				`Failed to approve ${token?.symbol}. Please try again.`
			);
			setTransactionStatus(TransactionStatus.TRANSACTION_FAILED);
			setIsLoading(false);
		}
	}, [
		token,
		assetAmount,
		isWalletConnected,
		userAddress,
		poolAddress,
		setTransactionStatus,
		writeContractAsync,
		setTransaction,
		setIsLoading,
	]);

	// Handle deposit after approval
	const handleDepositAfterApproval = useCallback(async () => {
		if (!token || !assetAmount || !isWalletConnected || !userAddress) {
			return;
		}

		try {
			setTransactionStatus(TransactionStatus.TRANSACTION_PROCESSING);

			// Create models for the deposit
			const tokenModel = new TokenModel(
				token.address,
				token.decimals,
				token.tokenId
			);
			const poolManager = new PoolManagerModel(poolAddress);

			// Get deposit parameters
			const depositParams = poolManager.getDepositParams({
				token: tokenModel,
				amount: assetAmount,
				receiver: userAddress,
			});

			// Execute the deposit transaction
			const txHash = await writeContractAsync(depositParams);

			if (txHash) {
				// Set transaction in the store for monitoring
				setTransaction({
					hash: txHash,
					successToastMessage: `Successfully deposited ${assetAmount} ${token.symbol}`,
					onSuccess: () => {
						// Set status to success
						setTransactionStatus(
							TransactionStatus.TRANSACTION_SUCCESS
						);
						// Reset the form
						reset();
						setIsLoading(false);
						router.push(APP_ROUTE.DASHBOARD.HOME);
					},
					onError: () => {
						setTransactionStatus(
							TransactionStatus.TRANSACTION_FAILED
						);
						setIsLoading(false);
						toast.error(`Failed to deposit ${token.symbol}`);
					},
				});

				// Show initial info toast
				toast.info(`Depositing ${assetAmount} ${token.symbol}...`);
			}
		} catch (error: any) {
			console.error('Error depositing tokens:', error);
			setTransactionStatus(TransactionStatus.TRANSACTION_FAILED);
			setIsLoading(false);
			toast.error(
				`Failed to deposit ${token?.symbol}. Please try again.`
			);
		}
	}, [
		token,
		assetAmount,
		isWalletConnected,
		userAddress,
		poolAddress,
		setTransactionStatus,
		writeContractAsync,
		setTransaction,
		reset,
		setIsLoading,
	]);

	// Main deposit handler
	const handleDeposit = useCallback(() => {
		if (!token || !assetAmount || !isWalletConnected || !userAddress) {
			toast.error('Please connect wallet and enter a valid amount.');
			return;
		}

		// If not approved yet, start the approval process
		if (transactionStatus === TransactionStatus.IDLE) {
			return handleApprove();
		}

		// If already in approving state, don't do anything
		if (transactionStatus === TransactionStatus.APPROVING) {
			return;
		}

		// Reset the form if transaction failed
		if (transactionStatus === TransactionStatus.TRANSACTION_FAILED) {
			resetStore(token);
			return;
		}

		// If already approved, proceed to deposit
		if (transactionStatus === TransactionStatus.APPROVED) {
			return handleDepositAfterApproval();
		}
	}, [
		token,
		assetAmount,
		isWalletConnected,
		userAddress,
		transactionStatus,
		handleApprove,
		handleDepositAfterApproval,
		resetStore,
	]);

	const getDepositButtonText = () => {
		switch (transactionStatus) {
			case TransactionStatus.APPROVING:
				return 'Approving...';
			case TransactionStatus.APPROVED:
				return 'Approved';
			case TransactionStatus.TRANSACTION_PROCESSING:
				return 'Depositing...';
			case TransactionStatus.TRANSACTION_SUCCESS:
				return 'Success';
			case TransactionStatus.TRANSACTION_FAILED:
				return 'Failed';
			default:
				break;
		}
		if (!token) return 'Select Token';
		if (assetAmount && !isAmountValid) {
			if (parseFloat(assetAmount) > 0 && formattedWalletBalance) {
				return 'Exceeds Balance';
			}
			return 'Enter Valid Amount';
		}
		return 'Deposit';
	};

	return {
		setToken,
		token,
		assetAmount,
		setAssetAmount,
		handleAmountChange,
		handleMaxClick,
		formattedWalletBalance,
		isFormDisabled,
		walletBalanceLoading,
		isConnected,
		isAmountValid,
		isSelectDisabled,
		handleDeposit,
		transactionStatus,
		isButtonDisabled,
		getDepositButtonText,
	};
}

export default usePoolForm;
