/*tslint:disable:completed-docs*/
import { starkIsKBO } from "./is-kbo.validator.fn";

describe("Validator Function: StarkIsKBO", () => {
	let kbo: string;

	it("should fail if kbo is empty", () => {
		kbo = "";
		const result: boolean = starkIsKBO(kbo);
		expect(result).toBe(false);
	});

	it("should fail if kbo is not correct", () => {
		kbo = "0203.201.666";
		let result: boolean = starkIsKBO(kbo);
		expect(result).toBe(false);

		kbo = "2.104.471.666";
		result = starkIsKBO(kbo);
		expect(result).toBe(false);
	});

	it("should NOT fail if kbo is correct", () => {
		kbo = "0203.201.340";
		let result: boolean = starkIsKBO(kbo);
		expect(result).toBe(true);

		kbo = "2.104.471.814";
		result = starkIsKBO(kbo);
		expect(result).toBe(true);
	});
});
