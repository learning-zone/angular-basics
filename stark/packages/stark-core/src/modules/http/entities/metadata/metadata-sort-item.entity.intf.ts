/**
 * The StarkSortItem class contains the different sort criteria for the items contained in the response of a collection request performed by the Stark Http Service.
 * This information is serialized by the service into the request query parameters and deserialized from the response in the StarkCollectionMetadata object.
 */
export interface StarkSortItem {
	/**
	 * The field on which the sorting is done.
	 */
	field: string;
	/**
	 * The order of the sorting on that field: ASC|DESC.
	 */
	order: string;
	/**
	 * The combination of field + order.
	 * This is the computed value that is sent in the request as query parameter. For example: title+DESC
	 */
	sortValue?: string;
}
