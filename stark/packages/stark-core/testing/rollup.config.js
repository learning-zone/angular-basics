"use strict";

const commonData = require("../../rollup.config.common-data.js"); // common configuration between environments

module.exports = {
	input: "../../../dist/packages-dist/stark-core/fesm5/testing.js",
	external: commonData.external,
	plugins: commonData.plugins,
	output: [
		{
			file: "../../../dist/packages-dist/stark-core/bundles/stark-core-testing.umd.js",
			globals: commonData.output.globals,
			format: commonData.output.format,
			exports: commonData.output.exports,
			name: "stark.core.testing",
			sourcemap: commonData.output.sourcemap,
			amd: {
				id: "@nationalbankbelgium/stark-core/testing"
			}
		}
	]
};
