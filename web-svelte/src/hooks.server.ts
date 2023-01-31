import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { z } from 'zod';

import type { Handle } from '@sveltejs/kit';

import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

const themeSchema = z.object({
	darkMode: z.boolean().default(true)
});

export const handle: Handle = sequence(
	createTRPCHandle({ router, createContext }),
	async ({ event, resolve }) => {
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
	}
);
