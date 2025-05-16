import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import PoolIdView from '@/features/pool/pool-id/pool-id.view';
import { Web3Address } from '@/types/web3/web3.types';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	if (POOL_ADDRESSES.includes(id as Web3Address)) {
		return <PoolIdView id={id as Web3Address} />;
	}
	return notFound();
}
