import React from 'react';
import TipTapInput from './TipTapInput';

interface ChatInputProps {
	onSend: (message: string) => void;
	loading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, loading }) => {
	return (
		<TipTapInput
			onSend={onSend}
			loading={loading}
		/>
	);
};

export default ChatInput;
