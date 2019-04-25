import { isValidIBAN, electronicFormatIBAN } from "ibantools";

/**
 * @ignore
 * Name of the validator, in case injection is needed.
 */
export const starkIsIBANValidatorName: string = "starkIsIBAN";

/**
 * @ignore
 * Validates that the given string is a valid IBAN. (Based on the country)
 * @param iban - the iban number to validate
 */
export function starkIsIBAN(iban: string): boolean {
	if (typeof iban === "string") {
		//Since v2.0.0 of ibantools, isValidIBAN() is false if there is " " in the verified IBAN
		return isValidIBAN(electronicFormatIBAN(iban));
	}
	return false;
}
