import { validateSync, ValidatorOptions } from "class-validator";
import { StarkValidationErrorsUtil } from "./validation-errors.util";
import { STARK_APP_CONFIG, StarkApplicationConfig } from "../configuration/entities/application/app-config.entity.intf";
import { STARK_APP_METADATA, StarkApplicationMetadata } from "../configuration/entities/metadata/application-metadata.entity.intf";

export type StarkConfigValidationGroups = "logging" | "routing" | "session" | "settings" | "http";
export type StarkMetadataValidationGroups = "settings";

/**
 * Util class used to validate AppConfig and AppMetadata instances
 */
export class StarkConfigurationUtil {
	/**
	 * Validates the given AppConfig instance and throws an error in case it is not valid
	 * @param appConfig - The AppConfig instance to be validated
	 * @param groups - The groups to be used for validating the config
	 * @param errorMessagePrefix - The prefix to be added to the error message in case the config is not valid
	 */
	public static validateConfig(
		appConfig: StarkApplicationConfig,
		groups: StarkConfigValidationGroups[],
		errorMessagePrefix: string
	): void {
		const validationOptions: ValidatorOptions = groups.length ? { groups } : { groups: [""] }; // empty group ("") by default

		StarkValidationErrorsUtil.throwOnError(
			validateSync(appConfig, validationOptions),
			errorMessagePrefix + ": " + STARK_APP_CONFIG.toString() + " constant is not valid."
		);
	}

	/**
	 * Validates the given AppMetadata instance and throws an error in case it is not valid
	 * @param appMetadata - The AppMetadata instance to be validated
	 * @param groups - The groups to be used for validating the config
	 * @param errorMessagePrefix - The prefix to be added to the error message in case the config is not valid
	 */
	public static validateMetadata(
		appMetadata: StarkApplicationMetadata,
		groups: StarkMetadataValidationGroups[],
		errorMessagePrefix: string
	): void {
		const validationOptions: ValidatorOptions = groups.length ? { groups } : { groups: [""] }; // empty group ("") by default

		StarkValidationErrorsUtil.throwOnError(
			validateSync(appMetadata, validationOptions),
			errorMessagePrefix + ": " + STARK_APP_METADATA.toString() + " constant is not valid."
		);
	}
}
