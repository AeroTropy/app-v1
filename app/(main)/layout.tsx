import MainLayout from '@/components/layout/main-layout/MainLayout';
import TransactionStatusListener from '@/components/transaction/transaction-status-listener';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
	return (
		<MainLayout>
			<TransactionStatusListener />
			{children}
		</MainLayout>
	);
}

export default layout;
