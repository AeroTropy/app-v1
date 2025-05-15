import { useState, useEffect } from 'react';
import { useWithdrawModalStore, WithdrawTransactionStatus } from '../store/withdraw-modal.store';
import { usePoolStore } from '@/store/usePoolStore';

function useDashboardWithdraw() {
	const {
		poolAddress,
		withdrawAmount,
		currentInvestment,
		setIsLoading,
		setTransactionStatus,
		closeModal,
	} = useWithdrawModalStore((state) => state);
	const { updateUserInvestment } = usePoolStore();

	const [isDisabled, setIsDisabled] = useState(true);

	// Validate withdraw amount
	useEffect(() => {
		const numAmount = parseFloat(withdrawAmount || '0');
		setIsDisabled(
			numAmount <= 0 ||
				numAmount > currentInvestment ||
				withdrawAmount === ''
		);
	}, [withdrawAmount, currentInvestment]);

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

	return {
		poolAddress,
		withdrawAmount,
		currentInvestment,
		setIsLoading,
		setTransactionStatus,
		closeModal,
		isDisabled,
		handleWithdraw
	};
}

export default useDashboardWithdraw;
