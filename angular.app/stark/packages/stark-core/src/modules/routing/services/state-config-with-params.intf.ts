import { StateDeclaration, RawParams } from "@uirouter/core";

/**
 * This interface is used by StarkRoutingService in order to return the matching state based on a given URL.
 */
export interface StarkStateConfigWithParams {
	/**
	 * Object containing the UI-Router definition of the route state.
	 */
	state: StateDeclaration;
	/**
	 * 	An object containing the parameters key/value pairs passed at runtime to the current route state.
	 */
	paramValues: RawParams;
}
