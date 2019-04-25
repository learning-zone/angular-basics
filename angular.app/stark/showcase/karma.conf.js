/**
 * Load karma config from Stark
 */
const helpers = require("./node_modules/@nationalbankbelgium/stark-testing/helpers");

/**
 * Load karma config from Stark
 */
const defaultKarmaConfig = require("./node_modules/@nationalbankbelgium/stark-testing/karma.conf.js").rawKarmaConfig;

// entry files of the "@nationalbankbelgium/stark-ui" module imported in mock files
const karmaTypescriptExclusions = [...defaultKarmaConfig.exclude, "src/assets/examples/**"];

// start customizing the KarmaCI configuration from stark-testing
const starkShowcaseSpecificConfiguration = Object.assign({}, defaultKarmaConfig, {
	// list of files to exclude
	exclude: karmaTypescriptExclusions
});

// export the configuration function that karma expects and simply return the stark configuration
module.exports = {
	default: function(config) {
		return config.set(starkShowcaseSpecificConfiguration);
	},
	karmaTypescriptExclusions: karmaTypescriptExclusions
};
