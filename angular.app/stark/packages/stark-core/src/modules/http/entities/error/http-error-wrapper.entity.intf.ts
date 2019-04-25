import { StarkHttpResponse } from "../response";
import { StarkHttpError } from "./http-error.entity.intf";

/**
 * This class is used by the Stark Http Service in order to wrap the Http error in
 * case of failure of any type of request, either single item or collection request.
 */
export interface StarkHttpErrorWrapper extends StarkHttpResponse {
	/**
	 * Contains all the information about the Http error in case of
	 * failure of any type of request performed by the Stark Http Service.
	 *
	 * @link StarkHttpError
	 */
	httpError: StarkHttpError;
}
