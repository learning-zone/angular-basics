/*tslint:disable:completed-docs*/
import { starkIsISIN } from "./is-isin.validator.fn";

describe("Validator Function: StarkIsISIN", () => {
	let isin: string;

	it("should fail if isin is empty", () => {
		isin = "";
		const result: boolean = starkIsISIN(isin);
		expect(result).toBe(false);
	});

	it("should fail if isin is not correct", () => {
		isin = "US5949181665";
		const result: boolean = starkIsISIN(isin);
		expect(result).toBe(false);
	});

	it("should NOT fail if isin is correct", () => {
		isin = "US5949181045";
		const result: boolean = starkIsISIN(isin);
		expect(result).toBe(true);
	});
});
