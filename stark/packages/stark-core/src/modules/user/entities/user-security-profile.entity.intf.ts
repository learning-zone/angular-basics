/**
 * Class used to determine the user's security profile
 */
export interface StarkUserSecurityProfile {
	/**
	 * roles allocated to the user
	 */
	roles: string[];
	/**
	 * the workpost of the user
	 */
	workpost?: string;
}
