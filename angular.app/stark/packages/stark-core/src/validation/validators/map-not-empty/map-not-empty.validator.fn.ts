/**
 * Name of the starkMapNotEmpty validator.
 */
export const starkMapNotEmptyValidatorName: string = "starkMapNotEmpty";

/**
 * Validator function that checks if the given map is not empty
 * @param map the map to check
 * @returns true if the map is not empty
 */
export function starkMapNotEmpty(map: Map<any, any>): boolean {
	return map instanceof Map && map.size > 0;
}
