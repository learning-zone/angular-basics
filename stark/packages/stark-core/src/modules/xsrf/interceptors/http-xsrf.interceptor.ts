import { Inject, Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { StarkXSRFService, STARK_XSRF_SERVICE } from "../services/xsrf.service.intf";

/**
 * Angular Http interceptor that adds the XSRF configuration to every state-changing request (POST,PUT,PATCH and DELETE)
 * and stores the XSRF token from every response.
 *
 * Defined in the HttpClientXsrfModule set in packages/stark-core/src/modules/http/http.module.ts
 */
@Injectable()
export class StarkXSRFHttpInterceptor implements HttpInterceptor {
	public constructor(@Inject(STARK_XSRF_SERVICE) public xsrfService: StarkXSRFService) {}

	/**
	 * @param request - The intercepted outgoing `HttpRequest`
	 * @param next - The next request handler where the `HttpRequest` will be forwarded to
	 * @returns The modified `HttpRequest` with the XSRF configuration enabled.
	 */
	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const xsrfProtectedRequest: HttpRequest<any> = this.xsrfService.configureHttpRequest(request);

		return next
			.handle(xsrfProtectedRequest) // pass request through to the next request handler
			.pipe(
				// the Http response is intercepted in order to extract and store the XSRF token via the XSRF service
				tap((_httpResponse: HttpEvent<any>) => {
					this.xsrfService.storeXSRFToken();
				})
			);
	}
}
