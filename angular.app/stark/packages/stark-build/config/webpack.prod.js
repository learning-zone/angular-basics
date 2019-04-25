"use strict";

const helpers = require("./helpers");
const buildUtils = require("./build-utils");

/**
 * Used to merge webpack configs
 */
const webpackMerge = require("webpack-merge");
/**
 * The settings that are common to prod and dev
 */
const commonConfig = require("./webpack.common.js");
const commonData = require("./webpack.common-data.js");

/**
 * Webpack Plugins
 */
const SourceMapDevToolPlugin = require("webpack/lib/SourceMapDevToolPlugin");
const PurifyPlugin = require("@angular-devkit/build-optimizer").PurifyPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HashedModuleIdsPlugin = require("webpack/lib/HashedModuleIdsPlugin");

function getUglifyOptions(supportES2015, isCITestEnv = false) {
	const uglifyCompressOptions = {
		pure_getters: true /* buildOptimizer */,
		// PURE comments work best with 3 passes.
		// See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
		passes: isCITestEnv ? 1 : 3 /* buildOptimizer */
	};

	return {
		ecma: supportES2015 ? 6 : 5,
		warnings: false, // TODO verbose based on option?
		ie8: false,
		mangle: true,
		compress: uglifyCompressOptions,
		output: {
			ascii_only: true,
			comments: false
		},
		beautify: false // set to true for debugging
	};
}

module.exports = function() {
	const ENV = (process.env.NODE_ENV = process.env.ENV = "production");
	const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
		HOST: process.env.HOST || "localhost",
		PORT: process.env.PORT || 8080,
		ENV: ENV,
		HMR: false,
		environment: buildUtils.DEFAULT_METADATA.E2E ? "e2e.prod" : "prod"
	});
	const isCITestEnv = helpers.hasProcessFlag("ci-test-env");
	const supportES2015 = buildUtils.supportES2015(METADATA.TS_CONFIG_PATH);

	const webpackConfig = webpackMerge(commonConfig({ ENV: ENV, metadata: METADATA }), {
		/**
		 * Stats lets you precisely control what bundle information gets displayed
		 * reference: https://webpack.js.org/configuration/stats/
		 */
		stats: {
			chunkModules: true,
			chunkOrigins: true,
			reasons: true,
			maxModules: Infinity, // examine all modules (ModuleConcatenationPlugin debugging)
			optimizationBailout: true // display bailout reasons (ModuleConcatenationPlugin debugging)
		},

		mode: "production",

		// reference: https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
		optimization: {
			removeAvailableModules: true,
			removeEmptyChunks: true,
			mergeDuplicateChunks: true,
			flagIncludedChunks: true,
			occurrenceOrder: true,
			providedExports: true,
			usedExports: true,
			sideEffects: true,
			concatenateModules: true,
			runtimeChunk: true,
			noEmitOnErrors: true,
			minimizer: [
				// minimization libraries to use
				/**
				 * Plugin: UglifyJsPlugin
				 * Description: Minimize all JavaScript output of chunks.
				 * Loaders are switched into minimizing mode.
				 *
				 * See: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
				 */
				new UglifyJsPlugin({
					parallel: true, // use multi-process parallel running to improve the build speed (default concurrent processes: os.cpus().length - 1)
					sourceMap: !isCITestEnv, // useful to still be able to debug in production
					uglifyOptions: getUglifyOptions(supportES2015),
					cache: true
				}),
				// other options than Uglify: BabelifyMinifyWebpackPlugin or ClosureCompilerPlugin

				new OptimizeCSSAssetsPlugin({})
			],
			splitChunks: {
				// reference: https://webpack.js.org/plugins/split-chunks-plugin/
				chunks: "all", // include all types of chunks (async or not)
				cacheGroups: {
					// assign modules to cache groups
					// cache group for all modules from node_modules that are duplicated in at least 2 chunks
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						chunks: "all",
						priority: -10
					},
					styles: {
						name: "styles",
						test: /\.css$/,
						chunks: "all",
						enforce: true
					},
					// FIXME check if needed
					// polyfills: {
					// 	name: "polyfills",
					// 	chunks: ["polyfills"]
					// },
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true
					}
				}
			}
		},

		/**
		 * Options affecting the output of the compilation.
		 *
		 * See: https://webpack.js.org/configuration/output/
		 */
		output: {
			/**
			 * The output directory as absolute path (required).
			 *
			 * See: https://webpack.js.org/configuration/output/#output-path
			 */
			path: helpers.root(buildUtils.ANGULAR_APP_CONFIG.outputPath),

			/**
			 * This option specifies the public URL of the output directory when referenced in a browser.
			 * The value of the option is prefixed to every URL created by the runtime or loaders.
			 * Because of this the value of this option ends with / in most cases.
			 *
			 * See: https://webpack.js.org/configuration/output/#output-publicpath
			 */
			publicPath: buildUtils.ANGULAR_APP_CONFIG.deployUrl,

			/**
			 * Specifies the name of each output file on disk.
			 * IMPORTANT: You must not specify an absolute path here!
			 *
			 * See: https://webpack.js.org/configuration/output/#output-filename
			 */
			filename: "[name].[chunkhash].bundle.js",

			/**
			 * The filename of the SourceMaps for the JavaScript files.
			 * They are inside the output.path directory.
			 *
			 * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
			 */
			sourceMapFilename: "[file].map",

			/**
			 * The filename of non-entry chunks as relative path
			 * inside the output.path directory.
			 *
			 * See: https://webpack.js.org/configuration/output/#output-chunkfilename
			 */
			chunkFilename: "[name].[chunkhash].chunk.js"
		},

		module: {
			rules: [
				/**
				 * Extract CSS files from .src/styles directory to external CSS file
				 */
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								//modules: true, // to check if needed
								//minimize: true,
								// even if disabled, sourceMaps gets generated
								sourceMap: false, // true
								autoprefixer: false,
								// see https://github.com/webpack-contrib/css-loader#importloaders)
								importLoaders: 1 // 1 => postcss-loader
							}
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true,
								plugins: commonData.postcssPlugins
							}
						}
					],
					include: [helpers.root(buildUtils.ANGULAR_APP_CONFIG.sourceRoot, "styles")]
				},

				/**
				 * Extract and compile SCSS files from .src/styles directory to external CSS file
				 */
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								//modules: true, // to check if needed
								//minimize: true,
								// even if disabled, sourceMaps gets generated
								sourceMap: false, // true
								autoprefixer: false,
								// see https://github.com/webpack-contrib/css-loader#importloaders)
								importLoaders: 2 // 2 => postcss-loader + sass-loader
							}
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true,
								plugins: commonData.postcssPlugins
							}
						},
						"sass-loader"
					],
					include: [helpers.root(buildUtils.ANGULAR_APP_CONFIG.sourceRoot, "styles")]
				},

				/**
				 * Extract and compile PCSS files from .src/styles directory to external CSS file
				 */
				{
					test: /\.pcss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								//modules: true, // to check if needed
								//minimize: true,
								// even if disabled, sourceMaps gets generated
								sourceMap: false, // true
								autoprefixer: false,
								// see https://github.com/webpack-contrib/css-loader#importloaders)
								importLoaders: 1 // 1 => postcss-loader
							}
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true,
								plugins: commonData.postcssPlugins
							}
						}
					],
					include: [helpers.root(buildUtils.ANGULAR_APP_CONFIG.sourceRoot, "styles")]
				}
			]
		},

		/**
		 * Add additional plugins to the compiler.
		 *
		 * See: https://webpack.js.org/configuration/plugins/
		 */
		plugins: [
			/**
			 * Plugin: SourceMapDevToolPlugin
			 * Description: enables more fine grained control of source map generation
			 * See: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
			 *
			 * This config gives the same results as using devtool: "devtool: 'source-map'"
			 * A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it.
			 * See: https://webpack.js.org/configuration/devtool
			 *
			 * IMPORTANT: this should be used instead of EvalSourceMapDevToolPlugin to avoid using eval() which violates CSP
			 */
			// FIXME Fix this configuration and disable devtool
			// new SourceMapDevToolPlugin({
			// 	filename: "[file].map[query]",
			// 	moduleFilenameTemplate: "[resource-path]",
			// 	fallbackModuleFilenameTemplate: "[resource-path]?[hash]",
			// 	module: true, // default: true
			// 	columns: true, // default: true
			// 	sourceRoot: "webpack:///"
			// }),

			/**
			 * Plugin: MiniCssExtractPlugin
			 * Description: Extracts imported CSS files into external stylesheet
			 *
			 * See: https://github.com/webpack-contrib/mini-css-extract-plugin
			 * See: https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/731
			 */
			new MiniCssExtractPlugin({
				filename: "[name].[contenthash].css",
				chunkFilename: "[id].[contenthash].css"
			}),

			// TODO remove since it's probably useless here (defined in webpack.common.js)
			new PurifyPlugin() /* buildOptimizer */,

			/**
			 * Plugin: HashedModuleIdsPlugin
			 * Description: This plugin will cause hashes to be based on the relative path of the module,
			 * generating a four character string as the module id
			 * See: https://webpack.js.org/plugins/hashed-module-ids-plugin/
			 */
			new HashedModuleIdsPlugin({
				hashFunction: "sha256",
				hashDigest: "hex",
				hashDigestLength: 20
			})
		]
	});

	if (!isCITestEnv) {
		webpackConfig.devtool = "source-map";
	}

	return webpackConfig;
};
