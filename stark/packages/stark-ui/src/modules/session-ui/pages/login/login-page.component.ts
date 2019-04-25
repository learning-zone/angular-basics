import { Component, Inject, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { RawParams } from "@uirouter/core";
import {
	STARK_LOGGING_SERVICE,
	STARK_ROUTING_SERVICE,
	STARK_SESSION_SERVICE,
	STARK_USER_SERVICE,
	StarkLoggingService,
	StarkRoutingService,
	StarkSessionService,
	StarkUser,
	StarkUserService
} from "@nationalbankbelgium/stark-core";

/**
 * Name of the component
 */
const componentName: string = "stark-login-page";

/**
 * Login Page smart component
 */
@Component({
	selector: "stark-login-page",
	templateUrl: "./login-page.component.html",
	encapsulation: ViewEncapsulation.None,
	host: {
		class: componentName
	}
})
export class StarkLoginPageComponent implements OnInit {
	@Input()
	public targetState: string;
	@Input()
	public targetStateParams: RawParams;

	public users: StarkUser[];

	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_USER_SERVICE) public userService: StarkUserService,
		@Inject(STARK_SESSION_SERVICE) public sessionService: StarkSessionService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService
	) {}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.users = this.userService.getAllUsers();
		this.logger.debug(componentName + ": component initialized");
	}

	/**
	 * Authenticate the passed user as the current user.
	 * @param user - The user to be authenticated
	 */
	public authenticateUser(user: StarkUser): void {
		this.sessionService.login(user);
		if (this.targetState) {
			this.routingService.navigateTo(this.targetState, this.targetStateParams);
		} else {
			this.routingService.navigateToHome();
		}
	}

	/**
	 * Check if users are defined in the component
	 */
	public userProfilesAvailable(): boolean {
		return typeof this.users !== "undefined" && this.users.length > 0;
	}

	/**
	 * Returns a string with the roles of the user.
	 * @param user - The user who has the roles
	 */
	public getUserRoles(user: StarkUser): string {
		if (user.roles.length > 0) {
			return user.roles.toString();
		}
		return "";
	}

	/**
	 * @ignore
	 */
	public trackItemFn(_index: number, item: any): string {
		return item;
	}
}
