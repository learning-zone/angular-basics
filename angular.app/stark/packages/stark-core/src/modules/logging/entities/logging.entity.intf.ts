import { StarkLogMessage } from "./log-message.entity.intf";

/**
 * The StarkLogging entity to be kept in the application state
 */
export interface StarkLogging {
	/**
	 * the uuid of the entity
	 */
	uuid: string;
	/**
	 * the id of the application
	 */
	applicationId: string;
	/**
	 * the messages being logged
	 * @link StarkLogMessage
	 */
	messages: StarkLogMessage[];
}
