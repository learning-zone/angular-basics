const path = require('path'),
  webpack = require('webpack'),
  config = require('./webpack.base.conf.js'),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const _PROD_ = process.env.NODE_ENV === 'production'

config.mode = _PROD_ ? 'production' : 'none'
config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin(['dist/*'],
  {
    root: path.join(__dirname, '../'),
    verbose:  true,
    dry:      false
  }),
  new OptimizeCSSAssetsPlugin({
    // cssProcessor: require('cssnano')({ autoprefixer: false })
  }),
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        drop_console: !_PROD_ ? false : true,
      },
      output: {
        comments: false
      }
    },
    parallel: true
  }),
  new webpack.HashedModuleIdsPlugin(),
  // new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
      title: 'CMS-管理后台',
      filename: 'index.html',
      template: 'src/template/index_base.html',
  })
]);

module.exports = config;