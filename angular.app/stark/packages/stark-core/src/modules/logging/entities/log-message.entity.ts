import moment from "moment";
import { serialize, serializeAs } from "cerialize";
import { StarkLogMessageType } from "./log-message-type.entity";
import { StarkLogMessage } from "./log-message.entity.intf";
import { StarkError, StarkErrorImpl } from "../../../common/error";
/**
 * @ignore
 */
export class StarkLogMessageImpl implements StarkLogMessage {
	@serialize
	public timestamp: string;
	@serialize
	public message: string;
	@serializeAs(StarkLogMessageType)
	public type: StarkLogMessageType;
	@serialize
	public correlationId: string;
	@serializeAs(StarkErrorImpl)
	public error?: StarkError;

	public constructor(type: StarkLogMessageType, message: string, correlationId: string, error?: StarkError) {
		this.timestamp = moment().format(); // ISO-8601 format
		this.type = type;
		this.message = message;
		this.error = error;
		this.correlationId = correlationId;

		if (error && !error.correlationId) {
			error.correlationId = correlationId;
		}
	}
}
