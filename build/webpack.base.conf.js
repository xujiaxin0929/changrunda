var path = require('path')
var utils = require('./utils')
var config = require('../config')  // 获取配置
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {    // 配置webpack编译入口
    app: './src/main.js'
  },
  output: {    // 配置webpack输出路径和命名规则
    path: config.build.assetsRoot,  // webpack输出的目标文件夹路径（例如：/dist）
    filename: '[name].js',     // webpack输出bundle文件命名格式，基于文件的md5生成Hash名称的script来防止缓存
    publicPath: process.env.NODE_ENV === 'production'  // webpack编译输出的发布路径(判断是正式环境或者开发环境等)
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],  //自动解析确定的拓展名,使导入模块时不带拓展名
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {   // 创建import或require的别名，一些常用的，路径长的都可以用别名
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
