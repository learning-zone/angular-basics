// This script provides a way to execute unit tests much faster than with Karma
// It uses the API of Jasmine to define the set of tests to execute and runs them simply using node
// This means that unit tests CANNOT rely on the Window object (i.e., Angular won't work)
// Thus this is only useful for actual unit tests :)
// To use this you can configure this script: "test-node": "node ./config/spec-jasmine-stark.js"

const defaultSpecFiles = "**/*.spec.ts";
// check if the user specified a specific test path
const specFiles = process.argv[2] ? process.argv[2] : defaultSpecFiles;
console.log("specFiles path: ", specFiles);

const helpers = require("./helpers");

// Make sure that TS code can be loaded
// since TS generates now ES2015 modules (to enable webpack tree-shaking)
// ts-node will fail to load the .spec.ts files due to "Unexpected token 'import'..."
// So there are 2 possible solutions:
// 1.- transpile the tests with babel before running the tests (a bit complex and at the end we could not get this to work :( )
// 2.- modify the TS config only for ts-node in order to generate CommonJS modules rather than ES2015 modules (we do this)
//
// so the TS config from the current project is used but just changing the module type generation: CommonJS
const projectTsConfig = require(helpers.root("./tsconfig.json"));
// first we need to get all the compilerOptions (including those inherited from Stark) and just change the module type to CommonJS
let starkTsConfig;
let compilerOptionsToOverwrite = { module: "commonjs" }; // change the module type generation to CommonJS
let tsNodeIgnoredFiles = [/node_modules/]; // the default in ts-node
try {
	// the current project IS NOT Stark, it is an application project, then the Stark tsConfig is read
	starkTsConfig = require(helpers.rootStark("./tsconfig.json"));
	// IMPORTANT: in this case also the "allowJs" option should be enabled so that the compiled JS code from Stark is transpiled as well
	// otherwise if the .spec.ts files import something from Stark, ts-node will fail to load those files due to "Unexpected token 'import'..."
	compilerOptionsToOverwrite = Object.assign({}, compilerOptionsToOverwrite, { allowJs: true });
	// AND of course the code from Stark SHOULD be transpiled, so the node_modules should be ignored EXCEPT those in @nationalbankbelgium
	tsNodeIgnoredFiles = [/node_modules(?!\/@nationalbankbelgium)/];
} catch (e) {
	// then the current project IS Stark, so the projectTsConfig variable already has the tsConfig from Stark
	starkTsConfig = { compilerOptions: {} };
}
const compilerOptionsWithCommonJs = Object.assign(
	{},
	starkTsConfig.compilerOptions,
	projectTsConfig.compilerOptions,
	compilerOptionsToOverwrite
);
require("ts-node").register({
	compilerOptions: compilerOptionsWithCommonJs,
	ignore: tsNodeIgnoredFiles
});

// stark typings need to be imported (the same as with TSC)
require("../src/typings/stark-typings");

global["ENV"] = "DEVELOPMENT";
global["HMR"] = false;
global["PRODUCTION"] = false;
global["DEVELOPMENT"] = true;

require("../src/polyfills-stark");
//import "../src/vendor-stark";
//require("angular-mocks");

const jasmine = require("jasmine");
// TODO import reporters
// "jasmine-spec-reporter": "3.2.0",
//const jasmineSpecReporter:any = require("jasmine-spec-reporter");

const jasmineExec = new jasmine({
	projectBaseDir: helpers.root("")
});

jasmineExec.loadConfig({
	spec_dir: "src",
	spec_files: [specFiles]
});

// TODO configure reporters
/*
 const jasmineSpecReporterOptions:any = {
 displayStacktrace: "all"
 };

 const initReporters:Function = () => {
 jasmineExec.addReporter(new jasmineSpecReporter(jasmineSpecReporterOptions));
 };

 initReporters();
 */

jasmineExec.execute();
