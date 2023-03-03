module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', 'import'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	globals: {
		svelteHTML: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'import/order': [
			2,
			{
				'newlines-between': 'always',
				groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: false
				}
			}
		]
	}
};
