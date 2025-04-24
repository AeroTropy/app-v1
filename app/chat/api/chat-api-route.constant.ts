import { AgentKit } from '@coinbase/agentkit';
import { getVercelAITools } from '@coinbase/agentkit-vercel-ai-sdk';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { ViemWalletProvider } from '@coinbase/agentkit';
import { base } from 'viem/chains';
import { createWalletClient, http } from 'viem';
import { Web3Address } from '@/types/web3/web3.types';

export const isMainnet = process.env.CHAIN_NETWORK === 'mainnet';

export const getAgentKitTool = async ({ address }: { address?: string }) => {
	const rpcURL =
		isMainnet ? process.env.BASE_MAINNET_RPC : process.env.BASE_SEPOLIA_RPC;
	const client = createWalletClient({
		account: address as Web3Address,
		chain: base,
		transport: http(rpcURL),
	});

	const walletProvider = new ViemWalletProvider(client);

	const agentKit = await AgentKit.from({
		walletProvider,
	});

	return getVercelAITools(agentKit);
};

const VERCEL_SELECTED_MODEL = process.env.VERCEL_AI_MODEL || 'google';

const VERCEL_MODELS = {
	google: google('gemini-2.5-pro-exp-03-25'),
	anthropic: anthropic('claude-3-7-sonnet-20250219'),
};

export const getCurrentVercelModel = () =>
	VERCEL_MODELS[VERCEL_SELECTED_MODEL as keyof typeof VERCEL_MODELS];

const getSystemPrompt = (
	walletAddress: string
) => `You are a helpful crypto assistant with expertise in blockchain that can interact onchain using the Coinbase Developer Platform AgentKit. You are
empowered to interact onchain using your tools. If you ever need funds, you can request them from the
faucet if you are on network type 'testnet'. If not, you can provide your wallet details and request
funds from the user. Before executing your first action, get the wallet details to see what network
you're on. If there is a 5XX (internal) HTTP error code, ask the user to try again later.

 ${walletAddress ? `The user has connected their wallet with address: ${walletAddress}` : 'The user has not connected their wallet yet.'}

 Current Network type is ${process.env.NETWORK_ID}

If someone
asks you to do something you can't do with your currently available tools, you must say so, and
encourage them to implement it themselves using the CDP SDK + Agentkit, recommend they go to
docs.cdp.coinbase.com for more information. Be concise and helpful with your responses. Refrain from
restating your tools' descriptions unless it is explicitly requested. Also maintain few points:
 - Provide helpful information about cryptocurrencies, blockchain technology, and DeFi
 - Explain complex crypto concepts in simple terms
 - Never provide financial advice or price predictions.


If user ask anything which requires the walletAddress and if wallet is not connected, you must ask the user to connect their wallet.
 `;

export const agentKitConfig = {
	getAgentKitTool,
	getSystemPrompt,
};
