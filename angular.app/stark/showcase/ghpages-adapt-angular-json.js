let fs = require("fs");

const deployUrlPlaceholder = "<stark-dummy-deploy-url>";
const baseHrefPlaceholder = "<stark-dummy-base-href>";

let replacements = [
	{ searchValue: `"deployUrl": ""`, replaceValue: `"deployUrl": "${deployUrlPlaceholder}"` },
	{ searchValue: `"baseHref": "/"`, replaceValue: `"baseHref": "${baseHrefPlaceholder}"` }
];

replaceValuesInFile("angular.json", replacements);

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
