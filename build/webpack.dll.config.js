/** @format */

// webpack.dll.config.js
// 本项目中不使用dll，此文件目前是没有用的
/* 
    对于开发项目中不经常会变更的静态依赖文件。类似于我们的elementUi、vue全家桶等等。因为很少会变更，
    所以我们不希望这些依赖要被集成到每一次的构建逻辑中去。 这样做的好处是每次更改我本地代码的文件的时候，
    webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库。以后只要我们不升级第三方包的时候，
    那么webpack就不会对这些库去打包，这样可以快速的提高打包的速度。
*/
const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'production',
    // 你想要打包的模块的数组
    entry: {
        // vendor：第三方库
        vendor: ['vue'],
    },
    output: {
        path: path.resolve(__dirname, '../static/js'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library',
        // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../static/[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname,
        }),
    ],
};
