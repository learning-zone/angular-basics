let fs = require("fs");
let path = require("path");

const filesToChange = [
	/index.html/,
	/main.*\.css$/,
	/main.*\.js$/,
	/main.*\.js\.map$/,
	/runtime~main.*\.js$/,
	/runtime~main.*\.js\.map$/,
	/runtime~polyfills.*\.js$/,
	/runtime~polyfills.*\.js\.map$/
];

if (process.argv.length <= 2) {
	console.log("Usage: " + __filename + " deployDir oldDeployDir");
	process.exit(-1);
}

let deployDir = "/showcase/" + process.argv[2];

let baseHrefPlaceholder = "<stark-dummy-base-href>";
let deployUrlPlaceholder = "<stark-dummy-deploy-url>";

let urlWithTrailingSlash = deployDir.endsWith("/") ? deployDir : deployDir + "/";
let urlWithoutTrailingSlash = deployDir.endsWith("/") ? deployDir.substring(0, deployDir.length - 1) : deployDir;

let replacements = [
	{ searchValue: `/${baseHrefPlaceholder}/${deployUrlPlaceholder}/`, replaceValue: urlWithTrailingSlash },
	{ searchValue: `"${baseHrefPlaceholder}"`, replaceValue: `"${urlWithTrailingSlash}"` },
	{ searchValue: `"${deployUrlPlaceholder}/`, replaceValue: `"${urlWithTrailingSlash}` },
	{ searchValue: `${deployUrlPlaceholder}`, replaceValue: urlWithoutTrailingSlash }
];

// if the 3rd param is given (oldDeployDir) then it will be appended to the "showcase" folder and replaced by the new deployDir
if (process.argv[3]) {
	deployDir = "showcase/" + process.argv[2]; // no slashes at the beginning nor the end to cover all replacements at once
	let oldDeployDir = "showcase/" + process.argv[3]; // no slashes at the beginning nor the end cover all replacements at once

	replacements = [{ searchValue: oldDeployDir, replaceValue: deployDir }];
}

let outputDir = "showcase" + path.sep + "dist";

fs.readdir(outputDir, function(err, items) {
	if (err) {
		return console.error("Error while reading directory => " + err);
	}

	for (const item of items) {
		for (const fileRegex of filesToChange) {
			if (item.match(fileRegex)) {
				let fullFilePath = outputDir + path.sep + item;
				replaceValuesInFile(fullFilePath, replacements);

				break;
			}
		}
	}
});

function replaceValuesInFile(fileName, valueReplacements) {
	fs.readFile(fileName, "utf8", function(err, data) {
		if (err) {
			return console.error("Error while reading file => " + err);
		}

		let result = data;

		for (const replacement of valueReplacements) {
			const searchValueRegex = new RegExp(replacement.searchValue, "g");
			result = result.replace(searchValueRegex, replacement.replaceValue);
		}

		fs.writeFile(fileName, result, "utf8", function(err) {
			if (err) {
				return console.error(err);
			} else {
				return console.log(`${fileName} updated successfully`);
			}
		});
	});
}
