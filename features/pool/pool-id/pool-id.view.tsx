import React from 'react';
import { PoolFormProvider } from './store/pool-form.store';
import styles from './style/pool-id.module.scss';
import PoolDetails from './components/pool-details/pool-detials';
import PoolForm from './components/pool-form/pool-form';
import { Web3Address } from '@/types/web3/web3.types';
function PoolIdView({ id }: { id: Web3Address }) {
	return (
		<PoolFormProvider poolId={id}>
			<div className={styles.poolIdView}>
				<PoolDetails />
				<PoolForm />
			</div>
		</PoolFormProvider>
	);
}

export default PoolIdView;
