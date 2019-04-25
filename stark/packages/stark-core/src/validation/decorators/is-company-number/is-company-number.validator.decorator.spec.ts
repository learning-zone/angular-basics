/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkIsCompanyNumber } from "./is-company-number.validator.decorator";
import { starkIsCompanyNumberValidatorName } from "../../validators/is-company-number";

class MyClass {
	@StarkIsCompanyNumber()
	public name: string;
}

class SimpleClass {
	@StarkIsCompanyNumber()
	public dummyObject: object;
}

describe("ValidatorDecorator: StarkIsCompanyNumber", () => {
	let myClass: MyClass;
	let simpleClass: SimpleClass;
	const validatorConstraintName: string = starkIsCompanyNumberValidatorName;

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

	it("should fail if company number is empty", () => {
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if company number is not correct", () => {
		myClass.name = "0203.201.666";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
	});

	it("should NOT fail if company number is correct", () => {
		myClass.name = "0203.201.340";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
