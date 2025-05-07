import React from 'react';
import styles from '../../style/pool-id.module.scss';
import { Shield, CheckCircle, Clock } from 'lucide-react';

function PoolSecurity() {
	const securityFeatures = [
		{
			icon: <Shield className={styles.securityIcon} />,
			title: 'Smart Contract Audited',
			description: 'All smart contracts are thoroughly audited by leading security firms',
		},
		{
			icon: <CheckCircle className={styles.securityIcon} />,
			title: 'Asset Security',
			description: 'Assets are secured using industry-leading custody solutions',
		},
		{
			icon: <Clock className={styles.securityIcon} />,
			title: '24/7 Monitoring',
			description: 'Continuous monitoring and risk assessment of all positions',
		},
	];

	return (
		<div className={styles.poolSecurity}>
			<h2 className={styles.securityHeading}>Pool Security</h2>
			<div className={styles.securityContainer}>
				{securityFeatures.map((feature, index) => (
					<div key={index} className={styles.securityFeature}>
						<div className={styles.securityIconWrapper}>{feature.icon}</div>
						<div className={styles.securityContent}>
							<h3 className={styles.securityTitle}>{feature.title}</h3>
							<p className={styles.securityDescription}>
								{feature.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default PoolSecurity;
