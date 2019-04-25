import { StarkTableColumnFilter } from "./table-column-filter.intf";

/**
 * Represents the column filtering options of the StarkTableComponent.
 */
export interface StarkTableFilter {
	/**
	 * Whether or not to display the global filter.
	 * Default: true.
	 */
	globalFilterPresent?: boolean;

	/**
	 * Value of the filter for all displayed columns.
	 * Wildcards can be used: "*" to match any anything and "?" to match one character.
	 * Use "\*" and "\?" to match exactly the characters "*" and "?"
	 */
	globalFilterValue?: string;

	/**
	 * Array of StarkTableColumnFilter objects that define column filters
	 */
	columns?: StarkTableColumnFilter[];

	/**
	 * Whether the filter in the Table component must be reset when the data changes. Default: false.
	 */
	resetGlobalFilterOnDataChange?: boolean;
}
