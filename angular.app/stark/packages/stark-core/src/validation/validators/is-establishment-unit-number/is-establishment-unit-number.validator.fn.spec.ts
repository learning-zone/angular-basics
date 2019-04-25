/*tslint:disable:completed-docs*/
import { starkIsEstablishmentUnitNumber } from "./is-establishment-unit-number.validator.fn";

describe("Validator Function: StarkIsEstablishmentUnitNumber", () => {
	let establishmentUnitNumber: string;

	it("should fail if establishment unit number is empty", () => {
		establishmentUnitNumber = "";
		const result: boolean = starkIsEstablishmentUnitNumber(establishmentUnitNumber);
		expect(result).toBe(false);
	});

	it("should fail if establishment unit number is not correct", () => {
		establishmentUnitNumber = "2.104.471.666";
		const result: boolean = starkIsEstablishmentUnitNumber(establishmentUnitNumber);
		expect(result).toBe(false);
	});

	it("should NOT fail if establishment unit number is correct", () => {
		establishmentUnitNumber = "2.104.471.814";
		const result: boolean = starkIsEstablishmentUnitNumber(establishmentUnitNumber);
		expect(result).toBe(true);
	});
});
