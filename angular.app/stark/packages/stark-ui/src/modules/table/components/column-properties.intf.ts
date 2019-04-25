import { StarkTableColumnPriority } from "./column-priority.intf";

/**
 * Definition of a column in the Stark Table
 */
export interface StarkTableColumnProperties {
	/**
	 * Class(es) to be set to every cell of the column.
	 */
	cellClassName?: string;

	/**
	 * Function that returns class(es) to be set to an specific cell. It can be used to set different classes
	 * depending on the row, value and or columnName. This function is called with 3 parameters:
	 * @param value - The value of the cell
	 * @param row - The row object that contains the cell
	 * @param columnName - The column that the cell belongs to
	 */
	cellClassNameFn?: (value: any, row?: any, columnName?: string) => string;

	/**
	 * Function that returns a formatted value (string) to be set in the cell. It can be used to set different formats
	 * depending on the row, value and or columnName. This function is called with 3 parameters:
	 * @param value - The value of the cell to be formatted
	 * @param row - The row object that contains the cell
	 * @param columnName - The column that the cell belongs to
	 */
	cellFormatter?: (value: any, row?: any, columnName?: string) => string;

	/**
	 * Class(es) to be set to the colgroup>col element of the column.
	 * The CSS linked to the style can only be applied to 'border', 'background', 'width' and 'visibility' properties.
	 * See http://www.w3.org/TR/CSS2/tables.html#columns
	 */
	className?: string;

	/**
	 * Function that returns
	 *   1 : if obj1 > obj2
	 *   0 : if obj1 === obj2
	 *  -1 : if obj1 < obj2
	 *
	 * @param obj1 - First object in the comparison
	 * @param obj2 - Second object in the comparison
	 */
	compareFn?: (obj1: any, obj2: any) => number;

	/**
	 * Class(es) to be set to the column's header.
	 */
	headerClassName?: string;

	/**
	 * Whether the column is filterable or not. Default: true
	 */
	isFilterable?: boolean;

	/**
	 * Whether the column is sortable or not. Default: true
	 */
	isSortable?: boolean;

	/**
	 * Label to be shown as the column's title. Default: the column's name
	 */
	label?: string;

	/**
	 * Name of the property that will be the source of the column.
	 */
	name: string;

	/**
	 * Callback triggered when a cell in the column is clicked. This function is called with 3 parameters:
	 * @param value - The value of the cell that was clicked
	 * @param row - The row object that contains the cell that was clicked
	 * @param columnName - The column that the cell belongs to
	 */
	onClickCallback?: (value: any, row?: any, columnName?: string) => void;

	/**
	 * Priority of the column. Default: PERSIST
	 */
	priority?: StarkTableColumnPriority;
}
