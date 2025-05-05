import React from 'react';
import styles from './pool-collection.module.scss';
import { Web3Address } from '@/types/web3/web3.types';
import { PoolInfo } from './pool.constant';

function PoolCard({
	poolInfo,
	address,
}: {
	poolInfo: PoolInfo;
	address: Web3Address;
}) {
	return <div className={styles.poolCard}></div>;
}

export default PoolCard;
