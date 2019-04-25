import { Action } from "@ngrx/store";
import { RawParams, TransitionOptions } from "@uirouter/core";

/**
 * Enumeration of Routing NGRX Actions
 */
export enum StarkRoutingActionTypes {
	NAVIGATE = "[StarkRouting] Navigate",
	NAVIGATE_SUCCESS = "[StarkRouting] Navigate Success",
	NAVIGATE_FAILURE = "[StarkRouting] Navigate Failure",
	NAVIGATE_REJECTION = "[StarkRouting] Navigate Rejection",
	NAVIGATION_HISTORY_LIMIT_REACHED = "[StarkRouting] Navigation History Limit Reached",
	RELOAD = "[StarkRouting] Reload",
	RELOAD_SUCCESS = "[StarkRouting] Reload Success",
	RELOAD_FAILURE = "[StarkRouting] Reload Failure"
}

/**
 * Triggered when the navigateTo() method is called, just before starting the navigation.
 */
export class StarkNavigate implements Action {
	/**
	 * The action type
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.NAVIGATE = StarkRoutingActionTypes.NAVIGATE;

	/**
	 * Class constructor
	 * @param currentState - name of the current state before the navigation starts.
	 * @param newState - name of the state to be navigated to.
	 * @param params - state params object to be passed to the navigated state.
	 * @param options - Transition options object to change the behavior of the transition.
	 */
	public constructor(
		public currentState: string,
		public newState: string,
		public params?: RawParams,
		public options?: TransitionOptions
	) {}
}

/**
 * Triggered when a navigation has succeeded and finished.
 * This action is dispatched for any navigation, including those navigations triggered not by the navigateTo() method but by any other
 * mean such as navigateToPrevious(), navigateToHome(), reload(), routing directives for menu links or by direct usage of the router library API.
 */
export class StarkNavigateSuccess implements Action {
	/**
	 * The action type
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.NAVIGATE_SUCCESS = StarkRoutingActionTypes.NAVIGATE_SUCCESS;

	/**
	 * Class constructor
	 * @param previousState - name of the initial state where the navigation was started.
	 * @param currentState - name of the state that was navigated to.
	 * @param params - state params object that was passed to the navigated state.
	 */
	public constructor(public previousState: string, public currentState: string, public params?: RawParams) {}
}

/**
 * Triggered when a navigation failed.
 * This action is dispatched for any navigation, including those navigations triggered not by
 * the navigateTo() method but by any other mean such as menu links or by direct usage of the router library API.
 */
export class StarkNavigateFailure implements Action {
	/**
	 * The action type
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.NAVIGATE_FAILURE = StarkRoutingActionTypes.NAVIGATE_FAILURE;

	/**
	 * Class constructor
	 * @param currentState - name of the current state before the navigation started.
	 * @param newState - name of the state tried to be navigated to.
	 * @param params - state params object passed to the navigated state.
	 * @param error - the error describing the reason of the navigation failure.
	 */
	public constructor(public currentState: string, public newState: string, public params: RawParams, public error: string) {}
}

/**
 * Triggered when a navigation was intentionally rejected with a known rejection reason added via the addKnownNavigationRejectionCause() method.
 * The custom logic to intentionally reject a transition can be normally be injected via a transition Hook by calling the addTransitionHook()  method.
 */
export class StarkNavigateRejection implements Action {
	/**
	 * The action type
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.NAVIGATE_REJECTION = StarkRoutingActionTypes.NAVIGATE_REJECTION;

	/**
	 * Class constructor
	 * @param currentState - name of the current state before the navigation started.
	 * @param newState - name of the state tried to be navigated to.
	 * @param params - state params object passed to the navigated state.
	 * @param reason - the reason describing why the navigation was rejected. This is normally a reason already known by the developer.
	 */
	public constructor(public currentState: string, public newState: string, public params: RawParams, public reason: string) {}
}

/**
 * Triggered when the navigateToPrevious() method is called and there are no more previous states in the history to navigate to.
 * This action is just triggered in case the reload was done by calling the reload() method.
 */
export class StarkNavigationHistoryLimitReached implements Action {
	/**
	 * Defines the type of NGRX action to perform.
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.NAVIGATION_HISTORY_LIMIT_REACHED =
		StarkRoutingActionTypes.NAVIGATION_HISTORY_LIMIT_REACHED;
}

/**
 * Triggered when the reload() method is called, just before starting the state reloading.
 */
export class StarkReload implements Action {
	/**
	 * The action type
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.RELOAD = StarkRoutingActionTypes.RELOAD;

	/**
	 * Class constructor
	 * @param state - name of the state to be reloaded.
	 */
	public constructor(public state: string) {}
}
/**
 * Triggered when a reload succeeded and finished.
 * This action is dispatched for any navigation, including those navigations triggered not by the navigateTo()
 * method but by any other mean such as menu links or by direct usage of the router library API.
 */
export class StarkReloadSuccess implements Action {
	/**
	 * The action type
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.RELOAD_SUCCESS = StarkRoutingActionTypes.RELOAD_SUCCESS;

	/**
	 * Class constructor
	 * @param state -  name of the state that was reloaded.
	 * @param params - state params object passed to the reloaded state.
	 */
	public constructor(public state: string, public params: RawParams) {}
}
/**
 * Triggered when a reload failed.
 * This action is just triggered in case the reload was done by calling the reload() method.
 */
export class StarkReloadFailure implements Action {
	/**
	 * The action type
	 * @link StarkRoutingActionTypes
	 */
	public readonly type: StarkRoutingActionTypes.RELOAD_FAILURE = StarkRoutingActionTypes.RELOAD_FAILURE;

	/**
	 * Class constructor
	 * @param state - name of the state tried to be reloaded.
	 * @param params - state params object passed to the reloaded state.
	 */
	public constructor(public state: string, public params: RawParams) {}
}

export type StarkRoutingActions =
	| StarkNavigate
	| StarkNavigateSuccess
	| StarkNavigateFailure
	| StarkNavigateRejection
	| StarkNavigationHistoryLimitReached
	| StarkReload
	| StarkReloadSuccess
	| StarkReloadFailure;
