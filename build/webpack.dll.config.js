// webpack.dll.config.js
// 已用AutoDllPlugin插件，该文件暂时没用
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
    // vendors：第三方库
    vendors: ['lodash'],
  },
  output: {
    path: path.resolve(__dirname, '../dll'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]',
    // 这里需要和webpack.DllPlugin中的`name: '[name]',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
      name: '[name]',
    }),
  ],
};
