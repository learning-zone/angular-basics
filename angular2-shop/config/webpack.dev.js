// ```
// @datatype_void
// david.r.niciforovic@gmail.com
// webpack.dev.js may be freely distributed under the MIT license
// ```

//# Common Configuration and Helpers
var helpers = require('./helpers');
// Use `webpack-merge` to merge configs
var webpackMerge = require('webpack-merge');
// Common `webpack` configuration for `dev` and `prod`
var commonConfig = require('./webpack.common.js');

// Webpack Plugins
var DefinePlugin = require('webpack/lib/DefinePlugin');
var HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
var NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');

//# Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8080,
  ENV: ENV,
  HMR: HMR
};

//# Environment Config Object
var envConfig = require('./config.json');

module.exports = webpackMerge(commonConfig, {
  // Merged metadata from webpack.common.js for index.html
  //
  // See: (custom attribute)
  metadata: METADATA,

  // Developer tool to enhance debugging
  //
  // See: http://webpack.github.io/docs/configuration.html#devtool
  // See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
  devtool: 'cheap-module-source-map',
  // Switch loaders to debug mode.
  //
  // See: http://webpack.github.io/docs/configuration.html#debug
  debug: true,

  // Options affecting the output of the compilation.
  //
  // See: http://webpack.github.io/docs/configuration.html#output
  output: {
    // The output directory as absolute path (required).
    //
    // See: http://webpack.github.io/docs/configuration.html#output-path
    path: helpers.root('dist'),
    // Specifies the name of each output file on disk.
    // IMPORTANT: You must not specify an absolute path here!
    //
    // See: http://webpack.github.io/docs/configuration.html#output-filename
    filename: '[name].bundle.js',
    // The filename of the SourceMaps for the JavaScript files.
    // They are inside the output.path directory.
    //
    // See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
    sourceMapFilename: '[name].map',
    // The filename of non-entry chunks as relative path
    // inside the output.path directory.
    //
    // See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
    chunkFilename: '[id].chunk.js'
  },

  // Add additional plugins to the compiler.
  //
  // See: http://webpack.github.io/docs/configuration.html#plugins
  plugins: [

    // TODO(datatypevoid): investigate the necessity of these two
    // following lines
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
    // Plugin: DefinePlugin
    // Description: Define free variables.
    // Useful for having development builds with debug logging or adding global constants.
    //
    // Environment helpers
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR
      }
    })
  ],

  // Other module loader config

  // Static analysis linter for TypeScript advanced options configuration
  // Description: An extensible linter for the TypeScript language.
  //
  // See: https://github.com/wbuchwalter/tslint-loader
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'client',
  },

  // Webpack Development Server configuration
  // Description: The webpack-dev-server is a little node.js Express server.
  // The server emits information about the compilation state to the client,
  // which reacts to those events.
  //
  // See: https://webpack.github.io/docs/webpack-dev-server.html
  devServer: {
    // Proxy requests to our `Express` server
    proxy: {
      '*': {
        target: 'http://localhost:' + envConfig.PORT,
        secure: false
      },
    },
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist')
  },

  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
