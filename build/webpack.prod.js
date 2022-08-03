const path = require('path');
const webpackConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(webpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    // 拷贝静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist'),
      },
    ]),
  ],
  // 优化
  optimization: {
    // 最小化
    minimizer: [
      // 压缩js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      // 压缩css
      new OptimizeCssAssetsPlugin({}),
    ],
    // 代码分割
    splitChunks: {
      /*
      chunks 用以告诉 splitChunks 的作用对象，
      其可选值有 async、 initial 和 all。
      默认值是 async，也就是默认只选取异步加载的chunk进行代码拆分
      */
      chunks: 'all', // all, async, initial
      /*
      cacheGroups 有两个默认的组，
      一个是 vendors，将所有来自 node_modules 目录的模块；
      一个 default，包含了由两个以上的 chunk 所共享的模块。
      */
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },
      },
    },
  },
});
