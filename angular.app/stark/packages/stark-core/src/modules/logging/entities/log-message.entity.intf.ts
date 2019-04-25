import { StarkLogMessageType } from "./log-message-type.entity";
import { StarkError } from "../../../common/error";

/**
 * Log message for Stark Application
 */
export interface StarkLogMessage {
	/**
	 * the timestamp of the message
	 */
	timestamp: string;
	/**
	 * the log message
	 */
	message: string;
	/**
	 * the type of message (debug, warn, info,...)
	 * @link StarkLogMessageType
	 */
	type: StarkLogMessageType;
	/**
	 * the correlation id of the log message
	 */
	correlationId: string;
	/**
	 * the (optional) error linked to the log message
	 * @link StarkError
	 */
	error?: StarkError;
}
