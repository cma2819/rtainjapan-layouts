import {CheckerPlugin} from 'awesome-typescript-loader';
import CleanPlugin from 'clean-webpack-plugin';
import globby from 'globby';
import HtmlPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';

const isProduction = process.env.NODE_ENV === 'production';
const isWatch =
	process.env.npm_config_argv &&
	process.env.npm_config_argv.includes('--watch');

const baseConfig: Partial<webpack.Configuration> = {
	mode: isProduction ? 'production' : 'development',
	devtool: isProduction ? 'source-map' : 'cheap-source-map',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
};

const makeBrowserConfig = (name: string): webpack.Configuration => {
	const entry: webpack.Entry = {};
	const files = globby.sync(`./src/${name}/views/*.tsx`);
	for (const file of files) {
		entry[path.basename(file, '.tsx')] = file;
	}

	return {
		...baseConfig,
		name,
		entry,
		output: {path: path.resolve(__dirname, name), filename: '[name].js'},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'awesome-typescript-loader',
					options: {
						useCache: true,
						configFileName: `./src/${name}/tsconfig.json`,
					},
				},
				{test: /\.png$/, loader: 'file-loader'},
			],
		},
		plugins: [
			new CleanPlugin([name]),
			new CheckerPlugin(),
			...Object.keys(entry).map(
				entryName =>
					new HtmlPlugin({
						filename: `${entryName}.html`,
						chunks: [entryName],
						title: entryName,
						template: 'webpack/template.html',
					})
			),
			new BundleAnalyzerPlugin({
				analyzerMode: isProduction || isWatch ? 'disabled' : 'static',
			}),
		],
		optimization: {
			splitChunks: {
				chunks: 'all',
				minSize: 0,
			},
		},
	};
};

const extensionConfig: webpack.Configuration = {
	...baseConfig,
	name: 'extension',
	target: 'node',
	entry: {
		index: './src/extension/index.ts',
	},
	output: {
		path: path.resolve(__dirname, 'extension'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				options: {
					useCache: true,
					configFileName: './src/extension/tsconfig.json',
				},
			},
		],
	},
	externals: [nodeExternals()],
	plugins: [new CleanPlugin(['extension']), new CheckerPlugin()],
};

export default [
	makeBrowserConfig('dashboard'),
	makeBrowserConfig('graphics'),
	extensionConfig,
];
