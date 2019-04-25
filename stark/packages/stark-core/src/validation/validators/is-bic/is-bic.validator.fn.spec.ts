/*tslint:disable:completed-docs*/
import { starkIsBIC } from "./is-bic.validator.fn";

describe("Validator Function: StarkIsBIC", () => {
	let bic: string;

	it("should fail if bic is empty", () => {
		bic = "";
		const result: boolean = starkIsBIC(bic);
		expect(result).toBe(false);
	});

	it("should fail if bic is not correct", () => {
		bic = "123EBEBBTRE";
		const result: boolean = starkIsBIC(bic);
		expect(result).toBe(false);
	});

	it("should NOT fail if bic is correct", () => {
		bic = "NBBEBEBBTRE";
		const result: boolean = starkIsBIC(bic);
		expect(result).toBe(true);
	});
});
