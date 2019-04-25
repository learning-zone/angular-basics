/**
 * Contains all the metadata related to the collection of items in a Collection response.
 */
export interface StarkPaginationMetadata {
	/**
	 * Index at which to begin the extraction of the collection to be returned.
	 */
	offset: number;

	/**
	 * Maximum number of items to return.
	 */
	limit: number;

	/**
	 * The previous offset (if there is none).
	 */
	previousOffset: number;

	/**
	 * The next offset (if there is none).
	 */
	nextOffset: number;

	/**
	 * The current page.
	 */
	currentPage: number;

	/**
	 * The total number of pages.
	 */
	pageCount: number;

	/**
	 * The total number of elements in the collection.
	 */
	totalCount: number;
}
