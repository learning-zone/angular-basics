/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkIsIBAN } from "./is-iban.validator.decorator";
import { starkIsIBANValidatorName } from "../../validators/is-iban";

class MyClass {
	@StarkIsIBAN()
	public name: string;
}

class SimpleClass {
	@StarkIsIBAN()
	public dummyObject: object;
}

describe("ValidatorDecorator: StarkIsIBAN", () => {
	let myClass: MyClass;
	let simpleClass: SimpleClass;
	const validatorConstraintName: string = starkIsIBANValidatorName;

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

	it("should fail if iban is empty", () => {
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if iban is not correct", () => {
		myClass.name = "BE68 5390 0754 7666";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
	});

	it("should NOT fail if iban is correct", () => {
		myClass.name = "BE68 5390 0754 7034";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
