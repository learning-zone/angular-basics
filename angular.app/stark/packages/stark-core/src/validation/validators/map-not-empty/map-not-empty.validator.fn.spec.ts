/*tslint:disable:completed-docs*/
import { starkMapNotEmpty } from "./map-not-empty.validator.fn";

describe("Validator Function: StarkMapNotEmpty", () => {
	it("should return FALSE if the map is not of Map type", () => {
		const invalidMap: any = undefined;
		expect(starkMapNotEmpty(invalidMap)).toBe(false);
	});

	it("should return TRUE if the map is of Map type and is not empty", () => {
		const validMap: Map<any, any> = new Map();
		validMap.set("testKey", "testValue");
		expect(starkMapNotEmpty(validMap)).toBe(true);
	});

	it("should return FALSE if the map is empty", () => {
		const invalidMap: Map<any, any> = new Map();
		expect(starkMapNotEmpty(invalidMap)).toBe(false);
	});
});
