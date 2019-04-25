import { DeserializeInto } from "cerialize";
import { HttpErrorResponse } from "@angular/common/http";
import { StarkHttpError } from "./http-error.entity.intf";
import { StarkHttpErrorImpl } from "./http-error.entity";
import { StarkHttpErrorWrapper } from "./http-error-wrapper.entity.intf";
import { StarkHttpStatusCodes } from "../../enumerators";
/**
 * @ignore
 */
export class StarkHttpErrorWrapperImpl implements StarkHttpErrorWrapper {
	/** @internal */
	private _starkHttpStatusCode: StarkHttpStatusCodes;
	// TODO: return the Angular HttpHeaders or still return our own Map?
	/** @internal */
	private _starkHttpHeaders: Map<string, string>;
	/** @internal */
	private _httpError: StarkHttpError;

	public constructor(httpErrorResponse: HttpErrorResponse, httpResponseHeaders: Map<string, string>, error: Error) {
		this._starkHttpStatusCode = httpErrorResponse.status;
		this._starkHttpHeaders = httpResponseHeaders;
		this._httpError = new StarkHttpErrorImpl(error);
		this._httpError = DeserializeInto(httpErrorResponse.error, StarkHttpErrorImpl, this._httpError);
	}

	public get starkHttpStatusCode(): StarkHttpStatusCodes {
		return this._starkHttpStatusCode;
	}

	public get starkHttpHeaders(): Map<string, string> {
		return this._starkHttpHeaders;
	}

	public get httpError(): StarkHttpError {
		return this._httpError;
	}
}
