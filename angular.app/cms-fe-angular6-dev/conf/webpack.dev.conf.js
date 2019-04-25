const path = require('path'),
  webpack = require('webpack'),
  UglifyJSPlugin = require("uglifyjs-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  config = require('./webpack.base.conf.js');

const _PROD_ = process.env.NODE_ENV === 'production'

config.mode = _PROD_ ? 'development' : 'none'
config.devServer = {
  port: '9100',
  host: 'localhost',
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  contentBase: path.join(__dirname, '../dist'),
  publicPath: '/',
  inline: true,
  stats: {
    colors: true
  },
  progress: true,
  hot: true,
  hotOnly: true,
  proxy: [{
    context: ['/api', '/uploads'],
    target: 'http://127.0.0.1:9901'
  }]
}

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    title: 'CMS-FE DEV',
    filename: 'index.html',
    template: 'src/template/index_base.html',
    // template: 'dist/index.html',
  })
]);

module.exports = config;