import React from 'react';
import styles from './pool-collection.module.scss';
import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import PoolCard from './pool-card';
import { POOL_INFO } from '../../../../constant/data/pool-info.constant';
import { MotionValue } from 'framer-motion';

const position = [20, 50, 80];
const rotation = [-6.5, 1.25, 7.5];

function PoolCollection({
	scrollYProgressCenter,
	scrollYProgressEnd,
}: {
	scrollYProgressCenter: MotionValue<number>;
	scrollYProgressEnd: MotionValue<number>;
}) {
	return (
		<div className={styles.poolCon}>
			<div className={styles.poolBody}>
				{POOL_ADDRESSES.map((address, index) => (
					<PoolCard
						key={address}
						poolInfo={POOL_INFO[address]}
						address={address}
						no={index}
						position={position[index]}
						rotation={rotation[index]}
						scrollYProgressCenter={scrollYProgressCenter}
						scrollYProgressEnd={scrollYProgressEnd}
					/>
				))}
			</div>
		</div>
	);
}

export default PoolCollection;
