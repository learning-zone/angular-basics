import { IsNotEmpty, IsString, Matches } from "class-validator";
import { autoserialize } from "cerialize";
import { StarkLanguage } from "./language.entity.intf";
import { StarkIsSupportedLanguage } from "../../../validation/decorators/is-supported-language";
/**
 * @ignore
 */
export class StarkLanguageImpl implements StarkLanguage {
	@IsNotEmpty({ always: true }) // validation must be performed always, regardless of validation groups used.
	@IsString({ always: true })
	@Matches(/^[a-z]{2}-[A-Z]{2}$/, { always: true })
	@StarkIsSupportedLanguage({ always: true })
	@autoserialize
	public isoCode: string;

	@IsNotEmpty({ always: true }) // validation must be performed always, regardless of validation groups used.
	@IsString({ always: true })
	@autoserialize
	public translationKey: string;

	public constructor(isoCode: string, translationKey: string) {
		this.isoCode = isoCode;
		this.translationKey = translationKey;
	}

	public get code(): string {
		if (this.isoCode.length === 5) {
			return this.isoCode.substr(0, 2);
		} else {
			return "";
		}
	}

	public get region(): string {
		if (this.isoCode.length === 5) {
			return this.isoCode.substr(3, 2);
		} else {
			return "";
		}
	}
}
