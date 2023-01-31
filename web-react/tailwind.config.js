const kebabCase = require('kebab-case');
const plugin = require('tailwindcss/plugin');

let colors = Object.fromEntries(
	Object.entries(require('@radix-ui/colors'))
		.filter(([colorKey]) => !colorKey.endsWith('A'))
		.flatMap(([colorKey, colorValues]) => {
			return Object.entries(colorValues).map(([colorWeight, hsl]) => {
				return [
					`${kebabCase(colorKey)}-${colorWeight.match(/(\d+)$/)[1]}`,
					hsl,
				];
			});
		}),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-dark="true"]'],
	content: ['./src/**/*.{tsx,css}'],

	theme: {
		colors,
		extend: {
			keyframes: {
				'bg-crawl': {
					from: {
						backgroundPosition: '0vw 0vh',
					},
					to: {
						backgroundPosition: '-300vw 0vh',
					},
				},
			},
			letterSpacing: {
				thiccc: '0.09em',
			},
			animation: {
				'bg-crawl-slow': 'bg-crawl 7.5s linear infinite alternate',
			},
			colors: {
				background: 'var(--background)',
				text: 'var(--text)',
				emphasis: 'var(--emphasis)',
				accent: 'var(--accent)',
				'brand-a': 'var(--brand-a)',
				'brand-b': 'var(--brand-b)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		plugin(({ addUtilities, theme }) => {
			addUtilities({
				'.bg-vaporwave': {
					backgroundImage: `linear-gradient(to bottom right, ${theme(
						'colors.brand-a',
					)} 0%, ${theme('colors.brand-b')} 45%, ${theme(
						'colors.brand-b',
					)} 55%, ${theme('colors.brand-a')} 100%)`,
					backgroundSize: '400vw 400vh',
					backgroundPosition: '0 0',
					backgroundAttachment: 'fixed',
				},
			});
		}),
	],
};
