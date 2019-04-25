/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkIsISIN } from "./is-isin.validator.decorator";
import { starkIsISINValidatorName } from "../../validators/is-isin";

class MyClass {
	@StarkIsISIN()
	public name: string;
}

class SimpleClass {
	@StarkIsISIN()
	public dummyObject: object;
}

describe("ValidatorDecorator: StarkIsISIN", () => {
	let myClass: MyClass;
	let simpleClass: SimpleClass;
	const validatorConstraintName: string = starkIsISINValidatorName;

	beforeEach(() => {
		myClass = new MyClass();
		simpleClass = new SimpleClass();
	});

	it("should fail if the object to validate is not a string", () => {
		const errors: ValidationError[] = validateSync(simpleClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if isin is empty", () => {
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if isin is not correct", () => {
		myClass.name = "US5949181665";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
	});

	it("should NOT fail if isin is correct", () => {
		myClass.name = "US5949181045";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
