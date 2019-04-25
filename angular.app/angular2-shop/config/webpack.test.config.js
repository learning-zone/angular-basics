// ```
// @datatype_void
// david.r.niciforovic@gmail.com
// webpack.config.js may be freely distributed under the MIT license
// ```

var helpers = require('./helpers');
//# Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
//# Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

//# Webpack Configuration
// See: http://webpack.github.io/docs/configuration.html#cli
module.exports = {
  // Developer tool to enhance debugging
  // Source map for Karma from the help of `karma-sourcemap-loader` &
  // `karma-webpack`
  //
  // Do not change, leave as is or it wont work.
  // See: https://github.com/webpack/karma-webpack#source-maps
  devtool: 'inline-source-map',
  // Options affecting the resolving of modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // An array of extensions that should be used to resolve modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve-extensions

    extensions: ['', '.ts', '.js', '.scss']
  },
  // Options affecting the normal modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#module
  module: {
    // An array of applied pre and post loaders.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
    preLoaders: [
      // Tslint loader support for *.ts files
      //
      // See: https://github.com/wbuchwalter/tslint-loader
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      // Source map loader support for *.js files
      // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
      //
      // See: https://github.com/webpack/source-map-loader
      {
        test: /\.js$/, loader: 'source-map-loader', exclude: [
        // These packages have problems with their `sourcemaps`
        helpers.root('node_modules/rxjs'),
        helpers.root('node_modules/@angular2-material'),
        helpers.root('node_modules/@angular')
      ]}
    ],
    // An array of automatically applied loaders.
    //
    // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
    // This means they are not resolved relative to the configuration file.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-loaders
    loaders: [
      // Typescript loader support for .ts and Angular 2 async routes via .async.ts
      //
      // See: https://github.com/s-panferov/awesome-typescript-loader
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          compilerOptions: {
            removeComments: true,
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      },
      // Json loader support for *.json files.
      //
      // See: https://github.com/webpack/json-loader
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [ helpers.root('client/index.html') ] },
      // Raw loader support for *.html
      // Returns file content as string
      //
      // See: https://github.com/webpack/raw-loader
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [ helpers.root('client/index.html') ] },
      // Raw loader support for *.css files
      // Returns file content as string
      //
      // See: https://github.com/webpack/raw-loader
      {
        test: /\.css$/,
        loader: 'raw-loader',
        exclude: [ helpers.root('client/index.html') ] },
      // Support for sass imports
      // Add CSS rules to your document:
      // `require("!style!css!sass!./file.scss");`
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer-loader?browsers=last 2 versions!sass',
        exclude: [ helpers.root('client/index.html') ] },
    ],
    // An array of applied pre and post loaders.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
    postLoaders: [
      // Instruments JS files with Istanbul for subsequent code coverage reporting.
      // Instrument only testing sources.
      //
      // See: https://github.com/deepsweet/istanbul-instrumenter-loader
      {
        test: /\.(js|ts)$/,
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  // Add additional plugins to the compiler.
  //
  // See: http://webpack.github.io/docs/configuration.html#plugins
  plugins: [
    // Plugin: DefinePlugin
    // Description: Define free variables.
    // Useful for having development builds with debug logging or adding global constants.
    //
    // Environment helpers
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // NOTE: when adding more properties make sure you include them in custom-typings.d.t    new webpack.DefinePlugin({
    new DefinePlugin({
      // Environment helpers
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false
      }
    })
  ],

  // Other module loader config

  // Include polyfills or mocks for various node stuff
  // Description: Node configuration
  //
  // See: https://webpack.github.io/docs/configuration.html#node
  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  // Static analysis linter for TypeScript advanced options configuration
  // Description: An extensible linter for the TypeScript language.
  //
  // See: https://github.com/wbuchwalter/tslint-loader
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  }
};
