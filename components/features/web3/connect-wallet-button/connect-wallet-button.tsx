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
}

function ConnectWalletButton({
	btnClassName,
	minimal,
}: ConnectWalletButtonProps) {
	return (
		<Wallet>
			<CustomConnectWalletButton btnClassName={btnClassName} />
			<CustomWalletDropdown minimal={minimal} />
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

function CustomWalletDropdown({
	minimal = false,
}: Partial<ConnectWalletButtonProps>) {
	return (
		<WalletDropdown
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
