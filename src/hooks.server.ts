import Github from '@auth/core/providers/github';
import { SvelteKitAuth } from '@auth/sveltekit';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';

import type { Handle } from '@sveltejs/kit';

import { AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import prisma from '$lib/prisma';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';

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
		// console.log(await event.locals.getSession());

		return resolve(event);
	}
);
