'use client';

import React from 'react';
import { Web3Address } from '@/types/web3/web3.types';
import {
	useWithdrawModalStore,
	WithdrawTransactionStatus,
} from '../store/withdraw-modal.store';
import { SingleSelect } from '@/components/ui/select/single-select';
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
import useDashboardWithdraw from '../hooks/useDashboardWithdraw';
import Image from 'next/image';
import { Text } from '@/components/ui/typography/Text';
import { TokenBalance } from '@/types/portfolio/portfolio.types';

// Input component for the withdraw amount
const WithdrawInput = () => {
	const withdrawAmount = useWithdrawModalStore(
		(state) => state.withdrawAmount
	);
	const setWithdrawAmount = useWithdrawModalStore(
		(state) => state.setWithdrawAmount
	);
	const selectedToken = useWithdrawModalStore((state) => state.selectedToken);

	// Handle input change with validation
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Allow empty string or valid numbers
		if (value === '' || /^\d*\.?\d*$/.test(value)) {
			// Ensure amount doesn't exceed token balance
			if (selectedToken) {
				const numValue = parseFloat(value || '0');
				const maxAmount = parseFloat(selectedToken.balance);
				if (numValue <= maxAmount) {
					setWithdrawAmount(value);
				}
			} else {
				setWithdrawAmount(value);
			}
		}
	};

	// Set max amount
	const handleSetMax = () => {
		if (selectedToken) {
			setWithdrawAmount(selectedToken.balance);
		}
	};

	return (
		<div className={styles.inputContainer}>
			<div className={styles.inputWrapper}>
				<input
					disabled={!selectedToken}
					type='text'
					value={withdrawAmount}
					onChange={handleInputChange}
					placeholder='0.00'
					className={styles.input}
				/>
				<button
					disabled={!selectedToken}
					onClick={handleSetMax}
					className={styles.maxButton}>
					MAX
				</button>
			</div>
			<div className={styles.balanceInfo}>
				{selectedToken ?
					<>Available: {selectedToken.formattedBalance} </>
				:	<>Select a token to view balance</>}
			</div>
		</div>
	);
};

// Withdraw button component
const WithdrawButton = () => {
	const { isDisabled, handleWithdraw, buttonText } = useDashboardWithdraw();

	return (
		<Btn.Secondary
			className={cn(styles.withdrawButton, isDisabled && styles.disabled)}
			disabled={isDisabled}
			onClick={handleWithdraw}>
			{buttonText}
		</Btn.Secondary>
	);
};

// Token selector component
const TokenSelector = () => {
	const selectedToken = useWithdrawModalStore((state) => state.selectedToken);
	const setSelectedToken = useWithdrawModalStore(
		(state) => state.setSelectedToken
	);
	const tokenBalance = useWithdrawModalStore((state) => state.tokenBalance);

	const handleTokenChange = (_: Web3Address, token: TokenBalance) => {
		setSelectedToken(token);
	};

	const renderTokenOption = (option: TokenBalance, isSelected: boolean) => {
		return (
			<div
				className={cn(
					`flex items-center gap-2 px-3 py-2 rounded-lg ${isSelected ? 'bg-bg-negative/10' : 'hover:bg-bg-negative'}`
				)}>
				<Image
					src={option.token.logo}
					alt={option.token.symbol}
					className='rounded-full'
					width={18}
					height={18}
				/>
				<Text.Regular14 variant={'light'}>
					{option.token.symbol}
				</Text.Regular14>
			</div>
		);
	};

	const renderTokenValue = (selectedOption: TokenBalance | null) => {
		if (!selectedOption) return null;
		return (
			<div className='flex flex-col gap-1'>
				<div className='flex items-center gap-2'>
					<Image
						src={selectedOption.token.logo}
						alt={selectedOption.token.symbol}
						className='rounded-full'
						width={18}
						height={18}
					/>
					<Text.Medium14
						variant='light'
						textWeight='semibold'>
						{selectedOption.token.symbol}
					</Text.Medium14>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.tokenSelectorContainer}>
			<label>Select token</label>
			<SingleSelect
				options={tokenBalance}
				value={selectedToken}
				valueKey='token.address'
				labelKey='symbol'
				placeholder='Select token'
				renderOption={renderTokenOption}
				renderValue={renderTokenValue}
				onChange={handleTokenChange}
				className={styles.tokenSelector}
			/>
		</div>
	);
};

// Withdraw dialog content component
const WithdrawDialogContent = () => {
	const { transactionStatus } = useWithdrawModalStore((state) => state);
	return (
		<DialogContent
			className={styles.dialogContent}
			onInteractOutside={(e) => {
				if (
					transactionStatus === WithdrawTransactionStatus.PROCESSING
				) {
					e.preventDefault();
				}
			}}>
			<DialogHeader>
				<DialogTitle className={styles.dialogTitle}>
					Withdraw
				</DialogTitle>
			</DialogHeader>

			<div className={styles.inputSection}>
				<TokenSelector />
				<label>Amount to withdraw</label>
				<WithdrawInput />
			</div>

			<DialogFooter className={styles.dialogFooter}>
				<WithdrawButton />
			</DialogFooter>
		</DialogContent>
	);
};

// Main component that will be imported
interface DashboardWithdrawProps {
	poolAddress: Web3Address;
	poolName: string;
	currentInvestment: number;
	tokenBalance: TokenBalance[];
}

const DashboardWithdraw: React.FC<DashboardWithdrawProps> = (props) => {
	return (
		<WithdrawModalProvider tokenBalance={props.tokenBalance}>
			<DashboardWithdrawContainer {...props} />
		</WithdrawModalProvider>
	);
};

const DashboardWithdrawContainer = ({
	poolAddress,
	poolName,
	currentInvestment,
}: DashboardWithdrawProps) => {
	const { openModal, isOpen, closeModal } = useWithdrawModalStore(
		(state) => state
	);
	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !open && closeModal()}>
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
