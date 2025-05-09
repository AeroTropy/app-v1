'use client';

import React, { useState, useEffect } from 'react';
import { usePoolStore } from '@/store/usePoolStore';
import { Web3Address } from '@/types/web3/web3.types';
import {
	useWithdrawModalStore,
	WithdrawTransactionStatus,
} from '../store/withdraw-modal.store';
import { Btn } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import styles from './dashboard-withdraw.module.scss';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { DialogTrigger } from '@/components/ui/dialog';
import { WithdrawModalProvider } from '../store/withdraw-modal.store';

// Input component for the withdraw amount
const WithdrawInput = () => {
	const currentInvestment = useWithdrawModalStore(
		(state) => state.currentInvestment
	);
	const withdrawAmount = useWithdrawModalStore(
		(state) => state.withdrawAmount
	);
	const setWithdrawAmount = useWithdrawModalStore(
		(state) => state.setWithdrawAmount
	);

	// Handle input change with validation
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Allow empty string or valid numbers
		if (value === '' || /^\d*\.?\d*$/.test(value)) {
			// Ensure amount doesn't exceed current investment
			const numValue = parseFloat(value || '0');
			if (numValue <= currentInvestment) {
				setWithdrawAmount(value);
			}
		}
	};

	// Set max amount
	const handleSetMax = () => {
		setWithdrawAmount(currentInvestment.toString());
	};

	return (
		<div className={styles.inputContainer}>
			<div className={styles.inputWrapper}>
				<input
					type='text'
					value={withdrawAmount}
					onChange={handleInputChange}
					placeholder='0.00'
					className={styles.input}
				/>
				<button
					onClick={handleSetMax}
					className={styles.maxButton}>
					MAX
				</button>
			</div>
			<div className={styles.balanceInfo}>
				Available: ${currentInvestment.toLocaleString()}
			</div>
		</div>
	);
};

// Withdraw button component
const WithdrawButton = () => {
	const {
		poolAddress,
		withdrawAmount,
		currentInvestment,
		setIsLoading,
		setTransactionStatus,
		closeModal,
	} = useWithdrawModalStore((state) => ({
		poolAddress: state.poolAddress,
		withdrawAmount: state.withdrawAmount,
		currentInvestment: state.currentInvestment,
		setIsLoading: state.setIsLoading,
		setTransactionStatus: state.setTransactionStatus,
		closeModal: state.closeModal,
	}));
	const { updateUserInvestment } = usePoolStore((state) => ({
		updateUserInvestment: state.updateUserInvestment,
	}));

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

	return (
		<Btn.Primary
			className={cn(styles.withdrawButton, isDisabled && styles.disabled)}
			disabled={isDisabled}
			onClick={handleWithdraw}>
			Withdraw
		</Btn.Primary>
	);
};

// Withdraw dialog content component
const WithdrawDialogContent = () => {
	const { isOpen, poolName, closeModal, transactionStatus } =
		useWithdrawModalStore((state) => ({
			isOpen: state.isOpen,
			poolName: state.poolName,
			closeModal: state.closeModal,
			transactionStatus: state.transactionStatus,
		}));

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !open && closeModal()}>
			<DialogContent className={styles.dialogContent}>
				<DialogHeader>
					<DialogTitle className={styles.dialogTitle}>
						Withdraw from {poolName}
					</DialogTitle>
				</DialogHeader>

				<div className={styles.inputSection}>
					<label>Amount to withdraw</label>
					<WithdrawInput />
				</div>

				{transactionStatus !== WithdrawTransactionStatus.IDLE && (
					<div
						className={cn(
							styles.transactionStatus,
							transactionStatus ===
								WithdrawTransactionStatus.PROCESSING &&
								styles.processing,
							transactionStatus ===
								WithdrawTransactionStatus.SUCCESS &&
								styles.success,
							transactionStatus ===
								WithdrawTransactionStatus.FAILED &&
								styles.failed
						)}>
						{transactionStatus ===
							WithdrawTransactionStatus.PROCESSING &&
							'Processing withdrawal...'}
						{transactionStatus ===
							WithdrawTransactionStatus.SUCCESS &&
							'Withdrawal successful!'}
						{transactionStatus ===
							WithdrawTransactionStatus.FAILED &&
							'Withdrawal failed. Please try again.'}
					</div>
				)}

				<DialogFooter className={styles.dialogFooter}>
					<WithdrawButton />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// Main component that will be imported
interface DashboardWithdrawProps {
	poolAddress: Web3Address;
	poolName: string;
	currentInvestment: number;
}

const DashboardWithdraw: React.FC<DashboardWithdrawProps> = (props) => {
	return (
		<WithdrawModalProvider>
			<DashboardWithdrawContainer {...props} />
		</WithdrawModalProvider>
	);
};

const DashboardWithdrawContainer = ({
	poolAddress,
	poolName,
	currentInvestment,
}: DashboardWithdrawProps) => {
	const { openModal } = useWithdrawModalStore((state) => ({
		openModal: state.openModal,
	}));
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Btn.SecondaryLarge
					className={cn('!h-[40px]')}
					disabled={currentInvestment <= 0}
					onClick={() => {
						openModal(poolAddress, poolName, currentInvestment);
					}}>
					Withdraw
				</Btn.SecondaryLarge>
			</DialogTrigger>
			<WithdrawDialogContent />
		</Dialog>
	);
};

export default DashboardWithdraw;
