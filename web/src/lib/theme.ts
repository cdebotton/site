import { writable } from 'svelte/store';

import { browser } from '$app/environment';

type State = {
	darkMode: boolean | null;
};

export const theme = writable<State>({
	darkMode: null
});

theme.subscribe(({ darkMode }) => {
	if (browser) {
		document.documentElement.setAttribute('data-dark', `${darkMode ?? true}`);
	}
});
