const path = require('path'),
    webpack = require('webpack'),
    UglifyJSPlugin = require("uglifyjs-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

const _DEV_ = process.env.NODE_ENV === 'development';

const config = {
    entry: {
        polyfills: [path.resolve(__dirname, '../src/polyfills.ts')],
        vendor: [path.resolve(__dirname, '../src/vendor.ts')],
        vendor1: ['ng-zorro-antd'],
    },

    output: {
        path: path.resolve(__dirname, "../dist/vendor"),
        filename: "[name].[chunkhash].dll.js",
        library: "[name]_[chunkhash]_lib"
    },

    // plugins
    plugins: [
        new UglifyJSPlugin({
            output: {
                comments: false,
                beautify: !_DEV_ ? false : true,
            },
            compress: !_DEV_ ? {
                drop_console: true,
            } : false,
            warnings: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor1', 'vendor', 'polyfills'],
        }),
        new webpack.DllPlugin({
            context: path.resolve(__dirname, '../dist'),
            name: "[name]_[chunkhash]_lib",
            path: path.join(__dirname, "../dist/vendor", "[name].manifest.json")
        }),
        new HtmlWebpackPlugin({
            title: 'CMS-管理后台',
            filename: '../index.html',
            template: 'src/template/index_base.html',
        }),
        // new webpack.ContextReplacementPlugin(
        //     /angular(\\|\/)core(\\|\/)@angular/,
        //     path.resolve(__dirname, '../src')
        // )
    ]
};

module.exports = config;