/*tslint:disable:completed-docs*/
import { validateSync, ValidationError } from "class-validator";
import { StarkMapNotEmpty } from "./map-not-empty.validator.decorator";
import { starkMapNotEmptyValidatorName } from "../../validators/map-not-empty";

class MyClass {
	@StarkMapNotEmpty()
	public dummyMap: Map<string, string> = new Map<string, string>();
}

class SimpleClass {
	@StarkMapNotEmpty()
	public name: string;
}

describe("ValidatorDecorator: StarkMapNotEmpty", () => {
	let myClass: MyClass;
	let simpleClass: SimpleClass;
	const validatorConstraintName: string = starkMapNotEmptyValidatorName;

	beforeEach(() => {
		myClass = new MyClass();
		simpleClass = new SimpleClass();
	});

	it("should fail if the object to validate is not a Map", () => {
		const errors: ValidationError[] = validateSync(simpleClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if Map is empty", () => {
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should NOT fail if Map is not empty", () => {
		myClass.dummyMap.set("a key", "a value");
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
