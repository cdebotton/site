module.exports = {
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-idiomatic-order',
		'stylelint-config-css-modules'
	],
	ignoreFiles: ['./static/**/*'],
	customSyntax: 'postcss-html'
};
