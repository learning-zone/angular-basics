/**
 * A list of all Http request types supported by Stark
 */
export class StarkHttpRequestType {
	/**
	 * The Http Create request type.
	 */
	public static CREATE: string = "CREATE";
	/**
	 * The Http Create (bulk) request type.
	 * Used to create several items with the same characteristics at a time.
	 */
	public static CREATE_BULK: string = "CREATE_BULK";
	/**
	 * The Http Update request type (POST).
	 */
	public static UPDATE: string = "UPDATE";
	/**
	 * The Http Update request type (PUT).
	 */
	public static UPDATE_IDEMPOTENT: string = "UPDATE_IDEMPOTENT";
	/**
	 * The Http Update (bulk) request type.
	 * Used to update several items with the same characteristics at a time.
	 */
	public static UPDATE_BULK: string = "UPDATE_BULK";
	/**
	 * The Http Delete request type.
	 */
	public static DELETE: string = "DELETE";
	/**
	 * The Http Delete (bulk) request type.
	 * Used to delete several items with the same characteristics at a time.
	 */
	public static DELETE_BULK: string = "DELETE_BULK";
	/**
	 * The Http Get request type.
	 */
	public static GET: string = "GET";
	/**
	 * The Http Get Collection request type, to fetch several items at a time.
	 */
	public static GET_COLLECTION: string = "GET_COLLECTION";
	/**
	 * The Http Search request type.
	 */
	public static SEARCH: string = "SEARCH";
}
