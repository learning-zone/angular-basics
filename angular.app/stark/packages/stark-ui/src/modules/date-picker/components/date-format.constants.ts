/**
 * Object containing the format of the dates displayed in the date picker
 * All formats can be found here: https://momentjs.com/docs/#/displaying/
 */
export const STARK_DATE_FORMATS: Object = {
	parse: {
		dateInput: "DD/MM/YYYY"
	},
	display: {
		dateInput: "LL",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "LL",
		monthYearA11yLabel: "MMMM YYYY"
	}
};
