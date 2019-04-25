import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	Inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	QueryList,
	Renderer2,
	SimpleChanges,
	ViewChild,
	ViewChildren,
	ViewEncapsulation
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatColumnDef, MatTable, MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

import { StarkTableColumnComponent, StarkTableColumnSortingDirection } from "./column.component";
import { StarkSortingRule, StarkTableMultisortDialogComponent, StarkTableMultisortDialogData } from "./dialogs/multisort.component";
import { StarkActionBarConfig } from "../../action-bar/components/action-bar-config.intf";
import { StarkAction } from "../../action-bar/components/action.intf";
import { StarkTableColumnProperties } from "./column-properties.intf";
import { StarkTableFilter } from "./table-filter.intf";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";
import { StarkPaginationConfig, StarkPaginationComponent } from "../../pagination/components";
import { StarkPaginateEvent } from "../../pagination/components/paginate-event.intf";

/**
 * Name of the component
 */
const componentName: string = "stark-table";

/* tslint:disable:enforce-component-selector */
/**
 * Component to display array data in a table layout.
 */
@Component({
	selector: componentName,
	templateUrl: "./table.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
/* tslint:enable */
export class StarkTableComponent extends AbstractStarkUiComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges {
	/**
	 * HTML id of the table
	 */
	@Input()
	public htmlId: string;

	/**
	 * Data that will be display inside your table.
	 */
	@Input()
	public data: any[];

	/**
	 * Object which contains filtering information for the table.
	 */
	@Input()
	public filter: StarkTableFilter;

	/**
	 * Array of StarkAction objects (see StarkAction docs).
	 */
	@Input()
	public customTableActions?: StarkAction[];

	/**
	 * Type of StarkAction objects
	 */
	@Input()
	public customTableActionsType: "regular" | "alt" = "regular";

	/**
	 * Allows sorting by multiple columns. Setting the attribute to "true" or empty will enable this feature.
	 */
	@Input()
	public multiSort?: string;

	/**
	 * Whether to display the pagination component
	 */
	@Input()
	public paginate: boolean = false;

	/**
	 *
	 */
	@Input()
	public paginationConfig: StarkPaginationConfig;

	/**
	 * Allows multiple row selection. Setting the attribute to "true" or empty will enable this feature.
	 */
	@Input()
	public multiselect: boolean = false;

	/**
	 * Columns to be sorted by default
	 */
	@Input()
	public orderProperties?: string[];

	/**
	 * Array of StarkColumnProperties objects which define the columns of the data table.
	 */
	@Input()
	public columnProperties: StarkTableColumnProperties[] = [];

	/**
	 * StarkActionBarConfig object (see StarkActionBarConfig docs).
	 */
	@Input()
	public tableRowsActionBarConfig: StarkActionBarConfig;

	/**
	 * Output event emitter that will emit the array of columns selected (column id's).
	 */
	@Output()
	public selectChanged: EventEmitter<number[]> = new EventEmitter<number[]>();

	/**
	 * Output event emitter that will emit the latest global filter value whenever it changes.
	 */
	@Output()
	public filterChanged: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Callback function to be called when the pagination changes. Two parameters
	 * will be passed to the callback function:
	 *        -- page (number)
	 *        -- itemsPerPage (number)
	 *
	 * When you declare it in html tags you have to declare it like 'on-paginate="yourFunction(page,itemsPerPage)"'
	 * If no callback function is passed, the data will be paginated automatically by the component.
	 *
	 * When set onPaginate, these attributes are required : totalItems
	 */
	@Output()
	public paginationChanged: EventEmitter<StarkPaginateEvent> = new EventEmitter<StarkPaginateEvent>();

	/**
	 * Reference to the MatTable embedded in this component
	 */
	@ViewChild(MatTable)
	public table: MatTable<any>;

	/**
	 * Reference to the MatPaginator embedded in this component
	 */
	@ViewChild(StarkPaginationComponent)
	public starkPaginator: StarkPaginationComponent;

	/**
	 * Columns added automatically by this component according to the columnProperties input
	 */
	@ViewChildren(StarkTableColumnComponent)
	public viewColumns: QueryList<StarkTableColumnComponent>;

	/**
	 * Columns added by the user via transclusion inside an <div> element with class "stark-table-columns"
	 */
	@ContentChildren(StarkTableColumnComponent)
	public contentColumns: QueryList<StarkTableColumnComponent>;

	/**
	 * Array of StarkTableColumnComponents defined in this table
	 */
	public columns: StarkTableColumnComponent[];

	/**
	 * Array of StarkAction for alt mode
	 */
	public customTableAltActions?: StarkAction[];

	/**
	 * Array of StarkAction for regular mode
	 */
	public customTableRegularActions: StarkActionBarConfig;

	/**
	 * Angular CDK selection model used for the "master" selection of the table
	 */
	public selection: SelectionModel<any> = new SelectionModel<any>(true, []);

	/**
	 * MatTableDataSource associated to the MatTable embedded in this component
	 */
	public dataSource: MatTableDataSource<any>;

	/**
	 * Array of columns (column id's) to be displayed in the table.
	 */
	public displayedColumns: string[];

	/**
	 * Whether the current sorting is done on multiple columns
	 */
	public isMultiSorting: boolean = false;

	/**
	 * Whether the sorting by multiple columns is enabled.
	 */
	public isMultiSortEnabled: boolean = false;

	/**
	 * Class constructor
	 * @param logger - The logging service of the application
	 * @param dialogService - Angular Material service to open Material Design modal dialogs.
	 * @param cdRef - Reference to the change detector attached to this component
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		public dialogService: MatDialog,
		private cdRef: ChangeDetectorRef,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": component initialized");
		this.displayedColumns = [];
		if (this.multiselect) {
			this.displayedColumns.unshift("select");
		}

		if (this.customTableActionsType === "regular") {
			this.customTableRegularActions = { actions: this.customTableActions || [] };
		} else {
			this.customTableRegularActions = { actions: [] };
			this.customTableAltActions = this.customTableActions;
		}
	}

	/**
	 * Component lifecycle hook
	 */
	public ngAfterContentInit(): void {
		this.logger.debug(componentName + ": ngAfterContentInit");
	}

	/**
	 * Component lifecycle hook
	 */
	public ngAfterViewInit(): void {
		this.logger.debug(componentName + ": ngAfterViewInit");
		// add the columns the developer defined with the <stark-table-column>
		this.columns = this.viewColumns.toArray().concat(this.contentColumns.toArray());

		this.removeOldColumnsFromTable();
		this.addColumnsToTable(this.columns);

		if (this.orderProperties instanceof Array && this.orderProperties.length) {
			// TODO: refactor -> sortData() internally calls initializeDataSource() and applyFilter()
			this.sortData();
		} else {
			this.initializeDataSource();
			this.applyFilter();
		}

		this.cdRef.detectChanges();
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes["data"]) {
			if (!changes["data"].isFirstChange()) {
				if (this.resetFilterValueOnDataChange()) {
					this.applyFilter();
				}
			}
		}

		if (changes["orderProperties"]) {
			if (!changes["orderProperties"].isFirstChange()) {
				this.sortData();
			}
		}

		if (changes["filter"]) {
			const defaultFilter: StarkTableFilter = {
				globalFilterPresent: true
			};

			this.filter = { ...defaultFilter, ...this.filter };
		}

		if (changes["multiSort"]) {
			this.isMultiSortEnabled =
				typeof this.multiSort === "boolean" ? this.multiSort : this.multiSort === "true" || this.multiSort === "";
		}
	}

	/**
	 * Remove the columns that were previously defined
	 */
	private removeOldColumnsFromTable(): void {
		// this.table._contentColumnDefs.toArray() contains the column definitions provided by the user

		// using the internal prop from mat-table to get the custom column definitions (no other way for now)
		const oldColumns: Set<MatColumnDef> = this.table["_customColumnDefs"];
		oldColumns.forEach((oldColumn: MatColumnDef) => {
			this.table.removeColumnDef(oldColumn);
			// removing column also from the displayed columns (such array should match the dataSource!)
			this.displayedColumns.splice(this.displayedColumns.findIndex((column: string) => column === oldColumn.name), 1);
		});
	}

	/**
	 * Add the new columns defined
	 * @param columns - The columns to be added
	 */
	private addColumnsToTable(columns: StarkTableColumnComponent[]): void {
		for (const column of columns) {
			this.table.addColumnDef(column.columnDef);
			column.sortChanged.subscribe(() => {
				this.onReorderChange(column);
			});
			column.filterChanged.subscribe(() => {
				this.onFilterChange();
			});
			this.displayedColumns = [...this.displayedColumns, column.name];
		}
	}

	/**
	 * Trigger the filtering of the MatTableDataSource used by the MatTable
	 */
	public applyFilter(): void {
		if (this.filter.globalFilterValue) {
			this.dataSource.filter = this.filter.globalFilterValue.trim().toLowerCase();
		} else {
			this.dataSource.filter = "%empty%";
		}
	}

	/**
	 * Selects all rows if they are not all selected; otherwise clear selection.
	 */
	public masterToggle(): void {
		if (this.isAllSelected()) {
			this.selection.clear();
		} else {
			for (const row of this.data) {
				this.selection.select(row);
			}
		}
	}

	/**
	 * Create and initialize the MatTableDataSource used by the MatTable
	 */
	private initializeDataSource(): void {
		this.dataSource = new MatTableDataSource(this.data);

		// if there are observers subscribed to the StarkPagination event, it means that the developer will take care of the pagination
		// so we just re-emit the event from the Stark Pagination component (online mode)
		if (this.paginationChanged.observers.length > 0) {
			this.starkPaginator.paginated.subscribe((paginateEvent: StarkPaginateEvent) => {
				this.paginationChanged.emit(paginateEvent);
			});
		} else {
			// if there are no observers, then the data will be paginated internally in the MatTable via the Stark paginator event (offline mode)
			this.dataSource.paginator = this.starkPaginator;
		}

		this.starkPaginator.emitMatPaginationEvent();

		this.dataSource.filterPredicate = (rowData: any, globalFilter: string) => {
			const matchFilter: boolean[] = [];

			if (globalFilter !== "%empty%") {
				// initially we take all the filter criteria as "unmet" criteria
				let unmetFilterCriteria: RegExp[] = this.getNormalizedFilterCriteria(globalFilter);

				for (const column of this.columns) {
					const displayedValue: string = column.getDisplayedValue(rowData).toString();
					// recalculate the "unmet" criteria again based on the remaining "unmet" criteria from the previous iteration
					unmetFilterCriteria = this.getUnmetFilterCriteria(displayedValue, unmetFilterCriteria);
				}

				matchFilter.push(unmetFilterCriteria.length === 0);
			}

			for (const column of this.columns) {
				if (column.filterValue) {
					const displayedValue: string = column.getDisplayedValue(rowData).toString();
					const filterCriteria: RegExp[] = this.getNormalizedFilterCriteria(column.filterValue);

					matchFilter.push(this.getUnmetFilterCriteria(displayedValue, filterCriteria).length === 0);
				}
			}

			return !matchFilter.length || matchFilter.every(Boolean);
		};
	}

	/**
	 * Return the filter criteria that the item does not meet
	 */
	public getUnmetFilterCriteria(item: object | string, filterCriteria: RegExp[]): RegExp[] {
		let itemStr: string;

		if (item && typeof item === "object") {
			itemStr = JSON.stringify(item);
		} else {
			itemStr = item;
		}

		return filterCriteria.filter((criteria: RegExp) => {
			return !criteria.test(itemStr); // the item does not fulfill the given criteria
		});
	}

	/**
	 * Normalize the given filter value into a more complex filter criteria supporting wildcards
	 * @param filterValue - The original filter value
	 * @returns An array containing more complex regex based on the original filter value supporting wildcards
	 */
	public getNormalizedFilterCriteria(filterValue: string): RegExp[] {
		const filter: string = filterValue
			.replace(/\\(?=\*)\*/g, "<stark_char_star>") // string "\*" (escaped *)
			.replace(/\\(?=\?)\?/g, "<stark_char_quot>") // string "\?" (escaped ?)
			.replace(/\\/g, "<stark_char_backsl>") // character "\"
			.replace(/[*?\[\]()$+^]/g, (match: string) => {
				// replace chars "*", "?", "[", "]", "(", ")", "$", "+", "^"
				if (match === "*") {
					return "\\S*"; // wildcard "*"
				} else if (match === "?") {
					return "\\S{1}"; // wildcard "?"
				} else {
					return "\\" + match; // add trailing "\" to escape the character
				}
			})
			.replace("<stark_char_star>", "\\*")
			.replace("<stark_char_quot>", "\\?")
			.replace("<stark_char_backsl>", "\\\\");

		return filter.split(" ").map((filterStr: string) => new RegExp(filterStr, "i"));
	}

	/**
	 * Return whether the number of selected elements matches the total number of rows.
	 */
	public isAllSelected(): boolean {
		const numSelected: number = this.selection.selected.length;
		const numRows: number = this.data.length;
		return numSelected === numRows;
	}

	/**
	 * Called when the Clear button in the filter pop-up is clicked
	 */
	public onClearFilter(): void {
		this.filter.globalFilterValue = "";
		this.applyFilter();
	}

	/**
	 * Called whenever the value of the filter input changes
	 */
	public onFilterChange(): void {
		this.applyFilter();
	}

	/**
	 * Called whenever the sorting of any of the columns changes
	 * @param column - The column whose sorting has changed
	 */
	public onReorderChange(column: StarkTableColumnComponent): void {
		if (column.sortable) {
			this.resetSorting(column);
			if (column.sortable) {
				column.sortPriority = 1;
				switch (column.sortDirection) {
					case "asc":
						column.sortDirection = "desc";
						break;
					case "desc":
						column.sortDirection = "";
						break;
					default:
						column.sortDirection = "asc";
						break;
				}
			}
			this.sortData();
		}
	}

	/**
	 * Open the multi-sort dialog to configure the multi-column sorting of the data
	 */
	public openMultiSortDialog(): void {
		const dialogRef: MatDialogRef<StarkTableMultisortDialogComponent, StarkSortingRule[]> = this.dialogService.open<
			StarkTableMultisortDialogComponent,
			StarkTableMultisortDialogData
		>(StarkTableMultisortDialogComponent, {
			panelClass: "stark-table-dialog-multisort-panel-class", // the width is set via CSS using this class
			data: { columns: this.columns.filter((column: StarkTableColumnComponent) => column.sortable) }
		});

		dialogRef.afterClosed().subscribe((savedRules: StarkSortingRule[] | undefined) => {
			if (savedRules) {
				this.sortData();
			}
		});
	}

	/**
	 * Clear the sorting direction of every column in the table except for the given column (if any)
	 * @param exceptColumn - Column whose sorting direction should not be cleared
	 */
	public resetSorting(exceptColumn: StarkTableColumnComponent): void {
		for (const column of this.columns) {
			if (exceptColumn !== column) {
				column.sortDirection = "";
				column.sortPriority = 100;
			}
		}
	}

	/**
	 * Sort the data according to the direction and priority (if any) defined for each column.
	 * In case there is a compareFn defined for any of the columns then such method is called to perform the custom sorting.
	 * FIXME: refactor this method to reduce its cognitive complexity
	 */
	/* tslint:disable-next-line:cognitive-complexity */
	public sortData(): void {
		const sortableColumns: StarkTableColumnComponent[] = this.columns
			.filter((columnToFilter: StarkTableColumnComponent) => columnToFilter.sortDirection)
			.sort((column1: StarkTableColumnComponent, column2: StarkTableColumnComponent) => column1.sortPriority - column2.sortPriority);

		this.isMultiSorting = sortableColumns.length > 1;

		this.data.sort((row1: any, row2: any) => {
			for (const column of sortableColumns) {
				const isAscendingDirection: boolean = column.sortDirection === "asc";
				if (column.compareFn instanceof Function) {
					const compareResult: number = column.compareFn(column.getRawValue(row1), column.getRawValue(row2));
					if (compareResult !== 0) {
						return isAscendingDirection ? compareResult : compareResult * -1;
					}
				} else {
					const valueObj1: string | number = column.getDisplayedValue(row1);
					const valueObj2: string | number = column.getDisplayedValue(row2);
					const obj1: string | number = typeof valueObj1 === "string" ? valueObj1.toLowerCase() : valueObj1;
					const obj2: string | number = typeof valueObj2 === "string" ? valueObj2.toLowerCase() : valueObj2;

					if (obj1 > obj2) {
						return isAscendingDirection ? 1 : -1;
					}
					if (obj1 < obj2) {
						return isAscendingDirection ? -1 : 1;
					}
				}
			}
			return 0;
		});

		// FIXME: move these two calls out of this method
		this.initializeDataSource();

		this.applyFilter();
	}

	/**
	 * Get the filter value of the specified column.
	 * @param columnName - Name of the column whose filter value should be retrieved.
	 * @returns The filter value of the specified column or undefined in case it has no filter value defined.
	 */
	public getColumnFilterValue(columnName: string): string | undefined {
		let columnFilterValue: string | undefined;

		if (this.filter.columns instanceof Array) {
			for (const columnFilter of this.filter.columns) {
				if (
					columnFilter.columnName === columnName &&
					typeof columnFilter.filterValue === "string" &&
					columnFilter.filterValue !== ""
				) {
					columnFilterValue = columnFilter.filterValue;
					break;
				}
			}
		}
		return columnFilterValue;
	}

	/**
	 * Get the sorting direction of the specified column.
	 * @param columnName - Name of the column whose sorting direction should be retrieved.
	 * @returns The sorting direction of the specified column.
	 */
	public getColumnSortingDirection(columnName: string): StarkTableColumnSortingDirection {
		let columnSortingDirection: StarkTableColumnSortingDirection = "";

		if (this.orderProperties instanceof Array) {
			const columnOrderProperty: string | undefined = this.orderProperties.filter((orderProperty: string) => {
				if (orderProperty.startsWith("-")) {
					return orderProperty === "-" + columnName;
				}
				return orderProperty === columnName;
			})[0];

			if (columnOrderProperty) {
				columnSortingDirection = columnOrderProperty.startsWith("-") ? "desc" : "asc";
			}
		}

		return columnSortingDirection;
	}

	/**
	 * Get the sorting priority of the specified column.
	 * @param columnName - Name of the column whose sorting priority should be retrieved.
	 * @returns The sorting priority of the specified column.
	 */
	public getColumnSortingPriority(columnName: string): number | undefined {
		let columnSortingPriority: number | undefined;
		let index: number = 1;

		if (this.orderProperties instanceof Array) {
			for (const orderProperty of this.orderProperties) {
				if (orderProperty === columnName || (orderProperty.startsWith("-") && orderProperty === "-" + columnName)) {
					columnSortingPriority = index;
					break;
				}

				index++;
			}
		}

		return columnSortingPriority;
	}

	/**
	 * Reset the filter value (global or per column) as long as the resetFilterOnDataChange (global or per column) option is enabled
	 * @returns Whether the filter has been reset
	 */
	public resetFilterValueOnDataChange(): boolean {
		let filterValueReset: boolean = false;

		if (
			typeof this.filter.globalFilterValue === "string" &&
			this.filter.globalFilterValue !== "" &&
			this.filter.resetGlobalFilterOnDataChange === true
		) {
			this.filter.globalFilterValue = "";
			filterValueReset = true;
		}

		if (typeof this.filter.columns !== "undefined") {
			for (const columnFilter of this.filter.columns) {
				if (
					typeof columnFilter.filterValue === "string" &&
					columnFilter.filterValue !== "" &&
					columnFilter.resetFilterOnDataChange === true
				) {
					columnFilter.filterValue = "";
					filterValueReset = true;
				}
			}
		}

		return filterValueReset;
	}

	/**
	 * @ignore
	 */
	public trackColumnFn(_index: number, item: StarkTableColumnProperties): string {
		return item.name;
	}

	/**
	 * @ignore
	 */
	public trackActionFn(_index: number, item: StarkAction): string {
		return item.id;
	}
}
