import { ValidationError } from "class-validator";

/**
 * Class used to format the validation errors in a readable way.
 */
export class StarkValidationErrorsUtil {
	/**
	 * Throws an error in case there are  validation errors. The error contains the description of the different errors.
	 * @param validationErrors - Array containing validation results
	 * @param errorMessagePrefix - (Optional) A prefix to be added to the error message
	 * @throws Error
	 */
	public static throwOnError(validationErrors: ValidationError[], errorMessagePrefix?: string): void {
		if (validationErrors.length) {
			let validationMessage: string = errorMessagePrefix ? errorMessagePrefix + " " : "";
			validationMessage += "Validation errors:\n\n" + StarkValidationErrorsUtil.toString(validationErrors);

			throw new Error(validationMessage);
		}
	}

	/**
	 * Extracts the description of all the validation errors and generates a single string containing such descriptions
	 * @param validationErrors - Array containing validation results
	 * @param errorMessagePrefix - (Optional) A prefix to be added to the generated string
	 */
	// FIXME: re-enable this TSLINT rule and refactor this function to reduce its cognitive complexity
	// tslint:disable-next-line:cognitive-complexity
	public static toString(validationErrors: ValidationError[], errorMessagePrefix?: string): string {
		let validationMessage: string = errorMessagePrefix ? errorMessagePrefix + "\n" : "";

		if (validationErrors instanceof Array) {
			for (const error of validationErrors) {
				for (const constraint in error.constraints) {
					if (error.constraints.hasOwnProperty(constraint)) {
						validationMessage += "- " + error.constraints[constraint] + "\n";
					}
				}

				if (error.children && error.children.length) {
					validationMessage += error.property ? "-- " + error.property + ":" : "";
					// overriding the complete message (the current one is passed in the prefix param)
					validationMessage = StarkValidationErrorsUtil.toString(error.children, validationMessage);
				}
			}
		}

		return validationMessage;
	}
}
