import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
	ValidationOptions,
	registerDecorator,
	getFromContainer
} from "class-validator";

import { StarkValidatorImpl } from "../../validator";
import { StarkValidator } from "../../validator.intf";
import { starkIsNINValidatorName } from "../../validators/is-nin";

/**
 * StarkIsNIN validator constraint
 * Validates that the NIN number provided is valid
 */
@ValidatorConstraint({ name: starkIsNINValidatorName, async: false })
class StarkIsNINConstraint implements ValidatorConstraintInterface {
	/**
	 * Validate that the provided NIN number is valid
	 * @param nin: the nin to validate
	 * @param validationArguments: the arguments to validate
	 */
	public validate(nin: string, validationArguments?: ValidationArguments): boolean {
		const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);
		const constraint: string = validationArguments && validationArguments.constraints[0] ? validationArguments.constraints[0] : "";

		return validator.starkIsNIN(nin, validationArguments ? validationArguments.object[constraint] : "");
	}

	/**
	 * Default value displayed if the NIN number is not valid
	 */
	public defaultMessage(): string {
		return "$property value is not a valid NIN number";
	}
}

/**
 * Validator decorator that uses the StarkIsNIN validator constraint
 * @param property : the property to validate
 * @param validationOptions - the options that will define if the nin is valid
 */
export function StarkIsNIN(property: string, validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [property],
			validator: StarkIsNINConstraint
		});
	};
}
