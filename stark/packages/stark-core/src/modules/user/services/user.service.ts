/* tslint:disable:completed-docs*/
import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { validateSync } from "class-validator";
import { Deserialize } from "cerialize";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { StarkHttpErrorWrapper, StarkSingleItemResponseWrapper } from "../../http/entities";
import { StarkUser } from "../../user/entities";
import {
	StarkFetchUserProfile,
	StarkFetchUserProfileFailure,
	StarkFetchUserProfileSuccess,
	StarkGetAllUsers,
	StarkGetAllUsersFailure,
	StarkGetAllUsersSuccess
} from "../actions";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "../../logging/services";
import { StarkUserService, starkUserServiceName } from "./user.service.intf";
import { STARK_USER_REPOSITORY, StarkUserRepository } from "../repository";
import { STARK_MOCK_DATA, StarkMockData } from "../../../configuration/entities/mock-data";
import { StarkCoreApplicationState } from "../../../common/store";
import { StarkValidationErrorsUtil } from "../../../util";

/**
 * @ignore
 */
const userErrorMessagePrefix: string = starkUserServiceName + ": invalid user profile.";

/**
 * @ignore
 * @ngdoc service
 * @description Service to fetch the user profile from the REST API. In Development, it can also be used to
 * set the user profile manually and to retrieve a list of profiles from a mock data file.
 */
@Injectable()
export class StarkUserServiceImpl implements StarkUserService {
	public user$: Observable<StarkUser | undefined>;
	public userProfiles: StarkUser[];

	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_USER_REPOSITORY) public userRepository: StarkUserRepository,
		@Inject(STARK_MOCK_DATA) starkMockData: StarkMockData,
		public store: Store<StarkCoreApplicationState>
	) {
		this.logger.debug(starkUserServiceName + " loaded");

		if (ENV === "development") {
			this.logger.debug(starkUserServiceName + ": Retrieving the user profiles from the mock data");
			this.userProfiles = Deserialize(starkMockData.profiles, StarkUser);
		}
	}

	public fetchUserProfile(): Observable<StarkUser> {
		// dispatch corresponding actions to allow the dev to trigger his own effects if needed
		this.store.dispatch(new StarkFetchUserProfile());

		return this.userRepository.getUser().pipe(
			map((response: StarkSingleItemResponseWrapper<StarkUser>) => {
				// Use class-validator ton validate the object based on the entity StarkUser
				StarkValidationErrorsUtil.throwOnError(validateSync(response.data), userErrorMessagePrefix);
				// user deserialization logic is defined in StarkUser entity
				this.store.dispatch(new StarkFetchUserProfileSuccess(response.data));

				return response.data;
			}),
			catchError((error: StarkHttpErrorWrapper | Error) => {
				this.store.dispatch(new StarkFetchUserProfileFailure(error));

				return throwError(error);
			})
		);
	}

	public getAllUsers(): StarkUser[] {
		this.store.dispatch(new StarkGetAllUsers());

		const allUsers: StarkUser[] = this.userProfiles;

		if (!allUsers || allUsers.length === 0) {
			this.store.dispatch(new StarkGetAllUsersFailure(starkUserServiceName + ": No user profiles found in mock data!"));
		} else {
			for (const user of allUsers) {
				// Use class-validator ton validate the object based on the entity StarkUser
				StarkValidationErrorsUtil.throwOnError(validateSync(user), userErrorMessagePrefix);
			}

			this.store.dispatch(new StarkGetAllUsersSuccess(allUsers));
		}

		return allUsers;
	}
}
