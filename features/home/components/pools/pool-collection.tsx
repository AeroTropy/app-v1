import React from 'react';
import styles from './pool-collection.module.scss';
function PoolCollection() {
	return (
		<div className={styles.poolCon}>
			<div className={styles.poolHeader}>Our Pools</div>
			<div className={styles.poolBody}></div>
		</div>
	);
}

export default PoolCollection;
