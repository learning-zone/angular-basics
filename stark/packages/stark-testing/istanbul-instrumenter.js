const istanbulLibInstrument = require("istanbul-lib-instrument");
const convert = require("convert-source-map");

// IMPORTANT: use a custom instrumenter which uses the latest Istanbul (1.x  => istanbul-lib-instrument)
// This mimics the same functionality provided by the istanbul-instrumenter-loader for Webpack
// see: https://github.com/webpack-contrib/istanbul-instrumenter-loader/blob/master/src/index.js
const IstanbulInstrumenter = (function() {
	function IstanbulInstrumenter(options) {
		this.instrumenter = istanbulLibInstrument.createInstrumenter(options);
	}

	// custom instrumentation logic (finds the sourcemap in the source file if not found yet)
	IstanbulInstrumenter.prototype.instrument = function(code, filename, callback, inputSourceMap) {
		const instrumenter = this.instrumenter;
		let srcMap = inputSourceMap;
		// use inline source map, if any
		if (!srcMap) {
			const inlineSourceMap = convert.fromSource(code);
			if (inlineSourceMap) {
				srcMap = inlineSourceMap.sourcemap;
			}
		}

		return this.instrumenter.instrument(
			code,
			filename,
			function(error, instrumentedSource) {
				callback(error, instrumentedSource, instrumenter.lastSourceMap());
			},
			srcMap
		);
	};
	IstanbulInstrumenter.prototype.lastSourceMap = function() {
		return this.instrumenter.lastSourceMap();
	};
	IstanbulInstrumenter.prototype.lastFileCoverage = function() {
		return this.instrumenter.lastFileCoverage();
	};

	return IstanbulInstrumenter;
})();

module.exports = IstanbulInstrumenter;
