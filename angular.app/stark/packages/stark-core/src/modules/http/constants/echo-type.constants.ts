/**
 * Class used to specify whether a Http response should contain a response body.
 */
export class StarkHttpEchoType {
	/**
	 * NONE is used when the response does not contain a response body.
	 */
	public static NONE: string = "NONE";
	/**
	 * ID is used to retrieve the reponse body's id.
	 */
	public static ID: string = "ID";
}
