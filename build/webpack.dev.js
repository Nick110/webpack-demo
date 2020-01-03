const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const merge = require('webpack-merge')
module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist',
        open: true  // 启动后自动打开浏览器
    },
    plugins: [
        // 热替换模块
        new webpack.HotModuleReplacementPlugin()
    ]
})
