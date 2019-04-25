import { StarkHttpEchoType } from "../constants";
import { StarkHttpBaseRequestBuilder } from "./http-abstract-base-request-builder.intf";
import { StarkResource } from "../entities/resource.entity.intf";

/**
 * This StarkHttpCreateRequestBuilder interface describes the different operations supported by Http request builders for resource-creating requests
 */
export interface StarkHttpCreateRequestBuilder<T extends StarkResource> extends StarkHttpBaseRequestBuilder<T> {
	/**
	 * Adds an "echo" query parameter to the request
	 *
	 * @link StarkHttpEchoType
	 * @param echo - Echo parameter to specify whether the response should contain a response body
	 * @returns The current builder
	 */
	echo(echo: StarkHttpEchoType): this;
}
