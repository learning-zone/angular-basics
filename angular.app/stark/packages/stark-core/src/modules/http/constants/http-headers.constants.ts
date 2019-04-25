/**
 * This class contains http headers needed when performing a Http Request
 */
export class StarkHttpHeaders {
	/**
	 * Contains information about the language preference of a user
	 */
	public static ACCEPT_LANGUAGE: string = "Accept-Language";
	/**
	 * The ETag value
	 */
	public static ETAG: string = "etag";
	/**
	 * The request will perform the action only if the entity given by the client matches the same entity on the server.
	 */
	public static IF_MATCH: string = "If-Match";
	/**
	 * The media type of the body request
	 */
	public static CONTENT_TYPE: string = "Content-Type";
	/**
	 * Used to prevent Cross Site Request Forgery
	 */
	public static XSRF_TOKEN: string = "X-XSRF-TOKEN";
}
