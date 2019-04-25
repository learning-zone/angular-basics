/**
 * Event to be emitted by the Stark Pagination component when the pagination changes
 */
export interface StarkPaginateEvent {
	/**
	 * Current page after pagination
	 */
	page: number;

	/**
	 * Current number of items displayed per page
	 */
	itemsPerPage: number;
}
