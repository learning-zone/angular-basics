/**
 * Represents an error.
 */
export interface StarkError {
	/**
	 * The message describing the error
	 */
	message?: string;

	/**
	 * The name of this error.
	 */
	name?: string;
	/**
	 * The stack trace
	 */
	stack?: string;
	/**
	 * The correlation id (useful for tracking purposes)
	 */
	correlationId?: string;
	/**
	 * The timestamp
	 */
	timestamp?: string;
}
