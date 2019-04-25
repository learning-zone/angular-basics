/*tslint:disable:completed-docs*/
import { Observable } from "rxjs";
import { AbstractStarkHttpRepository } from "./http-abstract-repository";
import { StarkSerializable } from "../../../serialization";
import {
	StarkBackend,
	StarkCollectionResponseWrapper,
	StarkHttpRequest,
	StarkHttpRequestType,
	StarkResource,
	StarkSingleItemResponseWrapper
} from "../entities";
import { StarkHttpService } from "../services/http.service.intf";
import { MockStarkHttpService } from "../testing";
import { MockStarkLoggingService } from "../../logging/testing";
import { StarkLoggingService } from "../../logging/services";
import { StarkHttpRequestBuilderImpl } from "../builder";
import { StarkHttpSerializer, StarkHttpSerializerImpl } from "../serializer";
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;

// tslint:disable-next-line:no-big-function
describe("Repository: AbstractStarkHttpRepository", () => {
	let mockStarkHttpService: StarkHttpService<MockResource>;
	let mockLogger: StarkLoggingService;
	let mockBackend: SpyObj<StarkBackend>;
	let mockResourcePath: string;
	let mockResource: MockResource;
	const resourceUuid: string = "dummyUUID";
	const mockSerializer: StarkHttpSerializer<any> = new StarkHttpSerializerImpl();

	let repository: AbstractHttpRepositoryTestHelper;

	beforeEach(() => {
		mockStarkHttpService = new MockStarkHttpService();
		mockLogger = new MockStarkLoggingService();
		mockBackend = createSpyObj<StarkBackend>("backend", ["url"]);
		mockResourcePath = "mock";
		mockResource = new MockResource(resourceUuid);

		repository = new AbstractHttpRepositoryTestHelper(mockStarkHttpService, mockLogger, mockBackend, mockResourcePath, mockSerializer);
	});

	describe("on initialization", () => {
		it("should throw an error in case the backend config is missing", () => {
			expect(
				() => new AbstractHttpRepositoryTestHelper(mockStarkHttpService, mockLogger, <any>undefined, mockResourcePath)
			).toThrowError(/backend/);
		});

		it("should throw an error in case the resourcePath is missing", () => {
			expect(() => new AbstractHttpRepositoryTestHelper(mockStarkHttpService, mockLogger, mockBackend, <any>undefined)).toThrowError(
				/resourcePath/
			);
		});

		it("should NOT set the serializer if no serializer is passed in its constructor", () => {
			const repositoryWithDefaultSerializer: AbstractHttpRepositoryTestHelper = new AbstractHttpRepositoryTestHelper(
				mockStarkHttpService,
				mockLogger,
				mockBackend,
				mockResourcePath
			);

			expect(repositoryWithDefaultSerializer.serializer).toBeUndefined();
		});
	});

	describe("on create", () => {
		it("should create a create request using the builder and send it to the starkHttpServiceName", () => {
			const mockResponse: any = {};
			(<Spy>mockStarkHttpService.executeSingleItemRequest).and.returnValue(mockResponse);

			const result: Observable<StarkSingleItemResponseWrapper<MockResource>> = repository.create(mockResource);

			expect(mockStarkHttpService.executeSingleItemRequest).toHaveBeenCalled();
			const starkHttpRequest: StarkHttpRequest = <StarkHttpRequest>(
				(<Spy>mockStarkHttpService.executeSingleItemRequest).calls.mostRecent().args[0]
			);
			expect(starkHttpRequest.requestType).toBe(StarkHttpRequestType.CREATE);
			expect(starkHttpRequest.item).toBe(mockResource);
			expect(result).toBe(mockResponse);
		});
	});

	describe("on update", () => {
		it("should create an update request using the builder and send it to the starkHttpServiceName", () => {
			const mockResponse: any = {};
			(<Spy>mockStarkHttpService.executeSingleItemRequest).and.returnValue(mockResponse);

			const result: Observable<StarkSingleItemResponseWrapper<MockResource>> = repository.update(mockResource);

			expect(mockStarkHttpService.executeSingleItemRequest).toHaveBeenCalled();
			const starkHttpRequest: StarkHttpRequest = <StarkHttpRequest>(
				(<Spy>mockStarkHttpService.executeSingleItemRequest).calls.mostRecent().args[0]
			);
			expect(starkHttpRequest.requestType).toBe(StarkHttpRequestType.UPDATE);
			expect(starkHttpRequest.item).toBe(mockResource);
			expect(result).toBe(mockResponse);
		});
	});

	describe("on delete", () => {
		it("should create a delete request using the builder and send it to the starkHttpServiceName", () => {
			const mockResponse: any = {};
			(<Spy>mockStarkHttpService.executeSingleItemRequest).and.returnValue(mockResponse);

			const result: Observable<StarkSingleItemResponseWrapper<MockResource>> = repository.delete(mockResource);

			expect(mockStarkHttpService.executeSingleItemRequest).toHaveBeenCalled();
			const starkHttpRequest: StarkHttpRequest = <StarkHttpRequest>(
				(<Spy>mockStarkHttpService.executeSingleItemRequest).calls.mostRecent().args[0]
			);
			expect(starkHttpRequest.requestType).toBe(StarkHttpRequestType.DELETE);
			expect(starkHttpRequest.item).toBe(mockResource);
			expect(result).toBe(mockResponse);
		});
	});

	describe("on get", () => {
		it("should create a get request using the builder and send it to the starkHttpServiceName", () => {
			const mockResponse: any = {};
			(<Spy>mockStarkHttpService.executeSingleItemRequest).and.returnValue(mockResponse);

			const result: Observable<StarkSingleItemResponseWrapper<MockResource>> = repository.get(resourceUuid);

			expect(mockStarkHttpService.executeSingleItemRequest).toHaveBeenCalled();
			const starkHttpRequest: StarkHttpRequest = <StarkHttpRequest>(
				(<Spy>mockStarkHttpService.executeSingleItemRequest).calls.mostRecent().args[0]
			);
			expect(starkHttpRequest.requestType).toBe(StarkHttpRequestType.GET);
			expect(starkHttpRequest.item).toBeUndefined();
			expect(result).toBe(mockResponse);
		});
	});

	describe("on getCollection", () => {
		it("should create a getCollection request using the builder and send it to the starkHttpServiceName", () => {
			const mockResponse: any = {};
			(<Spy>mockStarkHttpService.executeCollectionRequest).and.returnValue(mockResponse);

			const result: Observable<StarkCollectionResponseWrapper<MockResource>> = repository.getCollection(10, 0);

			expect(mockStarkHttpService.executeCollectionRequest).toHaveBeenCalled();
			const starkHttpRequest: StarkHttpRequest = <StarkHttpRequest>(
				(<Spy>mockStarkHttpService.executeCollectionRequest).calls.mostRecent().args[0]
			);
			expect(starkHttpRequest.requestType).toBe(StarkHttpRequestType.GET_COLLECTION);
			expect(starkHttpRequest.item).toBeUndefined();
			expect(result).toBe(mockResponse);
		});
	});

	describe("on search", () => {
		it("should create a search request using the builder and send it to the starkHttpServiceName", () => {
			const mockResponse: any = {};
			(<Spy>mockStarkHttpService.executeCollectionRequest).and.returnValue(mockResponse);
			const mockCriteria: { [key: string]: any } = { field1: "anything", field2: "whatever" };

			const result: Observable<StarkCollectionResponseWrapper<MockResource>> = repository.search(mockCriteria, 10, 0);

			expect(mockStarkHttpService.executeCollectionRequest).toHaveBeenCalled();
			const starkHttpRequest: StarkHttpRequest = <StarkHttpRequest>(
				(<Spy>mockStarkHttpService.executeCollectionRequest).calls.mostRecent().args[0]
			);
			expect(starkHttpRequest.requestType).toBe(StarkHttpRequestType.SEARCH);
			expect(starkHttpRequest.item).toEqual(mockCriteria);
			expect(result).toBe(mockResponse);
		});
	});

	describe("on getRequestBuilder", () => {
		it("should get a new instance of StarkHttpRequestBuilder using the default repo resource path", () => {
			// by default the uuid is added to the end of the path if there is no explicit placeholder defined for it
			const interpolatedResourcePath: string = mockResourcePath + "/" + resourceUuid;
			expect(repository.getRequestBuilder() instanceof StarkHttpRequestBuilderImpl).toBe(true);

			let request: StarkHttpRequest = repository
				.getRequestBuilder()
				.create(mockResource)
				.build();
			// uuid placeholder is not added in a create request (no uuid needed)
			expect(request.resourcePath).toBe(mockResourcePath);

			request = repository
				.getRequestBuilder()
				.update(mockResource)
				.build();
			expect(request.resourcePath).toBe(interpolatedResourcePath);

			request = repository
				.getRequestBuilder()
				.delete(mockResource)
				.build();
			expect(request.resourcePath).toBe(interpolatedResourcePath);

			request = repository
				.getRequestBuilder()
				.get(resourceUuid)
				.build();
			expect(request.resourcePath).toBe(interpolatedResourcePath);

			request = repository
				.getRequestBuilder()
				.getCollection(10, 0)
				.build();
			// uuid placeholder is not interpolated by default in a getCollection request (no uuid needed)
			expect(request.resourcePath).toBe(mockResourcePath);

			const mockCriteria: { [key: string]: any } = { field1: "anything", field2: "whatever" };

			request = repository
				.getRequestBuilder()
				.search(mockCriteria, 10, 0)
				.build();
			// uuid placeholder is not interpolated by default in a search request (no uuid needed)
			expect(request.resourcePath).toBe(mockResourcePath);
		});

		it("should override the resource path with the one passed as parameter to construct the request", () => {
			const customResourcePath: string = "/custom/path/:uuid";
			const interpolatedCustomResourcePath: string = "/custom/path/" + resourceUuid;

			let request: StarkHttpRequest = repository
				.getRequestBuilder(customResourcePath)
				.create(mockResource)
				.build();
			// uuid placeholder is not interpolated by default in a create request (no uuid needed)
			expect(request.resourcePath).toBe(customResourcePath);

			request = repository
				.getRequestBuilder(customResourcePath)
				.update(mockResource)
				.build();
			expect(request.resourcePath).toBe(interpolatedCustomResourcePath);

			request = repository
				.getRequestBuilder(customResourcePath)
				.delete(mockResource)
				.build();
			expect(request.resourcePath).toBe(interpolatedCustomResourcePath);

			request = repository
				.getRequestBuilder(customResourcePath)
				.get(resourceUuid)
				.build();
			expect(request.resourcePath).toBe(interpolatedCustomResourcePath);

			request = repository
				.getRequestBuilder(customResourcePath)
				.getCollection(10, 0)
				.build();
			// uuid placeholder is not interpolated by default in a getCollection request (no uuid needed)
			expect(request.resourcePath).toBe(customResourcePath);

			const mockCriteria: { [key: string]: any } = { field1: "anything", field2: "whatever" };

			request = repository
				.getRequestBuilder(customResourcePath)
				.search(mockCriteria, 10, 0)
				.build();
			// uuid placeholder is not interpolated by default in a search request (no uuid needed)
			expect(request.resourcePath).toBe(customResourcePath);
		});

		it("should get a new instance of StarkHttpRequestBuilder using the default repo serializer and type", () => {
			// by default the uuid is added to the end of the path if there is no explicit placeholder defined for it
			expect(repository.getRequestBuilder() instanceof StarkHttpRequestBuilderImpl).toBe(true);
			expect(repository.serializer).toBe(mockSerializer);
			expect(repository.type).toBe(MockResource);

			let request: StarkHttpRequest = repository
				.getRequestBuilder()
				.create(mockResource)
				.build();
			expect(request.serializer).toBe(repository.serializer);

			request = repository
				.getRequestBuilder()
				.update(mockResource)
				.build();
			expect(request.serializer).toBe(repository.serializer);

			request = repository
				.getRequestBuilder()
				.delete(mockResource)
				.build();
			expect(request.serializer).toBe(repository.serializer);

			request = repository
				.getRequestBuilder()
				.get(resourceUuid)
				.build();
			expect(request.serializer).toBe(repository.serializer);

			request = repository
				.getRequestBuilder()
				.getCollection(10, 0)
				.build();
			expect(request.serializer).toBe(repository.serializer);

			const mockCriteria: { [key: string]: any } = { field1: "anything", field2: "whatever" };

			request = repository
				.getRequestBuilder()
				.search(mockCriteria, 10, 0)
				.build();
			expect(request.serializer).toBe(repository.serializer);
		});
	});
});

class AbstractHttpRepositoryTestHelper extends AbstractStarkHttpRepository<MockResource> {
	public serializer: StarkHttpSerializer<MockResource>;

	public constructor(
		starkHttpService: StarkHttpService<MockResource>,
		logger: StarkLoggingService,
		backend: StarkBackend,
		path: string,
		serializer?: StarkHttpSerializer<MockResource>
	) {
		super(starkHttpService, logger, backend, path, serializer);
	}

	public get type(): StarkSerializable {
		return MockResource;
	}
}

class MockResource implements StarkResource {
	public uuid: string;

	public constructor(uuid: string) {
		this.uuid = uuid;
	}
}
