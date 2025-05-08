'use client';
import React from 'react';
import styles from '../../style/pool-id.module.scss';
import { SingleSelect } from '@/components/ui/select/single-select';
import { StandardToken, TOKENS } from '@/constant/web3/address/tokens.constant';
import Image from 'next/image';
import { Text } from '@/components/ui/typography/Text';
import { cn } from '@/lib/utils';
import { usePoolFormStore } from '../../store/pool-form.store';

function PoolForm() {
	const { setToken, token } = usePoolFormStore((state) => state);
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
		</div>
	);
}

export default PoolForm;
