import { StarkHttpErrorDetail } from "../error";

/**
 * Interface that describes the warnings array to be included in an http response.
 */
export interface StarkWarnings {
	/**
	 * Warnings sent by the backend as a result of server-side validations.
	 * Warnings can be included in the resource itself inside a "metadata" object for single item responses or
	 * in the collection "metadata" object for collection responses.
	 * @link https://github.com/NationalBankBelgium/REST-API-Design-Guide/wiki/Pagination-Rules-and-metadata
	 * @link https://github.com/NationalBankBelgium/REST-API-Design-Guide/wiki/Error-handling-Warnings
	 * @link StarkHttpErrorDetail
	 */
	warnings?: StarkHttpErrorDetail[];
}
