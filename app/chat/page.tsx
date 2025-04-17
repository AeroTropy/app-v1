import ChatView from '@/features/chat/chat.view';
import React from 'react';

async function page({ searchParams }: { searchParams: { q?: string } }) {
	const { q = '' } = await searchParams;
	return <ChatView initialText={decodeURIComponent(q)} />;
}

export default page;
