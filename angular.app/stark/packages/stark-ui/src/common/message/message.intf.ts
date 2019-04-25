import { StarkMessageType } from "./message-type.intf";

/**
 * Simple message with text, type, ...
 */
export interface StarkMessage {
	/**
	 * Id of the message
	 */
	id: string;

	/**
	 * Translation key of the message to be displayed. If no translation found, it is displayed as is
	 */
	key: string;

	/**
	 * An object containing variable values to interpolate translations against
	 */
	interpolateValues?: object;

	/**
	 * Message code
	 */
	code: string;

	/**
	 * Message type
	 */
	type: StarkMessageType;

	/**
	 * Message priority
	 * determines the position of a message in a list, the highest priority is shown first
	 * messages are ordered ascending by priority
	 * a lower value means a higher priority
	 * the default value is 999
	 */
	priority?: number;
}
