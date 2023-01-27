// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { q } from 'groqd';

import type { Actions, PageServerLoad } from './$types';

import { runQuery } from '$lib/client';

export const load = async () => {
	const posts = await runQuery(
		q('*').filter('_type == "post"').grab({
			title: q.string()
		})
	);

	return { posts };
};

export const actions = {
	setTheme: async ({ url, cookies }: import('./$types').RequestEvent) => {
		const darkMode = url.searchParams.get('darkMode') === 'true';
		const redirectTo = url.searchParams.get('redirectTo');

		cookies.set('theme', JSON.stringify({ darkMode }), {
			secure: true,
			httpOnly: true,
			path: '/',
			encode: (v) => v
		});

		throw redirect(303, redirectTo ?? '/');
	}
};
;null as any as PageServerLoad;;null as any as Actions;