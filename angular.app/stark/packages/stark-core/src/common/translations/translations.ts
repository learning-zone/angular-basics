import { TranslateService } from "@ngx-translate/core";
/**
 *  @ignore
 */
const _cloneDeep: Function = require("lodash/cloneDeep");

import { StarkLocale } from "./locale.intf";
import { translationsEn } from "./translations/en";
import { translationsFr } from "./translations/fr";
import { translationsNl } from "./translations/nl";

/**
 * This function can be used by Stark modules to merge their translations into existing translations,
 * without losing any existing translations.
 *
 * There are three 'levels' that can provide translations:
 *   1. Common: for the Stark framework, they are stored in the 'translations' folder in the current folder.
 *   2. Module: each module contains it's own translations, to make Stark fully modular.
 *   3. App: the translations provided by the client application that implements the Stark framework.
 *
 * These levels have a hierarchy, where the common translations have to lowest priority and the translations
 * of the client application have the highest priority. This means that if one or more levels have a
 * translation with the same key, the translation with the highest priority 'wins'.
 *
 * Functionality:
 * First the existing translations are stored in a variable 'translations'.
 * The function then iterates over the 'args' parameters.
 * For each language, the following steps are processed:
 *   1. The translateService is cleaned (shouldMerge = false)
 *   2. The 'common' translations are added in the translateService
 *   3. The 'module' translations are added in the translateService, replacing any existing translations
 *   4. The 'stored' translations are added in the translateService, replacing any existing translations
 *
 * @param translateService
 *   Description: a reference to the translateService instance
 * @param args
 *   Description: a list of StarkLocales that contain the translations for a specific language
 *
 * @example:
 *   mergeTranslations(this.translateService, english, french, dutch);
 */
export function mergeTranslations(translateService: TranslateService, ...args: StarkLocale[]): void {
	const locales: StarkLocale[] = [...args];
	const translations: object = _cloneDeep(translateService.translations);

	const commonTranslations: any[] = [];
	commonTranslations["en"] = translationsEn;
	commonTranslations["fr"] = translationsFr;
	commonTranslations["nl"] = translationsNl;

	locales.forEach((starkLocale: StarkLocale) => {
		translateService.setTranslation(starkLocale.languageCode, commonTranslations[starkLocale.languageCode], false);
		translateService.setTranslation(starkLocale.languageCode, starkLocale.translations, true);
		translateService.setTranslation(starkLocale.languageCode, translations[starkLocale.languageCode], true);
	});
}
