import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import {
	StarkActionBarConfig,
	StarkPaginationConfig,
	StarkTableColumnProperties,
	StarkTableFilter,
	StarkAction
} from "@nationalbankbelgium/stark-ui";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "demo-table",
	styleUrls: ["./demo-table-with-alternative-action-bar.component.scss"],
	templateUrl: "./demo-table-with-alternative-action-bar.component.html",
	encapsulation: ViewEncapsulation.None
})
export class TableExample implements OnInit {
	public getTitle = (data: any): string => {
		return "~" + data.title.label;
	};

	public compareTitle = (n1: any, n2: any) => {
		if (n1.value < n2.value) {
			return -1;
		}
		if (n1.value > n2.value) {
			return 1;
		}
		return 0;
	};

	public dummyData: any[];
	public columnsProperties: StarkTableColumnProperties[];
	public customTableActions: StarkAction[];
	public tableRowsActionBarConfig: StarkActionBarConfig;
	public paginationConfig: StarkPaginationConfig;
	public columns: any[];
	public orderProperties: string[];
	public filter: StarkTableFilter;

	public constructor(@Inject(STARK_LOGGING_SERVICE) private logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.dummyData = [
			{ id: 1, title: { label: "first title (value: 1)", value: 1 }, description: "number one" },
			{ id: 10, title: { label: "second title (value: 2)", value: 2 }, description: "second description" },
			{ id: 12, title: { label: "third title (value: 3)", value: 3 }, description: "the third description" },
			{ id: 2, title: { label: "fourth title (value: 4)", value: 4 }, description: "description number four" },
			{ id: 23, title: { label: "fifth title (value: 5)", value: 5 }, description: "fifth description" },
			{ id: 222, title: { label: "sixth title (value: 6)", value: 6 }, description: "the sixth description" },
			{ id: 112, title: { label: "seventh title (value: 7)", value: 7 }, description: "seventh description" },
			{ id: 232, title: { label: "eighth title (value: 8)", value: 8 }, description: "description number eight" },
			{ id: 154, title: { label: "ninth title (value: 9)", value: 9 }, description: "the ninth description" },
			{ id: 27, title: { label: "tenth title (value: 10)", value: 10 }, description: "description number ten" },
			{ id: 86, title: { label: "eleventh title (value: 11)", value: 11 }, description: "eleventh description" },
			{ id: 44, title: { label: "twelfth title (value: 12)", value: 12 }, description: "the twelfth description" }
		];

		this.columnsProperties = [
			{
				name: "id",
				label: "id",
				isSortable: true,
				isFilterable: true
			},
			{
				name: "title",
				label: "Title",
				cellFormatter: (value: any): string => {
					return "~" + value.label;
				},
				isSortable: true,
				isFilterable: true,
				compareFn: this.compareTitle
			},
			{
				name: "description",
				label: "Description",
				isSortable: true,
				isFilterable: true
			}
		];

		this.columns = [
			{
				name: "id",
				sortable: true
			},
			{
				name: "title",
				sortable: true,
				dataAccessor: (data: any): string => {
					return "~" + data.title.label;
				},
				compareFn: this.compareTitle
			},
			{
				name: "description",
				sortable: true
			}
		];

		this.customTableActions = [
			{
				id: "edit-item",
				label: "STARK.ICONS.EDIT_ITEM",
				icon: "pencil",
				actionCall: ($event: Event, data: any): void => {
					this.logger.debug("this is edit item icon click");
					this.logger.debug($event);
					this.logger.debug(data);
					this.logger.debug("selected rows ");
				},
				isEnabled: true
			},
			{
				id: "reload",
				label: "STARK.ICONS.RELOAD_PAGE",
				icon: "autorenew",
				actionCall: ($event: Event, data: any): void => {
					this.logger.debug($event);
					this.logger.debug(data);
				},
				isEnabled: true
			},
			{
				id: "reload2",
				label: "3D view",
				icon: "rotate-3d",
				actionCall: ($event: Event, data: any): void => {
					this.logger.debug($event);
					this.logger.debug(data);
				},
				isEnabled: false
			},
			{
				id: "reload3",
				label: "Change your settings",
				icon: "wrench",
				actionCall: ($event: Event, data: any): void => {
					this.logger.debug($event);
					this.logger.debug(data);
				},
				isEnabled: false
			},
			{
				id: "reload4",
				label: "Copy signs",
				icon: "copyright",
				actionCall: ($event: Event, data: any): void => {
					this.logger.debug($event);
					this.logger.debug(data);
				},
				isEnabled: false
			},
			{
				id: "reload5",
				label: "Upload to the cloud",
				icon: "cloud-upload",
				actionCall: ($event: Event, data: any): void => {
					this.logger.debug($event);
					this.logger.debug(data);
				},
				isEnabled: false
			},
			{
				id: "reload6",
				label: "Create new bookmark",
				icon: "book",
				actionCall: ($event: Event, data: any): void => {
					this.logger.debug($event);
					this.logger.debug(data);
				},
				isEnabled: false
			}
		];

		this.orderProperties = ["title", "-description", "id"];

		this.filter = {
			globalFilterPresent: true,
			columns: []
		};

		this.paginationConfig = {
			totalItems: this.dummyData.length,
			page: 1,
			itemsPerPage: 4,
			itemsPerPageOptions: [2, 4, 6, 8, 10]
		};

		this.tableRowsActionBarConfig = {
			actions: [
				{
					id: "edit-item",
					label: "STARK.ICONS.EDIT_ITEM",
					icon: "pencil",
					actionCall: (event: Event, data: any): void => {
						this.logger.debug(event);
						this.logger.debug(data);
					},
					isEnabled: true
				},
				{
					id: "delete-item",
					label: "STARK.ICONS.DELETE_ITEM",
					icon: "delete",
					actionCall: (event: Event, data: any): void => {
						this.logger.debug(event);
						this.logger.debug(data);
					},
					isEnabled: false
				}
			]
		};
	}
}
