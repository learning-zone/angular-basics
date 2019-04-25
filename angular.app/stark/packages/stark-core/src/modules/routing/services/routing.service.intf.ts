import { Observable } from "rxjs";
import { HookFn, HookMatchCriteria, HookRegOptions, RawParams, StateDeclaration, StateObject, TransitionOptions } from "@uirouter/core";

import { StarkStateConfigWithParams } from "./state-config-with-params.intf";
import { InjectionToken } from "@angular/core";

/**
 * The name of the Stark Routing Service, in case injection is needed
 */
export const starkRoutingServiceName: string = "StarkRoutingService";
/**
 * The injection Token version of the service name
 */
export const STARK_ROUTING_SERVICE: InjectionToken<StarkRoutingService> = new InjectionToken<StarkRoutingService>(starkRoutingServiceName);

/**
 * Stark Routing Service.
 * Service that can be used to interact with the router implementation.
 */
export interface StarkRoutingService {
	/**
	 * Triggers the navigation to the given state
	 *
	 * @param newState - State name to be navigated to
	 * @param params - (Optional) State params object to be passed to the navigated state
	 * @param options - (Optional) Transition options object to change the behavior of the transition.
	 * @returns Observable that will emit on navigation Success/Failure
	 */
	navigateTo(newState: string, params?: RawParams, options?: TransitionOptions): Observable<any>;

	/**
	 * Triggers the navigation to the Home state (defined in appConfig)
	 *
	 * @param params - (Optional) State params object to be passed to the navigated state
	 * @returns Observable that will emit on navigation Success/Failure
	 */
	navigateToHome(params?: RawParams): Observable<any>;

	/**
	 * Triggers the navigation to the previous state (if any).
	 * If there is no previous state, the returned Observable will complete immediately without emitting any value
	 *
	 * @returns Observable that will emit on navigation Success/Failure
	 */
	navigateToPrevious(): Observable<any>;

	/**
	 * Reloads the current state (navigates to the same state)
	 *
	 * @returns Observable that will emit on navigation Success/Failure
	 */
	reload(): Observable<any>;

	/**
	 * Get the name of the current state
	 */
	getCurrentStateName(): string;

	/**
	 * Get the current state instance
	 */
	getCurrentState(): StateObject;

	/**
	 * Get the config of the current state
	 */
	getCurrentStateConfig(): StateDeclaration;

	/**
	 * Get the state config of all states declared
	 *
	 * @returns Array containing all state config objects (as defined in the UI-Router $stateProvider declarations)
	 */
	getStatesConfig(): StateDeclaration[];

	/**
	 * Get the config and the interpolated params of the state matching the given url path.
	 * @param urlPath - The URL path to use in order to find a matching State configuration
	 * @returns Object containing the state config and the interpolated params. Returns undefined in case there is no State matching
	 * the given url path.
	 */
	getStateConfigByUrlPath(urlPath: string): StarkStateConfigWithParams | undefined;

	/**
	 * Get the config of the state matching the given state name
	 *
	 * @param stateName - The state name to use in order to find a matching State configuration
	 * @returns Config object of the state matching the given state name
	 */
	getStateDeclarationByStateName(stateName: string): StateDeclaration | undefined;

	/**
	 * Get the params object passed at runtime to the current state (not the params object defined in the $stateProvider declaration)
	 *
	 * @param includeInherited - (Optional) Whether to return also parent states' inherited params. Default: false
	 * @returns Params object (at runtime) of the current state
	 */
	getCurrentStateParams(includeInherited?: boolean): RawParams;

	/**
	 * Get the params object of every state which is part of the current state tree (from the child state up to the root parent)
	 *
	 * @returns Map with the state names as keys and the params object as values
	 */
	getStateTreeParams(): Map<string, any>;

	/**
	 * Get the resolve object of every state which is part of the current state tree (from the child state up to the root parent)
	 *
	 * @returns Map with the state names as keys and the resolve object as values
	 */
	getStateTreeResolves(): Map<string, any>;

	/**
	 * Get the data object of every state which is part of the current state tree (from the child state up to the root parent)
	 *
	 * @returns Map with the state names as keys and the data object as values
	 */
	getStateTreeData(): Map<string, any>;

	/**
	 * Checks whether the stateName passed as parameter corresponds to the current state.
	 *
	 * @param stateName - Name of the state to compare with the current state
	 * @param stateParams - Optional - If provided, apart from the state name, this state params object
	 * will be compared to the current state params in order to determine if it corresponds to the current state
	 */
	isCurrentUiState(stateName: string, stateParams?: RawParams): boolean;

	/**
	 * Check whether the stateName passed as parameter is included in the current state.
	 * @param stateName -  Partial name, relative name, glob pattern, or state object to be searched for within the current state name.
	 * @param stateParams - Param object, e.g. {sectionId: section.id}, to test against the current active state.
	 */
	isCurrentUiStateIncludedIn(stateName: string, stateParams?: RawParams): boolean;

	/**
	 * Adds a navigation rejection cause to the rejections causes known by the routing service. These known rejection causes
	 * will be treated differently than any other navigation error (a Rejection action will be dispatched instead of a Failure action).
	 * @param rejectionCause - String that will be compared to the rejection reason provided by the router implementation
	 */
	addKnownNavigationRejectionCause(rejectionCause: string): void;

	/**
	 * Register a transition lifecycle hook that will be called by the router implementation.
	 * @param lifecycleHook - Type of lifecycle hook to be registered (an StarkRoutingTransitionHook value).
	 * @param matchCriteria - To determine which transitions the hook should be invoked for.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.hookmatchcriteria.html
	 * @param callback - Hook callback function.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.transitionstatehookfn.html
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.transitionhookfn.html
	 * @param options - Additional options when registering the transition hook.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.hookregoptions.html
	 * @returns A function which deregisters the transition hook
	 */
	addTransitionHook(lifecycleHook: string, matchCriteria: HookMatchCriteria, callback: HookFn, options?: HookRegOptions): Function;

	/**
	 * Get the "translationKey" token from the state in this order:
	 * 1.- From the state's resolves if defined
	 * 2.- From the state's data if defined
	 * 3.- Otherwise, the state name is used
	 * @param stateName - Name of the state to get the translation key from
	 */
	getTranslationKeyFromState(stateName: string): string;
}
