/* tslint:disable:completed-docs*/
import { Serialize } from "cerialize";
import { StarkBackend, StarkHttpRequestType, StarkResource } from "../entities";
import { StarkSerializable } from "../../../serialization";
import { StarkHttpEchoType, StarkHttpHeaders } from "../constants";
import { StarkHttpRequestBuilder } from "./http-request-builder.intf";
import { StarkHttpCreateRequestBuilder } from "./http-create-request-builder.intf";
import { StarkHttpDeleteRequestBuilder } from "./http-delete-request-builder.intf";
import { StarkHttpGetRequestBuilder } from "./http-get-request-builder.intf";
import { StarkHttpGetCollectionRequestBuilder } from "./http-get-collection-request-builder.intf";
import { StarkHttpSearchRequestBuilder } from "./http-search-request-builder.intf";
import { StarkHttpUpdateRequestBuilder } from "./http-update-request-builder.intf";
import {
	StarkHttpCreateRequestParams,
	StarkHttpDeleteRequestParams,
	StarkHttpGetCollectionRequestParams,
	StarkHttpGetRequestParams,
	StarkHttpRequestParams,
	StarkHttpSearchRequestParams,
	StarkHttpUpdateRequestParams
} from "./http-request-parameters.intf";
import { StarkUrlUtil } from "../../../util/url-util";
import { StarkHttpSerializer, StarkHttpSerializerImpl } from "../serializer";
import { StarkHttpBaseRequestBuilder } from "./http-abstract-base-request-builder.intf";
import { StarkAbstractHttpBaseRequestBuilder } from "./http-abstract-base-request-builder";
import { StarkAbstractHttpFetchResourceRequestBuilder } from "./http-abstract-fetch-resource-request-builder";
/**
 * @ignore
 */
export class StarkHttpRequestBuilderImpl<T extends StarkResource> implements StarkHttpRequestBuilder<T> {
	private resourcePath: string;
	private backend: StarkBackend;
	private serializer: StarkHttpSerializer<T>;
	private uuidPlaceholder: string = ":uuid";

	public constructor(backend: StarkBackend, resourcePath: string, serializer: StarkHttpSerializer<T>) {
		this.backend = backend;
		this.serializer = serializer;
		this.resourcePath = resourcePath;
	}

	public create(item: T, params?: StarkHttpCreateRequestParams): StarkHttpCreateRequestBuilder<T> {
		const customType: StarkSerializable | undefined = this.getCustomType(params);
		const serializerForCustomType: StarkHttpSerializer<T> | undefined = this.getCustomTypeSerializer(this.serializer, customType);

		const builder: StarkHttpCreateRequestBuilder<T> = new StarkHttpCreateRequestBuilderImpl({
			backend: this.backend,
			resourcePath: this.resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.CREATE,
			item: item,
			serializer: serializerForCustomType || this.serializer
		});

		this.setBuilderParams(builder, params);

		return builder;
	}

	public update(item: T, params: StarkHttpUpdateRequestParams = {}): StarkHttpUpdateRequestBuilder<T> {
		const normalizedParams: StarkHttpUpdateRequestParams = this.normalizeUUIDPathParam(item.uuid, params);

		let requestType: StarkHttpRequestType = StarkHttpRequestType.UPDATE;
		if (normalizedParams && normalizedParams.isIdempotent === true) {
			requestType = StarkHttpRequestType.UPDATE_IDEMPOTENT;
		}

		const customType: StarkSerializable | undefined = this.getCustomType(normalizedParams);
		const serializerForCustomType: StarkHttpSerializer<T> | undefined = this.getCustomTypeSerializer(this.serializer, customType);

		const builder: StarkHttpUpdateRequestBuilder<T> = new StarkHttpUpdateRequestBuilderImpl({
			backend: this.backend,
			resourcePath: this.resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: requestType,
			item: item,
			serializer: serializerForCustomType || this.serializer
		});

		// for updates, we always set the If-Match header (concurrency)
		builder.setHeader(StarkHttpHeaders.IF_MATCH, <string>item.etag);

		this.setBuilderParams(builder, normalizedParams);

		return builder;
	}

	public delete(item: T, params: StarkHttpDeleteRequestParams = {}): StarkHttpDeleteRequestBuilder<T> {
		const normalizedParams: StarkHttpDeleteRequestParams = this.normalizeUUIDPathParam(item.uuid, params);

		const customType: StarkSerializable | undefined = this.getCustomType(normalizedParams);
		const serializerForCustomType: StarkHttpSerializer<T> | undefined = this.getCustomTypeSerializer(this.serializer, customType);

		const builder: StarkHttpDeleteRequestBuilder<T> = new StarkHttpDeleteRequestBuilderImpl({
			backend: this.backend,
			resourcePath: this.resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.DELETE,
			item: item,
			serializer: serializerForCustomType || this.serializer
		});

		// if the force parameter is not defined or is set to false
		// then we DO set the If-Match header (i.e., conditional delete)
		// if force is set to true, the ETag is not given
		// this makes sense in cases where the user states "delete this no matter what", given that the server supports/allows it
		if (!normalizedParams || normalizedParams.force !== true) {
			builder.setHeader(StarkHttpHeaders.IF_MATCH, <string>item.etag);
		}

		this.setBuilderParams(builder, normalizedParams);

		return builder;
	}

	public get(uuid: string, params: StarkHttpGetRequestParams = {}): StarkHttpGetRequestBuilder<T> {
		const normalizedParams: StarkHttpGetRequestParams = this.normalizeUUIDPathParam(uuid, params);

		const customType: StarkSerializable | undefined = this.getCustomType(normalizedParams);
		const serializerForCustomType: StarkHttpSerializer<T> | undefined = this.getCustomTypeSerializer(this.serializer, customType);

		const builder: StarkHttpGetRequestBuilder<T> = new StarkHttpGetRequestBuilderImpl({
			backend: this.backend,
			resourcePath: this.resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.GET,
			item: undefined,
			serializer: serializerForCustomType || this.serializer
		});

		this.setBuilderParams(builder, normalizedParams);

		return builder;
	}

	public getCollection(
		limit: number,
		offset: number,
		params?: StarkHttpGetCollectionRequestParams
	): StarkHttpGetCollectionRequestBuilder<T> {
		const customType: StarkSerializable | undefined = this.getCustomType(params);
		const serializerForCustomType: StarkHttpSerializer<T> | undefined = this.getCustomTypeSerializer(this.serializer, customType);

		const builder: StarkHttpGetCollectionRequestBuilder<T> = new StarkHttpGetCollectionRequestBuilderImpl({
			backend: this.backend,
			resourcePath: this.resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.GET_COLLECTION,
			item: undefined,
			serializer: serializerForCustomType || this.serializer
		});

		this.setBuilderParams(builder, params);

		builder.addQueryParameter("limit", limit.toString());
		builder.addQueryParameter("offset", offset.toString());

		// Add custom QueryParameter so json-server can add collection metadata to the mock response
		// See: https://jira.prd.nbb/browse/NG-1335
		if (ENV === "development") {
			builder.addQueryParameter("mockCollectionRequest", "true");
		}

		return builder;
	}

	public search(
		criteria: { [param: string]: string },
		limit: number,
		offset: number,
		params?: StarkHttpSearchRequestParams
	): StarkHttpSearchRequestBuilder<T> {
		if (!params || (params && !params.allowEmptyCriteria)) {
			criteria = this.removeEmptyCriteria(criteria);
		}

		const customType: StarkSerializable | undefined = this.getCustomType(params);
		const serializerForCustomType: StarkHttpSerializer<T> | undefined = this.getCustomTypeSerializer(this.serializer, customType);

		const builder: StarkHttpGetCollectionRequestBuilder<T> = new StarkHttpSearchRequestBuilderImpl({
			backend: this.backend,
			resourcePath: this.resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.SEARCH,
			item: criteria, // the search criteria will be sent in the request body payload
			serializer: serializerForCustomType || this.serializer
		});

		this.setBuilderParams(builder, params);

		builder.addQueryParameter("limit", limit.toString());
		builder.addQueryParameter("offset", offset.toString());

		// Add custom QueryParameter so json-server can add collection metadata to the mock response
		// See: https://jira.prd.nbb/browse/NG-1335
		if (ENV === "development") {
			builder.addQueryParameter("mockCollectionRequest", "true");
		}

		return builder;
	}

	private normalizeUUIDPathParam(uuid: string, params: StarkHttpRequestParams = {}): StarkHttpRequestParams {
		const resourcePathParams: string[] = StarkUrlUtil.parseUrlParams(this.resourcePath);

		if (typeof uuid !== "undefined") {
			// if there is no placeholder for the uuid but the resource uuid is defined, then it is added by default at the end of the resource path
			if (resourcePathParams.indexOf("uuid") === -1) {
				this.resourcePath += "/" + this.uuidPlaceholder;
			}
			// the uuid is added to the pathParams to be replaced in the resourcePath
			const pathParamsWithUUID: { [param: string]: string } = { ...params.pathParameters, uuid: uuid };
			return { ...params, pathParameters: pathParamsWithUUID };
		} else {
			// the resource uuid value should be defined in case there is a placeholder for it in the resource path, otherwise throw an error
			if (resourcePathParams.indexOf("uuid") !== -1) {
				throw new Error("StarkHttpRequestBuilder: resource path has :uuid placeholder but resource uuid value is undefined");
			} else {
				return params; // leave it unchanged
			}
		}
	}

	private getCustomType(params?: StarkHttpCreateRequestParams): StarkSerializable | undefined {
		let customSerializationType: StarkSerializable | undefined;

		if (params && params.serializationType) {
			customSerializationType = params.serializationType;
		}

		return customSerializationType;
	}

	private getCustomTypeSerializer(
		builderSerializer: StarkHttpSerializer<T>,
		customType?: StarkSerializable
	): StarkHttpSerializer<T> | undefined {
		let requestSerializer: StarkHttpSerializer<T> | undefined;

		// if there is no custom serializer defined but there is a custom type defined
		// then use the custom type and create a new serializer for that type
		if (builderSerializer instanceof StarkHttpSerializerImpl && customType) {
			requestSerializer = new StarkHttpSerializerImpl<T>(customType);
		}

		return requestSerializer;
	}

	private setBuilderParams(builder: StarkHttpBaseRequestBuilder<T>, params: StarkHttpRequestParams = {}): void {
		if (params.pathParameters) {
			builder.setPathParameters(params.pathParameters);
		}
		if (params.queryParameters) {
			builder.addQueryParameters(params.queryParameters, params.allowUndefinedQueryParams, params.allowEmptyQueryParams);
		}
		if (params.retryCount) {
			builder.retry(params.retryCount);
		}
	}

	private removeEmptyCriteria(criteria: { [param: string]: string }): { [param: string]: string } {
		// stringify the pre-stringified json object returned by Serialize
		const stringifiedCriteria: string = JSON.stringify(Serialize(criteria));
		// then JSON.parse the stringified criteria passing a reviver function to omit the empty values ("")
		return JSON.parse(stringifiedCriteria, (_key: string, value: any) => {
			return value === "" ? undefined : value; // filter out empty strings
		});
	}
}
/**
 * @ignore
 */
export class StarkHttpCreateRequestBuilderImpl<T extends StarkResource> extends StarkAbstractHttpBaseRequestBuilder<T>
	implements StarkHttpCreateRequestBuilder<T> {
	public echo(echo: StarkHttpEchoType): this {
		this.addQueryParameter("echo", <string>echo);
		return this;
	}
}
/**
 * @ignore
 */
export class StarkHttpUpdateRequestBuilderImpl<T extends StarkResource> extends StarkAbstractHttpBaseRequestBuilder<T>
	implements StarkHttpUpdateRequestBuilder<T> {}
/**
 * @ignore
 */
export class StarkHttpDeleteRequestBuilderImpl<T extends StarkResource> extends StarkAbstractHttpBaseRequestBuilder<T>
	implements StarkHttpDeleteRequestBuilder<T> {}
/**
 * @ignore
 */
export class StarkHttpGetRequestBuilderImpl<T extends StarkResource> extends StarkAbstractHttpFetchResourceRequestBuilder<T>
	implements StarkHttpGetRequestBuilder<T> {}
/**
 * @ignore
 */
export class StarkHttpGetCollectionRequestBuilderImpl<T extends StarkResource> extends StarkAbstractHttpFetchResourceRequestBuilder<T>
	implements StarkHttpGetCollectionRequestBuilder<T> {}
/**
 * @ignore
 */
export class StarkHttpSearchRequestBuilderImpl<T extends StarkResource> extends StarkAbstractHttpFetchResourceRequestBuilder<T>
	implements StarkHttpSearchRequestBuilder<T> {}
