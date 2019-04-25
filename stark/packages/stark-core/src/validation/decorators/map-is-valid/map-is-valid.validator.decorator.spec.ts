/*tslint:disable:completed-docs*/
import { IsNotEmpty, MaxLength, validateSync, ValidationError } from "class-validator";
import { StarkMapIsValid, starkMapIsValidValidatorName } from "./map-is-valid.validator.decorator";

class KeyClass {
	@IsNotEmpty()
	public id: string;
}

class ValueClass {
	@MaxLength(10)
	public description: string;
}

class MyClass {
	@StarkMapIsValid()
	public dummyMap: Map<KeyClass | string, ValueClass | string> = new Map<KeyClass | string, ValueClass | string>();
}

class SimpleClass {
	@StarkMapIsValid()
	public name: string;
}

describe("ValidatorDecorator: StarkMapIsValid", () => {
	let myClass: MyClass;
	let simpleClass: SimpleClass;
	let keyClass: KeyClass;
	let valueClass: ValueClass;
	const validatorConstraintName: string = starkMapIsValidValidatorName;

	beforeEach(() => {
		myClass = new MyClass();
		simpleClass = new SimpleClass();
		keyClass = new KeyClass();
		valueClass = new ValueClass();
	});

	it("should fail if the object to validate is not a Map", () => {
		const errors: ValidationError[] = validateSync(simpleClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
	});

	it("should fail if Map contains invalid keys", () => {
		keyClass.id = "";
		valueClass.description = "length ok";
		myClass.dummyMap.set(keyClass, valueClass);
		myClass.dummyMap.set("stringKey", "stringValue");
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toContain("map keys");
		expect(errors[0].constraints[validatorConstraintName]).not.toContain("map values");
	});

	it("should fail if Map contains invalid values", () => {
		keyClass.id = "id";
		valueClass.description = "this is not a valid length";
		myClass.dummyMap.set(keyClass, valueClass);
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(1);
		expect(errors[0].constraints).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).toBeDefined();
		expect(errors[0].constraints[validatorConstraintName]).not.toContain("map keys");
		expect(errors[0].constraints[validatorConstraintName]).toContain("map values");
	});

	it("should NOT fail if Map contains valid keys and values", () => {
		keyClass.id = "id";
		valueClass.description = "length ok";
		myClass.dummyMap.set(keyClass, valueClass);
		const errors: ValidationError[] = validateSync(myClass);

		expect(errors.length).toBe(0);
	});
});
