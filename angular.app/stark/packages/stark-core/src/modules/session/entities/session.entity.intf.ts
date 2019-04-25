import { StarkUser } from "../../user/entities";

/**
 * The StarkSession interface describes the information that is stored and available during the whole session of a user.
 */
export interface StarkSession {
	/**
	 * The current session's language
	 */
	currentLanguage: string;

	/**
	 * The current user logged in the application (if there is one logged in), otherwise it will be undefined
	 * @link StarkUser
	 */
	user: StarkUser | undefined;
}
