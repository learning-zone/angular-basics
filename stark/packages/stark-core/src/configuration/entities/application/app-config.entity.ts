/* tslint:disable:completed-docs*/
import { IsBoolean, IsDefined, IsNotEmpty, IsPositive, IsString, IsUrl, Matches, Min, ValidateIf, validateSync } from "class-validator";
import { autoserialize, autoserializeAs, Deserialize } from "cerialize";
import { StarkApplicationConfig } from "./app-config.entity.intf";
import { StarkBackend, StarkBackendImpl } from "../../../modules/http/entities/backend";
import { stringMap } from "../../../serialization";
import { StarkValidationErrorsUtil } from "../../../util";
import { StarkMapNotEmpty, StarkMapIsValid } from "../../../validation/decorators";
/**
 * @ignore
 */
export class StarkApplicationConfigImpl implements StarkApplicationConfig {
	// FIXME: properties of the group "temp" are not used yet. Will they still be used?

	@IsDefined({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public rootStateUrl: string;

	@IsDefined({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public rootStateName: string;

	@IsDefined({ groups: ["routing"] })
	@IsString({ groups: ["routing"] })
	@autoserialize
	public homeStateName: string;

	@IsDefined({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public errorStateName: string;

	@IsDefined({ groups: ["temp"] })
	@IsBoolean({ groups: ["temp"] })
	@autoserialize
	public angularDebugInfoEnabled: boolean;

	@IsDefined({ groups: ["logging"] })
	@IsBoolean({ groups: ["logging"] })
	@autoserialize
	public debugLoggingEnabled: boolean;

	@ValidateIf(StarkApplicationConfigImpl.validateIfLoggingFlushEnabled, { groups: ["logging"] })
	@IsPositive({ groups: ["logging"] })
	@Min(2, { groups: ["logging"] })
	@autoserialize
	public loggingFlushPersistSize?: number;

	@ValidateIf(StarkApplicationConfigImpl.validateIfLoggingFlushEnabled, { groups: ["logging"] })
	@IsDefined({ groups: ["logging"] })
	@IsString({ groups: ["logging"] })
	@autoserialize
	public loggingFlushApplicationId?: string;

	@ValidateIf(StarkApplicationConfigImpl.validateIfLoggingFlushEnabled, { groups: ["logging"] })
	@IsDefined({ groups: ["logging"] })
	@IsString({ groups: ["logging"] })
	@autoserialize
	public loggingFlushResourceName?: string;

	@IsBoolean({ groups: ["logging"] })
	@autoserialize
	public loggingFlushDisabled?: boolean;

	@IsDefined({ groups: ["logging"] })
	@IsString({ groups: ["logging"] })
	@autoserialize
	public loggingCorrelationIdHttpHeaderName: string;

	@IsDefined({ groups: ["temp"] })
	@IsBoolean({ groups: ["temp"] })
	@autoserialize
	public routerLoggingEnabled: boolean;

	@IsBoolean({ groups: ["temp"] })
	@autoserialize
	public routerVisualizerEnabled: boolean;

	@IsNotEmpty({ groups: ["settings"] })
	@IsString({ groups: ["settings"] })
	@Matches(/^[a-z]{2}$/, { groups: ["settings"] })
	@autoserialize
	public defaultLanguage: string;

	@IsDefined({ groups: ["session"] })
	@IsPositive({ groups: ["session"] })
	@autoserialize
	public sessionTimeout: number;

	@IsPositive({ groups: ["session"] })
	@autoserialize
	public sessionTimeoutWarningPeriod: number;

	@ValidateIf(StarkApplicationConfigImpl.validateIfKeepAliveEnabled, { groups: ["session"] })
	@IsPositive({ groups: ["session"] })
	@autoserialize
	public keepAliveInterval?: number;

	@ValidateIf(StarkApplicationConfigImpl.validateIfKeepAliveEnabled, { groups: ["session"] })
	@IsUrl({}, { groups: ["session"] })
	@autoserialize
	public keepAliveUrl?: string;

	@IsBoolean({ groups: ["session"] })
	@autoserialize
	public keepAliveDisabled?: boolean;

	@IsDefined({ groups: ["session"] })
	@IsUrl({}, { groups: ["session"] })
	@autoserialize
	public logoutUrl: string;

	@IsNotEmpty({ groups: ["temp"] })
	@IsString({ groups: ["temp"] })
	@autoserialize
	public baseUrl: string;

	@IsDefined({ groups: ["session"] })
	@IsBoolean({ groups: ["session"] })
	@autoserialize
	public publicApp: boolean;

	@StarkMapNotEmpty({ groups: ["http"] })
	@StarkMapIsValid({ groups: ["http"] })
	@autoserializeAs(stringMap(StarkBackendImpl)) // using custom serialization type (stringMap) to handle ES6 Maps
	public backends: Map<string, StarkBackend> = new Map<string, StarkBackend>();

	public constructor() {
		// Default values
		if (ENV === "development") {
			this.loggingFlushPersistSize = 500;
		} else {
			this.loggingFlushPersistSize = 15;
		}

		this.loggingFlushDisabled = false;
		this.loggingFlushResourceName = "logging";
		this.loggingCorrelationIdHttpHeaderName = "correlation-id";
		this.sessionTimeout = 900; // default timeout of the F5
		this.sessionTimeoutWarningPeriod = 15;
		this.keepAliveDisabled = false;
		this.keepAliveInterval = 15;
		this.routerVisualizerEnabled = false;
	}

	public addBackend(backend: StarkBackend): void {
		if (!backend) {
			throw new Error("A backend instance must be provided");
		}

		const backendInstance: StarkBackendImpl = backend instanceof StarkBackendImpl ? backend : Deserialize(backend, StarkBackendImpl);

		StarkValidationErrorsUtil.throwOnError(validateSync(backendInstance), "The backend instance provided is not valid.");

		this.backends.set(backend.name, backend);
	}

	public setBackends(backends: StarkBackend[]): void {
		this.backends = new Map<string, StarkBackend>();

		for (const backend of backends) {
			this.addBackend(backend);
		}
	}

	public getBackend(name: string): StarkBackend {
		const backend: StarkBackend | undefined = this.backends.get(name);
		if (backend === undefined) {
			throw new Error("Backend " + name + " is undefined.");
		}
		return backend;
	}

	public getBackends(): Map<string, StarkBackend> {
		return this.backends;
	}

	/**
	 * Check whether the keepAlive option in the StarkApplicationConfig is disabled
	 *
	 * @param instance - the instance of the stark application configuration
	 * @returns boolean - if keepAlive is in use, the value of keepAliveDisabled is set to false
	 */
	public static validateIfKeepAliveEnabled(instance: StarkApplicationConfig): boolean {
		return instance.keepAliveDisabled !== true;
	}

	/**
	 * Check whether the loggingFlush option in the StarkApplicationConfig is disabled
	 *
	 * @param instance - the instance of the stark application configuration
	 * @returns boolean - if loggingFlush is in use, the value of loggingFlushDisabled is set to false
	 */
	public static validateIfLoggingFlushEnabled(instance: StarkApplicationConfig): boolean {
		return instance.loggingFlushDisabled !== true;
	}
}
