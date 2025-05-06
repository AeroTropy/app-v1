import { ASSETS } from '@/constant/assets.constant';
import Image from 'next/image';

function PoolCardBgWrapper() {
	return (
		<div className='absolute inset-0 -z-10 h-full w-full'>
			<Image
				src={ASSETS.BG.GRAIN}
				alt='grain'
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				fill
			/>
		</div>
	);
}

export default PoolCardBgWrapper;
