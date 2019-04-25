/*tslint:disable:completed-docs*/
import { starkIsNIN } from "./is-nin.validator.fn";

describe("Validator Function: StarkIsNIN", () => {
	let nin: string;

	beforeEach(() => {
		nin = "84.02.01-069.84";
	});

	it("should fail if nin is empty or undefined", () => {
		nin = "";
		let result: boolean = starkIsNIN(nin, "BE");
		expect(result).toBe(false);

		result = starkIsNIN(<any>undefined, "BE");
		expect(result).toBe(false);
	});

	it("should fail if country code is empty or undefined", () => {
		let result: boolean = starkIsNIN(nin, "");
		expect(result).toBe(false);

		result = starkIsNIN(nin, <any>undefined);
		expect(result).toBe(false);
	});

	it("should fail if nin is not correct", () => {
		let result: boolean = starkIsNIN(nin, "BE");
		expect(result).toBe(false);

		result = starkIsNIN("", "BE");
		expect(result).toBe(false);

		result = starkIsNIN(<any>undefined, "BE");
		expect(result).toBe(false);
	});

	it("should throw an error if the country code is any other than BE", () => {
		expect(() => starkIsNIN(nin, "FR")).toThrowError(/Only belgian/);
	});

	it("should NOT fail if nin is correct", () => {
		nin = "84.02.01-069.30";
		const result: boolean = starkIsNIN(nin, "be");
		expect(result).toBe(true);
	});
});
