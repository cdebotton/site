module.exports = {
	plugins: [
		require('postcss-jit-props')({ files: ['./generated/colors.css'] }),
		require('postcss-flexbugs-fixes'),
		require('postcss-preset-env')({
			autoprefixer: {
				flexbox: 'no-2009'
			},
			stage: 1,
			features: {
				'custom-properties': false
			}
		})
	]
};
