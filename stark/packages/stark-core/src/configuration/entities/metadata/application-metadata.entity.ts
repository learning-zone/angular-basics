import { ArrayNotEmpty, IsDefined, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { autoserialize } from "cerialize";

import { StarkApplicationMetadata } from "./application-metadata.entity.intf";
import { StarkLanguageImpl } from "../language";
import { StarkLanguage } from "../language/language.entity.intf";
import { StarkLanguages } from "../language/language.constants";

/**
 * @ignore
 */
export class StarkApplicationMetadataImpl implements StarkApplicationMetadata {
	// FIXME: properties of the group "temp" are not used yet. Will they still be used?

	@IsNotEmpty({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public name: string;

	@IsNotEmpty({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public description: string;

	@IsNotEmpty({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public version: string;

	@IsNotEmpty({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public environment: string;

	@IsNotEmpty({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public buildTimestamp: string;

	@IsNotEmpty({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public deploymentTimestamp: string;

	@IsDefined({ groups: ["settings"] })
	@ArrayNotEmpty({ groups: ["settings"] })
	@ValidateNested({ groups: ["settings"], each: true }) // validate each item of the array
	public supportedLanguages: StarkLanguageImpl[] = [];

	/**
	 * Callback method provided by cerialize in order to post-process the de-serialized json object
	 * @param instance - Instantiated object with its properties already
	 * set as defined via the serializer annotations
	 * @param json - Raw json object loaded from file
	 */
	public static OnDeserialized(instance: StarkApplicationMetadataImpl, json: any): void {
		const supportedLanguages: string[] = json["supportedLanguages"];

		for (const item of supportedLanguages) {
			if (item) {
				const languageConstant: StarkLanguage = StarkLanguages[item.toUpperCase().replace("-", "_")];
				if (languageConstant) {
					instance.supportedLanguages.push(languageConstant);
				} else {
					instance.supportedLanguages.push(new StarkLanguageImpl(item, "..."));
				}
			}
		}
	}
}
