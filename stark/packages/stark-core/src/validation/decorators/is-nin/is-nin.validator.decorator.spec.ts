/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkIsNIN } from "./is-nin.validator.decorator";
import { starkIsNINValidatorName } from "../../validators/is-nin";

class MyClass {
	@StarkIsNIN("countryCode")
	public name: string;

	public countryCode: string;
}

class ClassWithoutCountryCode {
	@StarkIsNIN("countryCode")
	public name: string;

	public countryName: string;
}

class SimpleClass {
	@StarkIsNIN("countryCode")
	public dummyObject: object;

	public countryCode: string;
}

describe("ValidatorDecorator: StarkIsNIN", () => {
	let myClass: MyClass;
	let classWithoutCountryCode: ClassWithoutCountryCode;
	let simpleClass: SimpleClass;
	const validatorConstraintName: string = starkIsNINValidatorName;

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

	it("should fail if nin is empty", () => {
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if belgian nin is not correct", () => {
		myClass.name = "84.02.01-069.84";
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

	it("should NOT fail if belgian nin is correct", () => {
		myClass.name = "84.02.01-069.30";
		myClass.countryCode = "BE";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
