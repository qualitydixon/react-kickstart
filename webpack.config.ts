import * as webpack from 'webpack';
import * as path from 'path';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	chunksSortMode: 'dependency',
	template: path.join(__dirname, '/src/index.html'),
	filename: 'index.html',
	favicon: path.join(__dirname, '/src/static/react-icon-small.png'),
	inject: 'body'
});

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	dist: path.join(__dirname, 'dist'),
	components: path.join(__dirname, './src/components'),
	containers: path.join(__dirname, './src/containers'),
	styles: path.join(__dirname, './src/styles')
};

const isProduction = process.env.npm_lifecycle_event === 'build';

const baseConfig = {
	entry: {
		main: './src/index.tsx',
		vendor: ['react', 'react-dom', 'react-router']
	},
	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/,
				use: ['babel-loader', 'awesome-typescript-loader'],
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
			components: PATHS.components,
			containers: PATHS.containers,
			styles: PATHS.styles
		}
	}
};

const developmentConfig = {
	entry: {
		main: ['react-hot-loader/patch', './src/index.tsx'],
		vendor: ['react', 'react-dom', 'react-router']
	},
	output: {
		path: PATHS.dist,
		publicPath: '/',
		filename: '[hash].[name].js'
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: PATHS.dist,
		historyApiFallback: true,
		hot: true,
		inline: true,
		quiet: false
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: 'stats.json'
		})
	]
};

const productionConfig = {
	output: {
		path: PATHS.dist,
		filename: '[chunkhash].[name].js'
	},
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(['dist']),
		HtmlWebpackPluginConfig,
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		})
	]
};
export default (<any>Object).assign(
	{},
	baseConfig,
	isProduction === true ? productionConfig : developmentConfig
);
