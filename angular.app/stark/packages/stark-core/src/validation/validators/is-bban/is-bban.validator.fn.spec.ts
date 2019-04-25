/*tslint:disable:completed-docs*/
import { starkIsBBAN } from "./is-bban.validator.fn";

describe("Validator Function: StarkIsBBAN", () => {
	let bban: string;

	it("should fail if bban is empty", () => {
		bban = "";
		const result: boolean = starkIsBBAN(bban);
		expect(result).toBe(false);
	});

	it("should fail if belgian bban is not correct", () => {
		bban = "1111 1111 1111";
		const result: boolean = starkIsBBAN(bban, "BE");
		expect(result).toBe(false);
	});

	it("should NOT fail if belgian bban is correct", () => {
		bban = "5390 0754 7034";
		const result: boolean = starkIsBBAN(bban, "BE");
		expect(result).toBe(true);
	});

	it("should NOT fail if french bban is correct", () => {
		bban = "2004 1010 0505 0001 3M02 606";
		const result: boolean = starkIsBBAN(bban, "FR");
		expect(result).toBe(true);
	});
});
