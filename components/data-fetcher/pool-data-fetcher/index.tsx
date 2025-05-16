/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { usePoolStore } from '@/store/usePoolStore';
import { useEffect } from 'react';

function PoolDataFetcher() {
	const { getPoolDetails } = usePoolStore();
	useEffect(() => {
		getPoolDetails();
	}, []);
	return null;
}

export default PoolDataFetcher;
