import { StarkHttpErrorBase } from "./http-error-base.entity.intf";
/**
 * The StarkHttpErrorDetail class contains all the information about the error(s) that are part of the Http
 * error in case of failure of any type of request performed by the Stark Http Service and it is wrapped in a StarkHttpError.
 */
export interface StarkHttpErrorDetail extends StarkHttpErrorBase {
	/**
	 * Human-readable explanation specific to this occurrence of the problem.
	 */
	detail: string;
	/**
	 * A message key for the detailed explanation specific to this occurrence of the problem.
	 */
	detailKey: string;
	/**
	 * An array of strings, each string being the value of a parameter in a detailKey.
	 */
	detailKeyParameters?: string[];
	/**
	 * An array of strings, each string being the identifier of a field related to this specific error.
	 */
	fields?: string[];
	/**
	 * The Http status code for this specific error.
	 */
	status?: string;
	/**
	 * An integer value (zero-based) corresponding to the position in the source collection
	 */
	index?: number;
}
