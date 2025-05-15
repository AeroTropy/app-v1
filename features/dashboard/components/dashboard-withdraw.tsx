'use client';

import React from 'react';
import { Web3Address } from '@/types/web3/web3.types';
import { useWithdrawModalStore } from '../store/withdraw-modal.store';
import { SingleSelect } from '@/components/ui/select/single-select';
import { TOKENS, StandardToken } from '@/constant/web3/address/tokens.constant';
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
	const selectedToken = useWithdrawModalStore((state) => state.selectedToken);

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
				Available: ${currentInvestment.toLocaleString()}
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

	const handleTokenChange = (_: Web3Address, token: StandardToken) => {
		setSelectedToken(token);
	};

	const renderTokenOption = (option: StandardToken, isSelected: boolean) => {
		return (
			<div
				className={cn(
					`flex items-center gap-2 px-3 py-2 rounded-lg ${isSelected ? 'bg-bg-negative/10' : 'hover:bg-bg-negative'}`
				)}>
				<Image
					src={option.logo}
					alt={option.symbol}
					className='rounded-full'
					width={18}
					height={18}
				/>
				<Text.Regular14 variant={'light'}>
					{option.symbol}
				</Text.Regular14>
			</div>
		);
	};

	const renderTokenValue = (selectedOption: StandardToken | null) => {
		if (!selectedOption) return null;
		return (
			<div className='flex flex-col gap-1'>
				<div className='flex items-center gap-2'>
					<Image
						src={selectedOption.logo}
						alt={selectedOption.symbol}
						className='rounded-full'
						width={18}
						height={18}
					/>
					<Text.Medium14
						variant='light'
						textWeight='semibold'>
						{selectedOption.symbol}
					</Text.Medium14>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.tokenSelectorContainer}>
			<label>Select token</label>
			<SingleSelect
				options={TOKENS}
				value={selectedToken}
				valueKey='address'
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
	return (
		<DialogContent className={styles.dialogContent}>
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
