const helpers = require("./node_modules/@nationalbankbelgium/stark-testing/helpers");

/**
 * Load karma config from Stark
 */
const defaultKarmaCIConfig = require("./node_modules/@nationalbankbelgium/stark-testing/karma.conf.ci.js").rawKarmaConfig;
const karmaTypescriptFiles = require("./karma.conf").karmaTypescriptFiles;

// start customizing the KarmaCI configuration from stark-testing
const starkCoreSpecificConfiguration = Object.assign({}, defaultKarmaCIConfig, {
	// change the path of the report so that Coveralls takes the right path to the source files
	coverageIstanbulReporter: Object.assign(defaultKarmaCIConfig.coverageIstanbulReporter, {
		dir: helpers.root("reports/coverage/packages")
	}),
	// add missing files due to "@nationalbankbelgium/stark-core" imports used in mock files of the testing sub-package
	files: [...defaultKarmaCIConfig.files, ...karmaTypescriptFiles]
});

// export the configuration function that karma expects and simply return the stark configuration
module.exports = config => {
	return config.set(starkCoreSpecificConfiguration);
};
