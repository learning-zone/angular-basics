/* tslint:disable:completed-docs*/
import { StarkHttpRequest, StarkQueryParam, StarkResource } from "../entities";
import { StarkHttpBaseRequestBuilder } from "./http-abstract-base-request-builder.intf";
import { StarkUrlUtil } from "../../../util/url-util";
/**
 * @ignore
 */
export abstract class StarkAbstractHttpBaseRequestBuilder<T extends StarkResource> implements StarkHttpBaseRequestBuilder<T> {
	protected request: StarkHttpRequest<T>;

	public constructor(request: StarkHttpRequest<T>) {
		this.request = request;
	}

	public setHeader(name: string, value: string): this {
		if (typeof value !== "undefined") {
			this.request.headers.set(name, value);
		}
		return this;
	}

	public addQueryParameter(name: string, value: StarkQueryParam, allowUndefined: boolean = false, allowEmpty: boolean = false): this {
		if ((typeof value !== "undefined" || allowUndefined) && (value !== "" || allowEmpty)) {
			this.request.queryParameters.set(name, value);
		}
		return this;
	}

	public addQueryParameters(
		params: { [param: string]: StarkQueryParam },
		allowUndefined: boolean = false,
		allowEmpty: boolean = false
	): this {
		if (params) {
			for (const key of Object.keys(params)) {
				this.addQueryParameter(key, params[key], allowUndefined, allowEmpty);
			}
		}
		return this;
	}

	public setQueryParameters(
		params: { [param: string]: StarkQueryParam },
		allowUndefined: boolean = false,
		allowEmpty: boolean = false
	): this {
		if (params) {
			this.request.queryParameters = new Map<string, string>();
			this.addQueryParameters(params, allowUndefined, allowEmpty);
		}
		return this;
	}

	public setPathParameters(params: { [param: string]: string }): this {
		this.request.resourcePath = StarkUrlUtil.interpolateUrlWithParams(this.request.resourcePath, params);
		return this;
	}

	public retry(retryCount: number): this {
		if (retryCount >= 0) {
			this.request.retryCount = retryCount;
		}
		return this;
	}

	public build(): StarkHttpRequest<T> {
		return this.request;
	}
}
