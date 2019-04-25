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
import { starkIsBBANValidatorName } from "../../validators/is-bban";

/**
 * StarkIsBBAN validator constraint
 * Validates that the BBAN number provided is valid
 */
@ValidatorConstraint({ name: starkIsBBANValidatorName, async: false })
class StarkIsBBANConstraint implements ValidatorConstraintInterface {
	/**
	 * Validates that a give BBAN number is valid.
	 * @param bban: the bban to validate
	 * @param validationArguments: the arguments to ensure the bban is valid
	 */
	public validate(bban: string, validationArguments?: ValidationArguments): boolean {
		const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);
		const constraint: string = validationArguments && validationArguments.constraints[0] ? validationArguments.constraints[0] : "";

		return validator.starkIsBBAN(bban, validationArguments ? validationArguments.object[constraint] : "");
	}

	/**
	 * Default message displayed if the BBAN number is not valid.
	 */
	public defaultMessage(): string {
		return "$property value is not a valid BBAN number";
	}
}

/**
 * Validator decorator that uses the StarkIsBBAN validator constraint
 * @param property: the bban number
 * @param validationOptions: the options to ensure the bban is valid
 * @returns Function
 */
export function StarkIsBBAN(property: string, validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [property],
			validator: StarkIsBBANConstraint
		});
	};
}
