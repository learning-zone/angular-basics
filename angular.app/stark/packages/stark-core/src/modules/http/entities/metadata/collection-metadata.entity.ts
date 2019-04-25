import { deserialize, deserializeAs } from "cerialize";

import { StarkCollectionMetadata } from "./collection-metadata.entity.intf";
import { StarkSortItem } from "./metadata-sort-item.entity.intf";
import { StarkSortItemImpl } from "./metadata-sort-item.entity";
import { StarkPaginationMetadata } from "./metadata-pagination.entity.intf";
import { StarkPaginationMetadataImpl } from "./metadata-pagination.entity";
import { StarkHttpErrorDetail, StarkHttpErrorDetailImpl } from "../error";
/**
 * @ignore
 */
export class StarkCollectionMetadataImpl implements StarkCollectionMetadata {
	@deserializeAs(StarkSortItemImpl)
	public sortedBy: StarkSortItem[];

	@deserializeAs(StarkPaginationMetadataImpl)
	public pagination: StarkPaginationMetadata;

	@deserialize
	public etags: { [uuid: string]: string };

	@deserializeAs(StarkHttpErrorDetailImpl)
	public warnings?: StarkHttpErrorDetail[];

	@deserialize
	public custom?: object;
}
