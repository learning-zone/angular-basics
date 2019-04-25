import { StarkCollectionMetadata } from "../metadata";

/**
 * This class represents a raw collection of data retrieved with a GetCollection request.
 */
export interface StarkHttpRawCollectionResponseData<P> {
	/**
	 * Contains a raw collection of items.
	 */
	items: P[];
	/**
	 * Contains all the metadata related to the collection of items in the response.
	 * @link StarkCollectionMetadata
	 */
	metadata: StarkCollectionMetadata;
}
