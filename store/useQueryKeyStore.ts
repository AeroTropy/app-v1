import { create } from 'zustand';

/**
 * Store to manage query keys for various data fetching operations
 * This allows us to reference and potentially invalidate queries from anywhere in the app
 */
interface QueryKeyState {
	// wallet balance query keys
	walletBalanceQueryKey: readonly unknown[];

	// Actions

	setWalletBalanceQueryKey: (queryKey: readonly unknown[]) => void;
}

export const useQueryKeyStore = create<QueryKeyState>((set) => ({
	// Initial state

	walletBalanceQueryKey: [],

	// Actions

	setWalletBalanceQueryKey: (queryKey) =>
		set({ walletBalanceQueryKey: queryKey }),
}));
