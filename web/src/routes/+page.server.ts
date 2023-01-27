import { redirect } from '@sveltejs/kit';
import { q } from 'groqd';

import type { Actions, PageServerLoad } from './$types';

import { runQuery } from '$lib/client';

export const load: PageServerLoad = async () => {
	const posts = await runQuery(
		q('*').filter('_type == "post"').grab({
			title: q.string()
		})
	);

	return { posts };
};

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
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
