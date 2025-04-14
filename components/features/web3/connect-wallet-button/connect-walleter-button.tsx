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
} from '@coinbase/onchainkit/wallet';

function ConnectWalletButton() {
	return (
		<Wallet>
			<ConnectWallet />
			<WalletDropdown>
				<WalletAdvancedWalletActions />
				<WalletAdvancedAddressDetails />
				<WalletAdvancedTransactionActions />
				<WalletAdvancedTokenHoldings />
			</WalletDropdown>
		</Wallet>
	);
}

export default ConnectWalletButton;
