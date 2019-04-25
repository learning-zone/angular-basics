import { deserialize } from "cerialize";

import { StarkSortItem } from "./metadata-sort-item.entity.intf";
/**
 * @ignore
 */
export class StarkSortItemImpl implements StarkSortItem {
	@deserialize
	public field: string;

	@deserialize
	public order: string;

	public constructor(field: string, order: string) {
		this.field = field;
		this.order = order;
	}

	public get sortValue(): string {
		return this.field + "+" + this.order;
	}
}
