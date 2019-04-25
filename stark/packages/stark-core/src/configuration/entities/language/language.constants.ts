import { StarkLanguage } from "./language.entity.intf";

/**
 * Lists of languages currently supported by Stark.
 */
export class StarkLanguages {
	/**
	 * English language
	 */
	public static EN_US: StarkLanguage = {
		isoCode: "en-US",
		translationKey: "STARK.LANGUAGES.EN",
		code: "en",
		region: "US"
	};
	/**
	 * French language
	 */
	public static FR_BE: StarkLanguage = {
		isoCode: "fr-BE",
		translationKey: "STARK.LANGUAGES.FR",
		code: "fr",
		region: "BE"
	};
	/**
	 * Dutch language
	 */
	public static NL_BE: StarkLanguage = {
		isoCode: "nl-BE",
		translationKey: "STARK.LANGUAGES.NL",
		code: "nl",
		region: "BE"
	};
	/**
	 * German language
	 */
	public static DE_DE: StarkLanguage = {
		isoCode: "de-DE",
		translationKey: "STARK.LANGUAGES.DE",
		code: "de",
		region: "DE"
	};
}
