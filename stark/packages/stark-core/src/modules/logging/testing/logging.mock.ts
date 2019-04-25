import { StarkLoggingService } from "@nationalbankbelgium/stark-core";

/**
 * Mock class of the StarkLoggingService interface.
 * @link StarkLoggingService
 */
export class MockStarkLoggingService implements StarkLoggingService {
	/**
	 * Gets the current correlationId. In fact when the logging service is created, it gets a unique correlation Id.
	 * This value can be used while displaying a generic error message.
	 */
	public correlationId: string;
	public correlationIdHttpHeaderName: string;

	/**
	 * Logs debug messages to be used only in development to track issues.
	 * The debug messages are only logged (and afterwards stored in the Redux store) only when the debugLoggingEnabled configuration setting from the StarkApplicationConfig is set to true.
	 * @param args - the arguments to log
	 */
	public debug: () => void = jasmine.createSpy("debug");

	/**
	 * Logs information messages. These messages are also stored in the Redux store.
	 * @param args - the arguments to log
	 */
	public info: () => void = jasmine.createSpy("info");

	/**
	 * Logs warning messages. Warning messages can, for instance, indicate a non blocking problem in the software. These messages are also stored in the Redux store.
	 * @param args - the arguments to log
	 */
	public warn: () => void = jasmine.createSpy("warn");

	/**
	 * Logs error messages. Error messages should be logged when there was an unexpected error while executing the code.
	 * They are typically logged in the catch method of a try-catch block. These messages are also stored in the Redux store.
	 * @param message - the message to log
	 * @param error - the arguments to log
	 */
	public error: () => void = jasmine.createSpy("error");

	/**
	 * Method to generate a new correlationId.
	 */
	public generateNewCorrelationId: () => string = jasmine.createSpy("generateNewCorrelationId");

	public constructor(
		correlationId: string = "dummyCorrelationId",
		mockCorrelationIdHeaderName: string = "Correlation-Id-HttpHeaderName"
	) {
		this.correlationId = correlationId;
		this.correlationIdHttpHeaderName = mockCorrelationIdHeaderName;
	}
}
