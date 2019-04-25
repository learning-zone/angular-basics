const path = require("path");
const fs = require("fs");
const cliUtilConfig = require("@angular/cli/utilities/config");
const { formatDiagnostics } = require("@angular/compiler-cli/ngtools2");

function isDirectory(pathToCheck) {
	try {
		return fs.statSync(pathToCheck).isDirectory();
	} catch (_) {
		return false;
	}
}

function getDirectoriesNames(source) {
	return fs.readdirSync(source).filter(name => isDirectory(path.join(source, name)));
}

function getAngularCliAppConfig(angularCliAppConfigPath) {
	if (fs.existsSync(angularCliAppConfigPath)) {
		const angularCliConfig = require(angularCliAppConfigPath);
		const cliConfig = validateAngularCLIConfig(angularCliConfig);
		if (cliConfig) {
			if (cliConfig.defaultProject && cliConfig.projects[cliConfig.defaultProject]) {
				return cliConfig.projects[cliConfig.defaultProject];
			} else {
				throw new Error(
					"The configuration of the default project in angular.json is wrong. Please adapt it to follow Angular CLI guidelines."
				);
			}
		} else {
			throw new Error("Parsing " + angularCliAppConfigPath + " failed. Please make sure that the file is valid JSON.");
		}
	} else {
		throw new Error("angular.json is not present. Please add this at the root your project because stark-build needs this.");
	}
}

/**
 * Validate passed angular cli config based on schema: @angular/cli/lib/config/schema.json
 * If the serialized file is equal to the passed json, return the serialized config.
 * Otherwise, it returns false.
 *
 * @param jsonConfig
 * @returns {*}
 */
function validateAngularCLIConfig(jsonConfig) {
	// FIXME Adapt usage for Angular CLI 6
	return jsonConfig;

	// const SchemaClassFactory = require("@ngtools/json-schema").SchemaClassFactory;
	// const schema = require("@angular/cli/lib/config/schema.json");
	//
	// const config = new (SchemaClassFactory(schema))(jsonConfig);
	// try {
	// 	const serializedConfig = JSON.parse(config.$$serialize("application/json"));
	// 	return serializedConfig;
	// } catch (error) {
	// 	return false;
	// }
}

function getWorkspace() {
	return cliUtilConfig.getWorkspace();
}

exports.getAngularCliAppConfig = getAngularCliAppConfig;
exports.getDirectoriesNames = getDirectoriesNames;
exports.getWorkspace = getWorkspace;
exports.isDirectory = isDirectory;
exports.validateAngularCLIConfig = validateAngularCLIConfig;
