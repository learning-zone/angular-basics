const fs = require("fs");
const StreamConcat = require("stream-concat");

// add the reports of all the different Stark packages to be combined
const fileNames = ["packages/stark-core/reports/coverage/packages/lcov.info", "packages/stark-ui/reports/coverage/packages/lcov.info"];
let fileIndex = 0;

const nextStream = function() {
	if (fileIndex === fileNames.length) {
		return null;
	}

	const file = fileNames[fileIndex++];

	console.log("Concatenating coverage report: ", file);
	return fs.createReadStream(file);
};

const combinedStream = new StreamConcat(nextStream);

combinedStream.pipe(process.stdout);
