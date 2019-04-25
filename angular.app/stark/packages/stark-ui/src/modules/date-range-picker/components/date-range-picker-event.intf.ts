/**
 * Event to be emitted by the Stark Date Range Picker component when the date range changes
 */
export interface StarkDateRangePickerEvent {
	/**
	 * Selected start date
	 */
	startDate?: Date;

	/**
	 * Selected end date
	 */
	endDate?: Date;
}
