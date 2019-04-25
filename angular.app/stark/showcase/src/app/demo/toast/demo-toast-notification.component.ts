import { Component, Inject } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import {
	STARK_TOAST_NOTIFICATION_SERVICE,
	StarkToastNotificationService,
	StarkToastNotificationResult,
	StarkToastMessage,
	StarkMessageType
} from "@nationalbankbelgium/stark-ui";

@Component({
	selector: "showcase-demo-toast-notification",
	styleUrls: ["./demo-toast-notification.component.scss"],
	templateUrl: "./demo-toast-notification.component.html"
})
/**
 * Component to demo the toast notifications
 */
export class DemoToastComponent {
	/**
	 * Message, or ID of message displayed in the message in the message box (translations applies).
	 */
	public messageText: string = "SHOWCASE.DEMO.TOAST.MESSAGE_INTRO";

	/**
	 * Message, or ID of message displayed in the toast (translations applies).
	 */
	public exampleMessage: string = "SHOWCASE.DEMO.TOAST.MESSAGE_TEXT";

	/**
	 * Memorize the state of the "hide toast" button
	 */
	public hideDisabled: boolean = true;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param toastService - The toast notification service
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_TOAST_NOTIFICATION_SERVICE) public toastService: StarkToastNotificationService
	) {}

	/**
	 * Opens an error toast
	 * @param message - Message displayed in the toast
	 * @param delay - Delay before toast hides (0 to avoid automatic hiding)
	 * @param action - Label of the action button (empty to remove the action button)
	 */
	public openErrorToast(message: string, delay: number = 3000, action?: string): void {
		this.openToast(message, delay, action, StarkMessageType.ERROR);
	}

	/**
	 * Opens an warning toast
	 * @param message - Message displayed in the toast
	 * @param delay - Delay before toast hides (0 to avoid automatic hiding)
	 * @param action - Label of the action button (empty to remove the action button)
	 */
	public openWarningToast(message: string, delay: number = 3000, action?: string): void {
		this.openToast(message, delay, action, StarkMessageType.WARNING);
	}

	/**
	 * Opens a toast
	 * @param message - Message displayed in the toast
	 * @param delay - Delay before toast hides (0 to avoid automatic hiding)
	 * @param action - Label of the action button (empty to remove the action button)
	 * @param type - Type of toast
	 */
	public openToast(message: string, delay?: number, action?: string, type: StarkMessageType = StarkMessageType.INFO): void {
		this.hideDisabled = false;
		const toastData: StarkToastMessage = {
			key: message,
			id: "1",
			code: "abc",
			type: type,
			actionLabel: action,
			interpolateValues: {
				value: "consectetur adipiscing elit. Sed non risus"
			}
		};
		if (typeof delay !== "undefined") {
			toastData.delay = delay;
		}
		this.toastService.show(toastData).subscribe((result: StarkToastNotificationResult) => {
			/** result contains the type of message sent by the toast service */
			switch (result) {
				case StarkToastNotificationResult.CLOSED_ON_DELAY_TIMEOUT:
					this.messageText = "SHOWCASE.DEMO.TOAST.MESSAGE_CLOSED_ON_DELAY_TIMEOUT";
					this.hideDisabled = true;
					break;
				case StarkToastNotificationResult.ACTION_CLICKED:
					this.messageText = "SHOWCASE.DEMO.TOAST.MESSAGE_ACTION_CLICKED";
					this.hideDisabled = true;
					break;
				case StarkToastNotificationResult.HIDDEN:
					this.messageText = "SHOWCASE.DEMO.TOAST.MESSAGE_HIDDEN";
					this.hideDisabled = true;
					break;
				case StarkToastNotificationResult.CLOSED_BY_NEW_TOAST:
					this.messageText = "SHOWCASE.DEMO.TOAST.MESSAGE_CLOSED_BY_NEW_TOAST";
					break;
				default:
					this.messageText = "";
					this.hideDisabled = true;
					throw new Error("Unknown toast notification result!!");
			}
		});
	}

	/**
	 * Hides the currently displayed toast
	 */
	public hideToast(): void {
		this.toastService.hide();
	}
}
