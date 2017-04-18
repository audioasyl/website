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
        test: /\.(css|scss|jpg|JPG|jpeg|png|gif|svg|ttf|woff|eot)$/,
        loader: 'ignore-loader',
      },
    ],
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
};
