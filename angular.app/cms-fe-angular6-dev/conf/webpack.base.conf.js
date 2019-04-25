const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const styleLoaderConf = require('./styleLoaderConf')
// const { AngularCompilerPlugin } = require('@ngtools/webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const _PROD_ = process.env.NODE_ENV === 'production';
const _DEV_ = process.env.NODE_ENV === 'development';

const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    plugins: () => [
      require("autoprefixer")({
        browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]
      })
    ]
  }
};

const config = {
  entry: {
    // 'polyfills': path.resolve(__dirname, '../src/polyfills.ts'),
    // 'vendor': path.resolve(__dirname, '../src/vendor.ts'),
    // 'vendor1': 'ng-zorro-antd',
    // 'app': path.resolve(__dirname, '../src/app.ts'),

    'app': path.resolve(__dirname, '../src/index.ts')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    sourceMapFilename: '[name].map',
    filename: 'static/js/[name].bundle.[hash].js',
    chunkFilename: 'static/js/[name].chunk.[chunkhash:8].js'
  },

  devtool: false, //_PROD_ ? false : '#cheap-module-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(process.cwd(), "src"), "node_modules"],
    alias: {
      '@app': path.join(process.cwd(), 'src/app'),
      '@assets': path.join(process.cwd(), 'src/assets'),
      '@components': path.join(process.cwd(), 'src/components'),
      '@utils': path.join(process.cwd(), 'src/utils'),
    }
  },

  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   loader: 'tslint-loader',
      //   include: [path.resolve(__dirname, '../src')],
      //   options: {
      //     // configFile: 'tslint.json',
      //     emitErrors: true,
      //     fix: true
      //   }
      // },
      {
        // test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        // loader: '@ngtools/webpack'
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular-router-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        // options: {
        //   // minimize: false,
        //   // removeComments: false,
        //   // collapseWhitespace: false
        // }
      },
      ...styleLoaderConf,
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          name: "assets/[name]-[hash:8].[ext]",
          limit: 2048
        }
      }
    ]
  },

  optimization: {
    minimize: _PROD_ ? true : false,
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        'polyfill': {
          name: 'polyfills',
          test: /[\\/]node_modules[\\/](core-js|zone\.js|rxjs)/,
          priority: 20,
          chunks: 'all'
        },
        'angular': {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]@angular/,
          priority: 20,
          chunks: 'all'
        },
        // 'ng-zorro-antd': {
        //   name: 'vendor1',
        //   test: /[\\/]node_modules[\\/]ng-zorro-antd/,
        //   priority: 20,
        //   chunks: 'all'
        // },
        'quill': {
          name: 'quill',
          test: /[\\/]node_modules[\\/]quill[\\/]/,
          priority: 15,
          chunks: 'all'
        },
        'echart': {
          name: 'echarts',
          test: /[\\/]node_modules[\\/]echarts[\\/]/,
          priority: 15,
          chunks: 'all'
        },
        'common': {
          name: 'commons',
          priority: 10,
          chunks: 'all',
          minChunks: 2
        },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      }
    }
  },

  // plugins
  plugins: [
    // new AngularCompilerPlugin({
    //   tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
    //   entryModule: path.resolve(__dirname, '../src/app/app.module#AppModule'),
    //   skipCodeGeneration: false,
    //   sourceMap: _DEV_ ? true : false
    // }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.ContextReplacementPlugin(
    //     /angular(\\|\/)core(\\|\/)@angular/,
    //     path.resolve(__dirname, '../src')
    // ),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(_DEV_ ? "development" : "production")
      },
      _DEV_: JSON.stringify(_DEV_),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        ignore: ['.*']
      }
    ])
  ]
};

module.exports = config;