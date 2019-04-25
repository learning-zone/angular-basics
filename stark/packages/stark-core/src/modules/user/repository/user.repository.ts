import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StarkSerializable } from "../../../serialization";
import { StarkUser } from "../entities";
import { StarkHttpRequest, StarkSingleItemResponseWrapper } from "../../http/entities";
import { STARK_APP_CONFIG, StarkApplicationConfig } from "../../../configuration/entities/application";
import { StarkUserRepository, starkUserRepositoryName } from "./user.repository.intf";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "../../logging/services/logging.service.intf";
import { STARK_HTTP_SERVICE, StarkHttpService } from "../../http/services";
import { AbstractStarkHttpRepository } from "../../http/repository";
import { StarkConfigurationUtil } from "../../../util/configuration.util";

/**
 * @ignore
 * @ngdoc service
 * @description Repository to fetch user profile from the backend.
 */
@Injectable()
export class StarkUserRepositoryImpl extends AbstractStarkHttpRepository<StarkUser> implements StarkUserRepository {
	public constructor(
		@Inject(STARK_HTTP_SERVICE) starkHttpService: StarkHttpService<StarkUser>,
		@Inject(STARK_LOGGING_SERVICE) logger: StarkLoggingService,
		@Inject(STARK_APP_CONFIG) appConfig: StarkApplicationConfig
	) {
		// ensuring that the app config is valid before doing anything
		StarkConfigurationUtil.validateConfig(appConfig, ["http"], starkUserRepositoryName);

		super(starkHttpService, logger, appConfig.getBackend("userProfile"), "security/userprofile");

		this.logger.debug(starkUserRepositoryName + " loaded");
	}

	public getUser(): Observable<StarkSingleItemResponseWrapper<StarkUser>> {
		// fetch the user profile (in full-detail style) and retry 5 times in case or error
		const userProfileRequest: StarkHttpRequest = this.getRequestBuilder()
			.get(":dummyUUID")
			.addFilterByStyle("full-details")
			.retry(5)
			.build();
		// the userProfile REST service does not need a UUID
		userProfileRequest.resourcePath = userProfileRequest.resourcePath.replace("/:dummyUUID", "");
		return this.starkHttpService.executeSingleItemRequest(userProfileRequest);
	}

	protected get type(): StarkSerializable {
		return StarkUser;
	}
}
