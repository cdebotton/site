import type { PageLoad } from './$types';

import { getBlogPost } from '$lib/posts';

export const load: PageLoad = async ({ params }) => {
	const post = await getBlogPost(params.slug);

	return { post };
};
