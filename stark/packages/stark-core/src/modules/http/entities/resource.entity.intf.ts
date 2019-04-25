import { StarkSingleItemMetadata } from "./metadata";

/**
 * StarkResource is an interface that describes a Resource.
 * This interface must be implemented by all entities that are related to back-end REST resources.
 */
export interface StarkResource {
	/**
	 * The uuid of this item.
	 * this SHOULD always be the UUID of the resource!
	 */
	uuid: string;

	/**
	 * The ETAG of this item.
	 * this value will be handled by the Stark HTTP API automatically for you
	 */
	etag?: string;

	/**
	 * Optionally, in single item responses only, the backend may return warnings along with the resource itself
	 * @link https://github.com/NationalBankBelgium/REST-API-Design-Guide/wiki/Error-handling-Warnings
	 * @link StarkSingleItemMetadata
	 */
	metadata?: StarkSingleItemMetadata;
}
