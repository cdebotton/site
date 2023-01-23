import Github from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { z } from 'zod';

import type { Handle } from '@sveltejs/kit';

import { AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import prisma from '$lib/prisma';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

const themeSchema = z.object({
	darkMode: z.boolean().default(true)
});

export const handle: Handle = sequence(
	SvelteKitAuth({
		secret: AUTH_SECRET,
		adapter: PrismaAdapter(prisma),
		providers: [Github({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })],
		session: {
			strategy: 'database',
			generateSessionToken: () => {
				return crypto.randomUUID();
			}
		}
	}),
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
