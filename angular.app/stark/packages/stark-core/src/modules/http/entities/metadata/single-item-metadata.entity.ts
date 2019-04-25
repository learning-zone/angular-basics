import { deserializeAs } from "cerialize";
import { StarkSingleItemMetadata } from "./single-item-metadata.entity.intf";
import { StarkHttpErrorDetail, StarkHttpErrorDetailImpl } from "../error";

/**
 * @ignore
 */
export class StarkSingleItemMetadataImpl implements StarkSingleItemMetadata {
	@deserializeAs(StarkHttpErrorDetailImpl)
	public warnings?: StarkHttpErrorDetail[];
}
