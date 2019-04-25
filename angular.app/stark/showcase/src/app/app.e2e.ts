import { browser, by, element } from "protractor";
// tslint:disable-next-line:no-import-side-effect
import "tslib";

describe("App", () => {
	beforeEach(async () => {
		await browser.get("/");
	});

	it("should have a title", async () => {
		const subject: string = await browser.getTitle();
		const result: string = "Stark Showcase";
		expect(subject).toEqual(result);
	});

	it("should have header", async () => {
		const subject: boolean = await element(by.css("h1")).isPresent();
		const result: boolean = true;
		expect(subject).toEqual(result);
	});

	it("should have <home>", async () => {
		const subject: boolean = await element(by.css("app home")).isPresent();
		const result: boolean = true;
		expect(subject).toEqual(result);
	});
});
