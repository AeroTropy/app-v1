'use client';
import React from 'react';
import {
	ConnectWallet,
	Wallet,
	WalletAdvancedAddressDetails,
	WalletAdvancedTransactionActions,
	WalletAdvancedWalletActions,
	WalletDropdown,
	WalletDropdownBasename,
	WalletDropdownDisconnect,
	WalletDropdownFundLink,
} from '@coinbase/onchainkit/wallet';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import styles from './connect-wallet-button.module.scss';
import { cn } from '@/lib/utils';
import { useWeb3User } from '@/context/web3-user.context';
import If from '@/components/utils/If';

interface ConnectWalletButtonProps {
	btnClassName?: string;
	minimal?: boolean;
	isParentWidth?: boolean;
}

function ConnectWalletButton({
	btnClassName,
	minimal,
	isParentWidth = false,
}: ConnectWalletButtonProps) {
	return (
		<div className={styles['connect-wallet-button-placeholder']}>
			<Wallet className={cn(isParentWidth && 'w-full')}>
				<CustomConnectWalletButton
					btnClassName={cn(btnClassName, { 'w-full': isParentWidth })}
				/>
				<CustomWalletDropdown minimal={minimal} />
			</Wallet>
		</div>
	);
}

function CustomConnectWalletButton({
	btnClassName,
}: Partial<ConnectWalletButtonProps>) {
	const { address } = useWeb3User();
	return (
		<ConnectWallet
			disconnectedLabel='Unlock Web3'
			className={cn(styles['connect-wallet-button'], btnClassName)}>
			<Avatar
				className={styles['avatar']}
				address={address}
			/>
			<Name className={styles['name']} />
		</ConnectWallet>
	);
}

function CustomWalletDropdown({
	minimal = false,
}: Partial<ConnectWalletButtonProps>) {
	return (
		<WalletDropdown
			className='z-100'
			classNames={{
				container: styles['wallet-dropdown'],
				swap: {
					swapButton: styles['swap-button'],
				},
			}}>
			<If isTrue={!minimal}>
				<>
					<WalletAdvancedWalletActions />
					<WalletAdvancedAddressDetails />
				</>
			</If>

			<WalletAdvancedTransactionActions />
			<WalletDropdownBasename />
			<WalletDropdownFundLink />
			<WalletDropdownDisconnect />
		</WalletDropdown>
	);
}

export default ConnectWalletButton;
