import { InjectionToken } from "@angular/core";
import { StarkError } from "../../../common/error";

/**
 * The name of the service in case an injection is needed
 */
export const starkLoggingServiceName: string = "StarkLoggingService";
/**
 * The InjectionToken version of the service name
 */
export const STARK_LOGGING_SERVICE: InjectionToken<StarkLoggingService> = new InjectionToken<StarkLoggingService>(starkLoggingServiceName);

/**
 * Stark Logging Service.
 * Service that integrates logging with the Redux store and also integrates the notion of correlation identifier.
 */
export interface StarkLoggingService {
	/**
	 * Gets the current correlationId. In fact when the logging service is created, it gets a unique correlation Id.
	 * This value can be used while displaying a generic error message.
	 */
	readonly correlationId: string;

	/**
	 * The name that will be used to add the CorrelationId to the http headers
	 */
	readonly correlationIdHttpHeaderName: string;

	/**
	 * Generates a new correlationId. This method can be used at the start of a new action, for instance when the user clicks a button to save data.
	 */
	generateNewCorrelationId(): string;

	/**
	 * Logs debug messages to be used only in development to track issues.
	 * The debug messages are only logged (and afterwards stored in the Redux store) only when the debugLoggingEnabled configuration setting from the StarkApplicationConfig is set to true.
	 * @param args - the arguments to log
	 */
	debug(...args: any[]): void;

	/**
	 * Logs information messages. These messages are also stored in the Redux store.
	 * @param args - the arguments to log
	 */
	info(...args: any[]): void;

	/**
	 * Logs warning messages. Warning messages can, for instance, indicate a non blocking problem in the software. These messages are also stored in the Redux store.
	 * @param args - the arguments to log
	 */
	warn(...args: any[]): void;

	/**
	 * Logs error messages. Error messages should be logged when there was an unexpected error while executing the code.
	 * They are typically logged in the catch method of a try-catch block. These messages are also stored in the Redux store.
	 * @param message - the message to log
	 * @param error - the error to log
	 */
	error(message: string, error?: StarkError | Error): void;
}
