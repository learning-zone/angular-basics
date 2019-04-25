import { StarkRoutingService, StarkStateConfigWithParams } from "@nationalbankbelgium/stark-core";
import { Observable } from "rxjs";
import { HookFn, HookMatchCriteria, HookRegOptions, RawParams, StateDeclaration, StateObject, TransitionOptions } from "@uirouter/core";
/**
 * @ignore
 */
export class MockStarkRoutingService implements StarkRoutingService {
	public navigateTo: (newState: string, params?: RawParams, options?: TransitionOptions) => Observable<any> = jasmine.createSpy(
		"navigateTo"
	);
	public navigateToHome: (params?: RawParams) => Observable<any> = jasmine.createSpy("navigateToHome");
	public navigateToPrevious: () => Observable<any> = jasmine.createSpy("navigateToPrevious");
	public reload: () => Observable<any> = jasmine.createSpy("reload");
	public getCurrentStateName: () => string = jasmine.createSpy("getCurrentStateName");
	public getCurrentState: () => StateObject = jasmine.createSpy("getCurrentState");
	public getCurrentStateConfig: () => StateDeclaration = jasmine.createSpy("getCurrentStateConfig");
	public getStatesConfig: () => StateDeclaration[] = jasmine.createSpy("getStatesConfig");
	public getStateConfigByUrlPath: (urlPath: string) => StarkStateConfigWithParams | undefined = jasmine.createSpy(
		"getStateConfigByUrlPath"
	);
	public getStateDeclarationByStateName: (stateName: string) => StateDeclaration | undefined = jasmine.createSpy(
		"getStateDeclarationByStateName"
	);
	public getCurrentStateParams: (includeInherited?: boolean) => RawParams = jasmine.createSpy("getCurrentStateParams");
	public getStateTreeParams: () => Map<string, any> = jasmine.createSpy("getStateTreeParams");
	public getStateTreeResolves: () => Map<string, any> = jasmine.createSpy("getStateTreeResolves");
	public getStateTreeData: () => Map<string, any> = jasmine.createSpy("getStateTreeData");
	public isCurrentUiState: (stateName: string, stateParams?: RawParams) => boolean = jasmine.createSpy("isCurrentUiState");
	public isCurrentUiStateIncludedIn: (stateName: string, stateParams?: RawParams) => boolean = jasmine.createSpy("includesState");
	public addKnownNavigationRejectionCause: (rejectionCause: string) => void = jasmine.createSpy("addKnownNavigationRejectionCause");
	public addTransitionHook: (
		lifecycleHook: string,
		matchCriteria: HookMatchCriteria,
		callback: HookFn,
		options?: HookRegOptions
	) => Function = jasmine.createSpy("addTransitionHook");
	public getTranslationKeyFromState: (stateName: string) => string = jasmine.createSpy("getTranslationKeyFromState");

	public constructor() {
		// empty constructor
	}
}
