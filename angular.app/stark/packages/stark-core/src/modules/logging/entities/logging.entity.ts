import { StarkLogMessage } from "./log-message.entity.intf";
import { StarkLogging } from "./logging.entity.intf";
import { serialize, serializeAs } from "cerialize";
import { StarkLogMessageImpl } from "./log-message.entity";
/**
 * @ignore
 */
export class StarkLoggingImpl implements StarkLogging {
	@serialize
	public uuid: string;
	@serialize
	public applicationId: string;
	@serializeAs(StarkLogMessageImpl)
	public messages: StarkLogMessage[];
}
