import { browser } from "protractor";
// tslint:disable-next-line:no-import-side-effect
import "tslib";

describe("Home", () => {
	beforeEach(async () => {
		/**
		 * Change hash depending on router LocationStrategy.
		 */
		await browser.get("/#/home");
	});
});
