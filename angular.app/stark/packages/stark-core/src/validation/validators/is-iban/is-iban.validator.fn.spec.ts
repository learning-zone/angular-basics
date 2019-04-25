/*tslint:disable:completed-docs*/
import { starkIsIBAN } from "./is-iban.validator.fn";

describe("Validator Function: StarkIsIBAN", () => {
	let iban: string;

	it("should fail if iban is empty", () => {
		iban = "";
		const result: boolean = starkIsIBAN(iban);
		expect(result).toBe(false);
	});

	it("should fail if iban is not correct", () => {
		iban = "BE68 5390 0754 7666";
		const result: boolean = starkIsIBAN(iban);
		expect(result).toBe(false);
	});

	it("should NOT fail if iban is correct", () => {
		iban = "BE68 5390 0754 7034";
		const result: boolean = starkIsIBAN(iban);
		expect(result).toBe(true);
	});
});
