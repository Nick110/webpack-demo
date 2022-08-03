const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    hot: true,
    quiet: true,
    open: true, // 启动后自动打开浏览器
    historyApiFallback: true,
  },
  plugins: [
    // 热替换模块
    new webpack.HotModuleReplacementPlugin(),
  ],
});
