var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')  // 一个可以合并数组和对象的插件
var baseWebpackConfig = require('./webpack.base.conf')
// 用于从webpack生成的bundle中提取文本到特定文件中的插件
// 可以抽取出css，js文件将其与webpack输出的bundle分离
var HtmlWebpackPlugin = require('html-webpack-plugin')// 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')  //如果我们想用webpack打包成一个文件，css js分离开，需要这个插件
var env = config.build.env   
// 合并基础的webpack配置
var webpackConfig = merge(baseWebpackConfig, {
  // 配置样式文件的处理规则，使用styleLoaders
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false, // 开启source-map，生产环境下推荐使用cheap-source-map或source-map，后者得到的.map文件体积比较大，但是能够完全还原以前的js代码
  output: {
    path: config.build.assetsRoot,  // 编译输出目录
    filename: utils.assetsPath('js/[name].[chunkhash].js'),    // 编译输出文件名格式
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')   // 没有指定输出名的文件输出的文件名格式
  },
  // 重新配置插件项
  plugins: [  
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
      // 位于开发环境下
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({  // 丑化压缩代码
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css') // 抽离css文件
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
       // 生成html文件的名字，路径和生产环境下的不同，要与修改后的publickPath相结合，否则开启服务器后页面空白
      filename: config.build.index,
      // 源文件，路径相对于本文件所在的位置
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
