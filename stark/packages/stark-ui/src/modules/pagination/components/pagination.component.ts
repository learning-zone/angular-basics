import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	Renderer2,
	SimpleChanges,
	ViewEncapsulation
} from "@angular/core";
import { MatPaginator, MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkPaginationConfig } from "./pagination-config.intf";
import { StarkPaginateEvent } from "./paginate-event.intf";

/**
 * @ignore
 */
const _isEqual: Function = require("lodash/isEqual");

/**
 * Name of the component
 */
const componentName: string = "stark-pagination";

export type StarkPaginationComponentMode = "compact";

// FIXME: refactor the template of this component function to reduce its cyclomatic complexity
/* tslint:disable:template-cyclomatic-complexity */
/**
 * Component to display pagination bar to be used with a collection of items.
 * It extends the MatPaginator class from Angular Material so it can be integrated as well with the MatTable.
 * {@link https://material.angular.io/components/paginator/api|MatPaginator}
 */
@Component({
	selector: "stark-pagination",
	templateUrl: "./pagination.component.html",
	encapsulation: ViewEncapsulation.None
})
export class StarkPaginationComponent extends MatPaginator implements OnInit, OnChanges, AfterViewInit {
	/**
	 * Adds class="stark-pagination" attribute on the host component
	 */
	@HostBinding("class")
	public class: string = componentName;

	/**
	 * Suffix id given to items per page dropdown
	 * (items-per-page-<htmlSuffixId>) and pageSelector dropdown (page-selector-<htmlSuffixId>)
	 * Default: "pagination"
	 */
	@Input()
	public htmlSuffixId?: string;

	/**
	 * Desired layout or flavour:
	 * - compact: Displayed in a compact mode.
	 * - default: basic implementation with everything
	 */
	@Input()
	public mode?: StarkPaginationComponentMode;

	/**
	 * StarkPaginationConfig object containing main information for the pagination.
	 */
	@Input()
	public paginationConfig: StarkPaginationConfig;

	/**
	 * Output event emitter that will emit the paginate event when the pagination changed.
	 */
	@Output()
	public paginated: EventEmitter<StarkPaginateEvent> = new EventEmitter<StarkPaginateEvent>();

	public get paginationInput(): number {
		return this._paginationInput;
	}

	public set paginationInput(newValue: number) {
		// store the previous pagination input value in case the new one is not valid
		// so it can be reverted to the previous value when that happens
		if (this._paginationInput && (newValue > this.getTotalPages() || newValue === 0)) {
			this.previousPaginationInput = this._paginationInput;
		}
		this._paginationInput = newValue;
	}

	public _paginationInput: number;
	public previousPaginationInput: number;
	public previousPageIndex: number;
	public pageNumbers: (string | number)[];

	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		public element: ElementRef,
		public renderer: Renderer2,
		public cdRef: ChangeDetectorRef
	) {
		// we don't use the MatPaginatorIntl service to translate the labels but it is needed for the MatPaginator base class
		// see https://material.angular.io/components/paginator/api#services
		super(new MatPaginatorIntl(), cdRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.paginationConfig = this.normalizePaginationConfig(this.paginationConfig);
		this.setMatPaginatorProperties(this.paginationConfig);
		this.previousPageIndex = 0;

		this.htmlSuffixId = this.htmlSuffixId || "pagination";

		this.setPageNumbers();

		super.ngOnInit();
		this.logger.debug(componentName + ": controller initialized");
	}

	/**
	 * Component lifecycle hook
	 */
	public ngAfterViewInit(): void {
		if (this.paginationConfig.isExtended) {
			this.renderer.addClass(this.element.nativeElement, "extended-pagination");
		}
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnChanges(changesObj: SimpleChanges): void {
		if (changesObj["paginationConfig"]) {
			// Set local variable to prevent shadow changes
			const paginationConfigOriginalChange: StarkPaginationConfig = { ...this.paginationConfig };
			this.paginationConfig = this.normalizePaginationConfig(this.paginationConfig);
			this.logger.debug(componentName + ": paginationConfig changed...", this.paginationConfig);

			// If normalization has changed the page or itemsPerPage, that means the paginationConfig is not the same in the pagination controller
			// and in the parent controller. So pagination hast to trigger onPaginate callback to pass the new values.
			if (
				typeof paginationConfigOriginalChange === "undefined" ||
				paginationConfigOriginalChange.page !== this.paginationConfig.page ||
				paginationConfigOriginalChange.itemsPerPage !== this.paginationConfig.itemsPerPage
			) {
				this.onChangePagination();
			} else if (
				!_isEqual(paginationConfigOriginalChange, changesObj["paginationConfig"].previousValue) ||
				paginationConfigOriginalChange.totalItems !== this.paginationConfig.totalItems ||
				paginationConfigOriginalChange.itemsPerPageOptions !== this.paginationConfig.itemsPerPageOptions
			) {
				this.setPageNumbers();
			}
			this.paginationInput = <number>this.paginationConfig.page;
		}
	}

	/**
	 * Creates a normalized paginationConfig to be used by this component.
	 * If the given config is undefined it will set totalItems only, otherwise it sets default values for the missing properties
	 */
	// FIXME: refactor this function to reduce its cognitive complexity
	/* tslint:disable-next-line:cognitive-complexity */
	public normalizePaginationConfig(config: StarkPaginationConfig | undefined): StarkPaginationConfig {
		let normalizedConfig: StarkPaginationConfig;
		if (!config) {
			// initialize paginationConfig to prevent errors in other functions depending on this config
			normalizedConfig = {
				totalItems: 0
			};
			this.logger.warn(componentName + ": No configuration defined. TotalItems set to 0 by default");
		} else {
			normalizedConfig = {
				itemsPerPageOptions: config.itemsPerPageOptions || [5, 10, 15],
				itemsPerPage: config.itemsPerPage || (config.itemsPerPageOptions ? config.itemsPerPageOptions[0] : 5),
				page: config.page || 1,
				isExtended: config.isExtended !== undefined ? config.isExtended : false,
				itemsPerPageIsPresent: config.itemsPerPageIsPresent !== undefined ? config.itemsPerPageIsPresent : true,
				pageNavIsPresent: config.pageNavIsPresent !== undefined ? config.pageNavIsPresent : true,
				pageInputIsPresent: config.pageInputIsPresent !== undefined ? config.pageInputIsPresent : true,
				totalItems: config.totalItems !== undefined ? config.totalItems : 0
			};
			this.logger.debug(componentName + ": normalized pagination config: ", normalizedConfig);
		}

		return normalizedConfig;
	}

	/**
	 * Set the properties needed for the MatPaginator base class based on the given pagination configuration
	 * {@link https://material.angular.io/components/paginator/api#MatPaginator|MatPaginator API}
	 * @param config - The config object which be used to set the MatPaginator properties
	 */
	public setMatPaginatorProperties(config: StarkPaginationConfig): void {
		// The set of provided page size options to display to the user.
		this.pageSizeOptions = <number[]>config.itemsPerPageOptions;
		// Number of items to display on a page. By default set to 50.
		this.pageSize = <number>config.itemsPerPage;
		// The zero-based page index of the displayed list of items. Defaulted to 0.
		this.pageIndex = <number>config.page - 1; // zero-based
		// The length of the total number of items that are being paginated. Defaulted to 0.
		this.length = <number>config.totalItems;
	}

	/**
	 * Check whether the given value is equal to zero (as number 0 or as string "0").
	 */
	public isZero(numberToCheck: string | number): boolean {
		return numberToCheck === 0 || numberToCheck === "0";
	}

	/**
	 * Check whether there is a page after the current one.
	 */
	public hasNext(): boolean {
		return this.paginationConfig && <number>this.paginationConfig.page < this.getTotalPages();
	}

	/**
	 * Check whether there is a page before the current one.
	 */
	public hasPrevious(): boolean {
		return this.paginationConfig && <number>this.paginationConfig.page > 1;
	}

	/**
	 * Change page to first one.
	 */
	public goToFirst(): void {
		if (this.hasPrevious()) {
			this.goToPage(1);
		}
	}

	/**
	 * Change page to previous one.
	 */
	public goToPrevious(): void {
		if (this.hasPrevious()) {
			this.goToPage(<number>this.paginationConfig.page - 1);
		}
	}

	/**
	 * Change page to next one.
	 */
	public goToNext(): void {
		if (this.hasNext()) {
			this.goToPage(<number>this.paginationConfig.page + 1);
		}
	}

	/**
	 * Change page to last one.
	 */
	public goToLast(): void {
		if (this.hasNext()) {
			this.goToPage(this.getTotalPages());
		}
	}

	/**
	 * Emit the stark paginate event and the MatPagination event.
	 * Then reload pageNumbers variable.
	 */
	public onChangePagination(): void {
		if (
			this.paginationConfig &&
			// Check the types of page & itemsPerPage to be sure they are not undefined
			typeof this.paginationConfig.page === "number" &&
			typeof this.paginationConfig.itemsPerPage === "number"
		) {
			this.paginated.emit({
				page: this.paginationConfig.page,
				itemsPerPage: this.paginationConfig.itemsPerPage
			});

			this.setMatPaginatorProperties(this.paginationConfig);
			this.emitMatPaginationEvent();
		}
		this.setPageNumbers();
		this.paginationInput = <number>this.paginationConfig.page;
	}

	/**
	 * Get total number of pages available based on itemsPerPage and totalItems.
	 */
	public getTotalPages(): number {
		let calculatedTotalPages: number = 0;
		if (this.paginationConfig) {
			const itemsPerPage: number = this.isZero(<number>this.paginationConfig.itemsPerPage)
				? 1
				: <number>this.paginationConfig.itemsPerPage;
			calculatedTotalPages = Math.ceil(<number>this.paginationConfig.totalItems / itemsPerPage);
		}

		if (calculatedTotalPages === 0) {
			return 1;
		}
		return calculatedTotalPages;
	}

	/**
	 * Set page to first then call onChangePagination function.
	 */
	public onChangeItemsPerPage(itemsPerPage: number): void {
		this.paginationConfig.page = 1;
		this.paginationConfig.itemsPerPage = itemsPerPage;
		this.onChangePagination();
	}

	/**
	 * Set pageNumbers variable.
	 */
	// FIXME: refactor this function to reduce its cognitive complexity
	/* tslint:disable-next-line:cognitive-complexity */
	public setPageNumbers(): void {
		let min: number;
		let max: number;
		let i: number;
		let j: number;

		const input: (string | number)[] = [];

		if (this.isCompactMode()) {
			min = <number>this.paginationConfig.page > 1 ? <number>this.paginationConfig.page - 1 : 1;
			max = min + 2;

			for (j = 0, i = min; i <= max && i <= this.getTotalPages(); i++, j++) {
				input[j] = i;
			}
		} else {
			// default mode: stark
			min = 1;
			max = this.getTotalPages();

			if (max < 6) {
				for (j = 0, i = min; i <= max; i++, j++) {
					input[j] = i;
				}
			} else {
				input[0] = min;
				input[4] = max;

				if (this.paginationConfig.page === min + 2 || this.paginationConfig.page === min + 1) {
					input[2] = min + 2;
				} else if (this.paginationConfig.page === max - 2 || this.paginationConfig.page === max - 1) {
					input[2] = max - 2;
				} else if (this.paginationConfig.page === max || this.paginationConfig.page === min) {
					input[2] = Math.ceil(max / 2);
				} else {
					input[2] = <number>this.paginationConfig.page;
				}

				if (<number>input[2] - 1 === min + 1) {
					input[1] = min + 1;
				} else {
					input[1] = "...";
				}

				if (<number>input[2] + 1 === max - 1) {
					input[3] = max - 1;
				} else {
					input[3] = "...";
				}
			}
		}

		this.pageNumbers = input;
	}

	/**
	 * Change to the given page if it is different than "...". It calls onChangePagination afterwards.
	 */
	public goToPage(page: number | "..."): void {
		if (page !== "...") {
			this.previousPageIndex = <number>this.paginationConfig.page;
			this.paginationConfig.page = page;
			this.onChangePagination();
		}
	}

	/**
	 * Change the page when the Enter key is pressed in the page number input
	 */
	public changePageOnEnter(): void {
		const newPage: number = typeof this.paginationInput === "string" ? parseInt(this.paginationInput, 10) : this.paginationInput;
		if (newPage <= this.getTotalPages() && newPage > 0) {
			this.goToPage(newPage);
		} else {
			this.logger.warn(componentName + ": the page ", newPage, " does not exist");
			this.paginationInput = this.previousPaginationInput; // revert the pagination input value
		}
	}

	/**
	 * Return the number of digits of the current total number of pages.
	 */
	public getPageInputMaxDigits(): number {
		return this.getTotalPages().toString().length;
	}

	/**
	 * Whether the component is to be rendered in the "compact" mode
	 */
	public isCompactMode(): boolean {
		return typeof this.mode !== "undefined" && this.mode === "compact";
	}

	/**
	 * Emit the PageEvent according to the MatPaginator API
	 * {@link https://material.angular.io/components/paginator/api#PageEvent|MatPaginator PageEvent}
	 */
	public emitMatPaginationEvent(): void {
		const pageEvent: PageEvent = {
			pageIndex: this.pageIndex,
			pageSize: this.pageSize,
			length: this.length,
			previousPageIndex: this.previousPageIndex
		};
		this.page.emit(pageEvent);
	}

	/**
	 * @ignore
	 */
	public trackPageNumberFn(_index: number): number {
		return _index;
	}
}
