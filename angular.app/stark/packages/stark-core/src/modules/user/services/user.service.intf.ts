import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { StarkUser } from "../entities";

/**
 * Name of the User service, in case injection is needed
 */
export const starkUserServiceName: string = "StarkUserService";
/**
 * InjectionToken version of the service name
 */
export const STARK_USER_SERVICE: InjectionToken<StarkUserService> = new InjectionToken<StarkUserService>(starkUserServiceName);

/**
 * Stark User Service.
 * Service to fetch the user profile from the REST API.
 * In Development, it can also be used to set the user profile manually.
 */
export interface StarkUserService {
	/**
	 * Triggers an HTTP call to the REST API to fetch the user profile
	 *
	 * @link StarkUser
	 * @returns Observable that will emit the user profile fetched from the REST API
	 */
	fetchUserProfile(): Observable<StarkUser>;

	/**
	 * Gets all user profiles defined in the mock data (to be used only in development).
	 * This only makes sense during development, where user profiles and the profile selection screen are necessary
	 *
	 * @link StarkUser
	 * @returns Observable that will emit the user profiles defined in the mock data
	 */
	getAllUsers(): StarkUser[];
}
