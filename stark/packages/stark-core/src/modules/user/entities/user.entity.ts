import { autoserialize } from "cerialize";
import { StarkUserProfile } from "./user-profile.entity.intf";
import { StarkUserSecurityProfile } from "./user-security-profile.entity.intf";
import { StarkResource } from "../../http/entities";
import { IsArray, IsBoolean, IsDefined, IsEmail, IsString, ValidateIf } from "class-validator";
import { StarkClassValidationUtil } from "../../../util";

/**
 * @ignore
 */
export class StarkUser implements StarkUserProfile, StarkUserSecurityProfile, StarkResource {
	@IsDefined()
	@IsString()
	@autoserialize
	public uuid: string;

	@IsDefined()
	@IsString()
	@autoserialize
	public username: string;

	@IsDefined()
	@IsString()
	@autoserialize
	public firstName: string;

	@IsDefined()
	@IsString()
	@autoserialize
	public lastName: string;

	@ValidateIf(StarkClassValidationUtil.validateIfDefinedAndNotNull)
	@IsEmail()
	@autoserialize
	public email?: string;

	@ValidateIf(StarkClassValidationUtil.validateIfDefinedAndNotNull)
	@IsString()
	@autoserialize
	public phone?: string;

	@ValidateIf(StarkClassValidationUtil.validateIfDefinedAndNotNull)
	@IsString()
	@autoserialize
	public language?: string;

	@ValidateIf(StarkClassValidationUtil.validateIfDefinedAndNotNull)
	@IsString()
	@autoserialize
	public selectedLanguage?: string;

	@ValidateIf(StarkClassValidationUtil.validateIfDefinedAndNotNull)
	@IsString()
	@autoserialize
	public referenceNumber?: string;

	@IsDefined()
	@IsArray()
	@autoserialize
	public roles: string[] = [];

	@ValidateIf(StarkClassValidationUtil.validateIfDefinedAndNotNull)
	@IsString()
	@autoserialize
	public workpost?: string;

	@ValidateIf(StarkClassValidationUtil.validateIfDefinedAndNotNull)
	@IsBoolean()
	@autoserialize
	public isAnonymous?: boolean;

	@autoserialize
	public custom?: object;

	/**
	 * Extract the properties coming in the "details" object.
	 * This is a callback method provided by cerialize in order to post-process the de-serialized json object.
	 * @param instance - Instantiated object with its properties already set as defined via the serializer annotations
	 * @param json - Raw json object retrieved from the http call
	 */
	public static OnDeserialized(instance: StarkUser, json: any): void {
		if (json.details) {
			instance.language = json.details.language;
			instance.firstName = json.details.firstName;
			instance.lastName = json.details.lastName;
			instance.email = json.details.mail;
			instance.referenceNumber = json.details.referenceNumber;
		}
	}
}
