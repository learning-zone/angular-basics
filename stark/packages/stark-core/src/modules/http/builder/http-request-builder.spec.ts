/*tslint:disable:completed-docs*/
import { serialize, serializeAs } from "cerialize";
import {
	StarkHttpCreateRequestBuilderImpl,
	StarkHttpDeleteRequestBuilderImpl,
	StarkHttpGetCollectionRequestBuilderImpl,
	StarkHttpGetRequestBuilderImpl,
	StarkHttpRequestBuilderImpl,
	StarkHttpSearchRequestBuilderImpl,
	StarkHttpUpdateRequestBuilderImpl
} from "./http-request-builder";
import { StarkHttpRequestBuilder } from "./http-request-builder.intf";
import { StarkHttpCreateRequestBuilder } from "./http-create-request-builder.intf";
import { StarkHttpDeleteRequestBuilder } from "./http-delete-request-builder.intf";
import { StarkHttpGetRequestBuilder } from "./http-get-request-builder.intf";
import { StarkHttpGetCollectionRequestBuilder } from "./http-get-collection-request-builder.intf";
import { StarkHttpSearchRequestBuilder } from "./http-search-request-builder.intf";
import { StarkHttpUpdateRequestBuilder } from "./http-update-request-builder.intf";
import { StarkBackend, StarkBackendImpl, StarkHttpRequest, StarkHttpRequestType, StarkResource, StarkSortItemImpl } from "../entities";
import { StarkLanguages } from "../../../configuration/entities/language";
import { stringMap } from "../../../serialization";
import { StarkHttpEchoType, StarkHttpHeaders, StarkHttpQueryParameters, StarkSortOrder } from "../constants";
import { StarkHttpSerializer, StarkHttpSerializerImpl } from "../serializer";
import { StarkHttpRequestParams } from "./http-request-parameters.intf";
import { StarkHttpBaseRequestBuilder } from "./http-abstract-base-request-builder.intf";
import { StarkQueryParam } from "../entities/http-request.entity.intf";

const deepFreeze: Function = require("deep-freeze-strict");

const resourcePath: string = "/something/:somethingId/else/:elseId/next";
const resourceUuid: string = "dummyUUID";
const resourceEtag: string = "123456789";
const mockDate: Date = new Date();
const mockFrozenPathParamsWithoutUUID: StarkHttpRequestParams = deepFreeze({
	pathParameters: { someId: "1234" }
});

type StarkHttpRequestBuilderVariants<ResourceType extends StarkResource> =
	| StarkHttpCreateRequestBuilder<ResourceType>
	| StarkHttpDeleteRequestBuilder<ResourceType>
	| StarkHttpGetRequestBuilder<ResourceType>
	| StarkHttpGetCollectionRequestBuilder<ResourceType>
	| StarkHttpSearchRequestBuilder<ResourceType>
	| StarkHttpUpdateRequestBuilder<ResourceType>;

type StarkHttpFetchResourceRequestBuilder<ResourceType extends StarkResource> =
	| StarkHttpGetCollectionRequestBuilder<ResourceType>
	| StarkHttpGetRequestBuilder<ResourceType>
	| StarkHttpSearchRequestBuilder<ResourceType>;

interface StarkHttpRequestBuilderSpecVariables<RequestBuilderType = StarkHttpBaseRequestBuilder<MockResource>> {
	mockBackend: StarkBackend;
	mockResource: StarkResource;
	mockRequest: StarkHttpRequest;
	requestBuilder: RequestBuilderType;
}

function assertHeaders(requestHeaders: Map<string, string>, expectedHeaders: Map<string, string | undefined>): void {
	expect(requestHeaders).toBeDefined();
	expect(requestHeaders.size).toBe(expectedHeaders.size);

	expectedHeaders.forEach((value?: string, header?: string) => {
		expect(header).toBeDefined();
		expect((<string>header).length).not.toBe(0);
		expect(requestHeaders.has(<string>header)).toBe(true);
		if (typeof value !== "undefined") {
			expect(requestHeaders.get(<string>header)).toBe(value);
		} else {
			expect(requestHeaders.get(<string>header)).toBeUndefined();
		}
	});
}

function assertQueryParameters(requestQueryParams: Map<string, StarkQueryParam>, expectedQueryParams: Map<string, StarkQueryParam>): void {
	expect(requestQueryParams).toBeDefined();
	expect(requestQueryParams.size).toBe(expectedQueryParams.size);

	expectedQueryParams.forEach((value?: string | string[], queryParam?: string) => {
		expect(queryParam).toBeDefined();
		expect((<string>queryParam).length).not.toBe(0);
		expect(requestQueryParams.has(<string>queryParam)).toBe(true);
		if (typeof value !== "undefined") {
			expect(requestQueryParams.get(<string>queryParam)).toEqual(value);
		} else {
			expect(requestQueryParams.get(<string>queryParam)).toBeUndefined();
		}
	});
}

function testEcho(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables<StarkHttpCreateRequestBuilder<MockResource>>): void {
	describe("on echo", () => {
		let builder: StarkHttpCreateRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should set the query parameter echo with the value passed", () => {
			builder.echo(StarkHttpEchoType.NONE);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.NONE]]));
		});

		it("should set the query parameter echo with the value passed and override the previous one", () => {
			builder.echo(StarkHttpEchoType.NONE);
			builder.echo(StarkHttpEchoType.ID);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID]]));
		});
	});
}

function testSetHeader(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables): void {
	describe("on setHeader", () => {
		let builder: StarkHttpBaseRequestBuilder<MockResource>;
		const contentTypeJSON: string = "application/json";

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should add the header name/value only if the value is defined", () => {
			builder.setHeader(StarkHttpHeaders.CONTENT_TYPE, contentTypeJSON);
			builder.setHeader("invalidHeader", <any>undefined);

			const request: StarkHttpRequest = builder.build();

			assertHeaders(request.headers, new Map([[StarkHttpHeaders.CONTENT_TYPE, contentTypeJSON]]));
		});

		it("should add the header name/value and add it to existing ones", () => {
			builder.setHeader(StarkHttpHeaders.CONTENT_TYPE, contentTypeJSON);
			builder.setHeader(StarkHttpHeaders.ACCEPT_LANGUAGE, StarkLanguages.EN_US.isoCode);

			const request: StarkHttpRequest = builder.build();

			assertHeaders(
				request.headers,
				new Map([
					[StarkHttpHeaders.CONTENT_TYPE, contentTypeJSON],
					[StarkHttpHeaders.ACCEPT_LANGUAGE, StarkLanguages.EN_US.isoCode]
				])
			);
		});
	});
}

function testAddQueryParameter(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables): void {
	describe("on addQueryParameter", () => {
		let builder: StarkHttpBaseRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should add the query parameter name/value except those with undefined or empty value (default)", () => {
			builder.addQueryParameter("echo", StarkHttpEchoType.ID);
			builder.addQueryParameter("invalidParam1", undefined);
			builder.addQueryParameter("invalidParam2", "");

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID]]));
		});

		it("should add the query parameters name/value including those with undefined value (allowUndefined = true)", () => {
			builder.addQueryParameter("echo", StarkHttpEchoType.ID);
			builder.addQueryParameter("forceValidParam", undefined, true);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["forceValidParam", undefined]]));
		});

		it("should add the query parameters including those with empty value (allowEmpty = true)", () => {
			builder.addQueryParameter("echo", StarkHttpEchoType.ID);
			builder.addQueryParameter("forceValidParam", "", undefined, true);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["forceValidParam", ""]]));
		});

		it("should add the query parameters name/value and add it to existing ones", () => {
			builder.addQueryParameter("echo", StarkHttpEchoType.ID);
			builder.addQueryParameter("include", "name");

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["include", "name"]]));
		});
	});
}

function testAddQueryParameters(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables): void {
	describe("on addQueryParameters", () => {
		let builder: StarkHttpBaseRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should add the query parameters name/value except those with undefined or empty value (default)", () => {
			builder.addQueryParameters({ echo: StarkHttpEchoType.ID, invalidParam1: undefined, invalidParam2: "" });

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID]]));
		});

		it("should add the query parameters name/value including those with undefined value (allowUndefined = true)", () => {
			builder.addQueryParameters({ echo: StarkHttpEchoType.ID, forceValidParam: undefined }, true);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["forceValidParam", undefined]]));
		});

		it("should set the query parameters including those with empty value (allowEmpty = true)", () => {
			builder.addQueryParameters({ echo: StarkHttpEchoType.ID, forceValidParam: "" }, undefined, true);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["forceValidParam", ""]]));
		});

		it("should add the query parameters name/value WITHOUT removing the existing ones", () => {
			builder.addQueryParameter("echo", StarkHttpEchoType.ID);

			let request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID]]));

			builder.addQueryParameters({ param1: "one", param2: "two" });

			request = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["param1", "one"], ["param2", "two"]]));
		});
	});
}

function testSetQueryParameters(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables): void {
	describe("on setQueryParameters", () => {
		let builder: StarkHttpBaseRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should set the query parameters name/value except those with undefined or empty value (default)", () => {
			builder.setQueryParameters({ echo: StarkHttpEchoType.ID, invalidParam1: undefined, invalidParam2: "" });

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID]]));
		});

		it("should set the query parameters name/value including those with undefined value (allowUndefined = true)", () => {
			builder.setQueryParameters({ echo: StarkHttpEchoType.ID, forceValidParam: undefined }, true);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["forceValidParam", undefined]]));
		});

		it("should set the query parameters including those with empty value (allowEmpty = true)", () => {
			builder.setQueryParameters({ echo: StarkHttpEchoType.ID, forceValidParam: "" }, undefined, true);

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID], ["forceValidParam", ""]]));
		});

		it("should set the query parameters name/value and remove the existing ones", () => {
			builder.addQueryParameter("echo", StarkHttpEchoType.ID);

			let request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["echo", StarkHttpEchoType.ID]]));

			builder.setQueryParameters({ param1: "one", param2: "two" });

			request = builder.build();

			assertQueryParameters(request.queryParameters, new Map([["param1", "one"], ["param2", "two"]]));
		});
	});
}

function testSetPathParameters(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables): void {
	describe("on setPathParameters", () => {
		let builder: StarkHttpBaseRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should interpolate the resourcePath with the params provided", () => {
			builder.setPathParameters({ somethingId: "1", elseId: "5" });

			const request: StarkHttpRequest = builder.build();
			expect(request.resourcePath).toEqual("/something/1/else/5/next");
		});
	});
}

function testRetry(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables): void {
	describe("on retry", () => {
		let builder: StarkHttpBaseRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should add the retryCount option to the request", () => {
			builder.retry(4);

			const request: StarkHttpRequest = builder.build();
			expect(request.retryCount).toBe(4);
		});
	});
}

function testBuild(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables): void {
	describe("on build", () => {
		let builder: StarkHttpBaseRequestBuilder<MockResource>;
		let mockBackend: StarkBackend;
		let mockResource: StarkResource;

		beforeEach(() => {
			({ requestBuilder: builder, mockBackend: mockBackend, mockResource: mockResource } = beforeEachFn());
		});

		it("should return the created StarkHttpRequest", () => {
			const request: StarkHttpRequest = builder.build();

			expect(request.backend).toBe(mockBackend);
			expect(request.resourcePath).toBe(resourcePath);
			expect(request.headers).toBeDefined();
			expect(request.queryParameters).toBeDefined();

			if (builder instanceof StarkHttpCreateRequestBuilderImpl) {
				expect(request.requestType).toBe(StarkHttpRequestType.CREATE);
				expect(request.item).toBe(mockResource);
			} else if (builder instanceof StarkHttpDeleteRequestBuilderImpl) {
				expect(request.requestType).toBe(StarkHttpRequestType.DELETE);
				expect(request.item).toBe(mockResource);
			} else if (builder instanceof StarkHttpUpdateRequestBuilderImpl) {
				expect(request.requestType).toBe(StarkHttpRequestType.UPDATE);
				expect(request.item).toBe(mockResource);
			} else if (builder instanceof StarkHttpGetRequestBuilderImpl) {
				expect(request.requestType).toBe(StarkHttpRequestType.GET);
				expect(request.item).toEqual({ uuid: resourceUuid });
			} else if (builder instanceof StarkHttpGetCollectionRequestBuilderImpl) {
				expect(request.requestType).toBe(StarkHttpRequestType.GET_COLLECTION);
				expect(request.item).toEqual({ uuid: resourceUuid });
			} else if (builder instanceof StarkHttpSearchRequestBuilderImpl) {
				expect(request.requestType).toBe(StarkHttpRequestType.SEARCH);
				expect(request.item).toBe(mockResource); // with a SEARCH request, the search criteria comes in the request item
			}
		});
	});
}

function testAddAcceptedLanguage(
	beforeEachFn: () => StarkHttpRequestBuilderSpecVariables<StarkHttpFetchResourceRequestBuilder<MockResource>>
): void {
	describe("on addAcceptedLanguage", () => {
		let builder: StarkHttpFetchResourceRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should add the accepted language to the headers and the lang param to the query parameters", () => {
			builder.addAcceptedLanguage(StarkLanguages.EN_US);

			const request: StarkHttpRequest = builder.build();

			assertHeaders(request.headers, new Map([[StarkHttpHeaders.ACCEPT_LANGUAGE, StarkLanguages.EN_US.isoCode]]));
			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.LANG, StarkLanguages.EN_US.isoCode]]));
		});

		it("should add the accepted languages to the headers and the lang param to the query parameters", () => {
			builder.addAcceptedLanguage(StarkLanguages.EN_US, StarkLanguages.FR_BE, StarkLanguages.NL_BE);

			const expectedLanguages: string = [
				StarkLanguages.EN_US.isoCode,
				StarkLanguages.FR_BE.isoCode,
				StarkLanguages.NL_BE.isoCode
			].join(",");
			const request: StarkHttpRequest = builder.build();

			assertHeaders(request.headers, new Map([[StarkHttpHeaders.ACCEPT_LANGUAGE, expectedLanguages]]));
			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.LANG, expectedLanguages]]));
		});

		it("should add the accepted languages to the ones that already exist and the lang param to the query parameters", () => {
			builder.addAcceptedLanguage(StarkLanguages.NL_BE);

			let request: StarkHttpRequest = builder.build();

			assertHeaders(request.headers, new Map([[StarkHttpHeaders.ACCEPT_LANGUAGE, StarkLanguages.NL_BE.isoCode]]));
			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.LANG, StarkLanguages.NL_BE.isoCode]]));

			const expectedLanguages: string = [
				StarkLanguages.NL_BE.isoCode,
				StarkLanguages.EN_US.isoCode,
				StarkLanguages.FR_BE.isoCode
			].join(",");

			builder.addAcceptedLanguage(StarkLanguages.EN_US, StarkLanguages.FR_BE);
			request = builder.build();

			assertHeaders(request.headers, new Map([[StarkHttpHeaders.ACCEPT_LANGUAGE, expectedLanguages]]));
			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.LANG, expectedLanguages]]));
		});
	});
}

function testAddFilterByInclude(
	beforeEachFn: () => StarkHttpRequestBuilderSpecVariables<StarkHttpFetchResourceRequestBuilder<MockResource>>
): void {
	describe("on addFilterByInclude", () => {
		let builder: StarkHttpFetchResourceRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should add an entry in the fields query parameter", () => {
			builder.addFilterByInclude("name");

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.FIELDS, "name"]]));
		});

		it("should add an entry in the fields query parameter for every field in the array", () => {
			builder.addFilterByInclude("name", "postalCode");

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.FIELDS, "name,postalCode"]]));
		});

		it("should add an entry in the fields query parameter without removing the current ones", () => {
			builder.addFilterByInclude("name");
			builder.addFilterByInclude("postalCode");

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.FIELDS, "name,postalCode"]]));
		});
	});
}

function testAddFilterByStyle(
	beforeEachFn: () => StarkHttpRequestBuilderSpecVariables<StarkHttpFetchResourceRequestBuilder<MockResource>>
): void {
	describe("on addFilterByStyle", () => {
		let builder: StarkHttpFetchResourceRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should set the style query parameter", () => {
			builder.addFilterByStyle("COMPACT");

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.STYLE, "COMPACT"]]));
		});

		it("should set the style query parameter overriding previous values", () => {
			builder.addFilterByStyle("FULL");
			builder.addFilterByStyle("COMPACT");

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.STYLE, "COMPACT"]]));
		});
	});
}

function testAddSortBy(beforeEachFn: () => StarkHttpRequestBuilderSpecVariables<StarkHttpFetchResourceRequestBuilder<MockResource>>): void {
	describe("on addSortBy", () => {
		let builder: StarkHttpFetchResourceRequestBuilder<MockResource>;

		beforeEach(() => {
			({ requestBuilder: builder } = beforeEachFn());
		});

		it("should add a sort query parameter", () => {
			builder.addSortBy(new StarkSortItemImpl("name", StarkSortOrder.ASC));

			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.SORT, "name+" + StarkSortOrder.ASC]]));
		});

		it("should add a sort query parameter with all the values", () => {
			builder.addSortBy(new StarkSortItemImpl("name", StarkSortOrder.ASC), new StarkSortItemImpl("postalCode", StarkSortOrder.DESC));

			const expectedSort: string = "name+" + StarkSortOrder.ASC + ",postalCode+" + StarkSortOrder.DESC;
			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.SORT, expectedSort]]));
		});

		it("should add a sort query parameter without removing previous values", () => {
			builder.addSortBy(new StarkSortItemImpl("name", StarkSortOrder.ASC));
			builder.addSortBy(new StarkSortItemImpl("postalCode", StarkSortOrder.DESC));

			const expectedSort: string = "name+" + StarkSortOrder.ASC + ",postalCode+" + StarkSortOrder.DESC;
			const request: StarkHttpRequest = builder.build();

			assertQueryParameters(request.queryParameters, new Map([[StarkHttpQueryParameters.SORT, expectedSort]]));
		});
	});
}

/* tslint:disable:no-duplicate-string no-null-keyword no-big-function completed-docs*/
function testCommonFunctionality(typeOfBuilder: "create" | "delete" | "getSingle" | "getCollection" | "search" | "update"): void {
	describe("common functionality", () => {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		let requestBuilder: StarkHttpRequestBuilder<MockResource>;
		let variantRequestBuilder: StarkHttpRequestBuilderVariants<MockResource>;
		let expectedQueryParams: Map<string, StarkQueryParam>;
		let mockResource: StarkResource;

		let mockCriteria: { [key: string]: any };

		beforeEach(() => {
			mockResource = new MockResource(resourceUuid);
			mockResource.etag = resourceEtag;

			mockCriteria = {
				field1: "anything",
				field2: {
					childField1: mockDate,
					childField2: {
						grandChildField1: ["someData", 123],
						anotherUndefinedField: undefined,
						anotherEmptyField: ""
					},
					someUndefinedField: undefined,
					someEmptyField: ""
				},
				undefinedField: undefined,
				emptyField: ""
			};
		});

		it("should return an instance of the request builder variant: " + typeOfBuilder, () => {
			let expectedRequestType: string;
			let expectedHeaders: Map<string, string> = new Map();
			let expectedResource: StarkResource | undefined;
			let expectedResourcePath: string = "/something/1/else/3/next";

			expectedQueryParams = new Map<string, string | string[]>([["param1", "one"], ["duplicateParam", ["dup1", "dup2", "dup3"]]]);

			switch (typeOfBuilder) {
				case "getSingle":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);
					variantRequestBuilder = requestBuilder.get(
						resourceUuid,
						deepFreeze({
							pathParameters: { elseId: "3", invalidParam: <any>undefined },
							queryParameters: {
								param1: "one",
								duplicateParam: ["dup1", "dup2", "dup3"],
								invalidQueryParam1: "",
								invalidQueryParam2: undefined
							},
							retryCount: 5
						})
					);
					expectedRequestType = StarkHttpRequestType.GET;
					expectedResourcePath = "/something/" + resourceUuid + "/else/3/next";
					expect(variantRequestBuilder instanceof StarkHttpGetRequestBuilderImpl).toBe(true);
					break;
				case "getCollection":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);
					variantRequestBuilder = requestBuilder.getCollection(
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3", invalidParam: <any>undefined },
							queryParameters: {
								param1: "one",
								duplicateParam: ["dup1", "dup2", "dup3"],
								invalidQueryParam1: "",
								invalidQueryParam2: undefined
							},
							retryCount: 5
						})
					);
					expectedRequestType = StarkHttpRequestType.GET_COLLECTION;
					expectedQueryParams = new Map<string, string | string[]>([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"], // added only in DEV
						["param1", "one"],
						["duplicateParam", ["dup1", "dup2", "dup3"]]
					]);
					expect(variantRequestBuilder instanceof StarkHttpGetCollectionRequestBuilderImpl).toBe(true);
					break;
				case "search":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);
					variantRequestBuilder = requestBuilder.search(
						mockCriteria,
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3", invalidParam: <any>undefined },
							queryParameters: {
								param1: "one",
								duplicateParam: ["dup1", "dup2", "dup3"],
								invalidQueryParam1: "",
								invalidQueryParam2: undefined
							},
							retryCount: 5
						})
					);
					expectedRequestType = StarkHttpRequestType.SEARCH;
					(<{ [key: string]: any }>expectedResource) = {
						field1: "anything",
						field2: {
							childField1: mockDate.toISOString(),
							childField2: {
								grandChildField1: ["someData", 123],
								anotherUndefinedField: null
								// anotherEmptyField: undefined
							},
							someUndefinedField: null
							// someEmptyField: undefined
						},
						undefinedField: null
						// emptyField: undefined
					};
					expectedQueryParams = new Map<string, string | string[]>([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"], // added only in DEV
						["param1", "one"],
						["duplicateParam", ["dup1", "dup2", "dup3"]]
					]);
					expect(variantRequestBuilder instanceof StarkHttpSearchRequestBuilderImpl).toBe(true);
					expect(variantRequestBuilder.build().item).not.toBe(mockCriteria);
					break;
				case "update":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);
					variantRequestBuilder = requestBuilder.update(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3", invalidParam: <any>undefined },
							queryParameters: {
								param1: "one",
								duplicateParam: ["dup1", "dup2", "dup3"],
								invalidQueryParam1: "",
								invalidQueryParam2: undefined
							},
							retryCount: 5
						})
					);
					expectedRequestType = StarkHttpRequestType.UPDATE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					expect(variantRequestBuilder instanceof StarkHttpUpdateRequestBuilderImpl).toBe(true);
					break;
				case "delete":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);

					variantRequestBuilder = requestBuilder.delete(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3", invalidParam: <any>undefined },
							queryParameters: {
								param1: "one",
								duplicateParam: ["dup1", "dup2", "dup3"],
								invalidQueryParam1: "",
								invalidQueryParam2: undefined
							},
							retryCount: 5
						})
					);
					expect(variantRequestBuilder instanceof StarkHttpDeleteRequestBuilderImpl).toBe(true);
					expectedRequestType = StarkHttpRequestType.DELETE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					break;
				default:
					// CREATE
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);
					variantRequestBuilder = requestBuilder.create(
						mockResource,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3", invalidParam: <any>undefined },
							queryParameters: {
								param1: "one",
								duplicateParam: ["dup1", "dup2", "dup3"],
								invalidQueryParam1: "",
								invalidQueryParam2: undefined
							},
							retryCount: 5
						})
					);
					expectedRequestType = StarkHttpRequestType.CREATE;
					expectedResource = mockResource;
					expect(variantRequestBuilder instanceof StarkHttpCreateRequestBuilderImpl).toBe(true);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.backend).toBe(mockBackend);
			expect(request.resourcePath).toBe(expectedResourcePath);
			assertHeaders(request.headers, expectedHeaders);
			assertQueryParameters(request.queryParameters, expectedQueryParams);
			expect(request.requestType).toBe(expectedRequestType);
			if (typeOfBuilder === "search") {
				expect(request.item).toEqual(expectedResource); // the resource is generated based on the criteria
			} else {
				expect(request.item).toBe(expectedResource);
			}
			expect(request.retryCount).toBe(5);
			expect(request.serializer).toBe(defaultSerializer);
		});

		it("should set the query parameters including those with undefined value (allowUndefinedQueryParams = true)", () => {
			const mockRequestParams: StarkHttpRequestParams = {
				queryParameters: { param1: "one", invalidQueryParam: "", forceValidParam: undefined },
				allowUndefinedQueryParams: true
			};
			const expectedBaseQueryParams: (string | undefined)[][] = [["param1", "one"], ["forceValidParam", undefined]];

			expectedQueryParams = new Map(<any>expectedBaseQueryParams);

			switch (typeOfBuilder) {
				case "update":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

					variantRequestBuilder = requestBuilder.update(mockResource, deepFreeze(mockRequestParams));
					break;
				case "delete":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

					variantRequestBuilder = requestBuilder.delete(mockResource, deepFreeze(mockRequestParams));
					break;
				case "getSingle":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);

					variantRequestBuilder = requestBuilder.get(
						resourceUuid,
						deepFreeze({
							pathParameters: { elseId: "3" },
							...mockRequestParams
						})
					);
					break;
				case "getCollection":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.getCollection(3, 5, deepFreeze(mockRequestParams));
					expectedQueryParams = new Map(<any>[
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"], // added only in DEV
						...expectedBaseQueryParams
					]);
					break;
				case "search":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.search(mockCriteria, 3, 5, deepFreeze(mockRequestParams));
					expectedQueryParams = new Map(<any>[
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"], // added only in DEV
						...expectedBaseQueryParams
					]);
					break;
				default:
					// CREATE
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.create(mockResource, deepFreeze(mockRequestParams));
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			assertQueryParameters(request.queryParameters, expectedQueryParams);
		});

		it("should set the query parameters including those with empty value (allowEmptyQueryParams = true)", () => {
			const mockRequestParams: StarkHttpRequestParams = {
				queryParameters: { param1: "one", invalidQueryParam: undefined, forceValidParam: "" },
				allowEmptyQueryParams: true
			};
			const expectedBaseQueryParams: string[][] = [["param1", "one"], ["forceValidParam", ""]];

			expectedQueryParams = new Map(<any>expectedBaseQueryParams);

			switch (typeOfBuilder) {
				case "update":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

					variantRequestBuilder = requestBuilder.update(mockResource, deepFreeze(mockRequestParams));
					break;
				case "delete":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

					variantRequestBuilder = requestBuilder.delete(mockResource, deepFreeze(mockRequestParams));
					break;
				case "getSingle":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);

					variantRequestBuilder = requestBuilder.get(
						resourceUuid,
						deepFreeze({
							pathParameters: { elseId: "3" },
							...mockRequestParams
						})
					);
					break;
				case "getCollection":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.getCollection(3, 5, deepFreeze(mockRequestParams));

					expectedQueryParams = new Map(<any>[
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"], // added only in DEV
						...expectedBaseQueryParams
					]);
					break;
				case "search":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.search(mockCriteria, 3, 5, deepFreeze(mockRequestParams));
					expectedQueryParams = new Map(<any>[
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"], // added only in DEV
						...expectedBaseQueryParams
					]);
					break;
				default:
					// CREATE
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.create(mockResource, deepFreeze(mockRequestParams));
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			assertQueryParameters(request.queryParameters, expectedQueryParams);
		});
	});
}

// FIXME: re-enable this TSLINT rule and refactor this function to reduce its cognitive complexity
// tslint:disable-next-line:cognitive-complexity completed-docs
function testCustomSerialization(typeOfBuilder: "create" | "delete" | "getSingle" | "getCollection" | "search" | "update"): void {
	describe("custom serialization", () => {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		let requestBuilder: StarkHttpRequestBuilder<MockResource>;
		let variantRequestBuilder: StarkHttpRequestBuilderVariants<MockResource>;
		let expectedQueryParams: Map<string, StarkQueryParam>;
		let expectedHeaders: Map<string, string>;
		let mockResource: StarkResource;
		let expectedResource: StarkResource | undefined;
		let expectedRequestType: string;

		let mockCriteria: { [key: string]: any };
		let expectedResourcePath: string;

		beforeEach(() => {
			mockResource = new MockResource(resourceUuid);
			mockResource.etag = resourceEtag;

			mockCriteria = {
				field1: "anything",
				field2: {
					childField1: mockDate,
					childField2: {
						grandChildField1: ["someData", 123],
						anotherUndefinedField: undefined,
						anotherEmptyField: ""
					},
					someUndefinedField: undefined,
					someEmptyField: ""
				},
				undefinedField: undefined,
				emptyField: ""
			};

			expectedQueryParams = new Map();
			expectedHeaders = new Map();
			expectedResourcePath = "/something/1/else/3/next";
		});

		it("should use a new serializer with the custom type provided in 'serializationType' param when no custom serializer is defined", () => {
			switch (typeOfBuilder) {
				case "update":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);

					variantRequestBuilder = requestBuilder.update(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.UPDATE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					expect(variantRequestBuilder instanceof StarkHttpUpdateRequestBuilderImpl).toBe(true);
					break;
				case "delete":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);

					variantRequestBuilder = requestBuilder.delete(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.DELETE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					expect(variantRequestBuilder instanceof StarkHttpDeleteRequestBuilderImpl).toBe(true);
					break;
				case "getSingle":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", defaultSerializer);

					variantRequestBuilder = requestBuilder.get(
						resourceUuid,
						deepFreeze({
							pathParameters: { elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.GET;
					expectedResourcePath = "/something/" + resourceUuid + "/else/3/next";
					expect(variantRequestBuilder instanceof StarkHttpGetRequestBuilderImpl).toBe(true);
					break;
				case "getCollection":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.getCollection(
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.GET_COLLECTION;
					expectedQueryParams = new Map([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"] // added only in DEV
					]);
					expect(variantRequestBuilder instanceof StarkHttpGetCollectionRequestBuilderImpl).toBe(true);
					break;
				case "search":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.search(
						mockCriteria,
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.SEARCH;
					(<{ [key: string]: any }>expectedResource) = {
						field1: "anything",
						field2: {
							childField1: mockDate.toISOString(),
							childField2: {
								grandChildField1: ["someData", 123],
								anotherUndefinedField: null
								// anotherEmptyField: undefined
							},
							someUndefinedField: null
							// someEmptyField: undefined
						},
						undefinedField: null
						// emptyField: undefined
					};
					expectedQueryParams = new Map([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"] // added only in DEV
					]);
					expect(variantRequestBuilder instanceof StarkHttpSearchRequestBuilderImpl).toBe(true);
					expect(variantRequestBuilder.build().item).not.toBe(mockCriteria);
					break;
				default:
					// CREATE
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

					variantRequestBuilder = requestBuilder.create(
						mockResource,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.CREATE;
					expectedResource = mockResource;
					expect(variantRequestBuilder instanceof StarkHttpCreateRequestBuilderImpl).toBe(true);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.backend).toBe(mockBackend);
			expect(request.resourcePath).toBe(expectedResourcePath);
			assertHeaders(request.headers, expectedHeaders);
			assertQueryParameters(request.queryParameters, expectedQueryParams);
			expect(request.requestType).toBe(expectedRequestType);
			if (typeOfBuilder === "search") {
				expect(request.item).toEqual(expectedResource); // the resource is generated based on the criteria
			} else {
				expect(request.item).toBe(expectedResource);
			}
			expect(request.retryCount).toBeUndefined();
			expect(request.serializer).not.toBe(defaultSerializer);
			expect(request.serializer).toEqual(new StarkHttpSerializerImpl(MockCustomResource));
		});

		it("should use the custom serializer if it is defined", () => {
			switch (typeOfBuilder) {
				case "update":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", customSerializer);

					variantRequestBuilder = requestBuilder.update(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3" }
						})
					);
					expectedRequestType = StarkHttpRequestType.UPDATE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					expect(variantRequestBuilder instanceof StarkHttpUpdateRequestBuilderImpl).toBe(true);
					break;
				case "delete":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", customSerializer);

					variantRequestBuilder = requestBuilder.delete(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3" }
						})
					);
					expectedRequestType = StarkHttpRequestType.DELETE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					expect(variantRequestBuilder instanceof StarkHttpDeleteRequestBuilderImpl).toBe(true);
					break;
				case "getSingle":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", customSerializer);

					variantRequestBuilder = requestBuilder.get(
						resourceUuid,
						deepFreeze({
							pathParameters: { elseId: "3" }
						})
					);
					expectedRequestType = StarkHttpRequestType.GET;
					expectedResourcePath = "/something/" + resourceUuid + "/else/3/next";
					expect(variantRequestBuilder instanceof StarkHttpGetRequestBuilderImpl).toBe(true);
					break;
				case "getCollection":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, customSerializer);

					variantRequestBuilder = requestBuilder.getCollection(
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" }
						})
					);
					expectedRequestType = StarkHttpRequestType.GET_COLLECTION;
					expectedQueryParams = new Map([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"] // added only in DEV
					]);
					expect(variantRequestBuilder instanceof StarkHttpGetCollectionRequestBuilderImpl).toBe(true);
					break;
				case "search":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, customSerializer);

					variantRequestBuilder = requestBuilder.search(
						mockCriteria,
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" }
						})
					);
					expectedRequestType = StarkHttpRequestType.SEARCH;
					(<{ [key: string]: any }>expectedResource) = {
						field1: "anything",
						field2: {
							childField1: mockDate.toISOString(),
							childField2: {
								grandChildField1: ["someData", 123],
								anotherUndefinedField: null
								// anotherEmptyField: undefined
							},
							someUndefinedField: null
							// someEmptyField: undefined
						},
						undefinedField: null
						// emptyField: undefined
					};
					expectedQueryParams = new Map([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"] // added only in DEV
					]);
					expect(variantRequestBuilder instanceof StarkHttpSearchRequestBuilderImpl).toBe(true);
					expect(variantRequestBuilder.build().item).not.toBe(mockCriteria);
					break;
				default:
					// CREATE
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, customSerializer);

					variantRequestBuilder = requestBuilder.create(
						mockResource,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" }
						})
					);
					expectedRequestType = StarkHttpRequestType.CREATE;
					expectedResource = mockResource;
					expect(variantRequestBuilder instanceof StarkHttpCreateRequestBuilderImpl).toBe(true);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.backend).toBe(mockBackend);
			expect(request.resourcePath).toBe(expectedResourcePath);
			assertHeaders(request.headers, expectedHeaders);
			assertQueryParameters(request.queryParameters, expectedQueryParams);
			expect(request.requestType).toBe(expectedRequestType);
			if (typeOfBuilder === "search") {
				expect(request.item).toEqual(expectedResource); // the resource is generated based on the criteria
			} else {
				expect(request.item).toBe(expectedResource);
			}
			expect(request.retryCount).toBeUndefined();
			expect(request.serializer).not.toBe(defaultSerializer);
			expect(request.serializer).toBe(customSerializer);
		});

		it("should use the custom serializer if it is defined regardless of the custom type set in 'serializationType' param", () => {
			switch (typeOfBuilder) {
				case "update":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", customSerializer);

					variantRequestBuilder = requestBuilder.update(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.UPDATE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					expect(variantRequestBuilder instanceof StarkHttpUpdateRequestBuilderImpl).toBe(true);
					break;
				case "delete":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", customSerializer);

					variantRequestBuilder = requestBuilder.delete(
						mockResource,
						deepFreeze({
							pathParameters: { elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.DELETE;
					expectedResource = mockResource;
					expectedResourcePath = "/something/" + mockResource.uuid + "/else/3/next";
					expectedHeaders = new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]);
					expect(variantRequestBuilder instanceof StarkHttpDeleteRequestBuilderImpl).toBe(true);
					break;
				case "getSingle":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else/:elseId/next", customSerializer);

					variantRequestBuilder = requestBuilder.get(
						resourceUuid,
						deepFreeze({
							pathParameters: { elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.GET;
					expectedResourcePath = "/something/" + resourceUuid + "/else/3/next";
					expect(variantRequestBuilder instanceof StarkHttpGetRequestBuilderImpl).toBe(true);
					break;
				case "getCollection":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, customSerializer);

					variantRequestBuilder = requestBuilder.getCollection(
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.GET_COLLECTION;
					expectedQueryParams = new Map([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"] // added only in DEV
					]);
					expect(variantRequestBuilder instanceof StarkHttpGetCollectionRequestBuilderImpl).toBe(true);
					break;
				case "search":
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, customSerializer);

					variantRequestBuilder = requestBuilder.search(
						mockCriteria,
						3,
						5,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.SEARCH;
					(<{ [key: string]: any }>expectedResource) = {
						field1: "anything",
						field2: {
							childField1: mockDate.toISOString(),
							childField2: {
								grandChildField1: ["someData", 123],
								anotherUndefinedField: null
								// anotherEmptyField: undefined
							},
							someUndefinedField: null
							// someEmptyField: undefined
						},
						undefinedField: null
						// emptyField: undefined
					};
					expectedQueryParams = new Map([
						["limit", "3"],
						["offset", "5"],
						["mockCollectionRequest", "true"] // added only in DEV
					]);
					expect(variantRequestBuilder instanceof StarkHttpSearchRequestBuilderImpl).toBe(true);
					expect(variantRequestBuilder.build().item).not.toBe(mockCriteria);
					break;
				default:
					// CREATE
					requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, customSerializer);

					variantRequestBuilder = requestBuilder.create(
						mockResource,
						deepFreeze({
							pathParameters: { somethingId: "1", elseId: "3" },
							serializationType: MockCustomResource
						})
					);
					expectedRequestType = StarkHttpRequestType.CREATE;
					expectedResource = mockResource;
					expect(variantRequestBuilder instanceof StarkHttpCreateRequestBuilderImpl).toBe(true);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.backend).toBe(mockBackend);
			expect(request.resourcePath).toBe(expectedResourcePath);
			assertHeaders(request.headers, expectedHeaders);
			assertQueryParameters(request.queryParameters, expectedQueryParams);
			expect(request.requestType).toBe(expectedRequestType);
			if (typeOfBuilder === "search") {
				expect(request.item).toEqual(expectedResource); // the resource is generated based on the criteria
			} else {
				expect(request.item).toBe(expectedResource);
			}
			expect(request.retryCount).toBeUndefined();
			expect(request.serializer).not.toBe(defaultSerializer);
			expect(request.serializer).toBe(customSerializer);
		});
	});
}
function testUUIDPathParamNormalization(typeOfBuilder: "delete" | "getSingle" | "update"): void {
	describe("UUID path parameter normalization", () => {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		let requestBuilder: StarkHttpRequestBuilder<MockResource>;
		let variantRequestBuilder: StarkHttpRequestBuilderVariants<MockResource>;
		let mockResource: StarkResource;

		beforeEach(() => {
			mockResource = new MockResource(resourceUuid);
			mockResource.etag = resourceEtag;
		});

		it("should add the resource uuid to the end of the resourcePath if there are no placeholders for pathParams defined", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something", defaultSerializer);

			switch (typeOfBuilder) {
				case "update":
					variantRequestBuilder = requestBuilder.update(mockResource);
					break;
				case "delete":
					variantRequestBuilder = requestBuilder.delete(mockResource);
					break;
				default:
					variantRequestBuilder = requestBuilder.get(mockResource.uuid);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.resourcePath).toBe("/something/" + mockResource.uuid);
		});

		it("should set the resource uuid in the right place if it is defined and the resourcePath contains a placeholder for it", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid/else", defaultSerializer);

			switch (typeOfBuilder) {
				case "update":
					variantRequestBuilder = requestBuilder.update(mockResource);
					break;
				case "delete":
					variantRequestBuilder = requestBuilder.delete(mockResource);
					break;
				default:
					variantRequestBuilder = requestBuilder.get(mockResource.uuid);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.resourcePath).toBe("/something/" + mockResource.uuid + "/else");
		});

		it("should add the resource uuid if it is defined but there is no placeholder for it in the resourcePath", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:someId/else", defaultSerializer);

			switch (typeOfBuilder) {
				case "update":
					variantRequestBuilder = requestBuilder.update(mockResource, mockFrozenPathParamsWithoutUUID);
					break;
				case "delete":
					variantRequestBuilder = requestBuilder.delete(mockResource, mockFrozenPathParamsWithoutUUID);
					break;
				default:
					variantRequestBuilder = requestBuilder.get(mockResource.uuid, mockFrozenPathParamsWithoutUUID);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.resourcePath).toBe("/something/1234/else/" + mockResource.uuid);
		});

		it("should not add the resource uuid if it is undefined and there is no placeholder for it in the resourcePath", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:someId/else", defaultSerializer);
			mockResource.uuid = <any>undefined;

			switch (typeOfBuilder) {
				case "update":
					variantRequestBuilder = requestBuilder.update(mockResource, mockFrozenPathParamsWithoutUUID);
					break;
				case "delete":
					variantRequestBuilder = requestBuilder.delete(mockResource, mockFrozenPathParamsWithoutUUID);
					break;
				default:
					variantRequestBuilder = requestBuilder.get(<any>undefined, mockFrozenPathParamsWithoutUUID);
					break;
			}

			const request: StarkHttpRequest = variantRequestBuilder.build();
			expect(request.resourcePath).toBe("/something/1234/else");
		});

		it("should throw an error if the resourcePath contains a placeholder for the resource uuid but this is undefined", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:someId/else/:uuid", defaultSerializer);
			mockResource.uuid = <any>undefined;

			switch (typeOfBuilder) {
				case "update":
					expect(() => requestBuilder.update(mockResource, mockFrozenPathParamsWithoutUUID)).toThrowError(
						/resource uuid value is undefined/
					);
					break;
				case "delete":
					expect(() => requestBuilder.delete(mockResource, mockFrozenPathParamsWithoutUUID)).toThrowError(
						/resource uuid value is undefined/
					);
					break;
				default:
					expect(() => requestBuilder.get(<any>undefined, mockFrozenPathParamsWithoutUUID)).toThrowError(
						/resource uuid value is undefined/
					);
					break;
			}
		});
	});
}

// tslint:disable-next-line:no-big-function completed-docs*/
describe("Builder: StarkHttpRequestBuilder", () => {
	const mockBackend: StarkBackend = new StarkBackendImpl();
	let requestBuilder: StarkHttpRequestBuilder<MockResource>;
	let mockResource: StarkResource;

	beforeEach(() => {
		mockResource = new MockResource(resourceUuid);
		mockResource.etag = resourceEtag;
	});

	describe("on create", () => {
		testCommonFunctionality("create");

		testCustomSerialization("create");
	});

	describe("on update", () => {
		testCommonFunctionality("update");

		testCustomSerialization("update");

		testUUIDPathParamNormalization("update");

		it("should have requestType 'UPDATE_IDEMPOTENT' if isIdempotent param is set to TRUE", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

			const updateRequestBuilder: StarkHttpUpdateRequestBuilder<MockResource> = requestBuilder.update(
				mockResource,
				deepFreeze({ isIdempotent: true })
			);
			const request: StarkHttpRequest = updateRequestBuilder.build();
			expect(request.requestType).toBe(StarkHttpRequestType.UPDATE_IDEMPOTENT);
		});
	});

	describe("on delete", () => {
		testCommonFunctionality("delete");

		testCustomSerialization("delete");

		testUUIDPathParamNormalization("delete");

		it("should not set the If-Match header if the force parameter is set to TRUE", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

			const deleteRequestBuilder: StarkHttpDeleteRequestBuilder<MockResource> = requestBuilder.delete(
				mockResource,
				deepFreeze({ force: true })
			);
			const request: StarkHttpRequest = deleteRequestBuilder.build();
			assertHeaders(request.headers, new Map());
		});

		it("should set the If-Match header if the force parameter is not set", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

			const deleteRequestBuilder: StarkHttpDeleteRequestBuilder<MockResource> = requestBuilder.delete(mockResource);
			const request: StarkHttpRequest = deleteRequestBuilder.build();
			assertHeaders(request.headers, new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]));
		});

		it("should set the If-Match header if the force parameter is set to FALSE", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, "/something/:uuid", defaultSerializer);

			const deleteRequestBuilder: StarkHttpDeleteRequestBuilder<MockResource> = requestBuilder.delete(
				mockResource,
				deepFreeze({ force: false })
			);
			const request: StarkHttpRequest = deleteRequestBuilder.build();
			assertHeaders(request.headers, new Map([[StarkHttpHeaders.IF_MATCH, resourceEtag]]));
		});
	});

	describe("on get", () => {
		testCommonFunctionality("getSingle");

		testCustomSerialization("getSingle");

		testUUIDPathParamNormalization("getSingle");
	});

	describe("on get collection", () => {
		testCommonFunctionality("getCollection");

		testCustomSerialization("getCollection");
	});

	describe("on search", () => {
		let mockCriteria: { [key: string]: any };

		beforeEach(() => {
			mockCriteria = {
				field1: "anything",
				field2: {
					childField1: mockDate,
					childField2: {
						grandChildField1: ["someData", 123],
						anotherUndefinedField: undefined,
						anotherEmptyField: ""
					},
					someUndefinedField: undefined,
					someEmptyField: ""
				},
				undefinedField: undefined,
				emptyField: ""
			};
			mockResource = new MockResource(resourceUuid);
			mockResource.etag = resourceEtag;
		});

		testCommonFunctionality("search");

		testCustomSerialization("search");

		it("should filter out those criteria with empty value (default allowEmptyCriteria = false)", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

			const searchRequestBuilder: StarkHttpSearchRequestBuilder<MockResource> = requestBuilder.search(mockCriteria, 3, 5);

			const request: StarkHttpRequest = searchRequestBuilder.build();
			const requestCriteria: { [key: string]: any } = <{ [key: string]: any }>request.item;
			expect(requestCriteria).not.toBe(mockCriteria);
			/* tslint:disable:no-null-keyword completed-docs */
			expect(requestCriteria).toEqual({
				field1: "anything",
				field2: {
					childField1: mockDate.toISOString(),
					childField2: {
						grandChildField1: ["someData", 123],
						anotherUndefinedField: null // due to Serialize => with undefined returns null
						// anotherEmptyField: undefined   // empty values are omitted
					},
					someUndefinedField: null // due to Serialize => with undefined returns null
					// someEmptyField: undefined   // empty values are omitted
				},
				undefinedField: null // due to Serialize => with undefined returns null
				// emptyField: undefined   // empty values are omitted
			});
			/*tslint:disable:completed-docs*/
		});

		it("should leave the criteria 'as is', even those with empty value (allowEmptyCriteria = true)", () => {
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

			const searchRequestBuilder: StarkHttpSearchRequestBuilder<MockResource> = requestBuilder.search(
				mockCriteria,
				3,
				5,
				deepFreeze({
					allowEmptyCriteria: true
				})
			);

			const request: StarkHttpRequest = searchRequestBuilder.build();
			const requestCriteria: { [key: string]: any } = <{ [key: string]: any }>request.item;
			expect(requestCriteria).toBe(mockCriteria); // the criteria object remains unchanged
			expect(requestCriteria).toEqual(mockCriteria);
		});

		it("should serialize the criteria instance and filter out those criteria with empty value (default allowEmptyCriteria = false)", () => {
			const mockCriteriaInstance: MockCriteria = new MockCriteria();
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

			const searchRequestBuilder: StarkHttpSearchRequestBuilder<MockResource> = requestBuilder.search(mockCriteriaInstance, 3, 5);

			const request: StarkHttpRequest = searchRequestBuilder.build();
			const requestCriteria: { [key: string]: any } = <{ [key: string]: any }>request.item;
			expect(requestCriteria).not.toBe(mockCriteriaInstance);
			expect(requestCriteria.field1).toBe("anything");
			expect(requestCriteria.field2).toBeDefined();
			expect(requestCriteria.field2.childField1).toBe(mockDate.toISOString());
			expect(requestCriteria.field2.childField2).toBeDefined();
			expect(requestCriteria.field2.childField2.grandChildField1).toEqual(["someData", 123]);
			expect(requestCriteria.field2.childField2.hasOwnProperty("anotherUndefinedField")).toBe(false); // Serialize omits undefined class props
			expect(requestCriteria.field2.childField2.hasOwnProperty("anotherEmptyField")).toBe(false); // empty values are omitted
			expect(requestCriteria.field2.childField3).toBeDefined();
			expect(requestCriteria.field2.childField3 instanceof Object).toBe(true); // Map objects are serialized into simple objects
			expect(requestCriteria.field2.childField3.grandChildField1).toBe("whatever");
			expect(requestCriteria.field2.childField3.hasOwnProperty("anotherUndefinedField")).toBe(true); // object property (not class property)
			expect(requestCriteria.field2.childField3.anotherUndefinedField).toBeNull(); // due to Serialize => with undefined returns null
			expect(requestCriteria.field2.childField3.hasOwnProperty("anotherEmptyField")).toBe(false); // empty values are omitted
			expect(requestCriteria.field2.hasOwnProperty("someUndefinedField")).toBe(false); // Serialize omits undefined class properties
			expect(requestCriteria.field2.hasOwnProperty("someEmptyField")).toBe(false); // empty values are omitted
			expect(requestCriteria.hasOwnProperty("undefinedField")).toBe(false); // Serialize omits undefined class properties
			expect(requestCriteria.hasOwnProperty("emptyField")).toBe(false); // empty values are omitted
		});

		it("should leave the criteria instance 'as is' and include also those criteria with empty value (allowEmptyCriteria = true)", () => {
			const mockCriteriaInstance: MockCriteria = new MockCriteria();
			requestBuilder = new StarkHttpRequestBuilderImpl(mockBackend, resourcePath, defaultSerializer);

			const searchRequestBuilder: StarkHttpSearchRequestBuilder<MockResource> = requestBuilder.search(
				mockCriteriaInstance,
				3,
				5,
				deepFreeze({
					allowEmptyCriteria: true
				})
			);

			const request: StarkHttpRequest = searchRequestBuilder.build();
			const requestCriteria: { [key: string]: any } = <{ [key: string]: any }>request.item;
			expect(requestCriteria).toBe(mockCriteriaInstance); // the criteria instance remains unchanged
			expect(requestCriteria.field1).toBe("anything");
			expect(requestCriteria.field2).toBeDefined();
			expect(requestCriteria.field2.childField1).toBe(mockDate);
			expect(requestCriteria.field2.childField2).toBeDefined();
			expect(requestCriteria.field2.childField2.grandChildField1).toEqual(["someData", 123]);
			expect(requestCriteria.field2.childField2.hasOwnProperty("anotherUndefinedField")).toBe(true); // undefined values remain unchanged
			expect(requestCriteria.field2.childField2.anotherUndefinedField).toBeUndefined();
			expect(requestCriteria.field2.childField2.anotherEmptyField).toBe("");
			expect(requestCriteria.field2.childField3).toBeDefined();
			expect(requestCriteria.field2.childField3 instanceof Map).toBe(true); // Map objects remain unchanged
			expect(requestCriteria.field2.childField3.get("grandChildField1")).toBe("whatever");
			expect(requestCriteria.field2.childField3.has("anotherUndefinedField")).toBe(true);
			expect(requestCriteria.field2.childField3.get("anotherUndefinedField")).toBeUndefined();
			expect(requestCriteria.field2.childField3.get("anotherEmptyField")).toBe("");
			expect(requestCriteria.field2.hasOwnProperty("someUndefinedField")).toBe(true); // undefined values remain unchanged
			expect(requestCriteria.field2.someUndefinedField).toBeUndefined();
			expect(requestCriteria.field2.someEmptyField).toBe("");
			expect(requestCriteria.hasOwnProperty("undefinedField")).toBe(true); // undefined values remain unchanged
			expect(requestCriteria.undefinedField).toBeUndefined();
			expect(requestCriteria.emptyField).toBe("");
		});
	});
});

describe("Builder: StarkHttpCreateRequestBuilder", () => {
	function beforeEachFn(): StarkHttpRequestBuilderSpecVariables<StarkHttpCreateRequestBuilder<MockResource>> {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		const mockResource: StarkResource = new MockResource(resourceUuid);
		const mockRequest: StarkHttpRequest = {
			backend: mockBackend,
			resourcePath: resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.CREATE,
			item: mockResource,
			serializer: defaultSerializer
		};

		return {
			mockBackend: mockBackend,
			mockResource: mockResource,
			mockRequest: mockRequest,
			requestBuilder: new StarkHttpCreateRequestBuilderImpl(mockRequest)
		};
	}

	testEcho(beforeEachFn);

	testSetHeader(beforeEachFn);

	testAddQueryParameter(beforeEachFn);

	testAddQueryParameters(beforeEachFn);

	testSetQueryParameters(beforeEachFn);

	testSetPathParameters(beforeEachFn);

	testRetry(beforeEachFn);

	testBuild(beforeEachFn);
});

describe("Builder: StarkHttpDeleteRequestBuilder", () => {
	function beforeEachFn(): StarkHttpRequestBuilderSpecVariables<StarkHttpDeleteRequestBuilder<MockResource>> {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		const mockResource: StarkResource = new MockResource(resourceUuid);
		const mockRequest: StarkHttpRequest = {
			backend: mockBackend,
			resourcePath: resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.DELETE,
			item: mockResource,
			serializer: defaultSerializer
		};

		return {
			mockBackend: mockBackend,
			mockResource: mockResource,
			mockRequest: mockRequest,
			requestBuilder: new StarkHttpDeleteRequestBuilderImpl(mockRequest)
		};
	}

	testSetHeader(beforeEachFn);

	testAddQueryParameter(beforeEachFn);

	testAddQueryParameters(beforeEachFn);

	testSetQueryParameters(beforeEachFn);

	testSetPathParameters(beforeEachFn);

	testRetry(beforeEachFn);

	testBuild(beforeEachFn);
});

describe("Builder: StarkHttpUpdateRequestBuilder", () => {
	function beforeEachFn(): StarkHttpRequestBuilderSpecVariables<StarkHttpUpdateRequestBuilder<MockResource>> {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		const mockResource: StarkResource = new MockResource(resourceUuid);
		const mockRequest: StarkHttpRequest = {
			backend: mockBackend,
			resourcePath: resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.UPDATE,
			item: mockResource,
			serializer: defaultSerializer
		};

		return {
			mockBackend: mockBackend,
			mockResource: mockResource,
			mockRequest: mockRequest,
			requestBuilder: new StarkHttpUpdateRequestBuilderImpl(mockRequest)
		};
	}

	testSetHeader(beforeEachFn);

	testAddQueryParameter(beforeEachFn);

	testAddQueryParameters(beforeEachFn);

	testSetQueryParameters(beforeEachFn);

	testSetPathParameters(beforeEachFn);

	testRetry(beforeEachFn);

	testBuild(beforeEachFn);
});

describe("Builder: StarkHttpGetRequestBuilder", () => {
	function beforeEachFn(): StarkHttpRequestBuilderSpecVariables<StarkHttpGetRequestBuilder<MockResource>> {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		const mockRequest: StarkHttpRequest = {
			backend: mockBackend,
			resourcePath: resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.GET,
			item: { uuid: resourceUuid },
			serializer: defaultSerializer
		};

		return {
			mockBackend: mockBackend,
			mockResource: <any>undefined,
			mockRequest: mockRequest,
			requestBuilder: new StarkHttpGetRequestBuilderImpl(mockRequest)
		};
	}

	testSetHeader(beforeEachFn);

	testAddQueryParameter(beforeEachFn);

	testAddQueryParameters(beforeEachFn);

	testSetQueryParameters(beforeEachFn);

	testAddAcceptedLanguage(beforeEachFn);

	testAddFilterByInclude(beforeEachFn);

	testAddFilterByStyle(beforeEachFn);

	testAddSortBy(beforeEachFn);

	testSetPathParameters(beforeEachFn);

	testRetry(beforeEachFn);

	testBuild(beforeEachFn);
});

describe("Builder: StarkHttpGetCollectionRequestBuilder", () => {
	function beforeEachFn(): StarkHttpRequestBuilderSpecVariables<StarkHttpGetCollectionRequestBuilder<MockResource>> {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		const mockRequest: StarkHttpRequest = {
			backend: mockBackend,
			resourcePath: resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.GET_COLLECTION,
			item: { uuid: resourceUuid },
			serializer: defaultSerializer
		};

		return {
			mockBackend: mockBackend,
			mockResource: <any>undefined,
			mockRequest: mockRequest,
			requestBuilder: new StarkHttpGetCollectionRequestBuilderImpl(mockRequest)
		};
	}

	testSetHeader(beforeEachFn);

	testAddQueryParameter(beforeEachFn);

	testAddQueryParameters(beforeEachFn);

	testSetQueryParameters(beforeEachFn);

	testAddAcceptedLanguage(beforeEachFn);

	testAddFilterByInclude(beforeEachFn);

	testAddFilterByStyle(beforeEachFn);

	testAddSortBy(beforeEachFn);

	testSetPathParameters(beforeEachFn);

	testRetry(beforeEachFn);

	testBuild(beforeEachFn);
});

describe("Builder: StarkHttpSearchRequestBuilder", () => {
	function beforeEachFn(): StarkHttpRequestBuilderSpecVariables<StarkHttpSearchRequestBuilder<MockResource>> {
		const mockBackend: StarkBackend = new StarkBackendImpl();
		const mockCriteria: { [key: string]: any } = { field1: "anything", field2: "whatever" };
		const mockRequest: StarkHttpRequest = {
			backend: mockBackend,
			resourcePath: resourcePath,
			headers: new Map<string, string>(),
			queryParameters: new Map<string, string>(),
			requestType: StarkHttpRequestType.SEARCH,
			item: mockCriteria,
			serializer: defaultSerializer
		};

		return {
			mockBackend: mockBackend,
			mockResource: <any>mockCriteria,
			mockRequest: mockRequest,
			requestBuilder: new StarkHttpSearchRequestBuilderImpl(mockRequest)
		};
	}

	testSetHeader(beforeEachFn);

	testAddQueryParameter(beforeEachFn);

	testAddQueryParameters(beforeEachFn);

	testSetQueryParameters(beforeEachFn);

	testAddAcceptedLanguage(beforeEachFn);

	testAddFilterByInclude(beforeEachFn);

	testAddFilterByStyle(beforeEachFn);

	testAddSortBy(beforeEachFn);

	testSetPathParameters(beforeEachFn);

	testRetry(beforeEachFn);

	testBuild(beforeEachFn);
});

class MockResource implements StarkResource {
	public uuid: string;

	public constructor(uuid: string) {
		this.uuid = uuid;
	}
}

class MockCustomResource implements StarkResource {
	public uuid: string;
	public name: string;

	public constructor(uuid: string, name: string) {
		this.uuid = uuid;
		this.name = name;
	}
}

const defaultSerializer: StarkHttpSerializer<MockResource> = new StarkHttpSerializerImpl<MockResource>(MockResource);

class CustomSerializer implements StarkHttpSerializer<any> {
	public serialize(resource: any): string {
		return JSON.stringify(resource);
	}

	public deserialize(raw: string): any {
		return JSON.parse(raw);
	}
}

const customSerializer: StarkHttpSerializer<MockResource> = new CustomSerializer();

class MockCriteriaChildDetail {
	@serialize
	public grandChildField1: (string | number)[];
	@serialize
	public anotherUndefinedField: undefined;
	@serialize
	public anotherEmptyField: string;

	public constructor() {
		this.grandChildField1 = ["someData", 123];
		this.anotherUndefinedField = undefined;
		this.anotherEmptyField = "";
	}
}

class MockCriteriaDetail {
	@serialize
	public childField1: Date;
	@serializeAs(MockCriteriaChildDetail)
	public childField2: MockCriteriaChildDetail;
	@serializeAs(stringMap())
	public childField3: Map<string, any>;
	@serialize
	public someUndefinedField: undefined;
	@serialize
	public someEmptyField: string;

	public constructor() {
		this.childField1 = mockDate;
		this.childField2 = new MockCriteriaChildDetail();
		this.childField3 = new Map<string, any>();
		this.childField3.set("grandChildField1", "whatever");
		this.childField3.set("anotherUndefinedField", undefined);
		this.childField3.set("anotherEmptyField", "");
		this.someUndefinedField = undefined;
		this.someEmptyField = "";
	}
}

class MockCriteria {
	@serialize
	public field1: string;
	@serializeAs(MockCriteriaDetail)
	public field2: MockCriteriaDetail;
	@serialize
	public undefinedField: undefined;
	@serialize
	public emptyField: string;

	public constructor() {
		this.field1 = "anything";
		this.field2 = new MockCriteriaDetail();
		this.undefinedField = undefined;
		this.emptyField = "";
	}
}
