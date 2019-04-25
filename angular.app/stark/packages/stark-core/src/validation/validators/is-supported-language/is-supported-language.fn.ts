import { StarkLanguage } from "../../../configuration/entities/language/language.entity.intf";
import { StarkLanguages } from "../../../configuration/entities/language/language.constants";

/**
 * @ignore
 * Name of the starkIsSupportedLanguage validator. {@link StarkLanguage}
 */
export const starkIsSupportedLanguageValidatorName: string = "starkIsSupportedLanguage";

/**
 * @ignore
 * Validator function that checks if the given ISO code is supported by Stark or not
 * @param isoCode - the ISO code to check
 * @returns true if the given ISO code is part of {@link StarkLanguage}
 */
export function starkIsSupportedLanguage(isoCode: string): boolean {
	if (typeof isoCode === "string") {
		const languageConstant: StarkLanguage = StarkLanguages[isoCode.toUpperCase().replace("-", "_")];
		if (languageConstant) {
			return true;
		}
	}

	return false;
}
