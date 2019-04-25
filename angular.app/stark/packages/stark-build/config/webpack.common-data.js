"use strict";

const path = require("path");

// The goal of this module is only to export common configuration data that the different Webpack configuration files use

const { PostcssCliResources } = require("@angular-devkit/build-angular/src/angular-cli-files/plugins/webpack");

// Helpers
const helpers = require("./helpers");
const buildUtils = require("./build-utils");

// Metadata
const starkAppMetadata = require(helpers.root("src/stark-app-metadata.json"));
const starkAppConfig = require(helpers.root("src/stark-app-config.json"));

// Angular CLI config
const deployUrl = buildUtils.ANGULAR_APP_CONFIG.deployUrl;
const baseHref = buildUtils.ANGULAR_APP_CONFIG.baseHref;
// Maximum resource size to inline (KiB)
// (as defined in node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/styles.js)
const maximumInlineSize = 10;

// PostCSS Plugins
const postcssPlugins = loader => [
	// reference: https://github.com/postcss/postcss-import
	// https://github.com/postcss/postcss-import/issues/244
	require("postcss-import")(
		// configuration taken as is from node_modules/@angular/cli/models/webpack-configs/styles.js
		{
			resolve: (url, context) => {
				return new Promise((resolve, reject) => {
					let hadTilde = false;
					if (url && url.startsWith("~")) {
						url = url.substr(1);
						hadTilde = true;
					}
					loader.resolve(context, (hadTilde ? "" : "./") + url, (err, result) => {
						if (err) {
							if (hadTilde) {
								reject(err);
								return;
							}
							loader.resolve(context, url, (err, result) => {
								if (err) {
									reject(err);
								} else {
									resolve(result);
								}
							});
						} else {
							resolve(result);
						}
					});
				});
			},
			load: filename => {
				return new Promise((resolve, reject) => {
					loader.fs.readFile(filename, (err, data) => {
						if (err) {
							reject(err);
							return;
						}
						const content = data.toString();
						resolve(content);
					});
				});
			}
		}
	),

	// plugin to rebase, inline or copy on url().
	// https://github.com/postcss/postcss-url
	require("postcss-url")(
		// configuration taken as is from node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/styles.js
		{
			filter: ({ url }) => url.startsWith("~"),
			url: ({ url }) => {
				const fullPath = helpers.root("node_modules", url.substr(1));
				return path.relative(loader.context, fullPath).replace(/\\/g, "/");
			}
		}
	),
	require("postcss-url")(
		// configuration taken as is from node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/styles.js
		[
			{
				// Only convert root relative URLs, which CSS-Loader won't process into require().
				filter: ({ url }) => url.startsWith("/") && !url.startsWith("//"),
				url: ({ url }) => {
					if (deployUrl.match(/:\/\//) || deployUrl.startsWith("/")) {
						// If deployUrl is absolute or root relative, ignore baseHref & use deployUrl as is.
						return `${deployUrl.replace(/\/$/, "")}${url}`;
					} else if (baseHref.match(/:\/\//)) {
						// If baseHref contains a scheme, include it as is.
						return baseHref.replace(/\/$/, "") + `/${deployUrl}/${url}`.replace(/\/\/+/g, "/");
					} else {
						// Join together base-href, deploy-url and the original URL.
						// Also dedupe multiple slashes into single ones.
						return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, "/");
					}
				}
			},
			{
				// TODO: inline .cur if not supporting IE (use browserslist to check)
				filter: asset => {
					return maximumInlineSize > 0 && !asset.hash && !asset.absolutePath.endsWith(".cur");
				},
				url: "inline",
				// NOTE: maxSize is in KB
				maxSize: maximumInlineSize,
				fallback: "rebase"
			},
			{ url: "rebase" }
		]
	),

	// plugin that lets nest style rules inside each other
	// https://github.com/jonathantneal/postcss-nesting
	require("postcss-nesting")(),

	// plugin for extending placeholder selectors
	// https://github.com/davidtheclark/postcss-simple-extend
	require("postcss-simple-extend")(),

	// plugin that allows to use the latest CSS syntax transforming it into cross-browser compatible CSS
	// https://github.com/MoOx/postcss-cssnext
	require("postcss-cssnext")({
		// also adds vendor prefixes automatically using "autoprefixer"
		// this plugin should be included in the right order
		// see https://github.com/MoOx/postcss-cssnext/issues/268 for example
		browsers: ["last 3 versions", "Chrome >= 56"]
	}),

	// configuration taken as is from node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/styles.js
	// the hashing format is just [hash] always instead of the 'outputHashing' value in the angular.json:
	//
	// const utils = require("@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/utils");
	// const hashFormat = utils.getOutputHashFormat("all");  // "media" => development, "all" production
	PostcssCliResources({
		deployUrl: loader.loaders[loader.loaderIndex].options.ident === "extracted" ? "" : deployUrl,
		loader,
		filename: `[name].[hash].[ext]`
	})
];

exports.postcssPlugins = postcssPlugins;
exports.starkAppMetadata = starkAppMetadata;
exports.starkAppConfig = starkAppConfig;
