'use client';
import React from 'react';
import { useAccount } from 'wagmi';

interface Web3UserContextType {
	address: string | null;
}

const Web3UserContext = React.createContext<Web3UserContextType | null>(null);

export const useWeb3User = () => {
	const context = React.useContext(Web3UserContext);
	if (!context) {
		throw new Error('useWeb3User must be used within a Web3UserProvider');
	}
	return context;
};

export const Web3UserProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { address } = useAccount();

	return (
		<Web3UserContext.Provider value={{ address: address || null }}>
			{children}
		</Web3UserContext.Provider>
	);
};
