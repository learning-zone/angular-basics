/*tslint:disable:completed-docs*/
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;
import { Injector } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { Serialize } from "cerialize";

import { StarkFlushLogMessages, StarkLoggingActionTypes, StarkLogMessageAction } from "../../logging/actions";
import { StarkLoggingServiceImpl } from "./logging.service";
import { StarkApplicationConfig, StarkApplicationConfigImpl } from "../../../configuration/entities/application";
import { StarkLogging, StarkLoggingImpl, StarkLogMessage, StarkLogMessageImpl, StarkLogMessageType } from "../../logging/entities";
import { StarkBackend } from "../../http/entities/backend";
import { StarkXSRFService } from "../../xsrf/services";
import { StarkCoreApplicationState } from "../../../common/store";
import { StarkError, StarkErrorImpl } from "../../../common/error";
import { MockStarkXsrfService } from "../../xsrf/testing/xsrf.mock";

// tslint:disable-next-line:no-big-function
describe("Service: StarkLoggingService", () => {
	let appConfig: StarkApplicationConfig;
	let mockStore: SpyObj<Store<StarkCoreApplicationState>>;
	let mockInjectorService: SpyObj<Injector>;
	let mockXSRFService: StarkXSRFService;
	let loggingService: LoggingServiceHelper;
	const loggingBackend: StarkBackend = {
		name: "logging",
		url: "http://localhost:5000",
		authenticationType: 1,
		devAuthenticationEnabled: true,
		devAuthenticationRolePrefix: "",
		loginResource: "logging",
		token: ""
	};
	const dummyObject: object = {
		prop1: "dummy prop",
		prop2: 123,
		method1: () => "dummy method"
	};
	let mockStarkLogging: StarkLogging;
	const loggingFlushPersistSize: number = 11;

	beforeEach(() => {
		mockStore = jasmine.createSpyObj<Store<StarkCoreApplicationState>>("store", ["dispatch", "pipe"]);
		mockInjectorService = jasmine.createSpyObj<Injector>("injector,", ["get"]);
		appConfig = new StarkApplicationConfigImpl();
		appConfig.debugLoggingEnabled = true;
		appConfig.loggingFlushDisabled = false;
		appConfig.loggingFlushApplicationId = "TEST";
		appConfig.loggingFlushPersistSize = loggingFlushPersistSize;
		appConfig.addBackend(loggingBackend);

		mockXSRFService = new MockStarkXsrfService();
		mockStarkLogging = {
			uuid: "dummy uuid",
			applicationId: "dummy app id",
			messages: []
		};
		mockStore.pipe.and.returnValue(of(mockStarkLogging));
		/* tslint:disable-next-line:deprecation */
		(<Spy>mockInjectorService.get).and.returnValue(mockXSRFService);
		loggingService = new LoggingServiceHelper(mockStore, appConfig, mockInjectorService);
		// reset the calls counter because there is a log in the constructor
		mockStore.dispatch.calls.reset();
	});

	describe("on initialization", () => {
		it("should throw an error in case the loggingFlushPersistSize option in the app config contains an invalid value", () => {
			const invalidValues: number[] = [1, 0, -1];

			for (const invalidValue of invalidValues) {
				appConfig.loggingFlushPersistSize = invalidValue;

				expect(() => new LoggingServiceHelper(mockStore, appConfig, mockInjectorService)).toThrowError(/loggingFlushPersistSize/);
			}
		});

		it("should throw an error in case the logging flushing is enabled but the backend config is missing", () => {
			appConfig.loggingFlushDisabled = false;
			appConfig.backends.delete("logging");

			expect(() => new LoggingServiceHelper(mockStore, appConfig, mockInjectorService)).toThrowError(/backend/);
		});

		it("should generate a new correlation id", () => {
			expect(loggingService.correlationId).toBeDefined();
			expect(typeof loggingService.correlationId).toBe("string");
			expect(loggingService.correlationId).not.toBe("");
		});
	});

	describe("debug", () => {
		const dummyDebugMessagePrefix: string = "dummy debug message";
		const dummyDebugMessageSuffix: string = "end of debug message";

		it("should dispatch LOG_MESSAGE action with an StarkLogMessageType of type DEBUG", () => {
			loggingService.debug(dummyDebugMessagePrefix, dummyObject, dummyDebugMessageSuffix);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

			const dispatchedAction: StarkLogMessageAction = mockStore.dispatch.calls.mostRecent().args[0];
			expect(dispatchedAction.type).toBe(StarkLoggingActionTypes.LOG_MESSAGE);

			const { message }: StarkLogMessageAction = dispatchedAction;
			expect(message instanceof StarkLogMessageImpl).toBe(true);
			expect(message.type).toBe(StarkLogMessageType.DEBUG);
			expect(message.message).toContain(dummyDebugMessagePrefix);
			expect(message.message).toContain(JSON.stringify(dummyObject));
			expect(message.message).toContain(dummyDebugMessageSuffix);
			expect(message.timestamp).toBeDefined();
			expect(message.error).toBeUndefined();
		});

		it("should NOT dispatch any action nor log any message if appConfig.debugLoggingEnabled property is FALSE", () => {
			appConfig.debugLoggingEnabled = false;
			loggingService.debug(dummyDebugMessagePrefix);

			expect(mockStore.dispatch).not.toHaveBeenCalled();
		});
	});

	describe("info", () => {
		const dummyInfoMessagePrefix: string = "dummy debug message";
		const dummyInfoMessageSuffix: string = "end of info message";

		it("should dispatch LOG_MESSAGE action with an StarkLogMessageType of type INFO", () => {
			loggingService.info(dummyInfoMessagePrefix, dummyObject, dummyInfoMessageSuffix);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

			const dispatchedAction: StarkLogMessageAction = mockStore.dispatch.calls.mostRecent().args[0];
			expect(dispatchedAction.type).toBe(StarkLoggingActionTypes.LOG_MESSAGE);

			const { message }: StarkLogMessageAction = dispatchedAction;
			expect(message instanceof StarkLogMessageImpl).toBe(true);
			expect(message.type).toBe(StarkLogMessageType.INFO);
			expect(message.message).toContain(dummyInfoMessagePrefix);
			expect(message.message).toContain(JSON.stringify(dummyObject));
			expect(message.message).toContain(dummyInfoMessageSuffix);
			expect(message.timestamp).toBeDefined();
			expect(message.error).toBeUndefined();
		});
	});

	describe("warn", () => {
		const dummyWarnMessagePrefix: string = "dummy warning message";
		const dummyWarnMessageSuffix: string = "end of warning message";

		it("should dispatch LOG_MESSAGE action with an StarkLogMessageType of type WARNING", () => {
			loggingService.warn(dummyWarnMessagePrefix, dummyObject, dummyWarnMessageSuffix);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

			const dispatchedAction: StarkLogMessageAction = mockStore.dispatch.calls.mostRecent().args[0];
			expect(dispatchedAction.type).toBe(StarkLoggingActionTypes.LOG_MESSAGE);

			const { message }: StarkLogMessageAction = dispatchedAction;
			expect(message instanceof StarkLogMessageImpl).toBe(true);
			expect(message.type).toBe(StarkLogMessageType.WARNING);
			expect(message.message).toContain(dummyWarnMessagePrefix);
			expect(message.message).toContain(JSON.stringify(dummyObject));
			expect(message.message).toContain(dummyWarnMessageSuffix);
			expect(message.timestamp).toBeDefined();
			expect(message.error).toBeUndefined();
		});
	});

	describe("error", () => {
		const dummyErrorMessagePrefix: string = "dummy error message";
		const dummyErrorMessageSuffix: string = "end of error message";

		it("should dispatch LOG_MESSAGE action with an StarkLogMessageType of type ERROR", () => {
			const mockErrorMessage: string = "this is the error";
			const errorMsg: string = dummyErrorMessagePrefix + JSON.stringify(dummyObject) + dummyErrorMessageSuffix;
			loggingService.error(errorMsg, new Error(mockErrorMessage));

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

			const dispatchedAction: StarkLogMessageAction = mockStore.dispatch.calls.mostRecent().args[0];
			expect(dispatchedAction.type).toBe(StarkLoggingActionTypes.LOG_MESSAGE);

			const { message }: StarkLogMessageAction = dispatchedAction;
			expect(message instanceof StarkLogMessageImpl).toBe(true);
			expect(message.type).toBe(StarkLogMessageType.ERROR);
			expect(message.message).toContain(dummyErrorMessagePrefix);
			expect(message.message).toContain(JSON.stringify(dummyObject));
			expect(message.message).toContain(dummyErrorMessageSuffix);
			expect(message.timestamp).toBeDefined();
			expect(message.error).toBeDefined();

			const error: StarkError = <StarkError>message.error;
			expect(error).toBeDefined(); // so the test will fail in case it is undefined
			expect(<string>error.message).toContain(mockErrorMessage);
		});

		it("should dispatch LOG_MESSAGE action when no Error object is provided", () => {
			loggingService.error(dummyErrorMessagePrefix); // pass only a message

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

			const dispatchedAction: StarkLogMessageAction = mockStore.dispatch.calls.mostRecent().args[0];
			expect(dispatchedAction.type).toBe(StarkLoggingActionTypes.LOG_MESSAGE);

			const { message }: StarkLogMessageAction = dispatchedAction;
			expect(message instanceof StarkLogMessageImpl).toBe(true);
			expect(message.type).toBe(StarkLogMessageType.ERROR);
			expect(message.message).toContain(dummyErrorMessagePrefix);
			expect(message.timestamp).toBeDefined();
			expect(message.error).toBeDefined();

			const error: StarkError = <StarkError>message.error;
			expect(error).toBeDefined(); // so the test will fail in case it is undefined
			expect(<string>error.name).toBe("STARK_ERROR");
			expect(<string>error.timestamp).toBeDefined();
			expect(<string>error.correlationId).toBeDefined();
			expect(<string>error.stack).toBeDefined();
			expect(<string>error.message).toBe("");
		});
	});

	describe("constructLogMessage", () => {
		describe("Debug / Info / Warning messages ", () => {
			it("should return an StarkLogMessage instance of the type specified and the message containing the arguments", () => {
				let message: StarkLogMessage;
				message = loggingService.constructLogMessageHelper(StarkLogMessageType.INFO, "arg1", dummyObject);

				expect(message.type).toBe(StarkLogMessageType.INFO);
				expect(message.message).toContain("arg1 | " + JSON.stringify(dummyObject));
				expect(message.timestamp).toBeDefined();
				expect(message.error).toBeUndefined();

				message = loggingService.constructLogMessageHelper(StarkLogMessageType.DEBUG, "arg3", dummyObject);

				expect(message.type).toBe(StarkLogMessageType.DEBUG);
				expect(message.message).toContain("arg3 | " + JSON.stringify(dummyObject));
				expect(message.timestamp).toBeDefined();
				expect(message.error).toBeUndefined();

				message = loggingService.constructLogMessageHelper(StarkLogMessageType.WARNING, "arg5", dummyObject);

				expect(message.type).toBe(StarkLogMessageType.WARNING);
				expect(message.message).toContain("arg5 | " + JSON.stringify(dummyObject));
				expect(message.timestamp).toBeDefined();
				expect(message.error).toBeUndefined();
			});
		});

		describe("Error messages ", () => {
			it("should return an StarkLogMessage instance of the type ERROR containing a message and the error string", () => {
				const dummyErrorLogMessage: string = "dummy error message";
				const mockErrorMessage: string = "this is the error";
				const error: StarkError = new StarkErrorImpl(mockErrorMessage);
				const message: StarkLogMessage = loggingService.constructErrorLogMessageHelper(dummyErrorLogMessage, error);

				expect(message.type).toBe(StarkLogMessageType.ERROR);
				expect(message.message).toContain(dummyErrorLogMessage);
				expect(message.timestamp).toBeDefined();
				expect(message.error).toBeDefined();

				const starkError: StarkError = <StarkError>message.error;
				expect(error).toBeDefined(); // so the test will fail in case it is undefined
				expect(<string>starkError.name).toBe("STARK_ERROR");
				expect(<string>starkError.timestamp).toBeDefined();
				expect(<string>starkError.correlationId).toBeDefined();
				expect(<string>starkError.stack).toBeDefined();
				expect(<string>starkError.message).toContain(mockErrorMessage);
			});
		});
	});

	describe("persistLogMessages", () => {
		beforeEach(() => {
			for (let i: number = 1; i <= loggingFlushPersistSize; i++) {
				const message: StarkLogMessage = loggingService.constructLogMessageHelper(
					StarkLogMessageType.INFO,
					"Message " + i,
					dummyObject
				);
				mockStarkLogging.messages = [...mockStarkLogging.messages, message];
			}
		});

		it("should persist messages to the back-end when the persist size exceeds", () => {
			expect(mockStarkLogging.messages.length).toBe(loggingFlushPersistSize);

			const sendRequestSpy: Spy = spyOn(loggingService, "sendRequest").and.callFake(() => of("ok"));
			const data: string = JSON.stringify(Serialize(mockStarkLogging, StarkLoggingImpl));
			loggingService.persistLogMessagesHelper();
			expect(sendRequestSpy).toHaveBeenCalledTimes(1);
			expect(sendRequestSpy.calls.mostRecent().args[0]).toBe(loggingBackend.url + "/" + loggingBackend.loginResource);
			expect(sendRequestSpy.calls.mostRecent().args[1]).toBe(data);
			expect(sendRequestSpy.calls.mostRecent().args[2]).toBe(true);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockStore.dispatch).toHaveBeenCalledWith(new StarkFlushLogMessages(loggingFlushPersistSize));
		});

		it("should fail to persist messages when the back-end fails", () => {
			expect(mockStarkLogging.messages.length).toBe(loggingFlushPersistSize);

			const sendRequestSpy: Spy = spyOn(loggingService, "sendRequest").and.callFake(() => throwError("ko"));
			const errorSpy: Spy = spyOn(loggingService, "error");
			const data: string = JSON.stringify(Serialize(mockStarkLogging, StarkLoggingImpl));
			loggingService.persistLogMessagesHelper();
			expect(sendRequestSpy).toHaveBeenCalledTimes(1);
			expect(sendRequestSpy.calls.mostRecent().args[0]).toBe(loggingBackend.url + "/" + loggingBackend.loginResource);
			expect(sendRequestSpy.calls.mostRecent().args[1]).toBe(data);
			expect(sendRequestSpy.calls.mostRecent().args[2]).toBe(true);
			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(errorSpy.calls.mostRecent().args[0]).toContain("an error occurred while persisting log messages. (retry 1)");
		});
	});
});

class LoggingServiceHelper extends StarkLoggingServiceImpl {
	public constructor(store: Store<StarkCoreApplicationState>, appConfig: StarkApplicationConfig, injector: Injector) {
		super(store, appConfig, injector);
	}

	public constructLogMessageHelper(messageType: StarkLogMessageType, ...args: any[]): StarkLogMessage {
		return this.constructLogMessage(messageType, ...args);
	}

	public constructErrorLogMessageHelper(message: string, error: StarkError): StarkLogMessage {
		return this.constructErrorLogMessage(message, error);
	}

	public persistLogMessagesHelper(isForced: boolean = false): void {
		this.persistLogMessages(isForced);
	}

	// override parent's implementation to prevent actual HTTP request to be sent!
	public sendRequest(): Observable<void> {
		/* dummy function to be mocked */
		return of(undefined);
	}

	// override parent's implementation to prevent logging to the console
	public getConsole(): Function {
		return () => {
			/* noop */
		};
	}
}
