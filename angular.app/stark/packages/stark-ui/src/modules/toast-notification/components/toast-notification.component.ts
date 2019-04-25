import { Component, ElementRef, Inject, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from "@angular/material/snack-bar";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkMessageType } from "../../../common/message";
import { StarkToastMessage } from "./toast-message.intf";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-toast-notification";

/**
 * Component display stark's toast notification (based on Angular Material's MatSnackBar) with custom html
 */
@Component({
	selector: "stark-toast-notification",
	templateUrl: "./toast-notification.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkToastNotificationComponent extends AbstractStarkUiComponent implements OnInit {
	/**
	 * The message data linked to the toast notification.
	 */
	public message: StarkToastMessage;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param snackBar - Tha snackBar used to display the toast
	 * @param data - the data linked to the toast notification
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		public snackBar: MatSnackBar,
		@Inject(MAT_SNACK_BAR_DATA) public data: StarkToastMessage,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
		this.message = data;
		this.logger.debug(componentName + ": data received : %o", this.message);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");
	}

	/**
	 * Closes the toast
	 */
	public closeToast(): void {
		// get the reference to the current open toast (this one) from the MatSnackBar service and dismiss it
		if (this.snackBar._openedSnackBarRef) {
			this.snackBar._openedSnackBarRef.dismissWithAction();
		}
	}

	/**
	 * Generate the css class of the toast notification based on its type
	 * @returns a string containing the css class of the toast notification
	 */
	public getMessageTypeClass(): string {
		switch (this.message.type) {
			case StarkMessageType.WARNING:
				return "stark-toast-message-warning";
			case StarkMessageType.ERROR:
				return "stark-toast-message-error";
			case StarkMessageType.INFO:
				return "stark-toast-message-info";
			default:
				this.logger.error(componentName + ": unknown message type.");
				return "";
		}
	}
}
