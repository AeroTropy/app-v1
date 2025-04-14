import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
import { RootMetadata } from '@/seo';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export const metadata = RootMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} antialiased`}>{children}</body>
		</html>
	);
}
