import "moment/locale/fr";
import "moment/locale/nl-be";
import "moment/locale/en-gb";

import { TranslateService } from "@ngx-translate/core";
import { DateAdapter } from "@angular/material/core";
import { mergeTranslations, StarkLocale } from "@nationalbankbelgium/stark-core";

const translationsEn: object = require("../assets/translations/en.json");
const translationsFr: object = require("../assets/translations/fr.json");
const translationsNl: object = require("../assets/translations/nl.json");

export function initializeTranslation(translateService: TranslateService, dateAdapter: DateAdapter<any>): void {
	translateService.addLangs(["en", "fr", "nl"]);
	translateService.setDefaultLang("en");
	translateService.use("en");

	dateAdapter.setLocale("en-us");

	const english: StarkLocale = { languageCode: "en", translations: translationsEn };
	const french: StarkLocale = { languageCode: "fr", translations: translationsFr };
	const dutch: StarkLocale = { languageCode: "nl", translations: translationsNl };

	mergeTranslations(translateService, english, french, dutch);
}
