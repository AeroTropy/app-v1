import React from 'react';
import Image from 'next/image';
import { ASSETS } from '@/constant/assets.constant';
import styles from './floating-assets.module.scss';

/**
 * FloatingAssets positions crypto assets in the four corners with floating animation.
 * The component uses absolute positioning and is pointer-events-none to not interfere with content.
 */
const CORNERS = [
	{
		name: 'topLeft',
		style: { top: '50px', left: '30px', animationDelay: '-2s' },
		width: 230,
		height: 230,
	},
	{
		name: 'topRight',
		style: { top: '100px', right: '50px', animationDelay: '4s' },
		width: 190,
		height: 190,
	},
	{
		name: 'bottomLeft',
		style: { bottom: '50px', left: '100px', animationDelay: '-6s' },
		width: 210,
		height: 210,
	},
	{
		name: 'bottomRight',
		style: { bottom: '100px', right: '100px' },
		width: 250,
		height: 250,
	},
];

const cornerAssets = [
	{ src: ASSETS['3D'].BITCOIN, alt: 'Bitcoin' },
	{ src: ASSETS['3D'].ETH, alt: 'Ethereum' },
	{ src: ASSETS['3D'].COINBASE, alt: 'Coinbase' },
	{ src: ASSETS['3D'].UNISWAP, alt: 'Uniswap' },
];

export default function FloatingAssets() {
	return (
		<div className='absolute inset-0 w-full h-full z-0'>
			{cornerAssets.map((asset, idx) => {
				const corner = CORNERS[idx];

				return (
					<div
						key={asset.alt}
						className={`${styles.floatingAsset} ${styles[corner.name]}`}
						style={{
							...corner.style,
							zIndex: 0,
						}}>
						<Image
							src={asset.src}
							alt={asset.alt}
							width={corner.width}
							height={corner.height}
							className={styles.img}
							draggable={false}
							priority={false}
						/>
						<Image
							src={asset.src}
							alt={asset.alt}
							width={corner.width}
							height={corner.height}
							className={styles['img-abs']}
							draggable={false}
							priority={false}
						/>
					</div>
				);
			})}
		</div>
	);
}
