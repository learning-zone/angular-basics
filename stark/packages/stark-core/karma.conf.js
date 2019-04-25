const helpers = require("./node_modules/@nationalbankbelgium/stark-testing/helpers");

/**
 * Load karma config from Stark
 */
const defaultKarmaConfig = require("./node_modules/@nationalbankbelgium/stark-testing/karma.conf.js").rawKarmaConfig;

// entry files of the "@nationalbankbelgium/stark-core" module imported in mock files
const karmaTypescriptFiles = [{ pattern: helpers.root("index.ts") }, { pattern: helpers.root("public_api.ts") }];

// start customizing the Karma configuration from stark-testing
const starkCoreSpecificConfiguration = Object.assign({}, defaultKarmaConfig, {
	// add missing files due to "@nationalbankbelgium/stark-core" imports used in mock files of the testing sub-package
	files: [...defaultKarmaConfig.files, ...karmaTypescriptFiles]
});

// export the configuration function that karma expects and simply return the stark configuration
module.exports = {
	default: function(config) {
		return config.set(starkCoreSpecificConfiguration);
	},
	karmaTypescriptFiles: karmaTypescriptFiles
};
