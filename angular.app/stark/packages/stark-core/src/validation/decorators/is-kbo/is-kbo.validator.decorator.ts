import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, getFromContainer } from "class-validator";

import { StarkValidatorImpl } from "../../validator";
import { StarkValidator } from "../../validator.intf";
import { starkIsKBOValidatorName } from "../../validators/is-kbo";

/**
 * StarkIsKbo validator constraint
 * Validates that the KBO number provided is valid
 */
@ValidatorConstraint({ name: starkIsKBOValidatorName, async: false })
class StarkIsKBOConstraint implements ValidatorConstraintInterface {
	/**
	 * Validates that the given KBO number is valid
	 * @param kbo - the kbo to validate
	 * @returns boolean - true if the kbo has been validated
	 */
	public validate(kbo: string): boolean {
		const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);

		return validator.starkIsKBO(kbo);
	}

	/**
	 * Default message displayed if the KBO number is not valid
	 * @returns a default message
	 */
	public defaultMessage(): string {
		return "$property value is not a valid KBO number";
	}
}

/**
 * Validator decorator that uses the StarkIsKBO validator constraint
 * @param validationOptions - the options that will define the validity of the kbo number
 * @returns Function
 */
export function StarkIsKBO(validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: StarkIsKBOConstraint
		});
	};
}
