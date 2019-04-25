/**
 * @ignore
 */
const _floor: Function = require("lodash/floor");

import { isValidBBAN } from "ibantools";

/**
 * @ignore
 * Name of the validator, in case injection is needed.
 */
export const starkIsBBANValidatorName: string = "starkIsBBAN";

/**
 * @ignore
 * Validates that the given string is a valid BBAN account. (Based on the country).
 * This validation requires a special usage because of the country code.
 * @param bban - the bban account number to validate
 * @param countryCode - the country code that will be used to validate the bban number
 * @returns boolean - true if the bban number is valid
 */
export function starkIsBBAN(bban: string, countryCode: string = ""): boolean {
	const strippedBban: string = typeof bban === "string" ? bban.replace(/\s/g, "") : bban;
	if (isValidBBAN(strippedBban, countryCode.toUpperCase())) {
		if (countryCode.match(/^BE/i)) {
			const checkDigit: number = parseInt(strippedBban.substring(strippedBban.length - 2), 10);
			const calculatedCheckDigit: number = calculateCheckDigit(strippedBban);

			return checkDigit === calculatedCheckDigit;
		}

		return true;
	}
	return false;
}

/**
 * @ignore
 * Calculates the check digit, to ensure there is no error with the bban number
 * @param bbanNumber - the bban number to validate
 * @returns the newly calculated check digits
 */
function calculateCheckDigit(bbanNumber: string): number {
	const firstPart: number = parseInt(bbanNumber.substring(0, bbanNumber.length - 2), 10);
	let checkDigit: number = _floor(firstPart % 97);
	if (checkDigit === 0) {
		checkDigit = 97;
	}

	return checkDigit;
}
