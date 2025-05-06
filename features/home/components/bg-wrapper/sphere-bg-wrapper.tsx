'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
			meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
		}
	});

	return (
		<Sphere
			ref={meshRef}
			args={[2, 100, 200]}
			scale={2.5}>
			<MeshDistortMaterial
				color='#0c7144'
				attach='material'
				distort={0.6}
				speed={1.5}
				roughness={0.2}
				metalness={0.8}
			/>
		</Sphere>
	);
};

const SphereBgWrapper: React.FC = () => {
	return (
		<div className='absolute inset-0 -z-10 h-full w-full bg-[#000]'>
			<Canvas
				camera={{ position: [0, 0, 8], fov: 45 }}
				resize={{
					offsetSize: true,
				}}>
				<ambientLight intensity={0.6} />
				<directionalLight
					position={[10, 10, 5]}
					intensity={1.2}
				/>
				<directionalLight
					position={[-8, -4, 7]}
					intensity={1.2}
				/>
				<pointLight
					position={[-10, -10, -5]}
					intensity={0.8}
				/>
				<spotLight
					position={[5, 5, -5]}
					angle={0.3}
					penumbra={0.8}
					intensity={1.5}
					color='#0c7144'
				/>

				<AnimatedSphere />
			</Canvas>
		</div>
	);
};

export default SphereBgWrapper;
