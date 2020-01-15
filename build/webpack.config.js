// webpack.config.js

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const devMode = process.argv.indexOf('--mode=production') === -1;
// HappyPack用于开启多线程Loader转换
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.tsx'),
    },    // 入口文件
    output: {
        filename: 'js/[name].[hash:8].js',      // 打包后的文件名称
        path: path.resolve(__dirname, '../dist'),  // 打包后的目录
        chunkFilename: 'js/[name].[hash:8].js'  // 此选项决定了非入口(non-entry) chunk 文件的名称
    },

    module: {
        noParse: /jquery/,  //类似jquery这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加noParse属性,告诉webpack不必解析，以此增加打包速度。
        rules: [
            {
                test: /\.js$/,
                use: {
                    // 这里的babel-loader只会将 ES6/7/8语法转换为ES5语法，
                    // 但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
                    // loader: 'babel-loader',
                    // options: {
                    //     // 预设，许多插件的集合
                    //     presets: ['@babel/preset-env']
                    // }
                    // 将js处理文件交给id为happyBabel的Happypack实例
                    loader: 'happypack/loader?id=happyBabel',
                },
                exclude: /node_modules/
            },
            {
                test: /\.tsx?/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {

                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules:{
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,  //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            // fallback备用
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,  // 媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,  //字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // html模板
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        // clean-webpack-plugin用来清除dist下上次打包残留的文件
        new CleanWebpackPlugin(),
        // 把css样式从js文件中提取到单独的css文件中
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new HappyPack({
            id: 'happyBabel',  // 与loader对应的id标识
            // 用法和loader的配置一样，注意这里是loaders
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ],
                        cacheDirectory: true
                    }
                }
            ],
            threadPool: happyThreadPool  // 共享进程池
        }),
        // 打包文件分析
        // new BundleAnalyzerPlugin({
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8889
        // })
    ],
}