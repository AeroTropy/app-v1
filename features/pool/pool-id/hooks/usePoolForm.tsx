/* eslint-disable react-hooks/exhaustive-deps */
import { useWalletToken } from '@/context/wallet-token-provider';
import { TransactionStatus, usePoolFormStore } from '../store/pool-form.store';
import { useCallback, useMemo } from 'react';
import '@prototype/number.prototype';
import '@prototype/bigint.prototype';
function usePoolForm() {
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

	// Check if the form is valid overall
	const isFormValid = useMemo(() => {
		return isAmountValid && !isFormDisabled && token !== null;
	}, [isAmountValid, isFormDisabled, token]);

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
		isFormValid,
		isSelectDisabled,
	};
}

export default usePoolForm;
