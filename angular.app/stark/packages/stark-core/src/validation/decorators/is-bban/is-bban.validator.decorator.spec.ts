/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkIsBBAN } from "./is-bban.validator.decorator";
import { starkIsBBANValidatorName } from "../../validators/is-bban";

class MyClass {
	@StarkIsBBAN("countryCode")
	public name: string;

	public countryCode: string;
}

class ClassWithoutCountryCode {
	@StarkIsBBAN("countryCode")
	public name: string;

	public countryName: string;
}

class SimpleClass {
	@StarkIsBBAN("countryCode")
	public dummyObject: object;

	public countryCode: string;
}

describe("ValidatorDecorator: StarkIsBBAN", () => {
	let myClass: MyClass;
	let classWithoutCountryCode: ClassWithoutCountryCode;
	let simpleClass: SimpleClass;
	const validatorConstraintName: string = starkIsBBANValidatorName;

	beforeEach(() => {
		myClass = new MyClass();
		classWithoutCountryCode = new ClassWithoutCountryCode();
		simpleClass = new SimpleClass();
	});

	it("should fail if the object to validate is not a string", () => {
		const errors: ValidationError[] = validateSync(simpleClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if bban is empty", () => {
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if belgian bban is not correct", () => {
		myClass.name = "5390 0754 6664";
		myClass.countryCode = "BE";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
	});

	it("should fail if the property that should contain the country code does not exist in the class", () => {
		const errors: ValidationError[] = validateSync(classWithoutCountryCode);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should NOT fail if belgian bban is correct", () => {
		myClass.name = "5390 0754 7034";
		myClass.countryCode = "BE";
		const errors: ValidationError[] = validateSync(myClass);
		expect(errors.length).toBe(0);
	});
});
