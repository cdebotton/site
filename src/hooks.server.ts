import { sequence } from '@sveltejs/kit/hooks';

import type { Handle } from '@sveltejs/kit';

import { parseTheme } from '$lib/theme';

export const handle: Handle = sequence(async ({ event, resolve }) => {
	const theme = parseTheme(event.cookies.get('theme'));

	event.locals.theme = theme;

	return await resolve(event, {
		transformPageChunk({ html }) {
			return html.replace('%page.theme%', `data-theme='${theme}'`);
		}
	});
});
