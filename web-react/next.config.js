const ThreeMinifierPlugin = require('@yushijinhun/three-minifier-webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer, dev }) => {
		if (!isServer && !dev) {
			config.cache = false;
			const threeMinifier = new ThreeMinifierPlugin();
			config.plugins.unshift(threeMinifier);
			config.resolve.plugins.unshift(threeMinifier.resolver);
		}
		return config;
	},
	experimental: {
		appDir: true,
	},
};

module.exports = nextConfig;
