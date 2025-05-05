import React from 'react';
import styles from './pool-collection.module.scss';
import { Web3Address } from '@/types/web3/web3.types';
import { PoolInfo } from './pool.constant';
import Image from 'next/image';
import { MotionValue, useTransform, motion } from 'framer-motion';

function PoolCard({
	poolInfo,
	address,
	no,
	position,
	rotation,
	scrollYProgress,
}: {
	poolInfo: PoolInfo;
	address: Web3Address;
	no: number;
	position: number;
	rotation: number;
	scrollYProgress: MotionValue<number>;
}) {
	const left = useTransform(scrollYProgress, [0, 1], ['50%', `${position}%`]);
	const rotate = useTransform(
		scrollYProgress,
		[0, 1],
		['0deg', `${rotation}deg`]
	);
	return (
		<motion.div
			className={styles.poolCard}
			style={
				{
					'--no': no,
					left,
					rotate,
				} as unknown as React.CSSProperties
			}>
			<div className={styles.poolCardWrapper}>
				<div className={styles.cardInner}>
					<div className={styles.cardFront}>
						<Image
							src={poolInfo.image}
							alt={poolInfo.name}
							width={500}
							height={500}
							priority
						/>
					</div>
					<div className={styles.cardBack}>test</div>
				</div>
			</div>
		</motion.div>
	);
}

export default PoolCard;
