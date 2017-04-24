/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded',
	}),
	exclude: ['node_modules'],
});

module.exports = {
	entry: [
		'whatwg-fetch',
		'babel-polyfill',
		'./app/Index.jsx',
	],
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'dist'),
		filename: '[hash].js',
		chunkFilename: '[name].[id].[ext]',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		loaders,
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'BROWSER': 'true',
				'NODE_ENV': '"production"',
        'HOST_NAME': JSON.stringify(process.env.HOST_NAME),
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true,
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin({
				filename: 'style.css',
				allChunks: true,
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
