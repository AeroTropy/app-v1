export const APP_ROUTE = {
	HOME: '/',
	CHAT: '/chat',
	POOL: {
		HOME: (id: string) => `/pool/${id}`,
	},
	DASHBOARD: {
		HOME: '/dashboard',
	},
};
