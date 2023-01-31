import './globals.css';
import { Inter } from '@next/font/google';
import { cx } from 'class-variance-authority';
import { cookies } from 'next/headers';
import { z } from 'zod';

import Html from './Html';

import Logo from '@/components/Logo';
import { ThemeProvider, ThemeToggle } from '@/components/Theme';

const inter = Inter({ subsets: ['latin'] });

let ThemeSchema = z.object({
	darkMode: z.boolean().default(true),
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let theme: z.infer<typeof ThemeSchema>;
	try {
		let themeCookie = cookies().get('theme')?.value;
		if (!themeCookie) {
			throw new Error('No cookie set');
		}
		let json = JSON.parse(themeCookie);
		theme = ThemeSchema.parse(json);
	} catch {
		theme = { darkMode: true };
	}

	return (
		<ThemeProvider initialValue={theme}>
			<Html className="grid h-full">
				<head />
				<body
					className={cx(inter.className, 'bg-background text-text @container')}
				>
					<div className="grid min-h-full grid-rows-[min-content_auto] p-5 @lg:p-8 @3xl:px-16">
						<header className="w-full min-w-[20em] max-w-[80em]">
							<Logo />
							<ThemeToggle />
						</header>
						<main className="w-full min-w-[20em] max-w-[80em]">{children}</main>
					</div>
				</body>
			</Html>
		</ThemeProvider>
	);
}
