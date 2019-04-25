import { HttpRequest } from "@angular/common/http";
import { StarkXSRFService } from "@nationalbankbelgium/stark-core";

/**
 * Mock class of the StarkXSRFService interface.
 * @link StarkXSRFService
 */
export class MockStarkXsrfService implements StarkXSRFService {
	public configureHttpRequest: (request: HttpRequest<any>) => HttpRequest<any> = jasmine.createSpy("configureHttpRequest");

	public configureXHR: (xhr: XMLHttpRequest) => void = jasmine.createSpy("configureXHR");

	public getXSRFToken: () => string | undefined = jasmine.createSpy("getXSRFToken");

	public pingBackends: () => void = jasmine.createSpy("pingBackends");

	public storeXSRFToken: () => void = jasmine.createSpy("storeXSRFToken");
}
