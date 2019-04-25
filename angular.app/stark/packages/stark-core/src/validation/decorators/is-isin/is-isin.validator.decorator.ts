import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, getFromContainer } from "class-validator";

import { StarkValidatorImpl } from "../../validator";
import { StarkValidator } from "../../validator.intf";
import { starkIsISINValidatorName } from "../../validators/is-isin";

/**
 * StarkIsBban validator constraint
 * Validates that the ISIN number provided is valid
 */
@ValidatorConstraint({ name: starkIsISINValidatorName, async: false })
class StarkIsISINConstraint implements ValidatorConstraintInterface {
	/**
	 * Validates that the given ISIN number is valid
	 * @param isin - the isin number to validate
	 * @returns boolean - true if the isin is valid
	 */
	public validate(isin: string): boolean {
		const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);

		return validator.starkIsISIN(isin);
	}

	/**
	 * Displayes message if the ISIN number is not valid
	 * @returns a default message
	 */
	public defaultMessage(): string {
		return "$property value is not a valid ISIN number";
	}
}

/**
 * Validator decorator that uses the StarkIsISIN validator constraint
 * @param validationOptions - will ensure if the isin is valid or not
 * @returns Function
 */
export function StarkIsISIN(validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: StarkIsISINConstraint
		});
	};
}
