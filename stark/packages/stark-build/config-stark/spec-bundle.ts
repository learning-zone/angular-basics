"use strict";

/*
 * When testing with webpack and ES6, we have to do some extra
 * things get testing to work right. Because we are gonna write test
 * in ES6 to, we have to compile those as well. That's handled in
 * karma.conf.js with the karma-webpack plugin. This is the entry
 * file for webpack test. Just like webpack will create a bundle.js
 * file for our client, when we run test, it well compile and bundle them
 * all here! Crazy huh. So we need to do some setup
 */
// declare const require:any;
declare const __karma__: any;

const path: any = require("path");
const args: any = __karma__.config.args;
const opts: any = args ? args[0] : {};

// check if the user specified a specific test path
let testPath: string = opts.testPath;

import "../../../../src/polyfills";
import "../../../../src/vendor";

require("angular-mocks");
require("angular-material/angular-material-mocks");

/*
 Ok, this is kinda crazy. We can use the the context method on
 require that webpack created in order to tell webpack
 what files we actually want to require or import.
 Below, context will be an function/object with file names as keys.
 using that regex we are saying look in ../src then find
 any file that ends with spec.ts and get its path. By passing in true
 we say do this recursively
 */
const testsContext: any = require.context("../../../../src", true, /\.spec\.ts$/);

// do NOT delete any of the code below, it is necessary to load the unit tests
let modules: string[] = testsContext.keys();

// if so then we need to filter out test modules that do not match the provided file/folder path
if (testPath) {
	testPath = testPath.toLocaleLowerCase();
	testPath = testPath.slice(7);
	testPath = path.normalize(testPath);
	//console.debug("Filtering the tests to execute. Test file paths must start with: ",testPath);

	modules = modules.filter((modulePath: string) => {
		modulePath = modulePath.toLocaleLowerCase();
		modulePath = path.normalize(modulePath);
		return modulePath.startsWith(testPath); // include this path only if it matches the given testPath
	});
}

// load the tests
// using a for loop which is faster than forEach and for...of loops
/* tslint:disable:prefer-for-of */
for (let idx: number = 0; idx < modules.length; ++idx) {
	try {
		testsContext(modules[idx]);
	} catch (err) {
		console.error("[ERROR] WITH SPEC FILE: ", modules[idx]);
		console.error(err);
	}
}
/* tslint:enable */
