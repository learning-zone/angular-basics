import { ApplicationRef, Inject, Injectable } from "@angular/core";
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarDismiss,
	MatSnackBarRef,
	MatSnackBarVerticalPosition,
	MatSnackBarHorizontalPosition
} from "@angular/material/snack-bar";
import { Observable, Observer } from "rxjs";
import { tap } from "rxjs/operators";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkToastNotificationResult } from "./toast-notification-result.intf";
import { starkToastNotificationServiceName, StarkToastNotificationService } from "./toast-notification.service.intf";
import { STARK_TOAST_NOTIFICATION_OPTIONS, StarkToastNotificationOptions } from "./toast-notification-option.intf";
import { StarkToastNotificationComponent, StarkToastMessage } from "../components";

/**
 * @ignore
 * Service to display different types of messages in a toast (info, warning or error).
 */
@Injectable()
export class StarkToastNotificationServiceImpl implements StarkToastNotificationService {
	/**
	 * Observer linked to the currently displayed toast notification
	 */
	public currentToastResult$?: Observer<StarkToastNotificationResult>;

	/**
	 * Reference of the currently displayed toast notification
	 */
	public currentToast: MatSnackBarRef<StarkToastNotificationComponent>;

	/**
	 * Options for the toast notifications
	 */
	public _toastNotificationOption: StarkToastNotificationOptions;

	/**
	 * Class constructor
	 * @param snackBar - Tha snackBar used to display the toast
	 * @param logger - The logger of the application
	 * @param ref - The angular application reference running on the page
	 * @param defaultToastNotificationOption - The default toast notification option
	 */
	public constructor(
		public snackBar: MatSnackBar,
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		public ref: ApplicationRef,
		@Inject(STARK_TOAST_NOTIFICATION_OPTIONS) public defaultToastNotificationOption?: StarkToastNotificationOptions
	) {
		this._toastNotificationOption = {
			delay: 5000,
			position: "top right",
			actionClasses: [],
			...defaultToastNotificationOption
		};
		this.logger.debug(starkToastNotificationServiceName + " loaded");
	}

	public show(message: StarkToastMessage): Observable<StarkToastNotificationResult> {
		if (this.currentToastResult$ && !this.currentToastResult$.closed) {
			this.currentToastResult$.next(StarkToastNotificationResult.CLOSED_BY_NEW_TOAST);
			this.currentToastResult$.complete();
			this.currentToastResult$ = undefined;
		}
		return new Observable((observer: Observer<StarkToastNotificationResult>) => {
			const config: MatSnackBarConfig = this.getConfig(message);
			this.currentToastResult$ = observer;
			this.currentToast = this.snackBar.openFromComponent(StarkToastNotificationComponent, config);
			this.currentToast
				.afterDismissed()
				.pipe(
					tap((toastDismissedEvent: MatSnackBarDismiss) => {
						// emit on the observer only if it is the current toast
						// otherwise, it means it is a previous toast that is being closed by a new one
						if (this.currentToastResult$ === observer && !observer.closed) {
							if (!toastDismissedEvent.dismissedByAction) {
								observer.next(StarkToastNotificationResult.CLOSED_ON_DELAY_TIMEOUT);
							} else {
								observer.next(StarkToastNotificationResult.ACTION_CLICKED);
							}
							this.ref.tick();
						}
						observer.complete();
					})
				)
				.subscribe();
		});
	}

	public hide(): void {
		if (this.currentToastResult$ && !this.currentToastResult$.closed) {
			this.currentToastResult$.next(StarkToastNotificationResult.HIDDEN);
			this.currentToastResult$.complete();
			this.currentToastResult$ = undefined;
			this.currentToast.dismiss();
		}
	}

	/**
	 * Get the configuration for the MatSnackBar based on the given message
	 * @param message - Message to be shown in the toast containing some configuration (delay,...)
	 * @returns MatSnackBarConfig containing the default configuration merged with the message configuration
	 */
	public getConfig(message: StarkToastMessage): MatSnackBarConfig {
		message.actionClasses = message.actionClasses ? message.actionClasses : this.toastNotificationOption.actionClasses;
		return {
			verticalPosition: <MatSnackBarVerticalPosition>this.toastNotificationOption.position.split(" ")[0],
			horizontalPosition: <MatSnackBarHorizontalPosition>this.toastNotificationOption.position.split(" ")[1],
			duration: typeof message.delay !== "undefined" ? message.delay : this.toastNotificationOption.delay,
			data: message
		};
	}

	/**
	 * Setter for the default configuration
	 * @param newDefaultOptions - New default configuration
	 */
	public set toastNotificationOption(newDefaultOptions: StarkToastNotificationOptions) {
		this._toastNotificationOption = newDefaultOptions;
	}

	/**
	 * Getter for the default configuration
	 * @returns StarkToastNotificationOptions containing the default configurations
	 */
	public get toastNotificationOption(): StarkToastNotificationOptions {
		return this._toastNotificationOption;
	}
}
