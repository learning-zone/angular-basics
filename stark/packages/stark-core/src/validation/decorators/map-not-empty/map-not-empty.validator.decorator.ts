import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, getFromContainer } from "class-validator";

import { StarkValidatorImpl } from "../../validator";
import { StarkValidator } from "../../validator.intf";
import { starkMapNotEmptyValidatorName } from "../../validators/map-not-empty";

/**
 * StarkMapNotEmpty validator constraint
 * Validates that the Map is not empty (no entries)
 */
@ValidatorConstraint({ name: starkMapNotEmptyValidatorName, async: false })
class StarkMapNotEmptyConstraint implements ValidatorConstraintInterface {
	/**
	 * Validates that a given map is not empty
	 * @param map: the map to validate
	 */
	public validate(map: Map<any, any>): boolean {
		const validator: StarkValidator = getFromContainer<StarkValidatorImpl>(StarkValidatorImpl);
		return validator.starkMapNotEmpty(map);
	}

	/**
	 * Default message displayed if a map is empty
	 */
	public defaultMessage(): string {
		return "$property map should not be empty";
	}
}

/**
 * Validator decorator that uses the StarkMapNotEmpty validator constraint
 * @param validationOptions, that ensure that the map is valid or not
 */
export function StarkMapNotEmpty(validationOptions?: ValidationOptions): Function {
	return (object: object, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: StarkMapNotEmptyConstraint
		});
	};
}
