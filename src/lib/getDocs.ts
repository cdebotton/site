import { compile } from 'mdsvex';

type Doc = {
	data: {
		fm: {
			title: string;
			description: string;
			date: string;
		};
	};
};

function assertDoc(input: unknown): asserts input is Doc {
	if (!input) {
		throw new Error('Failed to parse markdown');
	}
}

export async function getDocs() {
	const glob = import.meta.glob('../**/*.svx', { as: 'raw' });
	const posts = [];
	for (const path in glob) {
		const data = await glob[path]();
		const result = await compile(data);

		assertDoc(result);

		const slug = '/' + path.split('/').slice(2, -1).join('/');
		posts.push({ ...result.data.fm, slug });
	}

	posts.sort((a, b) => (a.date < b.date ? -1 : 1));

	return posts;
}
