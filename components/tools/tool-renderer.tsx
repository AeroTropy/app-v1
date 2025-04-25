'use client';
import { type Message } from '@ai-sdk/react';
import React from 'react';

interface ToolRendererProps {
	message: Message;
	name: string;
	renderer: (message: Message, key: number) => React.ReactNode;
}

function ToolRenderer({ message, name, renderer }: ToolRendererProps) {
	const { parts } = message;
	if (!parts) return null;
	return parts.map((part, idx) => {
		if (part.type === 'tool-invocation') {
			const { toolName } = part.toolInvocation;

			if (toolName === name) {
				return renderer(message, idx);
			}
		}
		return null;
	});
}

export default ToolRenderer;
