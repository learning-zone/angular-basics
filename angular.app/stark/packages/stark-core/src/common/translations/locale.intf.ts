/**
 * Contains the translation for a specific language
 */
export interface StarkLocale {
	/**
	 * The code of the language that we want to retrieve
	 */
	languageCode: string;

	/**
	 * The actual translation of the text
	 */
	translations: Object;
}
