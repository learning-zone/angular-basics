/* tslint:disable:completed-docs*/
import moment from "moment";
import { autoserialize } from "cerialize";

import { StarkError } from "./error.intf";
/**
 * @ignore
 */
export class StarkErrorImpl implements StarkError {
	@autoserialize
	public message?: string;
	@autoserialize
	public name?: string;
	@autoserialize
	public stack?: string;
	@autoserialize
	public correlationId?: string;
	@autoserialize
	public timestamp?: string;

	public constructor(error?: Error | string) {
		let starkError: Error;

		if (!error) {
			starkError = new Error();
			this.message = "";
		} else {
			if (!(error instanceof Error)) {
				starkError = new Error(error);
			} else {
				starkError = error;
			}

			this.message = starkError.message;
		}

		this.name = "STARK_ERROR";
		this.stack = this.getStackTrace(starkError);
		this.timestamp = moment().format(); // ISO-8601 format
	}

	private getStackTrace(error: Error): string {
		try {
			if (!error || !error.stack) {
				error = new Error();
			}

			let stackTrace: string = <string>error.stack;
			let index: number;

			// remove the original error message, to keep only the stacktrace
			if (stackTrace.toLowerCase().startsWith("error")) {
				index = stackTrace.toLowerCase().indexOf("at");
				stackTrace = stackTrace.substr(index);
			}

			// remove own reference from the stacktrace
			index = stackTrace.toLowerCase().indexOf("starkerrorimpl");
			if (index >= 0) {
				index = stackTrace.toLowerCase().indexOf("at", index + 1);
				stackTrace = stackTrace.substr(index);
			}

			return stackTrace;
		} catch {
			return "";
		}
	}
}
