import { autoserialize, inheritSerialization } from "cerialize";
import { StarkHttpErrorBaseImpl } from "./http-error-base.entity";
import { StarkHttpErrorDetail } from "./http-error-detail.entity.intf";
/**
 * @ignore
 */
@inheritSerialization(StarkHttpErrorBaseImpl)
export class StarkHttpErrorDetailImpl extends StarkHttpErrorBaseImpl implements StarkHttpErrorDetail {
	@autoserialize
	public detail: string;

	@autoserialize
	public detailKey: string;

	@autoserialize
	public detailKeyParameters: string[];

	@autoserialize
	public fields: string[];

	@autoserialize
	public status: string;

	@autoserialize
	public index: number;
}
