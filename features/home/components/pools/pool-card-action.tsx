import React from 'react';
import { PoolInfo } from './pool.constant';
import { Web3Address } from '@/types/web3/web3.types';
import PoolCardBgWrapper from '../bg-wrapper/card-bg-wrapper';

function PoolCardAction({
	address,
	poolInfo,
}: {
	address: Web3Address;
	poolInfo: PoolInfo;
}) {
	return (
		<div className='w-full h-full relative isolate'>
			<PoolCardBgWrapper />
		</div>
	);
}

export default PoolCardAction;
