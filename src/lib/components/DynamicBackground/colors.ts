import {
	indigoDark,
	orange,
	orangeDark,
	plumDark,
	red,
	slate,
	slateDark,
	violetDark
} from '@radix-ui/colors';
import { derived } from 'svelte/store';

import { theme } from '$lib/theme';

export const colors = derived(theme, ({ mode }) => {
	switch (mode) {
		case 'EVA-02':
			return {
				surface: red.red1,
				surfaceSubtle: slate.slate4,
				surfaceSubtle2: slate.slate5,
				fg: red.red10,
				fgSubtle: orangeDark.orange11,
				accent: orange.orange8
			};
		case 'VAPORWAVE':
			return {
				surface: indigoDark.indigo1,
				surfaceSubtle: slateDark.slate5,
				surfaceSubtle2: slateDark.slate7,
				fg: plumDark.plum11,
				fgSubtle: violetDark.violet4,
				accent: plumDark.plum10
			};
		default:
			throw new Error('Invalid theme');
	}
});
