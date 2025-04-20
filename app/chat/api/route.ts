import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import { agentKitConfig } from './chat-api-route.constant';

export async function POST(req: Request) {
	const { tools, getSystemPrompt } = agentKitConfig;

	const clonedReq = req.clone();
	const body = await clonedReq.json();
	const { messages, walletAddress = '' } = body;

	if (!Array.isArray(messages)) {
		return NextResponse.json(
			{ error: 'Invalid messages array' },
			{ status: 400 }
		);
	}

	const result = streamText({
		model: google('gemini-2.5-pro-exp-03-25'),
		messages,
		tools,
		system: getSystemPrompt(walletAddress),
		maxSteps: 10,
	});
	console.log('Result:', result);
	return result.toDataStreamResponse();
}
