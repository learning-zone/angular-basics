/**
 * Name of the initialization states of the application
 */
export const starkAppInitStateName: string = "starkAppInit";
/**
 * Name of the exit states of the application
 */
export const starkAppExitStateName: string = "starkAppExit";

/**
 * Name of the login state of the application
 */
export const starkLoginStateName: string = starkAppInitStateName + ".starkLogin";
/**
 * URL of the login state of the application
 */
export const starkLoginStateUrl: string = "/starkLogin";

/**
 * Name of the Preloading state of the application
 */
export const starkPreloadingStateName: string = starkAppInitStateName + ".starkPreloading";
/**
 * URL of the Preloading state of the application
 */
export const starkPreloadingStateUrl: string = "/starkPreloading";

/**
 * Name of the SessionExpired state of the application
 */
export const starkSessionExpiredStateName: string = starkAppExitStateName + ".starkSessionExpired";
/**
 * URL of the SessionExpired state of the application
 */
export const starkSessionExpiredStateUrl: string = "/starkSessionExpired";

/**
 * Name of the SessionLogout state of the application
 */
export const starkSessionLogoutStateName: string = starkAppExitStateName + ".starkSessionLogout";
/**
 * URL of the SessionLogout state of the application
 */
export const starkSessionLogoutStateUrl: string = "/starkSessionLogout";
