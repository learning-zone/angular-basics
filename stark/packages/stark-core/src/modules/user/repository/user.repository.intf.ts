import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { StarkUser } from "../entities";
import { StarkSingleItemResponseWrapper } from "../../http/entities";

/**
 * Name of the User Repository, in case injection is needed
 */
export const starkUserRepositoryName: string = "StarkUserRepository";
/**
 * Injection Token version of the Repository Name
 * @link InjectionToken
 */
export const STARK_USER_REPOSITORY: InjectionToken<StarkUserRepository> = new InjectionToken<StarkUserRepository>(starkUserRepositoryName);

/**
 * Repository responsible for user information.
 */
export interface StarkUserRepository {
	/**
	 * Fetch the user profile from the back-end
	 */
	getUser(): Observable<StarkSingleItemResponseWrapper<StarkUser>>;
}
