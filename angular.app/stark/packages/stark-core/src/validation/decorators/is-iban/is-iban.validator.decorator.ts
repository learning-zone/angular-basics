import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, getFromContainer } from "class-validator";

import { StarkValidatorImpl } from "../../validator";
import { StarkValidator } from "../../validator.intf";
import { starkIsIBANValidatorName } from "../../validators/is-iban";

/**
 * StarkIsIBAN validator constraint
 * Validates that the IBAN number provided is valid
 */
@ValidatorConstraint({ name: starkIsIBANValidatorName, async: false })
class StarkIsIBANConstraint implements ValidatorConstraintInterface {
	/**
	 * Validtes that a given IBAN number is valid
	 * @param iban - the iban to validate
	 * @returns boolean - true if the iban is valid
	 */
	public validate(iban: string): boolean {
		const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);
		return validator.starkIsIBAN(iban);
	}

	/**
	 * Default message displayed if the IBAN number is not valid
	 * @returns a default message
	 */
	public defaultMessage(): string {
		return "$property value is not a valid IBAN number";
	}
}

/**
 * Validator decorator that uses the StarkIsIBAN validator constraint
 * @param validationOptions, that ensure the iban is valid
 * @returns Function
 */
export function StarkIsIBAN(validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: StarkIsIBANConstraint
		});
	};
}
