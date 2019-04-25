import { StarkSessionService } from "@nationalbankbelgium/stark-core";
import { Observable } from "rxjs";
/**
 * @ignore
 */
export class MockStarkSessionService implements StarkSessionService {
	public devAuthenticationHeaders: Map<string, string>;

	public getCurrentUser: () => Observable<any> = jasmine.createSpy("getCurrentLanguage");
	public getCurrentLanguage: () => Observable<string> = jasmine.createSpy("getCurrentLanguage");
	public setCurrentLanguage: () => void = jasmine.createSpy("setCurrentLanguage");
	public login: () => void = jasmine.createSpy("login");
	public logout: () => void = jasmine.createSpy("logout");
	public pauseUserActivityTracking: () => void = jasmine.createSpy("pauseUserActivityTracking");
	public resumeUserActivityTracking: () => void = jasmine.createSpy("resumeUserActivityTracking");
	public setDevAuthenticationHeaders: () => void = jasmine.createSpy("setDevAuthenticationHeaders");

	public constructor(devAuthenticationHeaders?: Map<string, string>) {
		if (!devAuthenticationHeaders) {
			this.devAuthenticationHeaders = new Map<string, string>();
		} else {
			this.devAuthenticationHeaders = devAuthenticationHeaders;
		}
	}
}
