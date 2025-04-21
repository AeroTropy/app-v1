import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: [
		'@coinbase/agentkit',
		'@coinbase/agentkit-vercel-ai-sdk',
		'@ai-sdk/google',
		'@ai-sdk/anthropic',
	],
};

export default nextConfig;
