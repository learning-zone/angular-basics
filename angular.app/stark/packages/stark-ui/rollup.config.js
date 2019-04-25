"use strict";

const commonData = require("../rollup.config.common-data.js"); // common configuration between environments

module.exports = {
	input: "../../dist/packages-dist/stark-ui/fesm5/stark-ui.js",
	external: commonData.external,
	plugins: commonData.plugins,
	output: [
		{
			file: "../../dist/packages-dist/stark-ui/bundles/stark-ui.umd.js",
			globals: commonData.output.globals,
			format: commonData.output.format,
			exports: commonData.output.exports,
			name: "stark.ui",
			sourcemap: commonData.output.sourcemap,
			amd: {
				id: "@nationalbankbelgium/stark-ui"
			}
		}
	]
};
