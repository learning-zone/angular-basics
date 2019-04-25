import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, getFromContainer } from "class-validator";

import { StarkValidatorImpl } from "../../validator";
import { StarkValidator } from "../../validator.intf";
import { starkIsCompanyNumberValidatorName } from "../../validators/is-company-number";

/**
 * StarkIsCompanyNumber validator constraint
 * Validates that the Company Number number provided is valid
 */
@ValidatorConstraint({ name: starkIsCompanyNumberValidatorName, async: false })
class StarkIsCompanyNumberConstraint implements ValidatorConstraintInterface {
	/**
	 * Validates that a given Company number is valid
	 * @param companyNumber - the number to validate
	 * @returns boolean - true if the company number is valid or not
	 */
	public validate(companyNumber: string): boolean {
		const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);
		return validator.starkIsCompanyNumber(companyNumber);
	}

	/**
	 * Default message displayed if the Company number is not valid
	 * @returns a default message
	 */
	public defaultMessage(): string {
		return "$property value is not a valid company number";
	}
}

/**
 * Validator decorator that uses the StarkIsCompanyNumber validator constraint
 * @param validationOptions, that ensure that the company number is valid
 * @returns Function
 */
export function StarkIsCompanyNumber(validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: StarkIsCompanyNumberConstraint
		});
	};
}
