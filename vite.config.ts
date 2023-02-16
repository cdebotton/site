import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';

import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [{ ...threeMinifier(), enforce: 'pre' }, sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal: ['three']
	}
};

export default config;
