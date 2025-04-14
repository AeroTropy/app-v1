import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
import { RootMetadata } from '@/seo';
import { headers, cookies } from 'next/headers';
import Web3Provider from '@/context/web3-provider.context';
import { ThemeAndLanguageProvider } from '@/context/theme-language.context';
import { getCookie } from 'cookies-next/server';
import { APP_THEME_KEY } from '@/constant/storage-keys.constant';
import { AppTheme } from '@/types/theme';
import '@coinbase/onchainkit/styles.css';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export const metadata = RootMetadata;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userPrefTheme = await getCookie(APP_THEME_KEY, { cookies });
	const wagmiCookie = (await headers()).get('cookie');

	return (
		<html
			lang='en'
			className={`${inter.variable} antialiased`}>
			<ThemeAndLanguageProvider
				defaultTheme={(userPrefTheme || AppTheme.LIGHT) as AppTheme}>
				<Web3Provider cookie={wagmiCookie}>{children}</Web3Provider>
			</ThemeAndLanguageProvider>
		</html>
	);
}
