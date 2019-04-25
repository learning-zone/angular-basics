/* tslint:disable:completed-docs no-big-function*/
import { StarkBreadcrumbConfig } from "./breadcrumb-config.intf";
import { StarkBreadcrumbComponent } from "./breadcrumb.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from "@angular/core";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE, StarkRoutingTransitionHook } from "@nationalbankbelgium/stark-core";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { MockStarkRoutingService, MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { By } from "@angular/platform-browser";
import Spy = jasmine.Spy;
import { StarkBreadcrumbPath } from "@nationalbankbelgium/stark-ui";
@Component({
	selector: `host-component`,
	template: `<stark-breadcrumb
			[breadcrumbConfig]="breadcrumbConfig"></stark-breadcrumb>`
})
class TestHostComponent {
	@ViewChild(StarkBreadcrumbComponent)
	public breadcrumbComponent: StarkBreadcrumbComponent;
	public breadcrumbConfig?: StarkBreadcrumbConfig;
}

describe("DemoBreadcrumbComponent", () => {
	let component: StarkBreadcrumbComponent;
	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;

	const childConst: string = "child";
	const parentConst: string = "parent";
	const grandParentConst: string = "grandparent";
	const rootAncesterConst: string = "root ancestor";

	// component bindings values
	const breadcrumbConfig: StarkBreadcrumbConfig = {
		breadcrumbPaths: [
			{
				id: "path 1",
				state: rootAncesterConst,
				stateParams: { param1: "param 1", param2: "param 2" },
				translationKey: "ROOT_ANCESTOR"
			},
			{
				id: "path 1.1",
				state: grandParentConst,
				stateParams: { param3: "param 3", param4: "param 4" },
				translationKey: "GRANDPARENT"
			},
			{
				id: "path 1.1.1",
				state: parentConst,
				stateParams: { param5: "param 5", param6: "param 6" },
				translationKey: "PARENT"
			},
			{
				id: "path 1.1.1.1",
				state: childConst,
				stateParams: { param7: "param 7", param8: "param 8" },
				translationKey: "CHILD"
			}
		]
	};

	const mockStateTreeParams: Map<string, any> = new Map<string, any>();
	mockStateTreeParams.set(childConst, { param7: "param 7", param8: "param 8" });
	mockStateTreeParams.set(parentConst, { param5: "param 5", param6: "param 6" });
	mockStateTreeParams.set(grandParentConst, { param3: "param 3", param4: "param 4" });
	mockStateTreeParams.set(rootAncesterConst, { param1: "param 1", param2: "param 2" });
	const mockStateTreeData: Map<string, any> = new Map<string, any>();
	mockStateTreeData.set(childConst, { translationKey: "CHILD" });
	mockStateTreeData.set(parentConst, { translationKey: "PARENT" });
	mockStateTreeData.set(grandParentConst, { translationKey: "GRANDPARENT" });
	mockStateTreeData.set(rootAncesterConst, { translationKey: "ROOT_ANCESTOR" });
	const mockDeregisterTransitionHookFn: Function = () => {
		return "transition hook deregistered";
	};

	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			imports: [CommonModule, NoopAnimationsModule, TranslateModule.forRoot()],
			declarations: [StarkBreadcrumbComponent, TestHostComponent],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
				{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService }
			],
			schemas: [NO_ERRORS_SCHEMA] // tells the Angular compiler to ignore unrecognized elements and attributes (selectionChange)
		}).compileComponents();
	}));

	// Inject module dependencies
	beforeEach(() => {
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		component = hostComponent.breadcrumbComponent;

		hostComponent.breadcrumbConfig = breadcrumbConfig;

		(<Spy>component.routingService.addTransitionHook).and.returnValue(mockDeregisterTransitionHookFn);
		(<Spy>component.routingService.getStateTreeParams).and.returnValue(mockStateTreeParams);
		(<Spy>component.routingService.getTranslationKeyFromState).and.callFake((stateName: string) => {
			return mockStateTreeData.get(stateName).translationKey;
		});
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(hostFixture).toBeDefined();
			expect(component).toBeDefined();
			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
			expect(component.routingService).not.toBeNull();
			expect(component.routingService).toBeDefined();
		});
	});

	it("should render the appropriate content", () => {
		hostFixture.detectChanges();

		const pathLinks: DebugElement[] = hostFixture.debugElement.queryAll(By.css("a"));
		expect(pathLinks.length).toBe(4);

		for (let i: number = 0; i < pathLinks.length; i++) {
			expect(pathLinks[i].properties["id"]).toBe(breadcrumbConfig.breadcrumbPaths[i].id);
			expect(pathLinks[i].nativeElement.innerHTML).toBe(breadcrumbConfig.breadcrumbPaths[i].translationKey);
		}
	});

	it("should refresh the view when the config changes", () => {
		const newBreadcrumbConfig: StarkBreadcrumbConfig = {
			breadcrumbPaths: [
				{
					id: "first path",
					state: parentConst,
					stateParams: { paramX: "param X", paramY: "param Y" },
					translationKey: "FIRST_PATH"
				},
				{
					id: "second path",
					state: childConst,
					stateParams: { paramZ: "param Z" },
					translationKey: "SECOND_PATH"
				}
			]
		};

		hostComponent.breadcrumbConfig = newBreadcrumbConfig;
		hostFixture.detectChanges();

		const pathLinks: DebugElement[] = hostFixture.debugElement.queryAll(By.css("a"));
		expect(pathLinks.length).toBe(2);

		for (let i: number = 0; i < pathLinks.length; i++) {
			expect(pathLinks[i].properties["id"]).toBe(newBreadcrumbConfig.breadcrumbPaths[i].id);
			expect(pathLinks[i].nativeElement.innerHTML).toBe(newBreadcrumbConfig.breadcrumbPaths[i].translationKey);
		}
	});

	describe("ngOnInit", () => {
		it("should call getPathsFromStateTree() and add a route transition hook if breadcrumbConfig is not provided", () => {
			spyOn(component, "getPathsFromStateTree");
			component.breadcrumbConfig = undefined;

			component.ngOnInit();

			expect(component.breadcrumbConfig).toBeDefined();
			expect(component.getPathsFromStateTree).toHaveBeenCalledTimes(1);
			expect(component.routingService.addTransitionHook).toHaveBeenCalledTimes(1);
			expect((<Spy>component.routingService.addTransitionHook).calls.mostRecent().args[0]).toBe(
				StarkRoutingTransitionHook.ON_SUCCESS
			);
			expect((<Spy>component.routingService.addTransitionHook).calls.mostRecent().args[1]).toEqual({});
			expect(typeof (<Spy>component.routingService.addTransitionHook).calls.mostRecent().args[2]).toBe("function");
		});

		it("should call getPathsFromStateTree() to refresh the breadcrumbConfig whenever the transition hook is triggered", () => {
			spyOn(component, "getPathsFromStateTree");

			component.ngOnInit();

			expect(component.breadcrumbConfig).toBeDefined();
			expect(component.routingService.addTransitionHook).toHaveBeenCalledTimes(1);
			const transitionHookFn: Function = (<Spy>component.routingService.addTransitionHook).calls.mostRecent().args[2];
			(<Spy>component.getPathsFromStateTree).calls.reset();

			transitionHookFn();
			expect(component.getPathsFromStateTree).toHaveBeenCalledTimes(1);
			expect(component.breadcrumbConfig).toBeDefined();
		});
	});

	describe("ngOnDestroy", () => {
		it("should call the transition hook deregistration function if it is defined", () => {
			component.transitionHookDeregisterFn = mockDeregisterTransitionHookFn;
			spyOn(component, "transitionHookDeregisterFn");

			component.ngOnDestroy();

			expect(component.transitionHookDeregisterFn).toBeDefined();
			expect(component.transitionHookDeregisterFn).toHaveBeenCalledTimes(1);
		});

		it("should NOT call the transition hook deregistration function if it is undefined", () => {
			component.ngOnDestroy();

			expect(component.transitionHookDeregisterFn).toBeUndefined();
		});
	});

	describe("getPathsFromStateTree", () => {
		it("should call the routing service to fetch the params, resolves and data from the state tree", () => {
			component.getPathsFromStateTree();

			expect(component.routingService.getStateTreeParams).toHaveBeenCalledTimes(1);
			expect(component.routingService.getTranslationKeyFromState).toHaveBeenCalledTimes(4);
		});

		it("should call getTranslationKeyFromState to get the translation key for every state contained in the state tree params map", () => {
			component.getPathsFromStateTree();

			expect(component.routingService.getTranslationKeyFromState).toHaveBeenCalledTimes(mockStateTreeParams.size);
		});

		it("should get an ordered array (from child to root ancestor) containing the breadcrumb paths", () => {
			const result: StarkBreadcrumbPath[] = component.getPathsFromStateTree();

			expect(result.length).toBe(mockStateTreeParams.size);

			for (let idx: number = 0; idx < result.length; idx++) {
				expect(result[idx].id).toBe("breadcrumb-path-" + breadcrumbConfig.breadcrumbPaths[idx].state);
				expect(result[idx].state).toBe(breadcrumbConfig.breadcrumbPaths[idx].state);
				expect(result[idx].stateParams).toEqual(breadcrumbConfig.breadcrumbPaths[idx].stateParams);
				expect(result[idx].translationKey).toBe(breadcrumbConfig.breadcrumbPaths[idx].translationKey);
			}
		});
	});

	describe("breadcrumbClickHandler", () => {
		it("should call the routingService to navigate to the state with the corresponding params given in the breadcrumbPath", () => {
			const breadcrumbPath: StarkBreadcrumbPath = breadcrumbConfig.breadcrumbPaths[0];

			component.breadcrumbClickHandler(breadcrumbPath);

			expect(<Spy>component.routingService.navigateTo).toHaveBeenCalledTimes(1);
			expect(<Spy>component.routingService.navigateTo).toHaveBeenCalledWith(breadcrumbPath.state, breadcrumbPath.stateParams);
		});
	});
});
