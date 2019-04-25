import { Validator } from "class-validator";

/**
 * Interface that defines validators usable in a Stark Project
 */
export interface StarkValidator extends Validator {
	/**
	 * Validates that the size of the given array is between the minimum and maximum limits defined
	 * @param any - an array of selected items
	 * @param minSize - the minSize we want to apply to the array
	 * @param maxSize - the maxSize we want to apply to the array
	 * @returns boolean - true if the array size range is valid
	 */
	starkArraySizeRange(value: any[], minSize: number, maxSize: number): boolean;

	/**
	 * Validates that the given string is a valid BBAN account. (Based on the country).
	 * This validation requires a special usage because of the country code.
	 * @param value - the bban account number to validate
	 * @param countryCode - the country code that will be used to validate the bban number
	 * @returns boolean - true if the bban number is valid
	 */
	starkIsBBAN(value: string, countryCode: string): boolean;

	/**
	 * ISO 9362 (also known as SWIFT-BIC, BIC code, SWIFT ID or SWIFT code) is a standard format of Business Identifier Codes approved
	 * by the International Organization for Standardization (ISO). It is a unique identification code for both financial and
	 * non-financial institutions.[1] (When assigned to a non-financial institution, a code may also be known as a Business Entity
	 * Identifier or BEI. These codes are used when transferring money between banks, particularly for international wire transfers, and
	 * also for the exchange of other messages between banks. The codes can sometimes be found on account statements.
	 *
	 * <ul>
	 * <li>4 letters: Institution Code or bank code.</li>
	 * <li>2 letters: ISO 3166-1 alpha-2 country code</li>
	 * <li>2 letters or digits: location code
	 * <ul>
	 * <li>if the second character is "0", then it is typically a test BIC as opposed to a BIC used on the live network.</li>
	 * <li>if the second character is "1", then it denotes a passive participant in the SWIFT network</li>
	 * <li>if the second character is "2", then it typically indicates a reverse billing BIC, where the recipient pays for the message
	 * as opposed to the more usual mode whereby the sender pays for the message.</li>
	 * </ul>
	 * </li>
	 * <li>3 letters or digits: branch code, optional ('XXX' for primary office)</li>
	 * </ul>
	 *
	 * <a href="http://en.wikipedia.org/wiki/ISO_9362">http://en.wikipedia.org/wiki/ISO_9362</a>
	 *
	 * @param value - the bic to validate
	 * @returns boolean - true if the bic is valid
	 */
	starkIsBIC(value: string): boolean;

	/**
	 * Validates that the given string is a valid company number (Belgium).
	 * @param value - the company number to validate
	 * @returns boolean - true if the company number if valid
	 */
	starkIsCompanyNumber(value: string): boolean;

	/**
	 * Validates that the given string is a valid establishment unit number (Belgium).
	 * @param value - the establishmentNumber to validate
	 * @returns boolean - true if the establishment number is valid
	 */
	starkIsEstablishmentUnitNumber(value: string): boolean;

	/**
	 * Validates that the given string is a valid IBAN. (Based on the country)
	 * @param value - the iban number to validate
	 * @returns boolean - true if the iban is valid
	 */
	starkIsIBAN(value: string): boolean;

	/**
	 * An International Securities Identification Number (ISIN) uniquely identifies a security. Its structure is defined in ISO 6166.
	 * Securities for which ISINs are issued include bonds, commercial paper, equities and warrants. The ISIN code is a 12-character
	 * alpha-numerical code that does not contain information characterizing financial instruments but serves for uniform identification
	 * of a security at trading and settlement.
	 *
	 * Checks if the number is a valid ISIN number (Modulus 10 Double Add Double)
	 *
	 * @param value - the isin number to validate
	 * @returns boolean - true if the iban is valid
	 */
	starkIsISIN(value: string): boolean;

	/**
	 * Validates that the given string is a valid KBO number (Belgium).
	 * @param value - the kbo number to validate
	 * @returns boolean - true if the kbo number is valid
	 */
	starkIsKBO(value: string): boolean;

	/**
	 * Validates that the given string is a valid NIN (National Idenfier Number).
	 * This validation requires a special usage because of the of the country code.
	 * @param value - the nin to validate
	 * @param countryCode - the countrycode to use for the nin validation
	 * @returns boolean - true if the nin is valid
	 */
	starkIsNIN(value: string, countryCode: string): boolean;

	/**
	 * Validates that the Map is not empty (it should have entries).
	 * @param value - the map to validate
	 * @returns boolean - true if the map is not empty
	 */
	starkMapNotEmpty(value: Map<any, any>): boolean;

	/**
	 * Validates that the given StarkLanguage object is a supported language by Stark.
	 * @param value - the StarkLanguage object to validate
	 * @returns boolean - true if the object if valid
	 */
	starkIsSupportedLanguage(value: string): boolean;

	/**
	 * Validates that the given string is a valid date.
	 * @param value - the string to validate
	 * @returns boolean - true if the string is a valid date
	 */
	starkIsDateTime(value: string): boolean;
}
