import { StarkUserService, StarkUser } from "@nationalbankbelgium/stark-core";
import { Observable } from "rxjs";

/**
 * @ignore
 */
export class MockStarkUserService implements StarkUserService {
	public fetchUserProfile: () => Observable<StarkUser> = jasmine.createSpy("fetchUserProfile");
	public getAllUsers: () => StarkUser[] = jasmine.createSpy("getAllUsers");

	public constructor() {
		// empty constructor
	}
}
