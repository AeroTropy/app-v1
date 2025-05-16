export const isLocalServer =
	(process.env.NEXT_PUBLIC_SERVER || 'local') === 'local';
export const BE_URL = isLocalServer ? '' : process.env.NEXT_PUBLIC_BE_URL || '';

export const ENDPOINTS = {
	CHAT: {
		POST:
			isLocalServer ?
				`${BE_URL}/chat/api`
			:	`${BE_URL}/v1/ai-agent/chat/stream`,
	},
};
