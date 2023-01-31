'use client';

import type { ReactNode } from 'react';

import { useTheme } from '@/components/Theme';

export default function Html({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	let [theme] = useTheme();

	return (
		<html data-dark={theme.darkMode} lang="en" className={className}>
			{children}
		</html>
	);
}
