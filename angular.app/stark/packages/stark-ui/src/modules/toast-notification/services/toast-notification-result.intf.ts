/**
 * Possible results returned by Stark Toast Notification.
 *
 * - CLOSED_ON_DELAY_TIMEOUT: the toast was automatically hidden after the specified delay
 * - ACTION_CLICKED: the action button of the toast was clicked by the user
 * - HIDDEN: the toast was hidden programmatically (via the hide() method of the StarkToastNotification service)
 * - CLOSED_BY_NEW_TOAST: the toast was closed because of a new toast being displayed
 */
export enum StarkToastNotificationResult {
	CLOSED_ON_DELAY_TIMEOUT,
	ACTION_CLICKED,
	HIDDEN,
	CLOSED_BY_NEW_TOAST
}
