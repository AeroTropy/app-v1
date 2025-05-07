import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import PoolIdView from '@/features/pool/pool-id/pool-id.view';
import { Web3Address } from '@/types/web3/web3.types';
import { notFound } from 'next/navigation';
import React from 'react';

async function page({ params: { id } }: { params: { id: Web3Address } }) {
	if (POOL_ADDRESSES.includes(id)) {
		return <PoolIdView id={id} />;
	}
	return notFound();
}

export default page;
