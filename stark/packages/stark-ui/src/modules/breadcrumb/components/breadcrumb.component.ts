/*tslint:disable:trackBy-function*/
import { StarkBreadcrumbPath } from "./breadcrumb-path.intf";
import { StarkBreadcrumbConfig } from "./breadcrumb-config.intf";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import {
	STARK_ROUTING_SERVICE,
	StarkRoutingService,
	STARK_LOGGING_SERVICE,
	StarkLoggingService,
	StarkRoutingTransitionHook
} from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-breadcrumb";

/**
 * Component to display the breadcrumb of the view where it is included.
 */
@Component({
	selector: "stark-breadcrumb",
	templateUrl: "./breadcrumb.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkBreadcrumbComponent extends AbstractStarkUiComponent implements OnInit, OnDestroy {
	/**
	 * Object containing an array of StarkBreadcrumbPath objects.
	 *
	 * If omitted, then the StarkBreadcrumbConfig object will calculated processing recursively the UI router state tree from the
	 * current state to its ancestors to extract the different paths. In this case, the translationKey will be taken from the
	 * "data" object of the state definition.
	 */
	@Input()
	public breadcrumbConfig?: StarkBreadcrumbConfig;

	/**
	 * @ignore
	 * @internal
	 */
	public transitionHookDeregisterFn: Function;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param routingService - The routing service of the application
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		// if there is not config provided, then it will be automatically constructed based on the router state tree
		if (typeof this.breadcrumbConfig === "undefined") {
			this.breadcrumbConfig = { breadcrumbPaths: this.getPathsFromStateTree() };
			// then refresh the config after every successful transition
			this.transitionHookDeregisterFn = this.routingService.addTransitionHook(StarkRoutingTransitionHook.ON_SUCCESS, {}, () => {
				this.breadcrumbConfig = { breadcrumbPaths: this.getPathsFromStateTree() };
				console.log("breadcrumb: this.breadcrumbConfig  ->  ", this.breadcrumbConfig);
			});
		}
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnDestroy(): void {
		if (this.transitionHookDeregisterFn) {
			this.transitionHookDeregisterFn();
		}
	}

	/**
	 * Generate the breadcrumb path elements out of the current router state tree.
	 * From the current child state up to the root parent
	 */
	public getPathsFromStateTree(): StarkBreadcrumbPath[] {
		const statePaths: StarkBreadcrumbPath[] = [];

		const stateTreeParams: Map<string, any> = this.routingService.getStateTreeParams();

		stateTreeParams.forEach((stateParams: any, stateName: string) => {
			const stateTranslationKey: string = this.routingService.getTranslationKeyFromState(stateName);

			const breadcrumbPath: StarkBreadcrumbPath = {
				id: "breadcrumb-path-" + stateName.toLowerCase(),
				state: stateName,
				stateParams: stateParams,
				translationKey: stateTranslationKey
			};
			statePaths.unshift(breadcrumbPath); // added to the start of the array because we go in the reverse way
		});

		return statePaths;
	}

	/**
	 * Method used to handle the click on a link in the breadcrumb component
	 * @param breadcrumbPath - StarkBreadcrumbPath on which the click was performed
	 */
	public breadcrumbClickHandler(breadcrumbPath: StarkBreadcrumbPath): void {
		this.routingService.navigateTo(breadcrumbPath.state, breadcrumbPath.stateParams);
	}
}
