import { deserialize } from "cerialize";
import { StarkPaginationMetadata } from "./metadata-pagination.entity.intf";
/**
 * @ignore
 */
export class StarkPaginationMetadataImpl implements StarkPaginationMetadata {
	@deserialize
	public offset: number;

	@deserialize
	public limit: number;

	@deserialize
	public previousOffset: number;

	@deserialize
	public nextOffset: number;

	@deserialize
	public currentPage: number;

	@deserialize
	public pageCount: number;

	@deserialize
	public totalCount: number;
}
