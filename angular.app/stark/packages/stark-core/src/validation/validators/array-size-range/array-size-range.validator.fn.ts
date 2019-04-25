import { getFromContainer } from "class-validator";
import { StarkValidator } from "../../validator.intf";
import { StarkValidatorImpl } from "../../validator";

/**
 * @ignore
 * Name of the validator, in case injection is needed
 */
export const starkArraySizeRangeValidatorName: string = "starkArraySizeRange";

/**
 * @ignore
 * Validates that the size of the given array is between the minimum and maximum limits defined
 * @param array - an array of selected items
 * @param minSize - the minSize we want to apply to the array
 * @param maxSize - the maxSize we want to apply to the array
 * @returns boolean - true if the array size range is valid
 */
export function starkArraySizeRange(array: any[], minSize?: number, maxSize?: number): boolean {
	const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);
	let isValid: boolean = true;

	if (typeof minSize !== "undefined") {
		isValid = isValid && validator.arrayMinSize(array, minSize);
	}
	if (typeof maxSize !== "undefined") {
		isValid = isValid && validator.arrayMaxSize(array, maxSize);
	}
	return isValid;
}
