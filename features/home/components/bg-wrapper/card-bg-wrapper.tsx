import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import { Canvas } from '@react-three/fiber';
import React from 'react';

function PoolCardBgWrapper() {
	return (
		<div className='absolute inset-0 -z-10 h-full w-full bg-white'>
			<Canvas>
				<color
					attach='background'
					args={['#ececec']}
				/>

				<EffectComposer>
					<Bloom
						luminanceThreshold={0}
						luminanceSmoothing={0.9}
						height={300}
					/>
					<Noise opacity={0.02} />
				</EffectComposer>
			</Canvas>
		</div>
	);
}

export default PoolCardBgWrapper;
