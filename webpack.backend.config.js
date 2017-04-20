'use strict';

const webpack = require('webpack'); // eslint-disable-line
const path = require('path');

module.exports = {
  entry: ['fetch-everywhere', 'babel-polyfill', './server.js'],
  target: 'node',
  output: {
    path: path.join(__dirname),
    filename: 'server.build.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(css|scss|ttf|woff|eot)$/,
        loader: 'ignore-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=100000000&mimetype=image/svg+xml',
      },
      {
        test: /\.(jpg|JPG|jpeg)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=100000000&mimetype=image/jpg',
      },
      {
        test: /\.png/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=100000000&mimetype=image/png',
      },
    ],
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
};
