/**
 * The profile of the User
 */
export interface StarkUserProfile {
	/**
	 * The user's username
	 */
	username: string;
	/**
	 * The user's firstname
	 */
	firstName: string;
	/**
	 * The user's lastname
	 */
	lastName: string;
	/**
	 * The user's email address
	 */
	email?: string;
	/**
	 * The user's phone number
	 */
	phone?: string;
	/**
	 * The user's language
	 */
	language?: string;
	/**
	 * The user's reference number
	 */
	referenceNumber?: string;
	/**
	 * Is the user anonymous or not?
	 */
	isAnonymous?: boolean;
	/**
	 * This property will contain any additional details for the user profile returned by the backend
	 */
	custom?: object;
}
