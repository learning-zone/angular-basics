/**
 * Definition of the filter in the Stark Table
 */
export interface StarkTableColumnFilter {
	/**
	 * Name of the column to filter.
	 */
	columnName: string;

	/**
	 * Value of the filter
	 * Wildcards can be used: "*" to match any anything and "?" to match one character.
	 * Use "\*" and "\?" to match exactly the characters "*" and "?"
	 */
	filterValue: string;

	/**
	 * Whether the filter in the Table component must be reset when the data changes. Default: false.
	 */
	resetFilterOnDataChange?: boolean;
}
