// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	dist: path.join(__dirname, 'dist'),
	components: path.join(__dirname, '../src/components'),
	containers: path.join(__dirname, '../src/containers'),
	styles: path.join(__dirname, '../src/styles')
};

module.exports = {
	plugins: [
		// your custom plugins
	],
	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/,
				use: ['babel-loader', 'awesome-typescript-loader'],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json'],
		alias: {
			components: PATHS.components,
			containers: PATHS.containers,
			styles: PATHS.styles
		}
	}
};
