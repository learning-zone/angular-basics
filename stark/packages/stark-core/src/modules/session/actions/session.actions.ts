import { Action } from "@ngrx/store";
import { StarkUser } from "../../user/entities";

/**
 * Actions related to stark session service
 */
export enum StarkSessionActionTypes {
	CHANGE_LANGUAGE = "[StarkSession] Change Language",
	CHANGE_LANGUAGE_SUCCESS = "[StarkSession] Change Language Success",
	CHANGE_LANGUAGE_FAILURE = "[StarkSession] Change Language Failure",
	INITIALIZE_SESSION = "[StarkSession] Initialize Session",
	INITIALIZE_SESSION_SUCCESS = "[StarkSession] Initialize Session Success",
	DESTROY_SESSION = "[StarkSession] Destroy Session",
	DESTROY_SESSION_SUCCESS = "[StarkSession] Destroy Session Success",
	SESSION_TIMEOUT_COUNTDOWN_START = "[StarkSession] Session Timeout Countdown Start",
	SESSION_TIMEOUT_COUNTDOWN_STOP = "[StarkSession] Session Timeout Countdown Stop",
	SESSION_TIMEOUT_COUNTDOWN_FINISH = "[StarkSession] Session Timeout Countdown Finish",
	SESSION_LOGOUT = "[StarkSession] Session Logout",
	USER_ACTIVITY_TRACKING_PAUSE = "[StarkSession] User Activity Tracking Pause",
	USER_ACTIVITY_TRACKING_RESUME = "[StarkSession] User Activity Tracking Resume"
}

/**
 * Triggered when the setCurrentLanguage() method is called, just before changing the current session's language.
 */
export class StarkChangeLanguage implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.CHANGE_LANGUAGE = StarkSessionActionTypes.CHANGE_LANGUAGE;
	/**
	 * Class constructor
	 * @param languageId - The target language to change to.
	 */
	public constructor(public languageId: string) {}
}

/**
 * Triggered when the current session's language has been successfully changed by calling the setCurrentLanguage() method.
 */
export class StarkChangeLanguageSuccess implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.CHANGE_LANGUAGE_SUCCESS = StarkSessionActionTypes.CHANGE_LANGUAGE_SUCCESS;

	/**
	 * Class constructor
	 * @param languageId -  The target language that was successfully changed to.
	 */
	public constructor(public languageId: string) {}
}

/**
 * Triggered when the change of the current session's language failed.
 */
export class StarkChangeLanguageFailure implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.CHANGE_LANGUAGE_FAILURE = StarkSessionActionTypes.CHANGE_LANGUAGE_FAILURE;

	/**
	 * Class constructor
	 * @param error - The error that caused the language change to fail.
	 */
	public constructor(public error: any) {}
}

/**
 * Triggered by the login() method before the process to initialize the session for the given user starts.
 */
export class StarkInitializeSession implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.INITIALIZE_SESSION = StarkSessionActionTypes.INITIALIZE_SESSION;

	/**
	 * Class constructor
	 * @param user - The user whose session will be initialized.
	 */
	public constructor(public user: StarkUser) {}
}

/**
 * 	Triggered when the initialization of the user's session has finished succesfully.
 */
export class StarkInitializeSessionSuccess implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.INITIALIZE_SESSION_SUCCESS = StarkSessionActionTypes.INITIALIZE_SESSION_SUCCESS;
}

/**
 * Triggered before the process to destroy the user's session starts right after the HTTP logout call has been sent.
 * This action is dispatched whenever the user is going to be logged out due to:
 * 1) Manually clicking in the App Logout component
 * 2) Calling the logout() method.
 * 3) Closing the browser tab.
 * 4) Being inactive for a certain period of time reaching the idle timeout defined by the application.
 */
export class StarkDestroySession implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.DESTROY_SESSION = StarkSessionActionTypes.DESTROY_SESSION;
}

/**
 * Triggered when the destruction of the user's session has finished successfully.
 * This action is the last action to be dispatched when the user is logged out (either manually by himself or automatically due to inactivity).
 */
export class StarkDestroySessionSuccess implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.DESTROY_SESSION_SUCCESS = StarkSessionActionTypes.DESTROY_SESSION_SUCCESS;
}

/**
 * Triggered when the countdown to automatically destroy the user's session due to inactivity starts.
 * The countdown is defined in the sessionTimeoutWarningPeriod option in the application configuration. By default is set to 15 seconds.
 */
export class StarkSessionTimeoutCountdownStart implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.SESSION_TIMEOUT_COUNTDOWN_START = StarkSessionActionTypes.SESSION_TIMEOUT_COUNTDOWN_START;

	/**
	 * Class constructor
	 * @param countdown - The countdown until the session will be automatically destroyed.
	 */
	public constructor(public countdown: number) {}
}

/**
 * Triggered when the countdown to automatically destroy the user's session due to inactivity stops.
 * This countdown stops automatically when the user is active again and no longer idle.
 */
export class StarkSessionTimeoutCountdownStop implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.SESSION_TIMEOUT_COUNTDOWN_STOP = StarkSessionActionTypes.SESSION_TIMEOUT_COUNTDOWN_STOP;
}

/**
 * Triggered when the countdown to automatically destroy the user's session has finished. In this case the user will be automatically logged out.
 */
export class StarkSessionTimeoutCountdownFinish implements Action {
	/**
	 * Defines the type of NGRX action to perform.
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.SESSION_TIMEOUT_COUNTDOWN_FINISH =
		StarkSessionActionTypes.SESSION_TIMEOUT_COUNTDOWN_FINISH;
}

/**
 * Triggered when the user is about to be logged out and the HTTP logout call to be sent. This action is called before the process to destroy the user's session starts.
 * This action is dispatched by the logout() method or in case the browser tab was closed.
 * This action is dispatched before the StarkSessionActions.DESTROY_SESSION action.
 */
export class StarkSessionLogout implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.SESSION_LOGOUT = StarkSessionActionTypes.SESSION_LOGOUT;
}

/**
 * 	Triggered by the pauseUserActivityTracking() method when the user activity tracking (automatically done by the Session service) is paused.
 */
export class StarkUserActivityTrackingPause implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.USER_ACTIVITY_TRACKING_PAUSE = StarkSessionActionTypes.USER_ACTIVITY_TRACKING_PAUSE;
}

/**
 * 	Triggered by the resumeUserActivityTracking()  method when the user activity tracking (automatically done by the Session service) is resumed.
 */
export class StarkUserActivityTrackingResume implements Action {
	/**
	 * The type of action
	 * @link StarkSessionActionTypes
	 */
	public readonly type: StarkSessionActionTypes.USER_ACTIVITY_TRACKING_RESUME = StarkSessionActionTypes.USER_ACTIVITY_TRACKING_RESUME;
}

export type StarkSessionActions =
	| StarkChangeLanguage
	| StarkChangeLanguageSuccess
	| StarkChangeLanguageFailure
	| StarkInitializeSession
	| StarkInitializeSessionSuccess
	| StarkDestroySession
	| StarkDestroySessionSuccess
	| StarkSessionTimeoutCountdownStart
	| StarkSessionTimeoutCountdownStop
	| StarkSessionTimeoutCountdownFinish
	| StarkSessionLogout
	| StarkUserActivityTrackingPause
	| StarkUserActivityTrackingResume;
