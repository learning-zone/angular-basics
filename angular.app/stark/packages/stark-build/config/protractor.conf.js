require("ts-node").register({
	project: "tsconfig.e2e.json"
});

const helpers = require("./helpers");

exports.config = {
	baseUrl: "http://localhost:3000/",

	/**
	 * Use `npm run e2e`
	 */
	specs: [helpers.root("src/**/**.e2e.ts"), helpers.root("src/**/*.e2e.ts")],
	exclude: [],

	framework: "jasmine2",

	allScriptsTimeout: 110000,

	jasmineNodeOpts: {
		showTiming: true,
		showColors: true,
		isVerbose: false,
		includeStackTrace: false,
		defaultTimeoutInterval: 400000
	},
	directConnect: true,

	capabilities: {
		browserName: "firefox",
		chromeOptions: {
			// TODO make sure we run in headless & no-sandbox modes! (important for Travis CI)
			//'args': ["--headless", "--disable-gpu", "--window-size=1280x800",  "--no-sandbox"]
			args: ["show-fps-counter=true"]
		}
	},

	onPrepare: function() {
		browser.ignoreSynchronization = true;
	},

	/**
	 * Angular 2 configuration
	 *
	 * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
	 * `rootEl`
	 */
	useAllAngular2AppRoots: true,

	SELENIUM_PROMISE_MANAGER: false
};
