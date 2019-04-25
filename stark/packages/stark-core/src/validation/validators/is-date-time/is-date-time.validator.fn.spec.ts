/*tslint:disable:completed-docs*/
import { starkIsDateTime } from "./is-date-time.validator.fn";

describe("Validator Function: StarkIsDateTime", () => {
	describe("with the default format: 'DD-MM-YYYY HH:mm:ss'", () => {
		it("should return FALSE if inputString is not correct or is empty", () => {
			const invalidInputStrings: string[] = [
				"33-15-2000 25:70:70",
				"29-02-2017 10:15:20", // non leap year
				"04-25-2017 10:15:20",
				"2.104.471.666",
				""
			];

			for (const inputStr of invalidInputStrings) {
				expect(starkIsDateTime(inputStr)).toBe(false);
			}
		});

		it("should return TRUE if inputString is correct", () => {
			const validInputStrings: string[] = [
				"22-05-2017 15:15:45",
				"29-02-2016 10:15:20", // leap year
				"15-07-2033 15:15:54",
				"31-07-2017 08:15:42"
			];

			for (const inputStr of validInputStrings) {
				expect(starkIsDateTime(inputStr)).toBe(true);
			}
		});
	});

	describe("with a custom format", () => {
		let format: string;

		it("should return FALSE if inputString is correct but doesn't match the format", () => {
			format = "DD-MM-YYYY";

			const invalidInputStrings: string[] = ["12-12-12", "2000-05-31"];

			for (const inputStr of invalidInputStrings) {
				expect(starkIsDateTime(inputStr, format)).toBe(false);
			}
		});
	});
});
