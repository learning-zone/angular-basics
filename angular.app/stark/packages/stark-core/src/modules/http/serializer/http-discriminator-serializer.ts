import { StarkHttpSerializerImpl } from "./http-serializer";
import { StarkResource } from "../entities";
import { StarkSerializable } from "../../../serialization";

/**
 * Implementation of {@link StarkHttpSerializer}.
 * This serializer will use a discriminator property to decide what type to use for serialization.
 *
 */
export class StarkHttpDiscriminatorSerializer<T extends StarkResource> extends StarkHttpSerializerImpl<T> {
	/**
	 * The discriminator property to decide what class to use for serialization
	 */
	private discriminatorProperty: string;
	/**
	 * Map of types based on the discriminator property value
	 */
	private typesMap: Map<any, StarkSerializable>;

	/**
	 * Constructor for StarkHttpDiscriminatorSerializer
	 * @param discriminatorProperty - The discriminator property
	 * @param typesMap - Map of types based on the discriminator property value
	 */
	public constructor(discriminatorProperty: string, typesMap: Map<any, StarkSerializable>) {
		super();
		this.discriminatorProperty = discriminatorProperty;
		this.typesMap = typesMap;
	}

	/**
	 * Get the serializable class to use for deserialization/serialization.
	 * @param rawOrResource: the string or object which type we want to retrieve
	 */
	public getType(rawOrResource: T | object | string): StarkSerializable | undefined {
		let obj: object;
		if (typeof rawOrResource === "string") {
			obj = JSON.parse(rawOrResource);
		} else {
			obj = rawOrResource;
		}

		const discriminator: any = obj[this.discriminatorProperty];

		return this.typesMap.get(discriminator);
	}
}
