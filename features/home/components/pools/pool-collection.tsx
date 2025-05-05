import React from 'react';
import styles from './pool-collection.module.scss';
import { POOL_ADDRESSES } from '@/constant/web3/address/pools.constant';
import PoolCard from './pool-card';
import { POOL_INFO } from './pool.constant';
import { MotionValue } from 'framer-motion';

const position = [5, 50, 95];
const rotation = [-7.5, 1.25, 7.5];

function PoolCollection({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
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
						scrollYProgress={scrollYProgress}
					/>
				))}
			</div>
		</div>
	);
}

export default PoolCollection;
