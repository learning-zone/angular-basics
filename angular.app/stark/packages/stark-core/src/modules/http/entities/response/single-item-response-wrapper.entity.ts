import { StarkSingleItemResponseWrapper } from "./single-item-response-wrapper.entity.intf";
import { StarkResource } from "../resource.entity.intf";
import { StarkHttpStatusCodes } from "../../enumerators";
/**
 * @ignore
 */
export class StarkSingleItemResponseWrapperImpl<T extends StarkResource> implements StarkSingleItemResponseWrapper<T> {
	/** @internal */
	private _starkHttpStatusCode: StarkHttpStatusCodes;
	// TODO: return the Angular HttpHeaders or still return our own Map?
	/** @internal */
	private _starkHttpHeaders: Map<string, string>;
	/** @internal */
	private _data: T;

	public constructor(starkHttpStatusCode: StarkHttpStatusCodes, starkHttpHeaders: Map<string, string>, data: T) {
		this._starkHttpStatusCode = starkHttpStatusCode;
		this._starkHttpHeaders = starkHttpHeaders;
		this._data = data;
	}

	public get starkHttpStatusCode(): StarkHttpStatusCodes {
		return this._starkHttpStatusCode;
	}

	public get starkHttpHeaders(): Map<string, string> {
		return this._starkHttpHeaders;
	}

	public get data(): T {
		return this._data;
	}
}
