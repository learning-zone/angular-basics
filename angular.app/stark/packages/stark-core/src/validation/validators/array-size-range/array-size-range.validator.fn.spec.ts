/*tslint:disable:completed-docs*/
import { starkArraySizeRange } from "./array-size-range.validator.fn";

function getTestArray(numberOfItems: number): number[] {
	const testArray: number[] = [];

	while (testArray.length < numberOfItems) {
		testArray.push(Math.random());
	}

	return testArray;
}

describe("Validator Function: StarkArraySizeRange", () => {
	describe("with a range defined", () => {
		it("should return FALSE if the array size is not in the defined range", () => {
			const invalidArrays: number[][] = [getTestArray(0), getTestArray(3), getTestArray(4)];

			for (const arr of invalidArrays) {
				expect(starkArraySizeRange(arr, 1, 2)).toBe(false);
			}
		});

		it("should return TRUE if the array size is in the defined range", () => {
			const validArrays: number[][] = [getTestArray(1), getTestArray(2)];

			for (const arr of validArrays) {
				expect(starkArraySizeRange(arr, 1, 2)).toBe(true);
			}
		});
	});

	describe("with only minSize defined", () => {
		it("should return FALSE if the array size is lower than minSize ", () => {
			const invalidArrays: number[][] = [getTestArray(0)];

			for (const arr of invalidArrays) {
				expect(starkArraySizeRange(arr, 1, undefined)).toBe(false);
			}
		});

		it("should return TRUE if the array size is equal or greater than minSize ", () => {
			const validArrays: number[][] = [getTestArray(1), getTestArray(2), getTestArray(3), getTestArray(4)];

			for (const arr of validArrays) {
				expect(starkArraySizeRange(arr, 1, undefined)).toBe(true);
			}
		});
	});

	describe("with only maxSize defined", () => {
		it("should return FALSE if the array size is greater than maxSize ", () => {
			const invalidArrays: number[][] = [getTestArray(3), getTestArray(4)];

			for (const arr of invalidArrays) {
				expect(starkArraySizeRange(arr, undefined, 2)).toBe(false);
			}
		});

		it("should return TRUE if the array size is equal or lower than maxSize ", () => {
			const validArrays: number[][] = [getTestArray(0), getTestArray(1), getTestArray(2)];

			for (const arr of validArrays) {
				expect(starkArraySizeRange(arr, undefined, 2)).toBe(true);
			}
		});
	});

	describe("with NO range defined", () => {
		it("should return TRUE always if minSize and maxSize are not defined", () => {
			const validArrays: number[][] = [getTestArray(0), getTestArray(1), getTestArray(2), getTestArray(3), getTestArray(4)];

			for (const arr of validArrays) {
				expect(starkArraySizeRange(arr, undefined, undefined)).toBe(true);
			}
		});
	});
});
