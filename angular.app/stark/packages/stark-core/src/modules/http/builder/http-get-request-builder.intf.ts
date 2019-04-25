import { StarkHttpBaseRequestBuilder } from "./http-abstract-base-request-builder.intf";
import { StarkHttpFetchResourceRequestBuilder } from "./http-abstract-fetch-resource-request-builder.intf";
import { StarkResource } from "../entities/resource.entity.intf";

/**
 *  This StarkHttpGetRequestBuilder interface describes the different operations supported by Http request builders for resource-fetching requests
 */
export interface StarkHttpGetRequestBuilder<T extends StarkResource>
	extends StarkHttpBaseRequestBuilder<T>,
		StarkHttpFetchResourceRequestBuilder {}
