/**
 * @ignore
 */
const _floor: Function = require("lodash/floor");

/**
 * @ignore
 * Name of the validator, in case injection is needed
 */
export const starkIsEstablishmentUnitNumberValidatorName: string = "starkIsEstablishmentUnitNumber";

/**
 * @ignore
 * Validates that the given string is a valid establishment unit number (Belgium).
 * @param establishmentNumber - the establishmentNumber to validate
 */
export function starkIsEstablishmentUnitNumber(establishmentNumber: string): boolean {
	const controlNumberBeginIndex: number = 8;
	const controlNumberEndIndex: number = 10;

	// Z.NNN.NNN.NNN with Z in (2-8) and N in (0-9)
	const establishmentNumberPattern: RegExp = /^[2-8][.][0-9]{3}[.][0-9]{3}[.][0-9]{3}/;
	// ZNNNNNNNNN with Z in (2-8) and N in (0-9)
	const establishementUnitNumberWithoutFormattingPattern: RegExp = /^[2-8][0-9]{3}[0-9]{3}[0-9]{3}/;

	let isValid: boolean = false;

	if (typeof establishmentNumber === "string") {
		if (
			establishmentNumber.match(establishmentNumberPattern) ||
			establishmentNumber.match(establishementUnitNumberWithoutFormattingPattern)
		) {
			const enterpriseNumber: string = establishmentNumber.replace(/[^0-9]/g, "");

			const controlNumber: number = parseInt(enterpriseNumber.substring(controlNumberBeginIndex, controlNumberEndIndex), 10);
			const numberToCheck: number = parseInt(enterpriseNumber.substring(0, controlNumberBeginIndex), 10);

			// We validate 8 first digits with a mod-97 checksum algorithm
			isValid = 97 - _floor(numberToCheck % 97) === controlNumber;
		}
	}

	return isValid;
}
