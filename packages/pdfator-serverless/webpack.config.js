const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { pdfatorHandler: './lib/index.ts' },
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
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    // `library` determines the name of the global variable
    library: '[name]'
  }
};
