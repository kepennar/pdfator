const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './lib/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.json'
          }
        }
      }
    ]
  },
  externals: {
    puppeteer: {
      commonjs: 'puppeteer',
      commonjs2: 'puppeteer',
      amd: 'puppeteer'
    }
  },
  resolve: {
    modules: ['node_modules'],
    symlinks: false,
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: '@pdfator/core',
    libraryTarget: 'umd'
  }
};
