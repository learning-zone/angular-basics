import { StarkAction } from "./action.intf";

/**
 * Stark Action Bar Config interface
 */
export interface StarkActionBarConfig {
	/**
	 * Array of actions (StarkAction config objects) to be included in the action bar
	 */
	actions: StarkAction[];

	/**
	 * If false, then action bar will not be present on the page (optional)
	 */
	isPresent?: boolean;
}
