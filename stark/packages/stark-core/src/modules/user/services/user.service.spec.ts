/*tslint:disable:completed-docs*/
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { Store } from "@ngrx/store";
import { Observer, of, throwError } from "rxjs";
import { Deserialize } from "cerialize";

import {
	StarkFetchUserProfile,
	StarkFetchUserProfileFailure,
	StarkFetchUserProfileSuccess,
	StarkGetAllUsers,
	StarkGetAllUsersFailure,
	StarkGetAllUsersSuccess,
	StarkUserActionTypes
} from "../actions";
import { StarkUser } from "../entities";
import { StarkUserService } from "./user.service.intf";
import { StarkUserServiceImpl } from "./user.service";
import { StarkLoggingService } from "../../logging/services/logging.service.intf";
import { MockStarkLoggingService } from "../../logging/testing";
import { StarkUserRepository } from "../repository";
import {
	StarkHttpError,
	StarkHttpErrorImpl,
	StarkHttpErrorWrapper,
	StarkHttpErrorWrapperImpl,
	StarkSingleItemResponseWrapper,
	StarkSingleItemResponseWrapperImpl
} from "../../http/entities";
import { StarkHttpStatusCodes } from "../../http/enumerators";
import { HttpErrorResponse } from "@angular/common/http";
import { StarkMockData } from "../../../configuration/entities/mock-data";
import { StarkCoreApplicationState } from "../../../common/store";

interface StarkUserWithCustomData extends Pick<StarkUser, "uuid" | "username" | "roles"> {
	[prop: string]: any;
}

// tslint:disable-next-line:no-big-function
describe("Service: StarkUserService", () => {
	let userService: StarkUserService;
	let mockStore: SpyObj<Store<StarkCoreApplicationState>>;
	let mockUserRepository: SpyObj<StarkUserRepository>;
	let mockLogger: StarkLoggingService;

	let mockData: StarkMockData;
	let mockUsers: StarkUserWithCustomData[];
	let mockUserCustomData: { [prop: string]: any };
	let mockUserCustomData2: { [prop: string]: any };
	let mockUserInstances: StarkUser[];
	let mockObserver: SpyObj<Observer<any>>;

	beforeEach(() => {
		mockLogger = new MockStarkLoggingService();
		mockUserRepository = jasmine.createSpyObj<StarkUserRepository>("starkUserRepository", ["getUser"]);
		mockStore = jasmine.createSpyObj<Store<StarkCoreApplicationState>>("store", ["dispatch"]);
		mockData = { profiles: [] };
		mockUserCustomData = {
			prop1: 1234,
			prop2: "whatever",
			prop3: "2016-03-18T18:25:43.511Z",
			prop4: ["some value", "false", "null", "", true, false, 0, { name: "Christopher", surname: "Cortes" }]
		};
		mockUserCustomData2 = {
			...mockUserCustomData,
			prop4: ["some value", "false", "null", "", true, false, 0, { name: "Alexis", surname: "Georges" }]
		};
		mockUsers = [
			{
				uuid: "1",
				username: "ccortes",
				roles: [],
				details: {
					firstName: "Christopher",
					lastName: "Cortes",
					language: "EN",
					mail: "ccortes@nbb.be",
					referenceNumber: "1234"
				},
				custom: mockUserCustomData
			},
			{
				uuid: "2",
				username: "ageorges",
				roles: [],
				details: {
					firstName: "Alexis",
					lastName: "Georges",
					language: "FR",
					mail: "ageorges@nbb.be",
					referenceNumber: "4321"
				},
				custom: mockUserCustomData2
			}
		];
		mockUserInstances = [Deserialize(mockUsers[0], StarkUser), Deserialize(mockUsers[1], StarkUser)];
		mockObserver = createSpyObj<Observer<any>>("observerSpy", ["next", "error", "complete"]);

		userService = new StarkUserServiceImpl(mockLogger, mockUserRepository, mockData, mockStore);
	});

	describe("getAllUsers", () => {
		it("should return the users from the mock data and then dispatch the success action", () => {
			userService["userProfiles"] = mockUserInstances;

			const result: StarkUser[] = userService.getAllUsers();

			expect(result.length).toBe(2);

			result.forEach((userInstance: StarkUser, index: number) => {
				expect(userInstance instanceof StarkUser).toBe(true);
				expect(userInstance.uuid).toBe(mockUsers[index].uuid);
				expect(userInstance.firstName).toBe(mockUsers[index].details.firstName);
				expect(userInstance.lastName).toBe(mockUsers[index].details.lastName);
				expect(userInstance.language).toBe(mockUsers[index].details.language);
				expect(userInstance.email).toBe(mockUsers[index].details.mail);
				expect(userInstance.referenceNumber).toBe(mockUsers[index].details.referenceNumber);
				expect(userInstance.custom).toEqual(mockUsers[index].custom);
			});

			expect(mockStore.dispatch).toHaveBeenCalledTimes(2);

			expect(mockStore.dispatch.calls.argsFor(0)[0]).toEqual(new StarkGetAllUsers());
			expect(mockStore.dispatch.calls.argsFor(1)[0]).toEqual(new StarkGetAllUsersSuccess(result));
		});

		it("should dispatch the failure action in case the mock data has no users defined", () => {
			userService["userProfiles"] = [];

			const result: StarkUser[] = userService.getAllUsers();

			expect(result).toEqual([]);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(2);

			expect(mockStore.dispatch.calls.argsFor(0)[0]).toEqual(new StarkGetAllUsers());
			expect((<StarkGetAllUsersFailure>mockStore.dispatch.calls.argsFor(1)[0]).type).toBe(StarkUserActionTypes.GET_ALL_USERS_FAILURE);
			expect((<StarkGetAllUsersFailure>mockStore.dispatch.calls.argsFor(1)[0]).message).toContain("No user profiles found");
		});

		it("should throw an error in case any of the users defined in the mock data is not valid", () => {
			mockUserInstances[0].username = <any>undefined;
			mockUserInstances[1].firstName = <any>undefined;

			userService["userProfiles"] = mockUserInstances;

			expect(() => userService.getAllUsers()).toThrowError(/invalid/);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);

			expect(mockStore.dispatch.calls.argsFor(0)[0]).toEqual(new StarkGetAllUsers());
		});
	});

	describe("fetchUserProfile", () => {
		it("on SUCCESS, should call userRepository and then dispatch the success action and return the user in an observable", () => {
			const mockResponseWrapper: StarkSingleItemResponseWrapper<StarkUser> = new StarkSingleItemResponseWrapperImpl(
				StarkHttpStatusCodes.HTTP_200_OK,
				new Map<string, string>(),
				mockUserInstances[0]
			);

			mockUserRepository.getUser.and.returnValue(of(mockResponseWrapper));

			userService.fetchUserProfile().subscribe(mockObserver);

			expect(mockObserver.next).toHaveBeenCalledTimes(1);
			const result: StarkUser = mockObserver.next.calls.argsFor(0)[0];
			expect(result).toBeDefined();
			expect(result instanceof StarkUser).toBe(true);
			expect(result.uuid).toBe(mockUsers[0].uuid);
			expect(result.firstName).toBe(mockUsers[0].details.firstName);
			expect(result.lastName).toBe(mockUsers[0].details.lastName);
			expect(result.language).toBe(mockUsers[0].details.language);
			expect(result.email).toBe(mockUsers[0].details.mail);
			expect(result.referenceNumber).toBe(mockUsers[0].details.referenceNumber);
			expect(result.custom).toEqual(mockUsers[0].custom);

			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).toHaveBeenCalledTimes(1); // it completes because of the Store mock observable

			expect(mockUserRepository.getUser).toHaveBeenCalledTimes(1);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(2);

			expect(mockStore.dispatch.calls.argsFor(0)[0]).toEqual(new StarkFetchUserProfile());
			expect(mockStore.dispatch.calls.argsFor(1)[0]).toEqual(new StarkFetchUserProfileSuccess(mockUserInstances[0]));
		});

		it("on SUCCESS, should throw an error in case the user profile fetched is not valid and then dispatch the failure action", () => {
			mockUserInstances[0].username = <any>undefined;

			const mockResponseWrapper: StarkSingleItemResponseWrapper<StarkUser> = new StarkSingleItemResponseWrapperImpl(
				StarkHttpStatusCodes.HTTP_200_OK,
				new Map<string, string>(),
				mockUserInstances[0]
			);

			mockUserRepository.getUser.and.returnValue(of(mockResponseWrapper));

			userService.fetchUserProfile().subscribe(mockObserver);

			expect(mockObserver.next).not.toHaveBeenCalled();
			expect(mockObserver.error).toHaveBeenCalledTimes(1);
			expect(mockObserver.complete).not.toHaveBeenCalled();

			const error: Error = mockObserver.error.calls.argsFor(0)[0];
			expect(error.message).toContain("invalid user profile");

			expect(mockUserRepository.getUser).toHaveBeenCalledTimes(1);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(2);

			expect(mockStore.dispatch.calls.argsFor(0)[0]).toEqual(new StarkFetchUserProfile());
			expect((<StarkFetchUserProfileFailure>mockStore.dispatch.calls.argsFor(1)[0]).type).toBe(
				StarkUserActionTypes.FETCH_USER_PROFILE_FAILURE
			);
			expect((<Error>(<StarkFetchUserProfileFailure>mockStore.dispatch.calls.argsFor(1)[0]).error).message).toContain(
				"invalid user profile"
			);
		});

		it("on FAILURE, should call userRepository and then dispatch the failure action", () => {
			const dummyError: Error = new Error("dummy error message");

			const mockHttpError: StarkHttpError = new StarkHttpErrorImpl(dummyError);
			mockHttpError.type = "some type";
			mockHttpError.title = "a title";
			mockHttpError.titleKey = "a key";
			mockHttpError.errors = [];

			const mockHttpErrorResponse: HttpErrorResponse = new HttpErrorResponse({
				error: mockHttpError,
				status: StarkHttpStatusCodes.HTTP_404_NOT_FOUND
			});

			const mockErrorResponseWrapper: StarkHttpErrorWrapper = new StarkHttpErrorWrapperImpl(
				mockHttpErrorResponse,
				new Map<string, string>(),
				dummyError
			);

			mockUserRepository.getUser.and.returnValue(throwError(mockErrorResponseWrapper));

			userService.fetchUserProfile().subscribe(mockObserver);

			expect(mockObserver.next).not.toHaveBeenCalled();
			expect(mockObserver.error).toHaveBeenCalledTimes(1);
			expect(mockObserver.complete).not.toHaveBeenCalled();

			const errorWrapper: StarkHttpErrorWrapper = mockObserver.error.calls.argsFor(0)[0];

			expect(errorWrapper).toBeDefined();
			expect(errorWrapper.httpError.type).toBe(mockHttpError.type);
			expect(errorWrapper.httpError.title).toBe(mockHttpError.title);
			expect(errorWrapper.httpError.titleKey).toBe(mockHttpError.titleKey);
			expect(errorWrapper.httpError.errors.length).toBe(mockHttpError.errors.length);
			expect(mockUserRepository.getUser).toHaveBeenCalledTimes(1);

			expect(mockStore.dispatch).toHaveBeenCalledTimes(2);

			expect(mockStore.dispatch.calls.argsFor(0)[0]).toEqual(new StarkFetchUserProfile());
			expect(mockStore.dispatch.calls.argsFor(1)[0]).toEqual(new StarkFetchUserProfileFailure(mockErrorResponseWrapper));
		});
	});
});
