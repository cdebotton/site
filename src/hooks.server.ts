import { sequence } from '@sveltejs/kit/hooks';
import { z } from 'zod';

import type { Handle } from '@sveltejs/kit';

const themeSchema = z.object({
	darkMode: z.boolean().default(true)
});

export const handle: Handle = sequence(async ({ event, resolve }) => {
	const themeCookie = event.cookies.get('theme');

	if (themeCookie) {
		const theme = themeSchema.parse(JSON.parse(themeCookie));

		event.locals.theme = theme;

		return await resolve(event, {
			transformPageChunk({ html }) {
				return html.replace('%page.theme%', `data-dark='${theme.darkMode.toString()}'`);
			}
		});
	}

	return resolve(event, {
		transformPageChunk({ html }) {
			return html.replace('%page.theme%', `data-dark='true'`);
		}
	});
});
