/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Web3DataProvider from '@/lib/config/web3.config';
import { cookieStorage, createConfig, createStorage } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { APP_WAGMI_COOKIE_KEY } from '../storage-keys.constant';
import { CURRENT_NETWORK } from '../env.constant';
import { EIP1193RequestFn, Transport } from 'viem';

export const initializeWeb3Config = (web3Provider: Web3DataProvider) => {
	const baseChain = web3Provider.baseChain;

	return createConfig({
		chains: [baseChain], // add baseSepolia for testing
		connectors: [
			coinbaseWallet({
				appName: 'OnchainKit',
				preference: 'smartWalletOnly',
				version: '4',
			}),
		],
		storage: createStorage({
			key: APP_WAGMI_COOKIE_KEY,
			storage: cookieStorage,
		}),
		ssr: true,
		transports: {
			[baseChain.id]: web3Provider.baseTransport,
		} as Record<
			typeof baseChain.id,
			Transport<string, Record<string, any>, EIP1193RequestFn>
		>,
	});
};

declare module 'wagmi' {
	interface Register {
		config: ReturnType<typeof initializeWeb3Config>;
	}
}

export const web3DataProvider = new Web3DataProvider(CURRENT_NETWORK);
export const web3Config = initializeWeb3Config(web3DataProvider);
