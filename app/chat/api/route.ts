import { streamText } from 'ai';
import { NextResponse } from 'next/server';
import {
	agentKitConfig,
	getCurrentVercelModel,
} from './chat-api-route.constant';

export async function POST(req: Request) {
	const { getAgentKitTool, getSystemPrompt, customTools } = agentKitConfig;

	const clonedReq = req.clone();
	const body = await clonedReq.json();
	const { messages, walletAddress = '' } = body;

	if (!Array.isArray(messages)) {
		return NextResponse.json(
			{ error: 'Invalid messages array' },
			{ status: 400 }
		);
	}
	const tools = await getAgentKitTool({ address: walletAddress });

	const result = streamText({
		model: getCurrentVercelModel(),
		messages,
		tools: {
			...customTools,
			...tools,
		},
		system: getSystemPrompt(walletAddress),
		maxSteps: 10,
	});

	return result.toDataStreamResponse();
}
