import * as webpack from 'webpack';
import * as path from 'path';

var HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(__dirname, '/src/index.html'),
	filename: 'index.html',
	favicon: path.join(__dirname, '/src/static/react-icon-small.png'),
	inject: 'body'
});

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	dist: path.join(__dirname, 'dist')
};

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;

const isProduction = LAUNCH_COMMAND === 'production';
process.env.BABEL_ENV = LAUNCH_COMMAND;

const productionPlugin = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify('production')
	}
});

const base = {
	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/,
				use: 'awesome-typescript-loader',
				exclude: /node_modules/
			},
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: 'file-loader'
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json'],
		alias: {
			components: path.join(__dirname, './src/components'),
			containers: path.join(__dirname, './src/containers')
		}
	}
};

const developmentConfig = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: PATHS.dist,
		filename: 'bundle.js'
	},
	devtool: 'cheap-module-inline-source-map',
	devServer: {
		contentBase: PATHS.dist,
		historyApiFallback: true,
		hot: true,
		inline: true,
		quiet: false
	},
	plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
};

const productionConfig = {
	entry: {
		main: './src/index.js',
		vendor: ['react', 'react-dom', 'react-router']
	},
	output: {
		path: PATHS.build,
		filename: '[chunkhash].[name].js'
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		HtmlWebpackPluginConfig,
		productionPlugin,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: 'stats.json'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};

export default (<any>Object).assign(
	{},
	base,
	isProduction === true ? productionConfig : developmentConfig
);
