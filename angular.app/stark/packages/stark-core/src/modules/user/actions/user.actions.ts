import { Action } from "@ngrx/store";
import { StarkUser } from "../entities";
import { StarkHttpErrorWrapper } from "../../http/entities/error";

/**
 * Enumeration of the User action types
 */
export enum StarkUserActionTypes {
	FETCH_USER_PROFILE = "[StarkUser] Get User",
	FETCH_USER_PROFILE_SUCCESS = "[StarkUser] Fetch User Profile Success",
	FETCH_USER_PROFILE_FAILURE = "[StarkUser] Fetch User Profile Failure",
	GET_ALL_USERS = "[StarkUser] Get All Users",
	GET_ALL_USERS_SUCCESS = "[StarkUser] Get All Users Success",
	GET_ALL_USERS_FAILURE = "[StarkUser] Get All Users Failure"
}
/**
 * Triggered when the fetchUserProfile() method is called, just before performing the HTTP to the REST API.
 */
export class StarkFetchUserProfile implements Action {
	/**
	 * The type of Action
	 * @link StarkUserActionTypes
	 */
	public readonly type: StarkUserActionTypes.FETCH_USER_PROFILE = StarkUserActionTypes.FETCH_USER_PROFILE;
}
/**
 * 	Triggered when the user profile has been successfully fetched from the REST API.
 */
export class StarkFetchUserProfileSuccess implements Action {
	/**
	 * The type of Action
	 * @link StarkUserActionTypes
	 */
	public readonly type: StarkUserActionTypes.FETCH_USER_PROFILE_SUCCESS = StarkUserActionTypes.FETCH_USER_PROFILE_SUCCESS;

	/**
	 * Class constructor
	 * @param user - The user fetched from the REST API
	 */
	public constructor(public user: StarkUser) {}
}
/**
 * 	Triggered when the HTTP call to fetch the user profile failed or when the user profile fetched is not valid.
 */
export class StarkFetchUserProfileFailure implements Action {
	/**
	 * The type of Action
	 * @link StarkUserActionTypes
	 */
	public readonly type: StarkUserActionTypes.FETCH_USER_PROFILE_FAILURE = StarkUserActionTypes.FETCH_USER_PROFILE_FAILURE;

	/**
	 * Class constructor
	 * @param error - The error that caused the user fetching to fail.
	 */
	public constructor(public error: StarkHttpErrorWrapper | Error) {}
}
/**
 * 	Triggered when the getAllUsers() method is called.
 * 	The getAllUsers() method should only be used in development.
 */
export class StarkGetAllUsers implements Action {
	/**
	 * The type of Action
	 * @link StarkUserActionTypes
	 */
	public readonly type: StarkUserActionTypes.GET_ALL_USERS = StarkUserActionTypes.GET_ALL_USERS;
}
/**
 * 	Triggered when the users defined in the mock data are returned.
 */
export class StarkGetAllUsersSuccess implements Action {
	/**
	 * The type of Action
	 * @link StarkUserActionTypes
	 */
	public readonly type: StarkUserActionTypes.GET_ALL_USERS_SUCCESS = StarkUserActionTypes.GET_ALL_USERS_SUCCESS;

	/**
	 * Class constructor
	 * @param users - The users retrieved from the the mock data.
	 */
	public constructor(public users: StarkUser[]) {}
}
/**
 * 	Triggered when there are no users defined in the mock data.
 */
export class StarkGetAllUsersFailure implements Action {
	/**
	 * The type of Action
	 * @link StarkUserActionTypes
	 */
	public readonly type: StarkUserActionTypes.GET_ALL_USERS_FAILURE = StarkUserActionTypes.GET_ALL_USERS_FAILURE;

	/**
	 * Class constructor
	 * @param message - The message describing all the users failure.
	 */
	public constructor(public message: string) {}
}

export type StarkUserActions =
	| StarkFetchUserProfile
	| StarkFetchUserProfileSuccess
	| StarkFetchUserProfileFailure
	| StarkGetAllUsers
	| StarkGetAllUsersSuccess
	| StarkGetAllUsersFailure;
