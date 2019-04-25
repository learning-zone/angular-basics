/* tslint:disable:completed-docs*/
import uuid from "uuid";
import { Serialize } from "cerialize";
import { select, Store } from "@ngrx/store";
import { Inject, Injectable, Injector } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { StarkLoggingService, starkLoggingServiceName } from "./logging.service.intf";
import { STARK_APP_CONFIG, StarkApplicationConfig } from "../../../configuration/entities/application";
import { StarkBackend } from "../../http/entities/backend";
import { StarkCoreApplicationState } from "../../../common/store";
import { StarkHttpStatusCodes } from "../../http/enumerators";
import { StarkHttpHeaders } from "../../http/constants";
import { STARK_XSRF_SERVICE, StarkXSRFService } from "../../xsrf/services/xsrf.service.intf";
import { StarkLogging, StarkLoggingImpl, StarkLogMessage, StarkLogMessageImpl, StarkLogMessageType } from "../entities";
import { StarkFlushLogMessages, StarkLogMessageAction } from "../actions";
import { selectStarkLogging } from "../reducers";
import { StarkError, StarkErrorImpl } from "../../../common/error";
import { StarkConfigurationUtil } from "../../../util/configuration.util";
/**
 *  @ignore
 */
const _noop: Function = require("lodash/noop");

const xsrfServiceNotFound: "not provided" = "not provided";

/**
 *  @ignore
 * @ngdoc service
 * @description Basic logging service implementation.
 * Integrates logging with the Redux store
 */
@Injectable()
export class StarkLoggingServiceImpl implements StarkLoggingService {
	private backend: StarkBackend;
	private logUrl: string;
	private logPersistSize: number;
	private isPersisting: boolean;
	private retryCounter: number;
	private consoleDebug: Function;
	private consoleInfo: Function;
	private consoleWarn: Function;
	private consoleError: Function;
	private starkLogging: StarkLogging;
	/** @internal */
	private _xsrfService?: StarkXSRFService | typeof xsrfServiceNotFound;
	/** @internal */
	private _correlationId: string;

	public constructor(
		private store: Store<StarkCoreApplicationState>,
		@Inject(STARK_APP_CONFIG) private appConfig: StarkApplicationConfig,
		private injector: Injector
	) {
		// ensuring that the app config is valid before doing anything
		StarkConfigurationUtil.validateConfig(this.appConfig, ["logging", "http"], starkLoggingServiceName);

		this.isPersisting = false;
		this.retryCounter = 0;
		this.consoleDebug = this.getConsole("debug");
		this.consoleInfo = this.getConsole("info");
		this.consoleWarn = this.getConsole("warn");
		this.consoleError = this.getConsole("error");

		if (!this.appConfig.loggingFlushDisabled) {
			this.backend = this.appConfig.getBackend("logging");
			this.logPersistSize = <number>this.appConfig.loggingFlushPersistSize;
			this.logUrl = this.backend.url + "/" + this.appConfig.loggingFlushResourceName;
			this.generateNewCorrelationId();

			this.store.pipe(select(selectStarkLogging)).subscribe((starkLogging: StarkLogging) => {
				this.starkLogging = starkLogging;
				this.persistLogMessages();
			});

			if (window) {
				window.addEventListener("beforeunload", () => {
					//ev: BeforeUnloadEvent
					// Persist the remaining log entries that are still in the store, before leaving the application.
					// We need to call the REST service synchronously,
					// because the browser has to wait for the REST service to complete.

					const data: string = JSON.stringify(Serialize(this.starkLogging, StarkLoggingImpl));
					this.sendRequest(this.logUrl, data, false);
				});
			}

			this.debug(starkLoggingServiceName + " loaded");
		}
	}

	public debug(...args: any[]): void {
		if (this.appConfig.debugLoggingEnabled) {
			const debugMessage: StarkLogMessage = this.constructLogMessage(StarkLogMessageType.DEBUG, ...args);
			this.store.dispatch(new StarkLogMessageAction(debugMessage));
			// also log the message to the console
			this.consoleDebug(...args);
		}
	}

	public info(...args: any[]): void {
		const infoMessage: StarkLogMessage = this.constructLogMessage(StarkLogMessageType.INFO, ...args);
		this.store.dispatch(new StarkLogMessageAction(infoMessage));
		// also log the message to the console
		this.consoleInfo(...args);
	}

	public warn(...args: any[]): void {
		const warningMessage: StarkLogMessage = this.constructLogMessage(StarkLogMessageType.WARNING, ...args);
		this.store.dispatch(new StarkLogMessageAction(warningMessage));
		// also log the message to the console
		this.consoleWarn(...args);
	}

	public error(message: string, error?: StarkError | Error): void {
		if (!error) {
			error = new StarkErrorImpl();
		}

		if (error instanceof Error) {
			error = new StarkErrorImpl(error);
		}

		const errorMessage: StarkLogMessage = this.constructErrorLogMessage(message, error);
		this.store.dispatch(new StarkLogMessageAction(errorMessage));
		this.consoleError(message, error); // also log the message to the console
	}

	public get correlationId(): string {
		return this._correlationId;
	}

	public get correlationIdHttpHeaderName(): string {
		return this.appConfig.loggingCorrelationIdHttpHeaderName;
	}

	public generateNewCorrelationId(): string {
		this._correlationId = uuid.v4();
		return this._correlationId;
	}

	protected constructLogMessage(messageType: StarkLogMessageType, ...args: any[]): StarkLogMessage {
		const parsedArgs: string[] = args.map((arg: any) => this.parseArg(arg));
		const parsedMessage: string = parsedArgs.join(" | ");
		return new StarkLogMessageImpl(messageType, parsedMessage, this._correlationId, undefined);
	}

	protected constructErrorLogMessage(message: string, error: StarkError): StarkLogMessage {
		return new StarkLogMessageImpl(StarkLogMessageType.ERROR, message, this._correlationId, error);
	}

	protected persistLogMessages(isForced: boolean = false): void {
		const numberOfMessages: number = this.starkLogging.messages.length;

		if (numberOfMessages > 0 && this.starkLogging.messages[numberOfMessages - 1].type === StarkLogMessageType.ERROR) {
			isForced = true;
		}

		if ((numberOfMessages >= this.logPersistSize && !this.isPersisting) || isForced) {
			if (this.retryCounter < 5) {
				this.isPersisting = true;
				const data: string = JSON.stringify(Serialize(this.starkLogging, StarkLoggingImpl));

				this.sendRequest(this.logUrl, data, true).subscribe(
					() => {
						this.isPersisting = false;
						this.retryCounter = 0;
						this.store.dispatch(new StarkFlushLogMessages(numberOfMessages));
					},
					(error: Error) => {
						this.isPersisting = false;
						this.retryCounter++;
						const errorMsg: string =
							starkLoggingServiceName +
							": an error occurred while persisting log messages." +
							" (retry " +
							this.retryCounter +
							")";
						this.error(errorMsg, error);
					}
				);
			} else {
				// still no success after retrying 5 times, will be tried again in the next logged message
			}
		}
	}

	protected sendRequest(url: string, serializedData: string, async: boolean = true): Observable<void> {
		const httpRequest$: Subject<void> = new Subject<void>();

		const emitXhrResult: Function = (xhrRequest: XMLHttpRequest) => {
			if (xhrRequest.readyState === XMLHttpRequest.DONE) {
				if (xhrRequest.status === StarkHttpStatusCodes.HTTP_200_OK || xhrRequest.status === StarkHttpStatusCodes.HTTP_201_CREATED) {
					httpRequest$.next();
					httpRequest$.complete();
				} else {
					httpRequest$.error(xhrRequest.status);
				}
			}
		};

		const xhr: XMLHttpRequest = new XMLHttpRequest();

		if (async) {
			xhr.onreadystatechange = () => {
				emitXhrResult(xhr);
			};
		} else {
			emitXhrResult(xhr);
		}

		// catch any error raised by the browser while opening the connection. for example:
		// Chrome "mixed content" error: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
		// IE "Access is denied" error: https://stackoverflow.com/questions/22098259/access-denied-in-ie-10-and-11-when-ajax-target-is-localhost
		try {
			xhr.open("POST", url, async);
			if (this.xsrfService) {
				this.xsrfService.configureXHR(xhr);
			}
			xhr.setRequestHeader(StarkHttpHeaders.CONTENT_TYPE, "application/json");
			xhr.send(serializedData);
		} catch (e) {
			httpRequest$.error(e);
		}

		return httpRequest$.asObservable();
	}

	private parseArg(arg: any): string {
		if (typeof arg === "string") {
			return arg;
		} else {
			// catch potential "circular reference" error
			try {
				return JSON.stringify(arg);
			} catch (e) {
				return arg; // return the arg "as is" in case of error
			}
		}
	}

	/**
	 * Returns the specified window console method if it exists (debug, warn, info, error, trace),
	 * otherwise returns console.log or empty function
	 * @param type Type of console to be used: info, debug, warn, error, trace
	 */
	protected getConsole(type: string): Function {
		const console: any = window && window.console ? window.console : {};
		const logFn: Function = console[type] || console.log || _noop;

		return (...args: any[]): any => {
			const consoleArgs: any[] = [];
			for (const arg of args) {
				if (arg instanceof Error) {
					consoleArgs.push(this.parseArg(arg));
				} else {
					consoleArgs.push(arg);
				}
			}
			return logFn.apply(console, consoleArgs);
		};
	}

	/**
	 * Gets the StarkXSRFService from the Injector (this is tried only once).
	 * It returns 'undefined' if the service is not found (the XSRF module is not imported in the app).
	 */
	private get xsrfService(): StarkXSRFService | undefined {
		if (typeof this._xsrfService === "undefined") {
			// The StarkXSRFService should be resolved at runtime to prevent the Angular DI circular dependency errors
			try {
				this._xsrfService = this.injector.get<StarkXSRFService>(STARK_XSRF_SERVICE);
				return this._xsrfService;
			} catch (exception) {
				this._xsrfService = xsrfServiceNotFound;
				return undefined;
			}
		}

		return this._xsrfService !== xsrfServiceNotFound ? this._xsrfService : undefined;
	}
}
