/**
 * @ignore
 * Name of the validator, in case injection is needed.
 */
export const starkIsBICValidatorName: string = "starkIsBIC";

/**
 * @ignore
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
 */
export function starkIsBIC(bic: string): boolean {
	const swiftRegex: RegExp = /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;

	return typeof bic === "string" && swiftRegex.test(bic);
}
