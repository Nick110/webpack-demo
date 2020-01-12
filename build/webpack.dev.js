const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const merge = require('webpack-merge')
const path = require('path');
module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8888,
        hot: true,
        contentBase: '../dist',
        open: true  // 启动后自动打开浏览器
    },
    plugins: [
        // 热替换模块
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        // 能够使用户在引入模块时不带扩展名
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json', '.vue']
    },
})
