/*tslint:disable:completed-docs*/
import { starkIsCompanyNumber } from "./is-company-number.validator.fn";

describe("Validator Function: StarkIsCompanyNumber", () => {
	let companyNumber: string;

	it("should fail if company number is empty", () => {
		companyNumber = "";
		const result: boolean = starkIsCompanyNumber(companyNumber);
		expect(result).toBe(false);
	});

	it("should fail if company number is not correct", () => {
		companyNumber = "0203.201.666";
		const result: boolean = starkIsCompanyNumber(companyNumber);
		expect(result).toBe(false);
	});

	it("should NOT fail if company number is correct", () => {
		companyNumber = "0203.201.340";
		const result: boolean = starkIsCompanyNumber(companyNumber);
		expect(result).toBe(true);
	});
});
