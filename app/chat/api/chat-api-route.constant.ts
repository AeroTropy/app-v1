import { AgentKit, CdpWalletProvider } from '@coinbase/agentkit';
import { getVercelAITools } from '@coinbase/agentkit-vercel-ai-sdk';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';

export const getAgentKitTool = async ({ address }: { address?: string }) => {
	const walletProvider = await CdpWalletProvider.configureWithWallet({
		apiKeyName: process.env.CDP_API_KEY_NAME,
		apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
		networkId: process.env.NETWORK_ID,
		address,
	});

	console.log(address, walletProvider.getAddress());

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
