/**
 * This class provides all the transition lifecycle hooks available in the router implementation. See UI-router Transition IHookRegistry
 */
export class StarkRoutingTransitionHook {
	/**
	 * Transition lifecycle hook invoked before a transition even begins.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onbefore
	 */
	public static ON_BEFORE: string = "ON_BEFORE";
	/**
	 * Transition lifecycle hook invoked as a transition starts running.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onstart
	 */
	public static ON_START: string = "ON_START";
	/**
	 * Transition lifecycle hook invoked (during a transition) for a specific state that was previously active will remain active (is not being entered nor exited).
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onretain
	 */
	public static ON_RETAIN: string = "ON_RETAIN";
	/**
	 * Transition lifecycle hook invoked (during a transition) when a specific state is being entered.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onenter
	 */
	public static ON_ENTER: string = "ON_ENTER";
	/**
	 * Transition lifecycle hook invoked just before a transition finishes. This hook is a last chance to cancel or redirect a transition.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onfinish
	 */
	public static ON_FINISH: string = "ON_FINISH";
	/**
	 * Transition lifecycle hook invoked (during a transition) when a specific state is being exited.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onexit
	 */
	public static ON_EXIT: string = "ON_EXIT";
	/**
	 * Transition lifecycle hook invoked after a transition successfully completes.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onsuccess
	 */
	public static ON_SUCCESS: string = "ON_SUCCESS";
	/**
	 * Transition lifecycle hook invoked after a transition has been rejected for any reason.
	 * @link https://ui-router.github.io/ng1/docs/latest/interfaces/transition.ihookregistry.html#onerror
	 */
	public static ON_ERROR: string = "ON_ERROR";
}
