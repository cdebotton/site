const kebabCase = require('kebab-case');

let colors = Object.entries(require('@radix-ui/colors'))
	.filter(([key]) => !key.endsWith('A'))
	.flatMap(([colorKey, color]) => {
		return Object.entries(color).map(([weightKey, colorValue]) => {
			return [`--${kebabCase(colorKey)}-${weightKey.match(/(\d+)$/)[1]}`, colorValue];
		});
	});

process.stdout.write(`:root {
	${colors.map(([key, value]) => `${key}: ${value};`).join('\n\t')}
}`);
