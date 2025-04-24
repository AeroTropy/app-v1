import { create } from 'zustand';
import { Message } from '@ai-sdk/react';

interface ChatState {
	messages: Message[];
	setMessages: (messages: Message[]) => void;
	addMessage: (message: Message) => void;
	clearMessages: () => void;
}

// Create the store with persistence
export const useChatStore = create<ChatState>()((set) => ({
	messages: [],
	setMessages: (messages: Message[]) => set({ messages }),
	addMessage: (message: Message) =>
		set((state) => ({
			messages: [...state.messages, message],
		})),
	clearMessages: () => set({ messages: [] }),
}));
