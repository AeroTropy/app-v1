import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: [
		'@coinbase/agentkit',
		'@coinbase/agentkit-vercel-ai-sdk',
	],
};

export default nextConfig;
