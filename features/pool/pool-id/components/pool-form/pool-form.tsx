'use client';
import React from 'react';
import styles from '../../style/pool-id.module.scss';
import { SingleSelect } from '@/components/ui/select/single-select';
import { StandardToken, TOKENS } from '@/constant/web3/address/tokens.constant';
import Image from 'next/image';
import { Text } from '@/components/ui/typography/Text';
import { cn } from '@/lib/utils';
import { CustomInput } from '@/components/ui/input';
import { Btn } from '@/components/ui/button';
import usePoolForm from '../../hooks/usePoolForm';
import { Skeleton } from '@/components/ui/skeleton';

function PoolForm() {
	const {
		setToken,
		token,
		assetAmount,
		formattedWalletBalance,
		isFormDisabled,
		handleAmountChange,
		handleMaxClick,
		walletBalanceLoading,
		isConnected,
	} = usePoolForm();

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

	// Render available balance based on loading/error state
	const renderAvailableBalance = () => {
		if (!isConnected) {
			return (
				<Text.Regular12 variant={'light'}>
					Wallet not connected
				</Text.Regular12>
			);
		}
		if (walletBalanceLoading) {
			return <Skeleton className='h-4 w-24' />;
		}
		return (
			<Text.Regular12 variant={'light'}>
				Wallet balance: {formattedWalletBalance || '-'}{' '}
				{token?.symbol || ''}
			</Text.Regular12>
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
		<div className={styles.poolForm}>
			<div className={styles['poolFormCard']}>
				<SingleSelect
					label='Select Token'
					placeholder='Select a token'
					value={token}
					options={TOKENS}
					valueKey='address'
					renderOption={renderTokenOption}
					renderValue={renderTokenValue}
					className='border-none p-0 shadow-none ring-0'
					onChange={(_, option) => setToken(option)}
				/>
			</div>
			<div className={styles['poolFormCard']}>
				<div className='flex flex-col gap-4'>
					<Text.Regular12 variant={'light'}>Amount</Text.Regular12>
					<div className='flex w-full flex-col items-end'>
						<div className='flex items-center gap-1 justify-between w-full'>
							<div className='flex-1'>
								<CustomInput.Amount
									autoFocus
									type='number'
									value={assetAmount}
									onChange={handleAmountChange}
									placeholder={`00.00 ${token?.symbol || ''}`}
									disabled={isFormDisabled}
								/>
							</div>

							<Btn.Self
								onClick={handleMaxClick}
								className='text-link'
								disabled={isFormDisabled}>
								MAX
							</Btn.Self>
						</div>

						<div className='flex items-center gap-1'>
							{renderAvailableBalance()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PoolForm;
