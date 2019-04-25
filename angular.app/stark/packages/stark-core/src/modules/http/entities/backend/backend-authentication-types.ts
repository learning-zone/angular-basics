/**
 * Authentication type for a given back-end.
 * DO NOT ADD entries in-between others, or the configuration files might get broken (different ordinal value!)
 */
export enum StarkBackendAuthenticationTypes {
	COOKIE,
	PUBLIC,
	TOKEN
}
