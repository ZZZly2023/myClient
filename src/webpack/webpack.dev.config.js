const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    renderer: './src/electron/renderer.js'
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: '[contenthash].[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.(le|c)ss$/,
        include: path.resolve(__dirname, '../../src'),
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(mp4|webm)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new ProvidePlugin({
      React: 'react'
    })],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, '../../src')
    }
  }
};