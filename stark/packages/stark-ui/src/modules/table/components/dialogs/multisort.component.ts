import { Component, Inject, OnInit, ViewEncapsulation, Renderer2, ElementRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StarkTableColumnComponent, StarkTableColumnSortingDirection } from "../column.component";
import { AbstractStarkUiComponent } from "../../../../common/classes/abstract-component";

/**
 * Content of the data to be passed to the StarkTableMultisortDialogComponent
 */
export interface StarkTableMultisortDialogData {
	/**
	 * Sortable StarkTable columns whose configuration can be defined in this dialog component
	 */
	columns: StarkTableColumnComponent[];
}

/**
 * Rule object to be configured in the StarkTableMultisortDialogComponent
 */
export interface StarkSortingRule {
	/**
	 * Sortable StarkTable column
	 */
	column: StarkTableColumnComponent;
	/**
	 * Sorting direction: "ascending" or "descending"
	 */
	sortDirection: StarkTableColumnSortingDirection;
	/**
	 * Priority of this rule. Priority is a number between 0 and 100 where 0 represents the higher priority
	 */
	sortPriority: number;
}

/**
 * Component to display the multi column sorting configuration
 */
@Component({
	selector: "stark-table-dialog-multisort",
	templateUrl: "multisort.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: "stark-table-dialog-multisort"
	}
})
export class StarkTableMultisortDialogComponent extends AbstractStarkUiComponent implements OnInit {
	/**
	 * Array of sorting rules currently applied
	 */
	public rules: StarkSortingRule[] = [];
	/**
	 * The priority to be set to a new rule when added
	 */
	public currentPriority: number = 0;

	/**
	 * Whether the Add button is disabled
	 */
	public isAddDisabled: boolean = false;

	/**
	 * Class constructor
	 * @param dialogRef - Reference to this dialog opened via the MatDialog service
	 * @param data - The data to be passed to this dialog component
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		public dialogRef: MatDialogRef<StarkTableMultisortDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: StarkTableMultisortDialogData,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.data.columns.sort((a: StarkTableColumnComponent, b: StarkTableColumnComponent) => a.sortPriority - b.sortPriority);

		for (const column of this.data.columns) {
			if (column.sortable) {
				if (column.sortDirection) {
					this.currentPriority++;
				}
				this.rules.push({
					column: column,
					sortDirection: column.sortDirection,
					sortPriority: column.sortDirection ? this.currentPriority : 100
				});
			}
		}
		this.sortRules();
	}

	/**
	 * Called when Add button is clicked.
	 * Sets the sorting direction to "asc" to a rule that doesn't have sorting direction yet so it is displayed in the dialog
	 */
	public onAdd(): void {
		for (const rule of this.rules) {
			if (!rule.sortDirection) {
				rule.sortDirection = "asc";
				this.currentPriority++;
				rule.sortPriority = this.currentPriority;
				break;
			}
		}
		this.sortRules();
	}

	/**
	 * Called when Delete button is clicked.
	 * Deletes the sorting rule corresponding to the given column.
	 * @param column - The column to be deleted
	 */
	public onDelete(column: StarkSortingRule): void {
		column.sortDirection = "";
		column.sortPriority = 100;
		this.sortRules();
	}

	/**
	 * Called when Cancel button is clicked.
	 * Closes this dialog discarding any changes done to the original sorting rules.
	 */
	public onCancel(): void {
		this.dialogRef.close(false);
	}

	/**
	 * Called when the sorting rule changes.
	 * @param oldColumn - New state of the sorting rule
	 * @param newColumn - Previous state of the sorting rule
	 */
	public onColumnChange(oldColumn: StarkSortingRule, newColumn: StarkSortingRule): void {
		newColumn.sortDirection = oldColumn.sortDirection;
		newColumn.sortPriority = oldColumn.sortPriority;
		oldColumn.sortDirection = "";
		oldColumn.sortPriority = 100;
		this.sortRules();
	}

	/**
	 * Called when Save button is clicked.
	 * Updates all the original sorting rules with the config defined in this dialog and closes the dialog passing the updated rules
	 */
	public onSave(): void {
		this.currentPriority = 1;
		for (const rule of this.rules) {
			rule.column.sortDirection = rule.sortDirection;
			rule.column.sortPriority = this.currentPriority;
			this.currentPriority++;
		}
		this.dialogRef.close(this.rules);
	}

	/**
	 * Sort all sorting rules by priority
	 */
	public sortRules(): void {
		this.rules.sort((a: StarkSortingRule, b: StarkSortingRule) => a.sortPriority - b.sortPriority);
		this.isAddDisabled = this.rules.filter((rule: StarkSortingRule) => rule.sortDirection).length === this.rules.length;
	}

	/**
	 * @ignore
	 */
	public trackRuleFn(_index: number, item: StarkSortingRule): string {
		return item.column.name;
	}
}
