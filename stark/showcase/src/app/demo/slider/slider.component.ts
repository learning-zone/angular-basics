import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkSliderConfig } from "@nationalbankbelgium/stark-ui";

export enum SLIDER_HANDLES {
	lower = 0,
	upper = 1
}

@Component({
	selector: "showcase-demo-slider",
	templateUrl: "./slider.component.html",
	styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements OnInit {
	public SLIDER_HANDLES: typeof SLIDER_HANDLES = SLIDER_HANDLES;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public loggingService: StarkLoggingService) {}

	/***
	 * Simple Horizontal Slider
	 */
	public isSimpleHorizontalSliderEnabled: boolean;
	public valueForSimpleHorizontalSlider: number = 100;
	public simpleHorizontalSliderValues: number[] = [100];
	public simpleHorizontalSliderConfig: StarkSliderConfig = {
		connect: [true, false],
		tooltips: [true],
		step: 10,
		range: {
			min: 0,
			max: 1000
		},
		pips: {
			mode: "values",
			values: [0, 250, 500, 750, 1000],
			density: 6
		}
	};

	/***
	 * Horizontal Range Slider
	 */
	public isHorizontalRangeSliderEnabled: boolean;
	public lowerValueForHorizontalRangeSlider: number = 100;
	public upperValueForHorizontalRangeSlider: number = 900;
	public horizontalRangeSliderValues: number[] = [100, 900];
	public horizontalRangeSliderConfig: StarkSliderConfig = {
		connect: [false, true, false],
		tooltips: [true, true],
		step: 10,
		range: {
			min: 0,
			max: 1000
		},
		pips: {
			mode: "values",
			values: [0, 250, 500, 750, 1000],
			density: 6
		}
	};

	/***
	 * Simple Vertical Slider
	 */
	public isSimpleVerticalSliderEnabled: boolean;
	public valueForSimpleVerticalSlider: number = 100;
	public simpleVerticalSliderValues: number[] = [100];
	public simpleVerticalSliderConfig: StarkSliderConfig = {
		connect: [true, false],
		orientation: "vertical",
		tooltips: [true],
		step: 10,
		range: {
			min: 0,
			max: 1000
		},
		pips: {
			mode: "values",
			values: [0, 250, 500, 750, 1000],
			density: 6
		}
	};

	/***
	 * Vertical Range Slider
	 */
	public isVerticalRangeSliderEnabled: boolean;
	public lowerValueForVerticalRangeSlider: number = 100;
	public upperValueForVerticalRangeSlider: number = 900;
	public verticalRangeSliderValues: number[] = [100, 900];
	public verticalRangeSliderConfig: StarkSliderConfig = {
		connect: [false, true, false],
		orientation: "vertical",
		tooltips: [true, true],
		step: 10,
		range: {
			min: 0,
			max: 1000
		},
		pips: {
			mode: "values",
			values: [0, 250, 500, 750, 1000],
			density: 6
		}
	};

	public ngOnInit(): void {
		this.loggingService.debug("Hello from the `Slider` component");
		this.isSimpleHorizontalSliderEnabled = true;
		this.isHorizontalRangeSliderEnabled = true;
		this.isSimpleVerticalSliderEnabled = true;
		this.isVerticalRangeSliderEnabled = true;
	}

	/***
	 * Simple Horizontal Slider
	 */
	public toggleSimpleHorizontalSliderEnable(): void {
		this.isSimpleHorizontalSliderEnabled = !this.isSimpleHorizontalSliderEnabled;
	}

	public onChangeSimpleHorizontalSlider(values: number[]): void {
		this.valueForSimpleHorizontalSlider = values[0];
	}

	public onChangeValueForSimpleHorizontalSlider(event: any): void {
		this.simpleHorizontalSliderValues = [parseInt(event.target.value, 10)];
	}

	/***
	 * Horizontal Range Slider
	 */
	public toggleHorizontalRangeSliderEnable(): void {
		this.isHorizontalRangeSliderEnabled = !this.isHorizontalRangeSliderEnabled;
	}

	public onChangeHorizontalRangeSlider(values: number[]): void {
		this.lowerValueForHorizontalRangeSlider = values[0];
		this.upperValueForHorizontalRangeSlider = values[1];
	}

	public onChangeValueForHorizontalRangeSlider(event: any, sliderHandle: SLIDER_HANDLES): void {
		switch (sliderHandle) {
			case SLIDER_HANDLES.lower:
				this.horizontalRangeSliderValues = [parseInt(event.target.value, 10), this.horizontalRangeSliderValues[1]];
				break;

			case SLIDER_HANDLES.upper:
				this.horizontalRangeSliderValues = [this.horizontalRangeSliderValues[0], parseInt(event.target.value, 10)];
				break;

			default:
				break;
		}
	}

	/***
	 * Simple Vertical Slider
	 */
	public toggleSimpleVerticalSliderEnable(): void {
		this.isSimpleVerticalSliderEnabled = !this.isSimpleVerticalSliderEnabled;
	}

	public onChangeSimpleVerticalSlider(values: number[]): void {
		this.valueForSimpleVerticalSlider = values[0];
	}

	public onChangeValueForSimpleVerticalSlider(event: any): void {
		this.simpleVerticalSliderValues = [parseInt(event.target.value, 10)];
	}

	/***
	 * Vertical Range Slider
	 */
	public toggleVerticalRangeSliderEnable(): void {
		this.isVerticalRangeSliderEnabled = !this.isVerticalRangeSliderEnabled;
	}

	public onChangeVerticalRangeSlider(values: number[]): void {
		this.lowerValueForVerticalRangeSlider = values[0];
		this.upperValueForVerticalRangeSlider = values[1];
	}

	public onChangeValueForVerticalRangeSlider(event: any, sliderHandle: SLIDER_HANDLES): void {
		switch (sliderHandle) {
			case SLIDER_HANDLES.lower:
				this.verticalRangeSliderValues = [parseInt(event.target.value, 10), this.verticalRangeSliderValues[1]];
				break;

			case SLIDER_HANDLES.upper:
				this.verticalRangeSliderValues = [this.verticalRangeSliderValues[0], parseInt(event.target.value, 10)];
				break;

			default:
				break;
		}
	}
}
