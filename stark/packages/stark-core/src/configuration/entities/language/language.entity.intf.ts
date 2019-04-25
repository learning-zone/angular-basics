/**
 * Defines a language supported by Stark.
 */
export interface StarkLanguage {
	/**
	 * The ISO code of the language (e.g., en_US, fr_BE, fr_NL, ...)
	 * Consists of:
	 * the language code (ISO 639-1)
	 * a hyphen (-)
	 * the region code (ISO 3166-1 alpha-2 code)
	 * Supported languages: see {@link StarkLanguages}
	 */
	isoCode: string;
	/**
	 * The code is the shorthand for a given language (e.g., en, fr, ...)
	 * ISO 639-1
	 */
	code: string;
	/**
	 * The region is the country that we associate with (e.g., BE, DE, US, ...)
	 * ISO 3166-1 alpha-2 code
	 */
	region: string;
	/**
	 * The name of the language. By default it is in the language itself:
	 * STARK.LANGUAGES.DE = Deutsch
	 * STARK.LANGUAGES.EN = English
	 * STARK.LANGUAGES.FR = Français
	 * STARK.LANGUAGES.NL = Nederlands
	 */
	translationKey: string;
}
