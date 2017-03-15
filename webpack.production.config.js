var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'}),
	exclude: ['node_modules']
});

const frontendConfig = {
	entry: [
		'./app/Index.jsx',
	],
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'dist'),
		filename: '[hash].js',
		chunkFilename: '[name].[id].[ext]',
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin({
				filename: 'style.css',
				allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './app/template.html',
			filename: path.join(__dirname, 'index.html'),
			files: {
				css: ['style.css'],
				js: [ "bundle.js"],
			}
		})
	]
};

const backendConfig = {
  name: 'server code, output to ./server',
  entry: './backend/server.js',
  output: {
    filename: './server.js',
  },
  module: {
    loaders,
  },
  target: 'node',
};

module.exports = [
  frontendConfig,
  backendConfig,
];
