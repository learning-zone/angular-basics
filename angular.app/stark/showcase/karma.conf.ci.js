/**
 * Load karma config from Stark
 */
const defaultKarmaCIConfig = require("./node_modules/@nationalbankbelgium/stark-testing/karma.conf.ci.js").rawKarmaConfig;
const karmaTypescriptExclusions = require("./karma.conf").karmaTypescriptExclusions;

// start customizing the KarmaCI configuration from stark-testing
const starkShowcaseSpecificConfiguration = Object.assign({}, defaultKarmaCIConfig, {
	exclude: [...defaultKarmaCIConfig.exclude, ...karmaTypescriptExclusions]
});

// export the configuration function that karma expects and simply return the stark configuration
module.exports = config => {
	return config.set(starkShowcaseSpecificConfiguration);
};
