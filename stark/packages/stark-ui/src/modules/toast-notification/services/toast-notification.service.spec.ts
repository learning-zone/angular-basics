/*tslint:disable:completed-docs*/
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { ApplicationRef } from "@angular/core";
import { async, fakeAsync, tick } from "@angular/core/testing";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarDismiss, MatSnackBarRef } from "@angular/material/snack-bar";
import { StarkMessageType } from "../../../common/message";
import { StarkToastMessage, StarkToastNotificationComponent } from "../components";
import { StarkToastNotificationResult } from "./toast-notification-result.intf";
import { StarkToastNotificationServiceImpl } from "./toast-notification.service";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { Observable, Observer } from "rxjs";

describe("Service: StarkToastNotificationService", () => {
	const message: StarkToastMessage = {
		key: "testMessage",
		id: "1",
		code: "abc",
		type: StarkMessageType.ERROR,
		actionLabel: "testAction",
		delay: 4321
	};

	let service: StarkToastNotificationServiceImpl;

	/** This observer is used to mimic Angular Material's MatSnackBar's behavior */
	let observer: Observer<MatSnackBarDismiss>;

	beforeEach(async(() => {
		const mockLogger: MockStarkLoggingService = new MockStarkLoggingService();
		const afterDismissedObs: Observable<MatSnackBarDismiss> = new Observable<MatSnackBarDismiss>((o: Observer<MatSnackBarDismiss>) => {
			observer = o;
		});
		const mockSnackBar: SpyObj<MatSnackBar> = createSpyObj<MatSnackBar>("MatSnackBar", {
			openFromComponent: createSpyObj<MatSnackBarRef<StarkToastNotificationComponent>>("MatSnackBarRef", {
				afterDismissed: afterDismissedObs,
				dismissWithAction: jasmine.createSpy("dismissWithAction"),
				dismiss: jasmine.createSpy("dismiss")
			}),
			dismiss: undefined
		});
		const mockApplicationRef: SpyObj<ApplicationRef> = createSpyObj<ApplicationRef>("ApplicationRef", {
			tick: undefined
		});
		service = new StarkToastNotificationServiceImpl(mockSnackBar, mockLogger, mockApplicationRef, {
			delay: 3000,
			position: "top right",
			actionClasses: []
		});
	}));

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(service.snackBar).not.toBeNull();
			expect(service.snackBar).toBeDefined();
			expect(service.logger).not.toBeNull();
			expect(service.logger).toBeDefined();
		});
	});

	describe("on getConfig", () => {
		it("should return default configuration", () => {
			const conf: MatSnackBarConfig = service.getConfig(message);
			expect(conf).not.toBeNull();
			expect(conf).toBeDefined();

			expect(conf.data).not.toBeNull();
			expect(conf.data).toBeDefined();
			expect(conf.data).toBe(message);

			expect(conf.duration).not.toBeNull();
			expect(conf.duration).toBeDefined();
			expect(conf.duration).toBe(4321);

			expect(conf.horizontalPosition).not.toBeNull();
			expect(conf.horizontalPosition).toBeDefined();
			expect(conf.horizontalPosition).toBe("right");

			expect(conf.verticalPosition).not.toBeNull();
			expect(conf.verticalPosition).toBeDefined();
			expect(conf.verticalPosition).toBe("top");
		});
	});

	describe("on show", () => {
		it("should display the snack bar", fakeAsync(() => {
			let showObs: Observable<StarkToastNotificationResult> = service.show(message);
			expect(showObs).not.toBeNull();
			expect(showObs).toBeDefined();

			expect(service.snackBar.openFromComponent).toHaveBeenCalledTimes(0);

			expect(service.currentToastResult$).not.toBeDefined();

			showObs.subscribe((ret: StarkToastNotificationResult) => {
				expect(ret).toBe(StarkToastNotificationResult.CLOSED_BY_NEW_TOAST);
			});

			tick();

			expect(service.snackBar.openFromComponent).toHaveBeenCalledTimes(1);

			expect(service.currentToastResult$).not.toBeNull();
			expect(service.currentToastResult$).toBeDefined();
			if (service.currentToastResult$) {
				expect(service.currentToastResult$.closed).toBe(false);
			}

			showObs = service.show(message);

			/** Mimic MatSnackBar's behavior */
			observer.next({ dismissedByAction: false });

			expect(showObs).not.toBeNull();
			expect(showObs).toBeDefined();

			expect(service.currentToastResult$).not.toBeDefined();

			expect(service.snackBar.openFromComponent).toHaveBeenCalledTimes(1);

			showObs.subscribe((ret: StarkToastNotificationResult) => {
				expect(ret).toBe(StarkToastNotificationResult.CLOSED_ON_DELAY_TIMEOUT);
			});

			tick();

			expect(service.snackBar.openFromComponent).toHaveBeenCalledTimes(2);

			expect(service.currentToastResult$).not.toBeNull();
			expect(service.currentToastResult$).toBeDefined();
			if (service.currentToastResult$) {
				expect(service.currentToastResult$.closed).toBe(false);
			}

			/** Mimic MatSnackBar's behavior */
			observer.next({ dismissedByAction: false });

			tick();
		}));
	});

	describe("on hide", () => {
		it("should hide the snackbar", fakeAsync(() => {
			service.show(message).subscribe((ret: StarkToastNotificationResult) => {
				expect(ret).toBe(StarkToastNotificationResult.HIDDEN);
			});

			tick();

			if (service.currentToastResult$) {
				expect(service.currentToastResult$.closed).toBe(false);
			}

			service.hide();

			/** Mimic MatSnackBar's behavior */
			observer.next({ dismissedByAction: true });

			tick();

			if (service.currentToastResult$) {
				expect(service.currentToastResult$.closed).toBe(true);
			}
		}));
	});
});
