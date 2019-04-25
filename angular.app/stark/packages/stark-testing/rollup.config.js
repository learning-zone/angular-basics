"use strict";

const commonData = require("../rollup.config.common-data.js"); // common configuration between environments

module.exports = {
	input: "../../dist/packages-dist/stark-testing/karma.conf.js",
	external: commonData.external,
	plugins: commonData.plugins,
	output: [
		{
			file: "../../dist/packages-dist/stark-testing/stark-testing.js",
			format: "cjs",
			name: "stark.testing"
		}
	]
};
