import { autoserialize, inheritSerialization } from "cerialize";

import { StarkErrorImpl } from "../../../../common/error";
import { StarkHttpErrorBase } from "./http-error-base.entity.intf";
/**
 * @ignore
 */
@inheritSerialization(StarkErrorImpl)
export class StarkHttpErrorBaseImpl extends StarkErrorImpl implements StarkHttpErrorBase {
	public constructor(error: Error) {
		super(error);
		this.name = "STARK_HTTP_ERROR";
	}

	@autoserialize
	public type: string;
	@autoserialize
	public title: string;
	@autoserialize
	public titleKey: string;
	@autoserialize
	public titleKeyParameters: string[];
	@autoserialize
	public instance: string;
	@autoserialize
	public timestamp: string;
	@autoserialize
	public metadata?: object;
}
