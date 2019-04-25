import { StarkHttpBaseRequestBuilder } from "./http-abstract-base-request-builder.intf";
import { StarkResource } from "../entities/resource.entity.intf";

/**
 *  This StarkHttpUpdateRequestBuilder interface describes the different operations supported by Http request builders for resource-updating requests
 */
export interface StarkHttpUpdateRequestBuilder<T extends StarkResource> extends StarkHttpBaseRequestBuilder<T> {}
