/**
 * Stark Action Base interface
 */
export interface StarkActionBase {
	/**
	 * Color of the button
	 */
	buttonColor?: "primary" | "accent" | "warn" | "success" | "alert" | "alt" | "neutral" | "white" | string;

	/**
	 * Path to SVG icon from iconSets to display inside the action button. Ex: "pencil"
	 */
	icon?: string;

	/**
	 * Text to be displayed as label of the action button
	 */
	label?: string;

	/**
	 * The second label if this action has two possible states: activated and deactivated
	 */
	labelActivated?: string;

	/**
	 * In case of two label states, this function will hide one of them or show another
	 */
	labelSwitchFunction?: () => boolean;

	/**
	 * Whether the action button should be enabled for user interaction or not
	 */
	isEnabled?: boolean;

	/**
	 * The second icon if this action has two possible states: activated and deactivated
	 */
	iconActivated?: string;

	/**
	 * In case of two icon states, this function will hide one of them or show another
	 */
	iconSwitchFunction?: () => boolean;

	/**
	 * Custom CSS class to be set to the action button
	 */
	className?: string;
}

/**
 * Definition of an action to be used in an Stark Action Bar
 */
export interface StarkAction extends StarkActionBase {
	/**
	 * The HTML id to be set to the action button
	 */
	id: string;

	/**
	 * Text to be displayed as label of the action button
	 */
	label: string;

	/**
	 * Path to SVG icon from iconSets to display inside the action button. Ex: "pencil"
	 */
	icon: string;

	/**
	 * Function to be fired when action button is clicked
	 */
	actionCall: Function;

	/**
	 * Whether the action button should be enabled for user interaction or not
	 */
	isEnabled: boolean;

	/**
	 * Whether the action button will be visible or not
	 */
	isVisible?: boolean;
}

/**
 * Definition of a action bar's default action to be used in an Stark generic form
 */
export interface StarkDefaultPredefinedAction extends StarkActionBase {}

/**
 * Definition of a action bar's normal action to be used in an Stark generic form
 */
export interface StarkCustomizablePredefinedAction extends StarkActionBase {
	/**
	 * Whether the action button will be visible or not
	 */
	isVisible?: boolean;
}
