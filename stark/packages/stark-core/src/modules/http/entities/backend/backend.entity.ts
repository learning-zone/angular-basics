import { IsDefined, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { autoserialize, autoserializeAs } from "cerialize";
import { StarkBackend } from "./backend.entity.intf";
import { StarkBackendAuthenticationTypes } from "./backend-authentication-types";
/**
 * @ignore
 */
export class StarkBackendImpl implements StarkBackend {
	// validation must be performed always, regardless of validation groups used
	@IsNotEmpty({ message: "each backend object MUST have a name", always: true })
	@IsString({ always: true })
	@autoserialize
	public name: string;

	// validation must be performed always, regardless of validation groups used
	@IsNotEmpty({ message: "each backend object MUST have an url", always: true })
	@IsUrl({}, { always: true })
	@autoserialize
	public url: string;

	// validation must be performed always, regardless of validation groups used
	@IsDefined({ message: "each backend object MUST have an authentication type defined", always: true })
	@autoserializeAs(StarkBackendAuthenticationTypes)
	public authenticationType: StarkBackendAuthenticationTypes;

	@autoserialize
	public devAuthenticationEnabled: boolean; // optional (only needed if pre-authentication is required)

	@autoserialize
	public devAuthenticationRolePrefix: string; // optional: only needed if pre-authentication is enabled

	@autoserialize
	public loginResource: string; // optional (only needed if authentication is required)

	@autoserialize
	public token: string; // optional (only needed if token-based authentication is required)
}
