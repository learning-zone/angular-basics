import { Validator } from "class-validator";
import { StarkValidator } from "./validator.intf";
import {
	starkArraySizeRange,
	starkIsBBAN,
	starkIsBIC,
	starkIsCompanyNumber,
	starkIsDateTime,
	starkIsEstablishmentUnitNumber,
	starkIsIBAN,
	starkIsISIN,
	starkIsKBO,
	starkIsNIN,
	starkIsSupportedLanguage,
	starkMapNotEmpty
} from "./validators";
/**
 * @ignore
 */
export class StarkValidatorImpl extends Validator implements StarkValidator {
	public constructor() {
		super();
	}

	public starkMapNotEmpty(value: Map<any, any>): boolean {
		return starkMapNotEmpty(value);
	}

	public starkIsBBAN(value: string, countryCode: string): boolean {
		return starkIsBBAN(value, countryCode);
	}

	public starkIsBIC(value: string): boolean {
		return starkIsBIC(value);
	}

	public starkIsCompanyNumber(value: string): boolean {
		return starkIsCompanyNumber(value);
	}

	public starkIsEstablishmentUnitNumber(value: string): boolean {
		return starkIsEstablishmentUnitNumber(value);
	}

	public starkIsIBAN(value: string): boolean {
		return starkIsIBAN(value);
	}

	public starkIsISIN(value: string): boolean {
		return starkIsISIN(value);
	}

	public starkIsKBO(value: string): boolean {
		return starkIsKBO(value);
	}

	public starkIsNIN(value: string, countryCode: string): boolean {
		return starkIsNIN(value, countryCode);
	}

	public starkArraySizeRange(value: any[], minSize: number, maxSize: number): boolean {
		return starkArraySizeRange(value, minSize, maxSize);
	}

	public starkIsSupportedLanguage(value: string): boolean {
		return starkIsSupportedLanguage(value);
	}

	public starkIsDateTime(value: string): boolean {
		return starkIsDateTime(value);
	}
}
