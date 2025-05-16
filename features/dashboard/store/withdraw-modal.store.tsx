'use client';

import { TokenBalance } from '@/types/portfolio/portfolio.types';
import { Web3Address } from '@/types/web3/web3.types';
import { createContext, useContext, useRef } from 'react';
import { create, useStore } from 'zustand';

// Define transaction status enum
export enum WithdrawTransactionStatus {
	IDLE = 'idle',
	PROCESSING = 'processing',
	FAILED = 'failed',
	SUCCESS = 'success',
}

// Define the store state and actions
interface WithdrawModalState {
	isOpen: boolean;
	poolAddress: Web3Address | null;
	poolName: string;
	currentInvestment: number;
	selectedToken: TokenBalance | null;
	withdrawAmount: string;
	isLoading: boolean;
	transactionStatus: WithdrawTransactionStatus;
	tokenBalance: TokenBalance[];
	// Actions
	openModal: (
		poolAddress: Web3Address,
		poolName: string,
		currentInvestment: number
	) => void;
	closeModal: () => void;
	setWithdrawAmount: (amount: string) => void;
	setIsLoading: (isLoading: boolean) => void;
	setTransactionStatus: (status: WithdrawTransactionStatus) => void;
	reset: () => void;
	setSelectedToken: (token: TokenBalance) => void;
}

const initialState = {
	isOpen: false,
	poolAddress: null,
	poolName: '',
	currentInvestment: 0,
	withdrawAmount: '',
	isLoading: false,
	transactionStatus: WithdrawTransactionStatus.IDLE,
	selectedToken: null,
};

// Create a Zustand store
const createWithdrawModalStore = (tokenBalance: TokenBalance[]) =>
	create<WithdrawModalState>((set) => ({
		...initialState,
		tokenBalance,
		openModal: (poolAddress, poolName, currentInvestment) =>
			set({
				isOpen: true,
				poolAddress,
				poolName,
				currentInvestment,
				withdrawAmount: currentInvestment.toString(), // Default to full amount
			}),
		closeModal: () => set({ isOpen: false }),
		setWithdrawAmount: (amount) => set({ withdrawAmount: amount }),
		setIsLoading: (isLoading) => set({ isLoading }),
		setTransactionStatus: (status) => set({ transactionStatus: status }),
		reset: () => set(initialState),
		setSelectedToken: (token) => set({ selectedToken: token }),
	}));

// Create a React context for the store
const WithdrawModalStoreContext = createContext<ReturnType<
	typeof createWithdrawModalStore
> | null>(null);

// Provider component
interface WithdrawModalProviderProps {
	children: React.ReactNode;
	tokenBalance: TokenBalance[];
}

export const WithdrawModalProvider = ({
	children,
	tokenBalance,
}: WithdrawModalProviderProps) => {
	const storeRef = useRef<ReturnType<typeof createWithdrawModalStore> | null>(
		null
	);

	// Create the store if it doesn't exist
	if (!storeRef.current) {
		storeRef.current = createWithdrawModalStore(tokenBalance);
	}

	return (
		<WithdrawModalStoreContext.Provider value={storeRef.current}>
			{children}
		</WithdrawModalStoreContext.Provider>
	);
};

// Hook to use the store
export const useWithdrawModalStore = <T,>(
	selector: (state: WithdrawModalState) => T
): T => {
	const store = useContext(WithdrawModalStoreContext);
	if (!store) {
		throw new Error(
			'useWithdrawModalStore must be used within a WithdrawModalProvider'
		);
	}
	return useStore(store, selector);
};
