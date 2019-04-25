/**
 * @ignore
 */
const _floor: Function = require("lodash/floor");

/**
 * @ignore
 * Name of the starkIsNIN validator
 */
export const starkIsNINValidatorName: string = "starkIsNIN";

/**
 * @ignore
 * Validator function that checks if the given input is a valid national identification number (NIN)
 * @param nin - the NIN to check
 * @param countryCode - the country code
 * @returns boolean - true if the given input is a valid NIN
 */
export function starkIsNIN(nin: string, countryCode: string): boolean {
	let isValid: boolean = false;
	if (typeof nin === "string" && typeof countryCode === "string" && nin !== "" && countryCode !== "") {
		if (countryCode.match(/^BE$/i)) {
			isValid = isValidBelgianNin(nin);
		} else {
			throw new Error("Only belgian national identification number are currently supported.");
		}
	}
	return isValid;
}

/**
 * @ignore
 * Validates that a given String is a valid National Register Number. <br/>
 * <br/>
 * The National Registration Number in Belgium is composed of 11 digits: <br/>
 * <li>the first 6 positions form the date of birth in reverse. For a person born 30th July 1985, the first 6 numbers are
 * 850730;</li> <br/>
 * <li>the following three positions are the daily counter of births. This figure is even and odd for women and men;</li><br/>
 * <li>the last 2 positions are the check digit.</li><br/>
 * <br/>
 * The check digit is a 2 digits number. This number is equal to 97 minus the remainder of the division by 97 the number formed: <br/>
 * <li>either by the first 9 digits of the NRN for people born before 1st January 2000;</li> <li>is followed by the
 * number 2 the first 9 digits of the NRN for people born after 31st December 1999.</li> <br/>
 * <br/>
 * Validation implementation: <br/>
 * <li>This validation do <b>not take into account any formatting pattern</b> and only parse digits.</li><br/>
 * <li>This validation assume that a <b>null value is valid</b>.</li><br/>
 * <li>This validation do <b>not return false when the birth date is not valid</b> because of <a href=
 * "http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?DETAIL=1984040333%2FF&caller=list&row_id=1&numero=1&rech=2&cn=1984040333&table
 * _name=LOI&nm=1984021129&la=F&cn_num_ecran=33&chercher=t&language=fr&fr=f&choix1=ET&choix2=ET&cn_y_ecran=1984&fromtab=justel&nl=n&sql=
 * %28+%28cn+contains+%271984040333%27%29+or+%28+%28dd+%3D+%271984-04-03%27%29+and++%28cn+contains+%2733%27%29+%29+%29and+actif+%3D+%27Y%27
 * &tri=dd+AS+RANK+&cn_d_ecran=03&cn_m_ecran=04&trier=promulgation&imgcn.x=38&imgcn.y=16#Art.4"
 * >Article 5</a></li><br/>
 * <li>This validation <b>cannot take into account centuries</b> when parsing the year of birth (e.g.: 33 could be interpreted
 * as 1933 or 2033).</li><br/>
 * <br/>
 * You can retrieve the official text of law by searching with this <a
 * href="http://www.ejustice.just.fgov.be/loi/loi.htm">form</a> and filling-in
 * the folder number with 1984-04-03/33.
 *
 */
function isValidBelgianNin(nin: string): boolean {
	const birthdayEndIndex: number = 6;
	const orderEndIndex: number = 9;
	const numberOfDigits: number = 11;

	const getBirthDate: Function = (value: string): string => {
		return value.substring(0, birthdayEndIndex);
	};

	const getOrder: Function = (value: string): string => {
		return value.substring(birthdayEndIndex, orderEndIndex);
	};

	if (typeof nin === "string") {
		nin = nin.replace(/[^0-9]/g, "");
		if (nin.length === numberOfDigits) {
			const checkDigits: number = parseInt(nin.substring(orderEndIndex, numberOfDigits), 10);
			const numberToCheck19thCentury: number = parseInt(getBirthDate(nin) + getOrder(nin), 10);
			const numberToCheck20thCentury: number = parseInt("2" + getBirthDate(nin) + getOrder(nin), 10);

			return 97 - _floor(numberToCheck19thCentury % 97) === checkDigits || 97 - _floor(numberToCheck20thCentury % 97) === checkDigits;
		}
	}

	return false;
}
