import { StarkHttpErrorBase } from "./http-error-base.entity.intf";
import { StarkHttpErrorDetail } from "./http-error-detail.entity.intf";

/**
 * The StarkHttpError class contains all the information about the Http error in case of failure of
 * any type of request performed by the Stark Http Service and it is wrapped in a StarkHttpErrorWrapper.
 */
export interface StarkHttpError extends StarkHttpErrorBase {
	/**
	 * All information about the Http error.
	 * @link StarkHttpErrorDetail
	 */
	errors: StarkHttpErrorDetail[];
}
