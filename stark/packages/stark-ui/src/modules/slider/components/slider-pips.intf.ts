import * as noUiSlider from "nouislider";
import { StarkSliderFormatter } from "./slider-config.intf";

/**
 * The StarkSliderFormatter is an interface to be used together with the StarkSliderConfig
 * when using advanced options for the the Slider component. It is in fact a subset of the noUiSlider Pips options.
 */
export interface StarkSliderPips extends noUiSlider.PipsOptions {
	/**
	 * Formatter containing to() function to encode the values and a from() function to decode them.
	 */
	format?: StarkSliderFormatter;
}
