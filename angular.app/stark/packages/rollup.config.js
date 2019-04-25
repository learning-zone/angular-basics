"use strict";

// This rollup configuration file is used to generate the final js bundles for each package under dist/packages-dist/<module-name>/<bundle-type>
// Used for the following bundle types: esm5, esm2015, fesm5, fesm2015,

const commonData = require("./rollup.config.common-data.js"); // common configuration

const sourcemaps = require("rollup-plugin-sourcemaps");

module.exports = {
	external: commonData.external,
	plugins: [
		sourcemaps()
		// NO MORE PLUGINS HERE: because we don't want the externals to be resolved!
	],
	output: [
		{
			globals: commonData.output.globals,
			format: "es",
			//exports: commonData.output.exports,
			sourcemap: commonData.output.sourcemap
		}
	]
};
