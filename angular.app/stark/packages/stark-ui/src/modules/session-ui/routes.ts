import { Ng2StateDeclaration, RawParams } from "@uirouter/angular";
import { Location } from "@angular/common";
import {
	STARK_ROUTING_SERVICE,
	starkAppExitStateName,
	starkAppInitStateName,
	starkLoginStateName,
	starkLoginStateUrl,
	starkPreloadingStateName,
	starkPreloadingStateUrl,
	StarkRoutingService,
	starkSessionExpiredStateName,
	starkSessionExpiredStateUrl,
	starkSessionLogoutStateName,
	starkSessionLogoutStateUrl,
	StarkStateConfigWithParams
} from "@nationalbankbelgium/stark-core";
import {
	StarkLoginPageComponent,
	StarkPreloadingPageComponent,
	StarkSessionExpiredPageComponent,
	StarkSessionLogoutPageComponent
} from "./pages";
import { of } from "rxjs";

/**
 * Configuration of the route state of the application
 */
export function resolveTargetRoute(
	$location: Location,
	routingService: StarkRoutingService
): Promise<StarkStateConfigWithParams | undefined> {
	// get the path of the current URL in the browser's navigation bar
	const targetUrlPath: string = $location.path();
	const targetRoute: StarkStateConfigWithParams | undefined = routingService.getStateConfigByUrlPath(targetUrlPath);

	// skip any init/exit state
	const initOrExitStateRegex: RegExp = new RegExp("(" + starkAppInitStateName + "|" + starkAppExitStateName + ")");

	if (targetRoute) {
		if ((<Function>targetRoute.state.$$state)().parent) {
			if (!(<Function>targetRoute.state.$$state)().parent.name.match(initOrExitStateRegex)) {
				return of(targetRoute).toPromise();
			} else {
				return of(undefined).toPromise();
			}
		} else {
			return of(targetRoute).toPromise();
		}
	} else {
		return of(undefined).toPromise();
	}
}

/**
 * Check if targetRoute is defined and returns the name of the state OR undefined.
 * @param targetRoute - returned value of resolveTargetRoute method
 */
export function resolveTargetState(targetRoute: StarkStateConfigWithParams): Promise<string | undefined> {
	return of(typeof targetRoute !== "undefined" ? targetRoute.state.name : undefined).toPromise();
}

/**
 * Check if targetRoute is defined and returns the params of the state OR undefined.
 * @param targetRoute - returned value of resolveTargetRoute method
 */
export function resolveTargetStateParams(targetRoute: StarkStateConfigWithParams): Promise<RawParams | undefined> {
	return of(typeof targetRoute !== "undefined" ? targetRoute.paramValues : undefined).toPromise();
}

/**
 * States defined by Session-Ui
 */
/* tslint:disable:no-duplicate-string */
export const SESSION_MODULE_STATES: Ng2StateDeclaration[] = [
	{
		name: starkAppInitStateName, // parent state for any initialization state (used to show/hide the main app component)
		abstract: true,

		resolve: [
			{
				token: "targetRoute",
				deps: [Location, STARK_ROUTING_SERVICE],
				resolveFn: resolveTargetRoute
			},
			{
				token: "targetState",
				deps: ["targetRoute"],
				resolveFn: resolveTargetState
			},
			{
				token: "targetStateParams",
				deps: ["targetRoute"],
				resolveFn: resolveTargetStateParams
			}
		]
	},
	{
		name: starkAppExitStateName, // parent state for any exit state (used to show/hide the main app component)
		abstract: true
	},
	{
		name: starkLoginStateName, // the parent is defined in the state's name (contains a dot)
		url: starkLoginStateUrl,
		views: {
			"initOrExit@": {
				component: StarkLoginPageComponent
			}
		}
	},
	{
		name: starkPreloadingStateName, // the parent is defined in the state's name (contains a dot)
		url: starkPreloadingStateUrl,
		views: {
			"initOrExit@": {
				component: StarkPreloadingPageComponent
			}
		}
	},
	{
		name: starkSessionExpiredStateName, // the parent is defined in the state's name (contains a dot)
		url: starkSessionExpiredStateUrl,
		views: {
			"initOrExit@": {
				component: StarkSessionExpiredPageComponent
			}
		}
	},
	{
		name: starkSessionLogoutStateName, // the parent is defined in the state's name (contains a dot)
		url: starkSessionLogoutStateUrl,
		views: {
			"initOrExit@": {
				component: StarkSessionLogoutPageComponent
			}
		}
	}
];
