export async function getBlogPost(slug: string) {
	const { default: content, metadata } = await import(`$content/blog/${slug}.svx`);
	return { content, ...metadata };
}

export async function getAllBlogPosts() {
	const glob = import.meta.glob('$content/blog/**/*.svx');
	const entries = await Promise.all(
		Object.entries(glob).map(async ([path, resolver]) => [path, await resolver()] as const)
	);
	const posts = entries.map(([path, mod]) => {
		return {
			...mod.metadata,
			slug: path
				.split('/')
				.slice(3)
				.join('/')
				.replace(/\.(.+)$/, '')
		};
	});

	return posts;
}
