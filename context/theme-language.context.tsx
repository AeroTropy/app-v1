'use client';

import { APP_THEME_KEY } from '@/constant/storage-keys.constant';
import { AppTheme } from '@/types/theme';

import { useSetCookie } from 'cookies-next/client';
import { createContext, useContext, useState } from 'react';
import { Toaster } from 'sonner';

interface ThemeAndLanguageContext {
	theme: AppTheme;
	updateTheme: (theme: AppTheme) => void;
}

const ThemeAndLanguageContext = createContext<ThemeAndLanguageContext | null>(
	null
);

export const useThemeAndLanguage = () => {
	const context = useContext(ThemeAndLanguageContext);
	if (!context) {
		throw new Error(
			'useThemeAndLanguage must be used within a ThemeAndLanguageProvider'
		);
	}
	return context;
};

export const ThemeAndLanguageProvider = ({
	children,
	defaultTheme = AppTheme.LIGHT,
}: {
	children: React.ReactNode;
	defaultTheme: AppTheme;
}) => {
	const setCookie = useSetCookie();
	const [theme, setTheme] = useState<AppTheme>(defaultTheme);

	const updateTheme = (newTheme: AppTheme) => {
		setTheme(newTheme);
		setCookie(APP_THEME_KEY, newTheme);
	};

	return (
		<ThemeAndLanguageContext.Provider value={{ theme, updateTheme }}>
			<body
				data-theme-id={theme}
				className={`app-theme antialiased`}>
				{children}
				<Toaster
					theme={theme}
					closeButton
					duration={5000}
					position='bottom-right'
					toastOptions={{
						classNames: {
							closeButton:
								'!left-[unset] !right-0 !translate-x-[35%] !translate-y-[-35%]',
						},
					}}
				/>
			</body>
		</ThemeAndLanguageContext.Provider>
	);
};
