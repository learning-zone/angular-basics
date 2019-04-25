/**
 * @ignore
 */
const _floor: Function = require("lodash/floor");

/**
 * @ignore
 * Name of the validator, in case injection is needed.
 */
export const starkIsISINValidatorName: string = "starkIsISIN";

/**
 * @ignore
 * An International Securities Identification Number (ISIN) uniquely identifies a security. Its structure is defined in ISO 6166.
 * Securities for which ISINs are issued include bonds, commercial paper, equities and warrants. The ISIN code is a 12-character
 * alpha-numerical code that does not contain information characterizing financial instruments but serves for uniform identification
 * of a security at trading and settlement.
 *
 * Checks if the number is a valid ISIN number (Modulus 10 Double Add Double)
 */
export function starkIsISIN(isin: string): boolean {
	const modulo: number = 10;
	const base: number = 36;
	const lengthWithoutCheckDigit: number = 11;
	const isinPattern: RegExp = /^[A-Z]{2}([A-Z0-9]){9}[0-9]/;

	let isValid: boolean = false;
	if (typeof isin === "string" && isinPattern.test(isin)) {
		let digits: string = "";

		for (let i: number = 0; i < lengthWithoutCheckDigit; i++) {
			digits += parseInt(isin[i], base).toString();
		}

		digits = digits
			.split("")
			.reverse()
			.join("");

		let sum: number = 0;
		for (let i: number = 0; i < digits.length; i++) {
			let digit: number = parseInt(digits[i], base);

			if (i % 2 === 0) {
				digit *= 2;
			}

			sum += _floor(digit / modulo);
			sum += digit % modulo;
		}

		const currentCheckDigit: number = parseInt(isin[lengthWithoutCheckDigit], base);
		const expectedCheckDigit: number = sum % modulo === 0 ? 0 : (_floor(sum / modulo) + 1) * modulo - sum;
		isValid = currentCheckDigit === expectedCheckDigit;
	}
	return isValid;
}
