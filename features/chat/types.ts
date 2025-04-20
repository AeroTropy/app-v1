export interface ChatMessageType {
	message: string;
	from: 'user' | 'ai';
	timestamp?: string;
}
