// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 顾名思义，把资源加到 html 里，那这个插件把 dll 加入到 index.html 里
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// AddAssetHtmlPlugin的替代，更快捷
const AutoDllPlugin = require('autodll-webpack-plugin'); // 第 1 步：引入 DLL 自动链接库插件

const devMode = process.env.NODE_ENV === 'development';
console.log('NODE_ENV ===', process.env.NODE_ENV);
const theme = lessToJs(fs.readFileSync(path.resolve(__dirname, '../src/theme.less'), 'utf8'));
// HappyPack用于开启多线程Loader转换
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  }, // 入口文件
  output: {
    filename: 'js/[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist'), // 打包后的目录
    chunkFilename: 'js/[name].[hash:8].js', // 此选项决定了非入口(non-entry) chunk 文件的名称
    publicPath: './',
  },

  module: {
    noParse: /jquery/, // 类似jquery这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加noParse属性,告诉webpack不必解析，以此增加打包速度。
    rules: [
      {
        test: /\.js$/,
        use: {
          // 这里的babel-loader只会将 ES6/7/8语法转换为ES5语法，
          // 但是对新api并不会转换 例如(Promise、Generator、Set、Maps、Proxy等)
          loader: 'babel-loader',
          // 将js处理文件交给id为happyBabel的Happypack实例
          // loader: 'happypack/loader?id=happyBabel',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        include: /src/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 处理开启css module导致antd-mobile的样式失效
      {
        test: /\.css$/,
        // 添加  exclude: /node_modules/ 只对自己的css 开启module
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // 图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于10240会转换成base64处理
              limit: 10240,
              // fallback备用
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/, // 媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // html模板
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // clean-webpack-plugin用来清除dist下上次打包残留的文件
    new CleanWebpackPlugin(),
    // 把css样式从js文件中提取到单独的css文件中
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    // 自动dll插件
    new AutoDllPlugin({
      inject: true, // 设为 true 就把 DLL bundles 插到 index.html 里
      context: path.resolve(__dirname, '../'), // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
      filename: '[name].dll.js',
      entry: {
        lodash: [
          'lodash',
        ],
      },
    }),
    // new webpack.DllReferencePlugin({
    //   // 注意: DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
    //   manifest: path.resolve(__dirname, '../dll/vendors-manifest.json'),
    // }),
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, '../dll/vendors.dll.js'),
    // }),
    // new HappyPack({
    //     id: 'happyBabel',  // 与loader对应的id标识
    //     // 用法和loader的配置一样，注意这里是loaders
    //     loaders: [
    //         {
    //             loader: 'babel-loader',
    //             options: {
    //                 presets: [
    //                     ['@babel/preset-env']
    //                 ],
    //                 cacheDirectory: true
    //             }
    //         }
    //     ],
    //     threadPool: happyThreadPool  // 共享进程池
    // }),

    // 打包文件分析
    // new BundleAnalyzerPlugin({
    //     analyzerHost: '127.0.0.1',
    //     analyzerPort: 8889
    // })
  ],
  optimization: {
    runtimeChunk: { // 运行时代码（webpack执行时所需的代码）从主文件中抽离
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    // 能够使用户在引入模块时不带扩展名
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
};
