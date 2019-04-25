const helpers = require("./stark-build/config/helpers");
const ngCliUtils = require("./stark-build/config/ng-cli-utils");
const fs = require("fs");

const nbbPackages = ngCliUtils.getDirectoriesNames(helpers.root("packages"));

for (const nbbPackage of nbbPackages) {
	const ngCliConfigPath = helpers.root("packages/" + nbbPackage + "/" + ".ng-cli-config.json");

	if (fs.existsSync(ngCliConfigPath)) {
		const packageCliConfig = require(ngCliConfigPath);
		const cliConfig = ngCliUtils.validateAngularCLIConfig(packageCliConfig);
		if (!cliConfig) {
			throw new Error("Parsing " + ngCliConfigPath + " failed. Ensure the file is valid JSON.");
		}
	}
}
