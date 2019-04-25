import { StarkSliderPips } from "./slider-pips.intf";

/**
 * The StarkSliderFormatter is an interface to be used together with the StarkSliderConfig
 * when using advanced formatting options for the the Slider component.
 */
export interface StarkSliderFormatter {
	/**
	 * Create an instance of the slider component
	 */
	to(rawValue: number): string; // format a number

	/**
	 * Function to parse the formatted string back to a number
	 */
	from(formattedValue: string): number; // get a number back
}

/**
 * StarkSliderConfig is an interface to implement when using the Slider component.
 * It is in fact a subset of the options supported by the noUiSlider library
 */
export interface StarkSliderConfig {
	/**
	 * Several ways to handle user interaction.
	 * See: https://refreshless.com/nouislider/behaviour-option/
	 */
	behaviour?: string;

	/**
	 * This can be used to control the (green) bar between the handles, or the edges of the slider.
	 * See: https://refreshless.com/nouislider/slider-options/#section-Connect
	 */
	connect?: boolean | boolean[];

	/**
	 * Formatter containing to() function to encode the values and a from() function to decode them.
	 */
	format?: StarkSliderFormatter;

	/**
	 * Slider's orientation: "horizontal" or "vertical". Default: "horizontal".
	 * In case of vertical sliders, Stark sets a default height with CSS rules which you can override if needed.
	 */
	orientation?: "horizontal" | "vertical";

	/**
	 * Config object to define how the pips will be displayed in the slider.
	 */
	pips?: StarkSliderPips;

	/**
	 * All the values that are part of the range. The object should contain at least "min" and "max" properties.
	 * See: https://refreshless.com/nouislider/slider-values/#section-range
	 */
	range: {
		min: number | number[];
		max: number | number[];
		[value: string]: number | number[];
	};

	/**
	 * The minimum amount of units that an slider can change within the range.
	 * See: https://refreshless.com/nouislider/slider-values/#section-step
	 */
	step?: number;

	/**
	 * Enable/disable the display of tooltips. Default: false.
	 * You can also pass a formatter function to format the tooltips content.
	 * See: https://refreshless.com/nouislider/slider-options/#section-tooltips
	 */
	tooltips?: boolean | boolean[] | StarkSliderFormatter;
}
