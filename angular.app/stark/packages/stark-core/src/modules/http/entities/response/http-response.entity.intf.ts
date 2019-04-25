import { StarkHttpStatusCodes } from "../../enumerators";

/**
 * This interface represents an HttpResponse
 */
export interface StarkHttpResponse {
	/**
	 * The corresponding status code of the request matching one of the StarkHttpStatusCodes.
	 * @link StarkHttpStatusCodes
	 */
	starkHttpStatusCode: StarkHttpStatusCodes;
	/**
	 * A map containing the Http response headers sent back by the backend.
	 */
	starkHttpHeaders: Map<string, string>;
}
