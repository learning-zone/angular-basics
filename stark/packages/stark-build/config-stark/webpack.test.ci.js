"use strict";

const webpack = require("webpack");

//const webpackMerge = require("webpack-merge"); // Used to merge webpack configs
const commonConfig = require("./webpack.common.js"); // common configuration between environments
const commonData = require("./webpack.common-data.js"); // common configuration between environments

// Webpack Plugins
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");

// Helpers
const helpers = require("./helpers");

// Metadata
const METADATA = {
	ENV: (process.env.ENV = process.env.NODE_ENV = "test"),
	PRODUCTION: false,
	DEVELOPMENT: true
};

/*
 * Config
 * reference: https://webpack.js.org/configuration/
 */
module.exports = {
	// Developer tool to enhance debugging
	// reference: https://webpack.js.org/configuration/devtool
	// reference: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
	devtool: "inline-source-map",

	// No caching for tests!
	cache: false,

	stats: commonConfig.stats,

	// Options affecting the resolving of modules.
	// reference: https://webpack.js.org/configuration/resolve
	resolve: commonConfig.resolve,

	// Options affecting the normal modules.
	// reference: https://webpack.js.org/configuration/module
	module: {
		// An array of applied loaders.
		// IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
		// This means they are not resolved relative to the configuration file.
		// reference: https://webpack.js.org/configuration/module/#module-rules
		rules: commonConfig.module.rules.concat([
			// Support for .ts files.
			// reference: https://github.com/s-panferov/awesome-typescript-loader
			{
				test: /\.ts$/,
				use: [
					{
						loader: "babel-loader",
						options: commonData.babel
					},
					{
						loader: "awesome-typescript-loader",
						options: commonData.ts
					}
				],
				exclude: [
					/\.e2e-spec\.ts$/ // exclude end-to-end tests
				]
			},

			// instrument only testing sources with Istanbul
			// reference: https://github.com/webpack-contrib/istanbul-instrumenter-loader
			{
				enforce: "post",
				test: /\.(js|ts)$/,
				include: helpers.root("src"),
				use: {
					loader: "istanbul-instrumenter-loader",
					options: { esModules: true }
				},
				exclude: [/\.e2e-spec\.ts$/, /\.spec\.ts$/, "node_modules"]
			}
		])
	},

	// Add additional plugins to the compiler.
	// reference: https://webpack.js.org/plugins
	plugins: [
		// Environment helpers (when adding more properties make sure you include them in environment.d.ts)
		// Plugin: DefinePlugin
		// Description: Define free variables.
		// Useful for having development builds with debug logging or adding global constants.
		// reference: https://webpack.js.org/plugins/define-plugin
		// NOTE: when adding more properties make sure you include them in custom-typings.d.ts
		new DefinePlugin({
			ENV: JSON.stringify(METADATA.ENV),
			NODE_ENV: JSON.stringify(METADATA.ENV),
			HMR: false,
			PRODUCTION: METADATA.PRODUCTION,
			DEVELOPMENT: METADATA.DEVELOPMENT,
			"process.env": {
				ENV: JSON.stringify(METADATA.ENV),
				NODE_ENV: JSON.stringify(METADATA.ENV),
				HMR: false,
				PRODUCTION: METADATA.PRODUCTION,
				DEVELOPMENT: METADATA.DEVELOPMENT
			}
		}),

		// Plugin: ExtractTextWebpackPlugin
		// Description: Extract css file contents
		// reference: https://github.com/webpack/extract-text-webpack-plugin
		new ExtractTextWebpackPlugin({
			filename: "[name].[hash].css",
			disable: false
		}),

		// Plugin: HtmlWebpackPlugin
		// Description: Simplifies creation of HTML files to serve your webpack bundles.
		// This is especially useful for webpack bundles that include a hash in the filename
		// which changes every compilation.
		// reference: https://github.com/jantimon/html-webpack-plugin
		new HtmlWebpackPlugin({
			template: helpers.root("src/index.html"),
			chunksSortMode: helpers.packageSort(["polyfills", "vendor", "main"]),
			metadata: METADATA,
			inject: "body", //  true (default) or  "body" are the same
			starkAppMetadata: {},
			starkAppConfig: {}
		}),

		// reference: https://webpack.js.org/plugins/loader-options-plugin
		new LoaderOptionsPlugin({
			// Switch loaders to debug mode
			debug: true,
			options: {
				// No caching for tests!
				cache: false,

				// TSLint configuration
				// Static analysis linter for TypeScript advanced options configuration
				// Description: An extensible linter for the TypeScript language.
				// reference: https://github.com/wbuchwalter/tslint-loader
				tslint: commonData.tslint.dev
			}
		})
	],

	// Include polyfills or mocks for various node stuff
	// Description: Node configuration
	// reference: https://webpack.js.org/configuration/node
	node: commonConfig.node
};
