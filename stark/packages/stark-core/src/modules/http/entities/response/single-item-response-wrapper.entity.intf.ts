import { StarkResponseWrapper } from "./response-wrapper.entity.intf";
import { StarkResource } from "../resource.entity.intf";

/**
 * This class is used by the Stark Http Service in order to wrap the Http response from all requests aimed to return a single item.
 */
export interface StarkSingleItemResponseWrapper<T extends StarkResource> extends StarkResponseWrapper<T> {}
