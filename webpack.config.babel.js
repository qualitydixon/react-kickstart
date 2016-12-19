import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(__dirname, '/app/index.html'),
	filename: 'index.html',
	inject: 'body',
})

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	dist: path.join(__dirname, 'dist'),
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify('production'),
	},
})

const base = {
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
		],
	},
}

const developmentConfig = {
	entry: {
		main: './app/index.js',
	},
	output: {
		path: PATHS.dist,
		filename: 'bundle.js',
	},
	devtool: 'cheap-module-inline-source-map',
	devServer: {
		contentBase: PATHS.dist,
		hot: true,
		inline: true,
		quiet: false,
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
	],
}

const productionConfig = {
	entry: {
		main: './app/index.js',
		vendor: ['react', 'react-dom', 'react-router'],
	},
	output: {
		path: PATHS.build,
		filename: '[chunkhash].[name].js',
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		HtmlWebpackPluginConfig,
		productionPlugin,
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendor', 'manifest'],
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: 'stats.json',
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
	],
}

export default Object.assign({}, base,
	isProduction === true ? productionConfig : developmentConfig)
