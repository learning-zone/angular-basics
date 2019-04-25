/*tslint:disable:completed-docs*/
import { ArrayNotEmpty, IsNotEmpty, Matches, ValidateNested, validateSync, ValidationError } from "class-validator";
import { StarkValidationErrorsUtil } from "./validation-errors.util";

describe("Util: ValidationErrorsUtil", () => {
	const customIsNotEmptyMessage: string = "The property $property should not be empty";
	const customArrayNotEmptyMessage: string = "The array $property should not be empty";
	const customMatchesMessage: string = "The property $property should be exactly 2 lower case characters";

	class LanguageClass {
		@Matches(/^[a-z]{2}$/, { message: customMatchesMessage })
		public id: string;

		@IsNotEmpty({ message: customIsNotEmptyMessage })
		public description: string;

		public constructor(id: string, description: string) {
			this.id = id;
			this.description = description;
		}
	}

	class MyClass {
		@IsNotEmpty({ message: customIsNotEmptyMessage })
		public name: string;

		@IsNotEmpty({ message: customIsNotEmptyMessage })
		public lastName: string;

		@ArrayNotEmpty({ message: customArrayNotEmptyMessage })
		@ValidateNested({ each: true }) // validate each item of the array
		public languages: LanguageClass[] = [];
	}

	let myClass: MyClass;

	beforeEach(() => {
		myClass = new MyClass();
	});

	describe("when there are validation errors", () => {
		it("should throw an error", () => {
			const errors: ValidationError[] = validateSync(myClass);

			expect(errors.length).toBe(3);
			expect(() => StarkValidationErrorsUtil.throwOnError(errors)).toThrowError();
		});

		it("should throw an error with a message containing the description of every validation error", () => {
			const errorNameRegExp: RegExp = new RegExp(customIsNotEmptyMessage.replace("$property", "name"), "g");
			const errorLastNameRegExp: RegExp = new RegExp(customIsNotEmptyMessage.replace("$property", "lastName"), "g");
			const errorLanguagesRegExp: RegExp = new RegExp(customArrayNotEmptyMessage.replace("$property", "languages"), "g");

			const errors: ValidationError[] = validateSync(myClass);
			expect(errors.length).toBe(3);

			try {
				StarkValidationErrorsUtil.throwOnError(errors);
			} catch (e) {
				expect(e.message).toContain("Validation errors");
				expect(e.message.match(errorNameRegExp).length).toBe(1);
				expect(e.message.match(errorLastNameRegExp).length).toBe(1);
				expect(e.message.match(errorLanguagesRegExp).length).toBe(1);
			}
		});

		it("should throw an error with a message containing the full validation error tree", () => {
			const errorIdRegExp: RegExp = new RegExp(customMatchesMessage.replace("$property", "id"), "g");
			const errorDescriptionRegExp: RegExp = new RegExp(customIsNotEmptyMessage.replace("$property", "description"), "g");

			myClass.name = "valid name";
			myClass.lastName = "valid lastName";
			myClass.languages.push(new LanguageClass("eng", "English")); // invalid id
			myClass.languages.push(new LanguageClass("french", "")); // invalid description
			const errors: ValidationError[] = validateSync(myClass);
			expect(errors.length).toBe(1);
			expect(errors[0].children.length).toBe(myClass.languages.length);

			try {
				StarkValidationErrorsUtil.throwOnError(errors);
			} catch (e) {
				expect(e.message).toContain("Validation errors");
				expect(e.message.match(errorIdRegExp).length).toBe(2);
				expect(e.message.match(errorDescriptionRegExp).length).toBe(1);
			}
		});
	});

	describe("when there are NO validation errors", () => {
		it("should NOT throw", () => {
			myClass.name = "valid name";
			myClass.lastName = "valid lastName";
			myClass.languages.push(new LanguageClass("en", "English"));
			myClass.languages.push(new LanguageClass("fr", "French"));
			const errors: ValidationError[] = validateSync(myClass);

			expect(errors.length).toBe(0);
			expect(() => StarkValidationErrorsUtil.throwOnError(errors)).not.toThrowError();
		});
	});
});
