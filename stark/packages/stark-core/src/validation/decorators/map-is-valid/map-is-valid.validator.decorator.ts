import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationOptions,
	registerDecorator,
	ValidationError,
	validateSync
} from "class-validator";
import { StarkValidationErrorsUtil } from "../../../util";

/**
 * Name of the validator, in case injection is needed.
 */
export const starkMapIsValidValidatorName: string = "starkMapIsValid";

/**
 * StarkMapIsValid validator constraint
 * Validates that all entries in the Map are valid (validateSync is called in every key and value)
 */
@ValidatorConstraint({ name: starkMapIsValidValidatorName, async: false })
class StarkMapIsValidConstraint implements ValidatorConstraintInterface {
	/**
	 * an Array of validation errors' keys
	 */
	public keysValidationErrors: ValidationError[];
	/**
	 * an Array of validation errors' values
	 */
	public valuesValidationErrors: ValidationError[];

	/**
	 * Validates that a give Map is valid
	 * @param map: the map to validate
	 * @returns boolean - true if the map is valid
	 */
	public validate(map: Map<any, any>): boolean {
		if (!(map instanceof Map) || !map.size) {
			return false;
		}

		this.keysValidationErrors = [];
		this.valuesValidationErrors = [];

		map.forEach((value: any, key: any) => {
			// skipping primitive types
			if (typeof key === "object") {
				this.keysValidationErrors = [...this.keysValidationErrors, ...validateSync(key)];
			}
			if (typeof value === "object") {
				this.valuesValidationErrors = [...this.valuesValidationErrors, ...validateSync(value)];
			}
		});

		return this.keysValidationErrors.length === 0 && this.valuesValidationErrors.length === 0;
	}

	/**
	 * Default message displayed when the map contains invalid entries
	 * @returns a default message
	 */
	public defaultMessage(): string {
		let keysValidationMessage: string = StarkValidationErrorsUtil.toString(this.keysValidationErrors);
		let valuesValidationMessage: string = StarkValidationErrorsUtil.toString(this.valuesValidationErrors);

		if (keysValidationMessage.length) {
			keysValidationMessage = "\nValidation errors in $property map keys:\n\n" + keysValidationMessage;
		}
		if (valuesValidationMessage.length) {
			valuesValidationMessage = "\nValidation errors in $property map values:\n\n" + valuesValidationMessage;
		}

		return "$property map contains invalid entries.\n" + keysValidationMessage + valuesValidationMessage;
	}
}

/**
 * Validator decorator that uses the StarkMapIsValid validator constraint
 * @param validationOptions, options to determine if the map is valid
 * @returns Function
 */
export function StarkMapIsValid(validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: StarkMapIsValidConstraint
		});
	};
}
