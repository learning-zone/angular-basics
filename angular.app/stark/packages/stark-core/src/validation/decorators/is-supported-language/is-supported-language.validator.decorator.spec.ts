/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkIsSupportedLanguage } from "./is-supported-language.validator.decorator";
import { starkIsSupportedLanguageValidatorName } from "../../validators/is-supported-language";

class MyClass {
	@StarkIsSupportedLanguage()
	public language: string;
}

describe("ValidatorDecorator: StarkIsSupportedLanguage", () => {
	let myClass: MyClass;
	const validatorConstraintName: string = starkIsSupportedLanguageValidatorName;

	beforeEach(() => {
		myClass = new MyClass();
	});

	it("should fail if the property to validate is undefined", () => {
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if language is not in the list of supported languages", () => {
		myClass.language = "fr-FR";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should NOT fail if language is in the list of supported languages", () => {
		myClass.language = "fr-BE";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
