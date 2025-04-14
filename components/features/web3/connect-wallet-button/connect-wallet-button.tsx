'use client';
import React from 'react';
import {
	ConnectWallet,
	Wallet,
	WalletAdvancedAddressDetails,
	WalletAdvancedTokenHoldings,
	WalletAdvancedTransactionActions,
	WalletAdvancedWalletActions,
	WalletDropdown,
	WalletDropdownBasename,
	WalletDropdownDisconnect,
	WalletDropdownFundLink,
} from '@coinbase/onchainkit/wallet';
import styles from './connect-wallet-button.module.scss';
import { cn } from '@/lib/utils';

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
	return (
		<ConnectWallet
			disconnectedLabel='Unlock Web3'
			className={cn(styles['connect-wallet-button'], btnClassName)}
		/>
	);
}

function CustomWalletDropdown() {
	return (
		<WalletDropdown>
			<WalletAdvancedWalletActions />
			<WalletAdvancedAddressDetails />
			<WalletAdvancedTransactionActions />
			<WalletDropdownBasename />
			<WalletAdvancedTokenHoldings />
			<WalletDropdownFundLink />
			<WalletDropdownDisconnect />
		</WalletDropdown>
	);
}

export default ConnectWalletButton;
