/**
 * Defines the config object to be used with the Pagination component.
 */
export interface StarkPaginationConfig {
	/**
	 * If true, the component will be displayed in "extended" mode (an "extended-pagination" class is added to the element).
	 * Default: false
	 */
	isExtended?: boolean;

	/**
	 * Number of items displayed on each page. The number of available pages for pagination is calculated based on this number.
	 * Default: itemsPerPageOptions[0]
	 */
	itemsPerPage?: number;

	/**
	 * Available options for items per page dropdown.
	 * Default : [5,10,15]
	 */
	itemsPerPageOptions?: number[];

	/**
	 * If false, then itemsPerPage dropdown will not be present.
	 * Default: true
	 */
	itemsPerPageIsPresent?: boolean;

	/**
	 * Current page index.
	 * Default: 0
	 */
	page?: number;

	/**
	 * If false, then page nav bar will not be present.
	 * Default: true
	 */
	pageNavIsPresent?: boolean;

	/**
	 * f false, then input box for page selection will not be present.
	 * Default: true
	 */
	pageInputIsPresent?: boolean;

	/**
	 * Number of items being paged in order to calculate number of pages for pagination.
	 * Default: 0
	 */
	totalItems?: number;
}
