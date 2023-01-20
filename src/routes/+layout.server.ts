import { z } from 'zod';

import type { LayoutServerLoad } from './$types';

const schema = z.object({
	darkMode: z.boolean()
});

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();

	try {
		const cookie = event.cookies.get('theme');

		if (!cookie) {
			throw new Error('No theme cookie');
		}

		const json = JSON.parse(cookie);
		const theme = schema.parse(json);
		return { theme, session };
	} catch (err) {
		return { theme: { darkMode: true }, session };
	}
};
