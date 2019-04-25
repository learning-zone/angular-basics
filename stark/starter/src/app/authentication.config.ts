import { StarkUser } from "@nationalbankbelgium/stark-core";

export function getAuthenticationHeaders(user: StarkUser): Map<string, string> {
	const devAuthentication: AppDevAuthentication = {
		roleSeparator: "^",
		descriptionSeparator: "/",
		defaults: {
			language: "F",
			workpost: "XXX",
			referenceNumber: "00000"
		}
	};

	// set a default language if not known
	const languageHeaderValue: string = user && user.language ? user.language : devAuthentication.defaults.language;
	// set a default workpost if not known
	const workpost: string = user && user.workpost ? user.workpost : devAuthentication.defaults.workpost;
	// set a default reference number if not known
	const referenceNumber: string = user && user.referenceNumber ? user.referenceNumber : devAuthentication.defaults.referenceNumber;

	const descriptionHeaderValue: string = referenceNumber + devAuthentication.descriptionSeparator + workpost;

	let rolesHeaderValue: string = "";
	if (user && user.roles) {
		rolesHeaderValue = user.roles.join(devAuthentication.roleSeparator);
	}

	const devAuthenticationHeaders: Map<string, string> = new Map<string, string>();

	if (user) {
		devAuthenticationHeaders.set(AppHttpHeaders.NBB_USER_NAME, user.username);
		devAuthenticationHeaders.set(AppHttpHeaders.NBB_FIRST_NAME, user.firstName);
		devAuthenticationHeaders.set(AppHttpHeaders.NBB_LAST_NAME, user.lastName);
		if (user.email) {
			devAuthenticationHeaders.set(AppHttpHeaders.NBB_MAIL, user.email);
		}
	}
	devAuthenticationHeaders.set(AppHttpHeaders.NBB_LANGUAGE, languageHeaderValue);
	devAuthenticationHeaders.set(AppHttpHeaders.NBB_DESCRIPTION, descriptionHeaderValue);
	devAuthenticationHeaders.set(AppHttpHeaders.NBB_ROLES, rolesHeaderValue);

	return devAuthenticationHeaders;
}

/**
 * NBB's Java back-ends are usually configured to expect pre-authentication; that is the fact that when a request comes in, if should have been authenticated before by "something else".
 * The way it works is that each request must include NBB-specific HTTP headers along with each request.
 * When you are working against a development environment (e.g., back-end running on your own machine), the infrastructure is not there, so we must simulate it.
 */
interface AppDevAuthentication {
	/**
	 * The separator to use for the roles (must match the role separator defined on the back-end)
	 */
	roleSeparator: string;
	/**
	 * The separator to use for the description (must match the role separator defined on the back-end)
	 */
	descriptionSeparator: string;
	/**
	 * The default headers
	 */
	defaults: {
		/**
		 * The user's language
		 */
		language: string;
		/**
		 * The user's workpost
		 */
		workpost: string;
		/**
		 * The user's reference number
		 */
		referenceNumber: string;
	};
}

/**
 * This class contains http headers needed when performing a Http Request
 */
class AppHttpHeaders {
	// authentication
	/**
	 * The user's username
	 */
	public static NBB_USER_NAME: string = "nbbuser";
	/**
	 * The user's firstname
	 */
	public static NBB_FIRST_NAME: string = "nbbfirstname";
	/**
	 * The user's lastname
	 */
	public static NBB_LAST_NAME: string = "nbblastname";
	/**
	 * The user's email adress
	 */
	public static NBB_MAIL: string = "nbbmail";
	/**
	 * The user's language
	 */
	public static NBB_LANGUAGE: string = "nbblanguage";
	/**
	 * Used to describe the user (team, workspace, ...)
	 */
	public static NBB_DESCRIPTION: string = "nbbdescription";
	/**
	 * The user's groups (ADMIN, ...)
	 */
	public static NBB_ROLES: string = "nbbgroups";
}
