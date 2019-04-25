import { StarkMessage } from "../../../common/message";

/**
 * Stark Toast Notification Message Interface
 */
export interface StarkToastMessage extends StarkMessage {
	/**
	 * How many milliseconds the message will be displayed before automatically closing
	 * If set to 0, the toast will stay open until closed manually
	 */
	delay?: number;

	/**
	 * If provided, an action button with the label provided will be added in the notification
	 * The return value is "ok" when this button is clicked
	 */
	actionLabel?: string;

	/**
	 * Array containing the css classes to be applied to the action button (if the message contains an action to be displayed)
	 */
	actionClasses?: string[];
}
