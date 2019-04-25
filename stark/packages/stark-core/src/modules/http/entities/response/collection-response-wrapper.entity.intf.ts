import { StarkResponseWrapper } from "./response-wrapper.entity.intf";
import { StarkResource } from "../resource.entity.intf";
import { StarkCollectionMetadata } from "../metadata";

/**
 * This class is used by the Stark Http Service in order to wrap the Http response from all requests aimed to return a collection of items.
 */
export interface StarkCollectionResponseWrapper<P extends StarkResource> extends StarkResponseWrapper<P[]> {
	/**
	 * Holds the metadata related to the collection of items contained in the response.
	 * @link StarkCollectionMetadata
	 */
	metadata: StarkCollectionMetadata;
}
