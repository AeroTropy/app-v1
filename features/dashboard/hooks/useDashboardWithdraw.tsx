import { useState, useEffect, useMemo } from 'react';
import {
	useWithdrawModalStore,
	WithdrawTransactionStatus,
} from '../store/withdraw-modal.store';
import { usePoolStore } from '@/store/usePoolStore';

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
	const { updateUserInvestment } = usePoolStore();

	const [isDisabled, setIsDisabled] = useState(true);

	// Validate withdraw amount
	useEffect(() => {
		const numAmount = parseFloat(withdrawAmount || '0');
		setIsDisabled(
			numAmount <= 0 ||
				numAmount > currentInvestment ||
				withdrawAmount === '' ||
				selectedToken === null
		);
	}, [withdrawAmount, currentInvestment, selectedToken]);

	// Handle withdraw action
	const handleWithdraw = async () => {
		if (!poolAddress || isDisabled) return;

		try {
			setIsLoading(true);
			setTransactionStatus(WithdrawTransactionStatus.PROCESSING);

			// Simulate transaction delay
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Update user investment in the store
			const withdrawValue = parseFloat(withdrawAmount);
			const remainingInvestment = currentInvestment - withdrawValue;

			// Update the store with new investment amount
			updateUserInvestment(poolAddress, {
				investment: remainingInvestment,
			});

			setTransactionStatus(WithdrawTransactionStatus.SUCCESS);

			// Close modal after successful transaction
			closeModal();
			setTransactionStatus(WithdrawTransactionStatus.IDLE);
		} catch (error) {
			console.error('Withdraw failed:', error);
			setTransactionStatus(WithdrawTransactionStatus.FAILED);
		} finally {
			setIsLoading(false);
		}
	};

	// Determine button text based on transaction status and validation
	const buttonText = useMemo(() => {
		// If we're in a transaction process
		if (transactionStatus === WithdrawTransactionStatus.PROCESSING) {
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

		// Validation states
		if (withdrawAmount === '') {
			return 'Enter Amount';
		}

		if (parseFloat(withdrawAmount) <= 0) {
			return 'Invalid Amount';
		}

		if (parseFloat(withdrawAmount) > currentInvestment) {
			return 'Insufficient Balance';
		}

		// Default state - ready to withdraw
		return 'Withdraw';
	}, [withdrawAmount, currentInvestment, transactionStatus]);

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
