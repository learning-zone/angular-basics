import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { StarkUser } from "../../user/entities";

/**
 * Name of the Session Service, in case injection is required
 */
export const starkSessionServiceName: string = "StarkSessionService";
/**
 * Injection Token version of the Service Name
 */
export const STARK_SESSION_SERVICE: InjectionToken<StarkSessionService> = new InjectionToken<StarkSessionService>(starkSessionServiceName);

/**
 * Stark Session Service.
 * Service to get/set session settings (language, ...).
 */
export interface StarkSessionService {
	/**
	 * Authentication headers necessary for non-production environments
	 * @returns A Map containing the development authentication headers
	 */
	readonly devAuthenticationHeaders: Map<string, string>;

	/**
	 * Returns the session's current user
	 *
	 * @link StarkUser
	 * @returns Observable that will emit the current user and the latest value whenever it changes
	 */
	getCurrentUser(): Observable<StarkUser | undefined>;

	/**
	 * Gets the session's current language (language Id)
	 *
	 * @returns Observable that will emit the currentLanguage and the latest value whenever it changes
	 */
	getCurrentLanguage(): Observable<string>;

	/**
	 * Sets the current session's language (language Id).
	 * It dispatches a CHANGE_LANGUAGE action to the NGRX-Store
	 *
	 * @param newLanguage - The language Id to be set
	 */
	setCurrentLanguage(newLanguage: string): void;

	/**
	 * Performs the login of the user. Internally, it performs all the necessary actions to initialize the session.
	 *
	 * @link StarkUser
	 * @param user - The user to log in.
	 */
	login(user: StarkUser): void;

	/**
	 * Performs the logout of the user. Internally, it performs all the necessary actions to destroy the session.
	 */
	logout(): void;

	/**
	 * Pauses the tracking of user activity.
	 * It dispatches a USER_ACTIVITY_TRACKING_PAUSE action to the NGRX-Store
	 */
	pauseUserActivityTracking(): void;

	/**
	 * Resumes the tracking of user activity.
	 * It dispatches a USER_ACTIVITY_TRACKING_RESUME action to the NGRX-Store
	 */
	resumeUserActivityTracking(): void;

	/**
	 * Add authentication headers to the session
	 * They are use by the http service to authenticate the user
	 */
	setDevAuthenticationHeaders(devAuthenticationHeaders: Map<string, string>): void;
}
