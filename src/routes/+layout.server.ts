import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		theme: locals.theme,
		session: await locals.getSession()
	};
};
