import {
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Renderer2,
	TemplateRef,
	ViewChild,
	ViewEncapsulation
} from "@angular/core";
import { MatColumnDef } from "@angular/material/table";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * @ignore
 */
const _get: Function = require("lodash/get");

/**
 * Column sorting directions of the StarkTableComponent
 */
export type StarkTableColumnSortingDirection = "asc" | "desc" | "";

/**
 * Component to display a column inside the StarkTableComponent
 */
@Component({
	selector: "stark-table-column",
	templateUrl: "./column.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: "stark-table-column"
	}
})
export class StarkTableColumnComponent extends AbstractStarkUiComponent {
	/**
	 * Name of the property that will be the source of the column.
	 */
	@Input()
	public get name(): string {
		return this._name;
	}
	public set name(name: string) {
		this._name = name;
		this.columnDef.name = name;
	}

	/**
	 * @ignore
	 * @internal
	 */
	private _name: string;

	/**
	 * Function that returns
	 *   1 : if obj1 > obj2
	 *   0 : if obj1 === obj2
	 *  -1 : if obj1 < obj2
	 *
	 * @param obj1 - First object in the comparison
	 * @param obj2 - Second object in the comparison
	 */
	@Input()
	public compareFn?: ((obj1: any, obj2: any) => number);

	/**
	 * Function that returns the raw value of this column in case the access to such value can't be provided via the column name.
	 */
	@Input()
	public dataAccessor?: ((data: any, name: string) => string); // TODO: really needed?

	/**
	 * Function that returns a formatted value (string) to be set in the cell. It can be used to set different formats
	 * depending on the row, value and or columnName. This function is called with 3 parameters:
	 * @param value - The value of the cell to be formatted
	 * @param row - The row object that contains the cell
	 * @param columnName - The column that the cell belongs to
	 */
	@Input()
	public cellFormatter?: ((value: any, row?: any, columnName?: string) => string);

	/**
	 * Sorting direction of the column.
	 */
	@Input()
	public sortDirection: StarkTableColumnSortingDirection;

	/**
	 * Whether this column is filterable
	 */
	@Input()
	public filterable: boolean = false;

	/**
	 * Value of the filter
	 * Wildcards can be used: "*" to match any anything and "?" to match one character.
	 * Use "\*" and "\?" to match exactly the characters "*" and "?"
	 */
	@Input()
	public filterValue: string;

	/**
	 * Label to be shown as the column's header. Default: the column's name
	 */
	@Input()
	public headerLabel: string;

	/**
	 * Whether the column is sortable or not. Default: true
	 */
	@Input()
	public sortable: boolean = false;

	/**
	 * Priority of the column. Default: PERSIST
	 */
	@Input()
	public sortPriority: number;

	/**
	 * Output that will emit a specific column whenever its filter value has changed
	 */
	@Output()
	public filterChanged: EventEmitter<StarkTableColumnComponent> = new EventEmitter<StarkTableColumnComponent>();

	/**
	 * Output that will emit a specific column whenever its sorting direction has changed
	 */
	@Output()
	public sortChanged: EventEmitter<StarkTableColumnComponent> = new EventEmitter<StarkTableColumnComponent>();

	/**
	 * Reference to the MatColumnDef embedded in this component
	 */
	@ViewChild(MatColumnDef)
	public columnDef: MatColumnDef;

	/**
	 * Reference to the transcluded template in this component via the ngTemplateOutlet
	 */
	@ContentChild(TemplateRef)
	public columnTemplate: TemplateRef<any>;

	/**
	 * Class constructor
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(protected renderer: Renderer2, protected elementRef: ElementRef) {
		super(renderer, elementRef);
	}

	/**
	 * Returns the header label of the column if it's specified. If not, simply returns the name of the column
	 */
	public getHeaderLabel(): string {
		return this.headerLabel ? this.headerLabel : this.name;
	}

	/**
	 * Get the raw value of the column
	 * @param row - The row item
	 * @returns The raw value of the property from the given row item
	 */
	public getRawValue(row: any): any | undefined {
		let rawValue: any | undefined = _get(row, this.name);

		if (this.dataAccessor) {
			rawValue = this.dataAccessor(row, this.name);
		}

		// ensure we always return undefined instead of null
		return rawValue !== null ? rawValue : undefined;
	}

	/**
	 * Get the final displayed value of the column
	 * @param row - The row item
	 * @returns The displayed value of the property from the given row item after applying the
	 * formatter (if there was any defined in the column) and translating the value (in case the value is a translation key)
	 */
	public getDisplayedValue(row: any): string | number {
		let formattedValue: string = "";
		const rawValue: any | undefined = this.getRawValue(row);

		if (typeof rawValue !== "undefined") {
			if (this.cellFormatter instanceof Function) {
				formattedValue = this.cellFormatter(rawValue, row, this.name);
			} else if (typeof rawValue === "number") {
				return rawValue; // return already, no point in translating a number
			} else {
				formattedValue = rawValue.toString();
			}
		} else {
			return ""; // return already, no point in translating an empty string
		}

		return formattedValue;
		// TODO: add translation feature
		// return this.$translate.instant(formattedValue);
	}

	/**
	 * Called when the Clear button in the filter pop-up is clicked
	 */
	public onClearFilter(): void {
		this.filterValue = "";
		this.onFilterChange();
	}

	/**
	 * Called whenever the value of the filter input changes
	 */
	public onFilterChange(): void {
		this.filterChanged.emit();
	}

	/**
	 * Called whenever the sorting of the column changes
	 */
	public onSortChange(): void {
		this.sortChanged.emit(this);
	}
}
