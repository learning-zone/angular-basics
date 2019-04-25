import { Action } from "@ngrx/store";
import { StarkLogMessage } from "../entities";

/**
 * Actions related to stark logging service
 */
export enum StarkLoggingActionTypes {
	SET_LOGGING_APPLICATION_ID = "[StarkLogging] Set Logging Application Id",
	LOG_MESSAGE = "[StarkLogging] Log Message",
	FLUSH_LOG = "[StarkLogging] Flush Log"
}

/**
 * Add the Application Name to the logging object
 */
export class StarkSetLoggingApplicationId implements Action {
	/**
	 * The type of action
	 * @link StarkLoggingActionTypes
	 */
	public readonly type: StarkLoggingActionTypes.SET_LOGGING_APPLICATION_ID = StarkLoggingActionTypes.SET_LOGGING_APPLICATION_ID;

	/**
	 * Class constructor
	 * @param applicationId - the id of the application
	 */
	public constructor(public applicationId: string) {}
}

/**
 * Store a debug/info/warning/error message
 */
export class StarkLogMessageAction implements Action {
	/**
	 * The type of action
	 * @link StarkLoggingActionTypes
	 */
	public readonly type: StarkLoggingActionTypes.LOG_MESSAGE = StarkLoggingActionTypes.LOG_MESSAGE;

	/**
	 * Class constructor
	 * @param message - the message to log
	 */
	public constructor(public message: StarkLogMessage) {}
}

/**
 * Persists the log messages in the redux store to the back-end
 */
export class StarkFlushLogMessages implements Action {
	/**
	 * The type of action
	 * @link StarkLoggingActionTypes
	 */
	public readonly type: StarkLoggingActionTypes.FLUSH_LOG = StarkLoggingActionTypes.FLUSH_LOG;

	/**
	 * Class constructor
	 * @param numberOfMessagesToFlush - the number of messages to flush
	 */
	public constructor(public numberOfMessagesToFlush: number) {}
}

export type StarkLoggingActions = StarkSetLoggingApplicationId | StarkLogMessageAction | StarkFlushLogMessages;
