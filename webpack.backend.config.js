'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './server.js'],
  target: 'node',
  output: {
    path: path.join(__dirname),
    filename: 'server.build.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
  ],
  devtool: 'sourcemap',
};
