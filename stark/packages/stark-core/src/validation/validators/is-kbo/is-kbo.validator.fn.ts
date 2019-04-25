import { starkIsCompanyNumber } from "../is-company-number/is-company-number.validator.fn";
import { starkIsEstablishmentUnitNumber } from "../is-establishment-unit-number/is-establishment-unit-number.validator.fn";

/**
 * @ignore
 * Name of the validator, in case injection is needed
 */
export const starkIsKBOValidatorName: string = "starkIsKBO";

/**
 * @ignore
 * Validates that the given string is a valid KBO number (Belgium).
 * @param kbo - the kbo to validate
 * @returns boolean - true if the kbo is valid
 */
export function starkIsKBO(kbo: string): boolean {
	return starkIsCompanyNumber(kbo) || starkIsEstablishmentUnitNumber(kbo);
}
