import { Observable } from "rxjs";
import { StarkBackend } from "../entities/backend";
import { StarkCollectionResponseWrapper, StarkResource, StarkSingleItemResponseWrapper } from "../entities";
import {
	StarkHttpCreateRequestParams,
	StarkHttpDeleteRequestParams,
	StarkHttpGetCollectionRequestParams,
	StarkHttpGetRequestParams,
	StarkHttpRequestBuilder,
	StarkHttpRequestBuilderImpl,
	StarkHttpSearchRequestParams,
	StarkHttpUpdateRequestParams
} from "../builder";
import { StarkHttpService } from "../services/http.service.intf";
import { StarkLoggingService } from "../../logging/services";
import { StarkSerializable } from "../../../serialization";
import { StarkHttpSerializer, StarkHttpSerializerImpl } from "../serializer";

/**
 * This abstract class provides methods for the most common requests to be performed so it can be extended by your own Http repositories.
 */
export abstract class AbstractStarkHttpRepository<T extends StarkResource> {
	/**
	 * 	The Http Service provided by Stark
	 * 	@link StarkHttpService
	 */
	protected starkHttpService: StarkHttpService<T>;
	/**
	 * The logging service.
	 * @link StarkLoggingService
	 */
	protected logger: StarkLoggingService;
	/**
	 * The backend that this HttpRespository will target.
	 * @link StarkBackend
	 */
	protected backend: StarkBackend;
	/**
	 *
	 * The resource path that will be used as default for all the requests performed by this HttpRespository.
	 * This will be replaced by the resourcePath provided (if any) in the getRequestBuilder() method.
	 */
	protected resourcePath: string;
	/**
	 *
	 * The serializer that will be attached by default to every StarkHttpRequest sent by this HttpRespository
	 * to serialize/deserialize the items to be sent/received to/from the backend.
	 */
	protected serializer: StarkHttpSerializer<T>;

	/**
	 * Class constructor
	 * @param starkHttpService - the Http Service provided by Stark
	 * @param logger - the logging service
	 * @param backend - the backend to target
	 * @param resourcePath - the path used by default
	 * @param serializer - the serializer used by default
	 */
	public constructor(
		starkHttpService: StarkHttpService<T>,
		logger: StarkLoggingService,
		backend: StarkBackend | undefined,
		resourcePath: string | undefined,
		serializer?: StarkHttpSerializer<T>
	) {
		this.starkHttpService = starkHttpService;
		this.logger = logger;

		if (serializer) {
			this.serializer = serializer;
		}

		if (!backend) {
			throw new Error('AbstractStarkHttpRepository: backend config missing for resourcePath "' + this.resourcePath + '".');
		} else {
			this.backend = backend;
		}
		if (typeof resourcePath === "undefined") {
			throw new Error(
				'AbstractStarkHttpRepository: resourcePath missing in Http Repository with backend "' + this.backend.name + '".'
			);
		} else {
			this.resourcePath = resourcePath;
		}
	}

	/**
	 * Perform an Http request to create a resource item.
	 * @param item - the item to create
	 * @param params - the parameters used to create the item
	 */
	public create(item: T, params?: StarkHttpCreateRequestParams): Observable<StarkSingleItemResponseWrapper<T>> {
		return this.starkHttpService.executeSingleItemRequest(
			this.getRequestBuilder()
				.create(item, params)
				.build()
		);
	}

	/**
	 * Perform an Http request to update an existing resource item.
	 * @param item - the item to update
	 * @param params - the parameters used to update the item
	 */
	public update(item: T, params?: StarkHttpUpdateRequestParams): Observable<StarkSingleItemResponseWrapper<T>> {
		return this.starkHttpService.executeSingleItemRequest(
			this.getRequestBuilder()
				.update(item, params)
				.build()
		);
	}

	/**
	 * Perform an Http request to delete a resource item.
	 * @param item - the item to delete
	 * @param params - the parameters used to delete the item
	 */
	public delete(item: T, params?: StarkHttpDeleteRequestParams): Observable<StarkSingleItemResponseWrapper<T>> {
		return this.starkHttpService.executeSingleItemRequest(
			this.getRequestBuilder()
				.delete(item, params)
				.build()
		);
	}

	/**
	 * Perform an Http request to fetch a resource item.
	 * @param uuid - the uuid of the item to fetch
	 * @param params - the parameters used to fetch the item
	 */
	public get(uuid: string, params?: StarkHttpGetRequestParams): Observable<StarkSingleItemResponseWrapper<T>> {
		return this.starkHttpService.executeSingleItemRequest(
			this.getRequestBuilder()
				.get(uuid, params)
				.build()
		);
	}

	/**
	 * Perform an Http request to fetch a range of resource items based on the limit and offset.
	 * @param limit - the limit to apply to the request
	 * @param offset - the offset to apply to the request
	 * @param params - the parameters to apply to the request
	 */
	public getCollection(
		limit: number,
		offset: number,
		params?: StarkHttpGetCollectionRequestParams
	): Observable<StarkCollectionResponseWrapper<T>> {
		return this.starkHttpService.executeCollectionRequest(
			this.getRequestBuilder()
				.getCollection(limit, offset, params)
				.build()
		);
	}

	/**
	 * Perform an Http request to fetch a range of resource items that match with the given criteria.
	 * @param criteria - the criteria of the request
	 * @param limit - the limit to apply to the request
	 * @param offset - the offset to apply to the request
	 * @param params - the parameters to apply to the request
	 */
	public search(
		criteria: { [param: string]: string },
		limit: number,
		offset: number,
		params?: StarkHttpSearchRequestParams
	): Observable<StarkCollectionResponseWrapper<T>> {
		return this.starkHttpService.executeCollectionRequest(
			this.getRequestBuilder()
				.search(criteria, limit, offset, params)
				.build()
		);
	}

	/**
	 * Return a new instance of StarkHttpRequestBuilder which can be used to construct an StarkHttpRequest via one of the StarkHttpBuilder variants.
	 * @param resourcePath: the resourcePath of the requestBuilder
	 */
	// the default resourcePath of the returned builder will be replaced with the one that is passed here (if any)
	public getRequestBuilder(resourcePath?: string): StarkHttpRequestBuilder<T> {
		// set the default serializer in case no custom serializer was defined
		// it should be set here to prevent exceptions when the type() getter returns values depending on the actual instance ('return this.xxxx')
		this.serializer = this.serializer || new StarkHttpSerializerImpl<T>(this.type);
		return new StarkHttpRequestBuilderImpl(this.backend, resourcePath || this.resourcePath, this.serializer);
	}

	/**
	 * Return the type of a class to be used in order to deserialize (using the default StarkHttpSerializerImpl
	 * or a custom serializer) the Http response of the different requests.
	 * This method must be implemented in every Http repository that extends this abstract class
	 * and the returned class should have the correct serialization decorators.
	 */
	protected abstract get type(): StarkSerializable;
}
