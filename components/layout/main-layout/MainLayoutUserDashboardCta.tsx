'use client';
import React from 'react';
import styles from './main-layout.module.scss';
import { User } from '@phosphor-icons/react';
import { useTransitionRouter } from 'next-view-transitions';
import { APP_ROUTE } from '@/constant/routes.constant';

function MainLayoutUserDashboardCta() {
	const router = useTransitionRouter();
	return (
		<div
			className={styles['user-dashboard']}
			onClick={() => router.push(APP_ROUTE.DASHBOARD.HOME)}>
			<User size={16} />
		</div>
	);
}

export default MainLayoutUserDashboardCta;
