import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

import { getDocs } from '$lib/getDocs';

export const load: PageServerLoad = async () => {
	const posts = await getDocs();

	console.log(posts);

	return {
		posts
	};
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
