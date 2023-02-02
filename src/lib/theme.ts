import { writable } from 'svelte/store';
import { z } from 'zod';

import { browser } from '$app/environment';

const ThemeSchema = z.union([z.literal('VAPORWAVE'), z.literal('EVA-02')]).default('VAPORWAVE');

export type Theme = z.infer<typeof ThemeSchema>;

export function parseTheme(input: string | undefined | null) {
	try {
		return ThemeSchema.parse(input);
	} catch {
		return 'VAPORWAVE';
	}
}

type State = {
	mode: 'VAPORWAVE' | 'EVA-02' | undefined;
};

export const theme = writable<State>({
	mode: undefined
});

theme.subscribe(({ mode }) => {
	if (browser && mode) {
		document.documentElement.setAttribute('data-theme', mode);
	}
});
