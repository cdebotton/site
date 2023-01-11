import { writable } from 'svelte/store';

type State = {
	darkMode: boolean | null;
};

export const theme = writable<State>({
	darkMode: null
});
