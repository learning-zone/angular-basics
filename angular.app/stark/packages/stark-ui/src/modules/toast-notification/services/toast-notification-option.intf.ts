import { InjectionToken } from "@angular/core";

/**
 * Type defining the position of the MatSnackBar on the screen.
 */
export type StarkToastNotificationPosition = "bottom left" | "bottom right" | "top left" | "top right";

/**
 * Injection token of the toast notification service.
 */
export const STARK_TOAST_NOTIFICATION_OPTIONS: InjectionToken<StarkToastNotificationOptions> = new InjectionToken<
	StarkToastNotificationOptions
>("StarkToastNotificationOptions");

/**
 * Options related to the Stark Toast Notification component
 */
export interface StarkToastNotificationOptions {
	/**
	 * How many milliseconds the toast will be displayed before automatically closing
	 * If set to 0, the toast will stay open until closed manually
	 */
	delay: number;

	/**
	 * The position where the toast will be shown: any combination of "bottom"/"left"/"center"/"start"/"end" and "top"/"right"
	 */
	position: StarkToastNotificationPosition;

	/**
	 * Array containing the css classes to be applied to the action button (if the message contains an action to be displayed)
	 */
	actionClasses: string[];
}
