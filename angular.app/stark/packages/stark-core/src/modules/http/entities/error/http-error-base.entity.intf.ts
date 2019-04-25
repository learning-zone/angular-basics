import { StarkError } from "../../../../common/error";

/**
 * The StarkHttpErrorBase class contains all the basic information about the error(s) that are part of the Http
 * error in case of failure of any type of request performed by the Stark Http Service.
 */
export interface StarkHttpErrorBase extends StarkError {
	/**
	 * The absolute URI that identifies the problem type.
	 */
	type: string;
	/**
	 * Short human-readable summary of the problem type.
	 */
	title: string;
	/**
	 * A message key for the summary of the problem type.
	 */
	titleKey: string;
	/**
	 * An array of strings, each string being the value of a parameter in the titleKey
	 */
	titleKeyParameters?: string[];
	/**
	 * Identifies the specific occurrence of the problem.
	 */
	instance?: string;
	/**
	 * Provides a timestamp for the error message.
	 */
	timestamp?: string;
	/**
	 * Provides additional error metadata.
	 */
	metadata?: object;
}
