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

interface ConnectWalletButtonProps {
	btnClassName?: string;
}

function ConnectWalletButton({ btnClassName }: ConnectWalletButtonProps) {
	return (
		<Wallet>
			<CustomConnectWalletButton btnClassName={btnClassName} />
			<CustomWalletDropdown />
		</Wallet>
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

function CustomWalletDropdown() {
	return (
		<WalletDropdown
			classNames={{
				container: styles['wallet-dropdown'],
				swap: {
					swapButton: styles['swap-button'],
				},
			}}>
			<WalletAdvancedWalletActions />
			<WalletAdvancedAddressDetails />
			<WalletAdvancedTransactionActions />
			<WalletDropdownBasename />
			<WalletDropdownFundLink />
			<WalletDropdownDisconnect />
		</WalletDropdown>
	);
}

export default ConnectWalletButton;
