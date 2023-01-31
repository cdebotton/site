'use client';

import { cx } from 'class-variance-authority';
import {
	createContext,
	Dispatch,
	useContext,
	useEffect,
	useReducer,
	type ReactNode,
} from 'react';

type State = {
	darkMode: boolean;
};

let ThemeContext = createContext({
	darkMode: true,
});

let SetterContext = createContext<Dispatch<Partial<State>>>(() => {
	throw new Error('Not implemented');
});

export function ThemeProvider({
	children,
	initialValue,
}: {
	children?: ReactNode;
	initialValue: State;
}) {
	let [state, dispatch] = useReducer(
		(state: State, action: Partial<State>): State => {
			return {
				...state,
				...action,
			};
		},
		initialValue,
	);

	useEffect(() => {
		document.cookie = `theme=${JSON.stringify(state)};Path=/`;
	}, [state]);

	return (
		<ThemeContext.Provider value={state}>
			<SetterContext.Provider value={dispatch}>
				{children}
			</SetterContext.Provider>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return [useContext(ThemeContext), useContext(SetterContext)] as const;
}

export function ThemeToggle({ className }: { className?: string }) {
	let [theme, setTheme] = useTheme();

	function handle() {
		setTheme({ darkMode: !theme.darkMode });
	}

	return (
		<button
			onClick={handle}
			className={cx('text-sm font-black uppercase tracking-tighter', className)}
		>
			{theme.darkMode ? 'Light' : 'Dark'}
		</button>
	);
}
