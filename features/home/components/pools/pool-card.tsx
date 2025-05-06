import React from 'react';
import styles from './pool-collection.module.scss';
import { Web3Address } from '@/types/web3/web3.types';
import { PoolInfo } from './pool.constant';
import Image from 'next/image';
import { MotionValue, useTransform, motion } from 'framer-motion';
import PoolCardAction from './pool-card-action';

function PoolCard({
	poolInfo,
	address,
	no,
	position,
	rotation,
	scrollYProgressCenter,
	scrollYProgressEnd,
}: {
	poolInfo: PoolInfo;
	address: Web3Address;
	no: number;
	position: number;
	rotation: number;
	scrollYProgressCenter: MotionValue<number>;
	scrollYProgressEnd: MotionValue<number>;
}) {
	const left = useTransform(
		scrollYProgressCenter,
		[0, 1],
		['50%', `${position}%`]
	);
	const rotate = useTransform(
		scrollYProgressCenter,
		[0, 1],
		['0deg', `${rotation}deg`]
	);
	const rotateYFront = useTransform(
		scrollYProgressEnd,
		[0, 1],
		['0deg', '180deg']
	);
	const rotateYBack = useTransform(
		scrollYProgressEnd,
		[0, 1],
		['180deg', '0deg']
	);
	return (
		<motion.div
			className={styles.poolCard}
			style={
				{
					'--no': no,
					left,
					rotate,
					x: '-50%',
					y: '-40%',
				} as unknown as React.CSSProperties
			}>
			<div className={styles.poolCardWrapper}>
				<div className={styles.cardInner}>
					<motion.div
						style={{ rotateY: rotateYFront }}
						className={styles.cardFront}>
						<Image
							src={poolInfo.image}
							alt={poolInfo.name}
							width={500}
							height={500}
							priority
						/>
					</motion.div>
					<motion.div
						style={{ rotateY: rotateYBack }}
						className={styles.cardBack}>
						<PoolCardAction
							address={address}
							poolInfo={poolInfo}
						/>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}

export default PoolCard;
