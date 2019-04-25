/*tslint:disable:completed-docs*/
import { starkIsSupportedLanguage } from "./is-supported-language.fn";

describe("Validator Function: StarkIsSupportedLanguage", () => {
	it("should return FALSE if the language's iso code is not in the list of supported languages", () => {
		const invalidLanguages: string[] = ["en-GB", "fr-FR", "nl-NL", "de-BE", "es-MX", "pt-BR", "whatever"];

		for (const language of invalidLanguages) {
			expect(starkIsSupportedLanguage(language)).toBe(false);
		}
	});

	it("should return TRUE if the language's iso code is in the list of supported languages", () => {
		const validLanguages: string[] = ["en-US", "fr-BE", "nl-BE", "de-DE"];

		for (const language of validLanguages) {
			expect(starkIsSupportedLanguage(language)).toBe(true);
		}
	});

	it("should return FALSE if the language is not defined", () => {
		expect(starkIsSupportedLanguage(<any>undefined)).toBe(false);
	});
});
