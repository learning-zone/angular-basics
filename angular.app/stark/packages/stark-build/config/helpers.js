const path = require("path");

const EVENT = process.env.npm_lifecycle_event || "";

/**
 * Helper functions.
 */
// const ROOT = path.resolve(__dirname, '..');
const _root = path.resolve(process.cwd(), "."); // project root folder
const _rootStark = path.resolve(process.cwd(), "node_modules/@nationalbankbelgium/stark-build"); // stark root folder

function hasProcessFlag(flag) {
	return process.argv.join("").indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
	return EVENT.includes(flag);
}

function isWebpackDevServer() {
	return process.argv[1] && !!/webpack-dev-server/.exec(process.argv[1]);
}

/**
 * Retrieve the relative path from the config directory to the path argument value (if provided). That path argument can be passed to only execute a subset of the unit tests (see spec-bundle.ts)
 * @param args the arguments to look into
 * @returns The relative path from this directory (config) to the location pointed at by the path argument value (if provided), an empty string otherwise
 */
function getTestPath(args) {
	for (let i = 0; i < args.length; ++i) {
		if (args[i] === "--path--") {
			let providedPath = args[i + 1] || "";
			if (!providedPath.toLocaleLowerCase().startsWith("src/")) {
				throw new Error("If you want to execute a subset of the unit tests, then the path you provide MUST start with 'src/'");
			}
			//return path.relative(__dirname, providedPath);
			// posix style to get the expected path separator
			return path.posix.relative(__dirname, providedPath);
		}
	}
	return "";
}

const root = path.join.bind(path, _root);
const rootStark = path.join.bind(path, _rootStark);

exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.getTestPath = getTestPath;
exports.root = root;
exports.rootStark = rootStark;
