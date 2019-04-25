import { StarkDateUtil } from "./date.util";

// tslint:disable-next-line:no-big-function
describe("Util: DateUtil", () => {
	const dateTimeFormat: string = "YYYY-MM-DD HH:mm:ss.SSS";
	const dateString: string = "2016-03-18T18:25:43.511Z";

	describe("parseDateWithFormat", () => {
		it("should return a valid Date when different valid dateStrings are provided using the same format", () => {
			const expectedDate: Date = new Date();

			// full date-time
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 25, 43, 511);
			let parsedDate: Date = <Date>StarkDateUtil.parseDateWithFormat("2016-03-18T18:25:43.511Z", dateTimeFormat);
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// no milliseconds
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 25, 43, 0); // default milliseconds = 0
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("2016-03-18 18:25:43", dateTimeFormat);
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// no seconds-milliseconds
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 25, 0, 0); // default seconds = 0 and milliseconds = 0
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("2016-03-18 18:25", dateTimeFormat);
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// no minutes-seconds-milliseconds
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 0, 0, 0); // default minutes = 0, seconds = 0 and milliseconds = 0
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("2016-03-18 18", dateTimeFormat);
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// only date
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(0, 0, 0, 0);
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("2016-03-18", dateTimeFormat);
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// only year-month
			expectedDate.setFullYear(2016, 2, 1); // default day = 1
			expectedDate.setHours(0, 0, 0, 0);
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("2016-03", dateTimeFormat);
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// only year
			expectedDate.setFullYear(2016, 0, 1); // default month = 0 and day = 1
			expectedDate.setHours(0, 0, 0, 0);
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("2016", dateTimeFormat);
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());
		});

		it("should return a valid Date when the same dateString is used and passing different formats", () => {
			const expectedDate: Date = new Date();

			// full date-time (UTC format and including milliseconds)
			expectedDate.setUTCFullYear(2016, 2, 18);
			expectedDate.setUTCHours(18, 25, 43, 511);
			let parsedDate: Date = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM-DD HH:mm:ss.SSS ZZ");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM-DD HH:mm:ss.SSS Z");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// full date-time (including milliseconds)
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 25, 43, 511);
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM-DD HH:mm:ss.SSS");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// no milliseconds
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 25, 43, 0); // default milliseconds = 0
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM-DD HH:mm:ss");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// no seconds-milliseconds
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 25, 0, 0); // default seconds = 0 and milliseconds = 0
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM-DD HH:mm");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// no minutes-seconds-milliseconds
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(18, 0, 0, 0); // default minutes = 0, seconds = 0 and milliseconds = 0
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM-DD HH");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// only date
			expectedDate.setFullYear(2016, 2, 18);
			expectedDate.setHours(0, 0, 0, 0);
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM-DD");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// only year-month
			expectedDate.setFullYear(2016, 2, 1); // default day = 1
			expectedDate.setHours(0, 0, 0, 0);
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY-MM");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// only year
			expectedDate.setFullYear(2016, 0, 1); // default month = 0 and day = 1
			expectedDate.setHours(0, 0, 0, 0);
			parsedDate = <Date>StarkDateUtil.parseDateWithFormat(dateString, "YYYY");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());
		});

		it("should return a valid Date when the same date is represented in different formats", () => {
			const expectedDate: Date = new Date();
			expectedDate.setUTCFullYear(2016, 2, 18);
			expectedDate.setUTCHours(17, 25, 43, 511);

			// using UTC timezone

			let parsedDate: Date = <Date>StarkDateUtil.parseDateWithFormat("18-03-2016T18:25:43.511Z", "DD-MM-YYYY HH:mm:ss.SSS");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("03/18/2016 17:25:43.511 +0000", "MM-DD-YYYY HH:mm:ss.SSS Z");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			// using current timezone (GMT)

			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("18/03/2016 6:25:43.511pm", "DD-MM-YYYY h:m:s:Sa");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());

			parsedDate = <Date>StarkDateUtil.parseDateWithFormat("03/18/2016 18:25:43.511 +01:00", "MM-DD-YYYY HH:mm:ss.SSS Z");
			expect(parsedDate instanceof Date).toBe(true);
			expect(parsedDate.getTime()).toEqual(expectedDate.getTime());
		});

		it("should return UNDEFINED if the dateString does not represent a valid date", () => {
			let parsedDate: undefined = <undefined>StarkDateUtil.parseDateWithFormat(<any>undefined, dateTimeFormat);
			expect(parsedDate).toBeUndefined();

			parsedDate = <undefined>StarkDateUtil.parseDateWithFormat("", dateTimeFormat);
			expect(parsedDate).toBeUndefined();

			parsedDate = <undefined>StarkDateUtil.parseDateWithFormat("not a valid date", dateTimeFormat);
			expect(parsedDate).toBeUndefined();

			// invalid month
			parsedDate = <undefined>StarkDateUtil.parseDateWithFormat("2016-13-18 18:25:43", dateTimeFormat);
			expect(parsedDate).toBeUndefined();

			// invalid day
			parsedDate = <undefined>StarkDateUtil.parseDateWithFormat("2016-03-33 18:25:43", dateTimeFormat);
			expect(parsedDate).toBeUndefined();

			// invalid hour
			parsedDate = <undefined>StarkDateUtil.parseDateWithFormat("2016-03-18 24:25:43", dateTimeFormat);
			expect(parsedDate).toBeUndefined();

			// invalid minute
			parsedDate = <undefined>StarkDateUtil.parseDateWithFormat("2016-03-18 18:65:43", dateTimeFormat);
			expect(parsedDate).toBeUndefined();

			// invalid second
			parsedDate = <undefined>StarkDateUtil.parseDateWithFormat("2016-03-18 18:25:63", dateTimeFormat);
			expect(parsedDate).toBeUndefined();
		});
	});

	describe("format", () => {
		it("should return the date in a formatted string based on the given format", () => {
			// IMPORTANT: in case the date string has a timezone, it should have a ':' between the hours and the minutes
			// otherwise IE will fail to parse it returning "Invalid Date"
			const mockDate: Date = new Date("2016-03-18T10:25:43.511+01:00");

			// another way to create a date
			// const mockDate: Date = new Date();
			// mockDate.setFullYear(2016, 2, 18);
			// mockDate.setHours(10, 25, 43, 511);

			// yet another way to create a Date simulating what the browser does when receiving JSON data from HTTP responses
			// and again the same restriction for timezones: they should have a ':' between the hours and the minutes
			// const mockDate: any = JSON.parse('{"parsedDate":"2016-03-18T10:25:43.511+01:00"}').parsedDate;

			let formattedDate: string = StarkDateUtil.format(mockDate, "YYYY MM DD");
			expect(formattedDate).toBe("2016 03 18");

			formattedDate = StarkDateUtil.format(mockDate, "YYYY MM DD hh:mm:ss");
			expect(formattedDate).toBe("2016 03 18 10:25:43");

			formattedDate = StarkDateUtil.format(mockDate, "YYYY MM DD hh:mm:ss.SSS");
			expect(formattedDate).toBe("2016 03 18 10:25:43.511");

			formattedDate = StarkDateUtil.format(mockDate, "YYYY MM DD hh:mm:ss.SSS Z");
			expect(formattedDate).toBe("2016 03 18 10:25:43.511 +01:00");

			formattedDate = StarkDateUtil.format(mockDate, "YYYY MM DD hh:mm:ss.SSS ZZ");
			expect(formattedDate).toBe("2016 03 18 10:25:43.511 +0100");

			formattedDate = StarkDateUtil.format(mockDate, "MM/DD hh:mm");
			expect(formattedDate).toBe("03/18 10:25");

			formattedDate = StarkDateUtil.format(mockDate, "DD/MM/YYYY hh:mm A");
			expect(formattedDate).toBe("18/03/2016 10:25 AM");

			formattedDate = StarkDateUtil.format(mockDate, "D MMM YYYY");
			expect(formattedDate).toBe("18 Mar 2016");
		});

		it("should return the date in a formatted string based on the default format if no format is defined", () => {
			const mockDate: Date = new Date();
			mockDate.setFullYear(2016, 2, 18);
			mockDate.setHours(10, 25, 43, 511);

			const formattedDate: string = StarkDateUtil.format(mockDate);
			expect(formattedDate).toBe("18-03-2016");
		});

		it("should return 'invalid format' when the given format is invalid", () => {
			const mockDate: Date = new Date();
			mockDate.setFullYear(2016, 2, 18);
			mockDate.setHours(10, 25, 43, 511);

			let formattedDate: string = StarkDateUtil.format(mockDate, "not a valid format");
			expect(formattedDate).toBe("invalid format");

			formattedDate = StarkDateUtil.format(mockDate, "today is DD/MM/YYY");
			expect(formattedDate).toBe("invalid format");
		});

		it("should return 'invalid date' when the given date or the format is invalid", () => {
			const mockFormat: string = "DD-MM-YYYY";

			let formattedDate: string = StarkDateUtil.format(<any>undefined, mockFormat);
			expect(formattedDate).toBe("invalid date");

			formattedDate = StarkDateUtil.format(<any>"not a a valid date", mockFormat);
			expect(formattedDate).toBe("invalid date");
		});
	});
});
