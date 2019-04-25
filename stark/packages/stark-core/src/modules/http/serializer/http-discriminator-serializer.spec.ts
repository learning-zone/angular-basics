/*tslint:disable:completed-docs*/
import { StarkHttpDiscriminatorSerializer } from "./http-discriminator-serializer";
import { autoserialize, inheritSerialization } from "cerialize";
import { StarkSerializable } from "../../../serialization";

class Shape {
	@autoserialize
	public uuid: string = "mock-uuid";

	@autoserialize
	public type: string;

	public constructor(type: string) {
		this.type = type;
	}
}

@inheritSerialization(Shape)
class Rectangle extends Shape {
	@autoserialize
	public width: number;

	@autoserialize
	public height: number;

	public constructor(w: number, h: number) {
		super("rectangle");
		this.width = w;
		this.height = h;
	}
}

@inheritSerialization(Shape)
class Circle extends Shape {
	@autoserialize
	public radius: number;

	public constructor(r: number) {
		super("circle");
		this.radius = r;
	}
}

describe("Serializer: StarkHttpDiscriminatorSerializer", () => {
	let serializer: StarkHttpDiscriminatorSerializer<Shape>;
	let mockRectangle: Rectangle;
	let mockCircle: Circle;

	beforeEach(() => {
		mockRectangle = new Rectangle(128, 256);
		mockCircle = new Circle(64);

		const typesMap: Map<string, StarkSerializable> = new Map<string, StarkSerializable>();
		typesMap.set("rectangle", Rectangle);
		typesMap.set("circle", Circle);
		serializer = new StarkHttpDiscriminatorSerializer<Shape>("type", typesMap);
	});

	describe("serialize", () => {
		it("should serialize based on Discriminator property", () => {
			const serializedRectangle: string | { [param: string]: any } = serializer.serialize(mockRectangle);
			expect(serializedRectangle).toBeDefined();
			expect(serializedRectangle).toEqual({
				type: "rectangle",
				uuid: "mock-uuid",
				width: 128,
				height: 256
			});

			const serializedCircle: string | { [param: string]: any } = serializer.serialize(mockCircle);
			expect(serializedCircle).toBeDefined();
			expect(serializedCircle).toEqual({
				type: "circle",
				uuid: "mock-uuid",
				radius: 64
			});
		});
	});

	describe("deserialize", () => {
		it("should deserialize based on Discriminator property", () => {
			const deserializedRectangle: Shape = serializer.deserialize({
				type: "rectangle",
				uuid: "mock-uuid",
				width: 128,
				height: 256
			});
			expect(deserializedRectangle).toBeDefined();
			expect(deserializedRectangle instanceof Rectangle).toBeTruthy();
			expect(deserializedRectangle).toEqual(mockRectangle);

			const deserializedCircle: Shape = serializer.deserialize({
				type: "circle",
				uuid: "mock-uuid",
				radius: 64
			});
			expect(deserializedCircle).toBeDefined();
			expect(deserializedCircle instanceof Circle).toBeTruthy();
			expect(deserializedCircle).toEqual(mockCircle);
		});
	});
});
