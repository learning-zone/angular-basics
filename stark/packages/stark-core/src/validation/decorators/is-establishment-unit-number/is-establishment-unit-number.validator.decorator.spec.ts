/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkIsEstablishmentUnitNumber } from "./is-establishment-unit-number.validator.decorator";
import { starkIsEstablishmentUnitNumberValidatorName } from "../../validators/is-establishment-unit-number";

class MyClass {
	@StarkIsEstablishmentUnitNumber()
	public name: string;
}

class SimpleClass {
	@StarkIsEstablishmentUnitNumber()
	public dummyObject: object;
}

describe("ValidatorDecorator: StarkIsEstablishmentUnitNumber", () => {
	let myClass: MyClass;
	let simpleClass: SimpleClass;
	const validatorConstraintName: string = starkIsEstablishmentUnitNumberValidatorName;

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
		myClass.name = "2.104.471.666";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
	});

	it("should NOT fail if company number is correct", () => {
		myClass.name = "2.104.471.814";
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
