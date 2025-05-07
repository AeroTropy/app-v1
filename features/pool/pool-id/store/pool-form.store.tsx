'use client';
import { StandardToken } from '@/constant/web3/address/tokens.constant';
import { Web3Address } from '@/types/web3/web3.types';
import { createContext, useContext, useRef, useEffect } from 'react';
import { create, useStore } from 'zustand';

// Define transaction status enum
export enum TransactionStatus {
	IDLE = 'idle',
	APPROVING = 'approving',
	APPROVED = 'approved',
	TRANSACTION_PROCESSING = 'transactionProcessing',
	TRANSACTION_FAILED = 'transactionFailed',
	TRANSACTION_SUCCESS = 'transactionSuccess',
}

// Define the store state and actions
interface PoolFormState {
	poolId: Web3Address;
	assetAddress: StandardToken | null;
	assetAmount: number;
	isLoading: boolean;
	transactionStatus: TransactionStatus;

	// Actions
	setAssetAddress: (asset: PoolFormState['assetAddress']) => void;
	setAssetAmount: (amount: number) => void;
	setIsLoading: (isLoading: boolean) => void;
	setTransactionStatus: (status: TransactionStatus) => void;
	reset: () => void;
	resetStore: (newAssetAddress?: PoolFormState['assetAddress']) => void;
}

const initialState = {
	assetAddress: null,
	assetAmount: 0,
	isLoading: false,
	transactionStatus: TransactionStatus.IDLE,
};

// Create a Zustand store
const createPoolFormStore = (
	poolId: Web3Address,
	initialAssetAddress: StandardToken | null = null
) =>
	create<PoolFormState>((set) => ({
		...initialState,
		poolId,
		assetAddress: initialAssetAddress,
		setAssetAddress: (asset) => set({ assetAddress: asset }),
		setAssetAmount: (amount) => set({ assetAmount: amount }),
		setIsLoading: (isLoading) => set({ isLoading }),
		setTransactionStatus: (status) => set({ transactionStatus: status }),
		reset: () =>
			set({
				...initialState,
				assetAddress: null,
			}),
		resetStore: (newAssetAddress) =>
			set({
				...initialState,
				assetAddress:
					newAssetAddress !== undefined ? newAssetAddress : (
						initialAssetAddress
					),
			}),
	}));

// Create a React context for the store
const PoolFormStoreContext = createContext<ReturnType<
	typeof createPoolFormStore
> | null>(null);

// Provider component
interface PoolFormProviderProps {
	children: React.ReactNode;
	initialAssetAddress?: StandardToken | null;
	poolId: Web3Address;
}

export const PoolFormProvider = ({
	children,
	initialAssetAddress = null,
	poolId,
}: PoolFormProviderProps) => {
	const storeRef = useRef<ReturnType<typeof createPoolFormStore> | null>(
		null
	);

	// Create the store if it doesn't exist
	if (!storeRef.current) {
		storeRef.current = createPoolFormStore(poolId, initialAssetAddress);
	}

	// Update the asset when it changes
	useEffect(() => {
		if (storeRef.current) {
			// Reset the form with the new asset
			storeRef.current.getState().resetStore(initialAssetAddress);
		}
	}, [initialAssetAddress]);

	return (
		<PoolFormStoreContext.Provider value={storeRef.current}>
			{children}
		</PoolFormStoreContext.Provider>
	);
};

// Hook to use the store
export const usePoolFormStore = <T,>(
	selector: (state: PoolFormState) => T
): T => {
	const store = useContext(PoolFormStoreContext);
	if (!store) {
		throw new Error(
			'usePoolFormStore must be used within a PoolFormProvider'
		);
	}
	return useStore(store, selector);
};
