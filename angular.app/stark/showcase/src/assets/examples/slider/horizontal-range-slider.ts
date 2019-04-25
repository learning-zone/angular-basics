import { Component } from "@angular/core";
import { StarkSliderConfig } from "@nationalbankbelgium/stark-ui";

export enum SLIDER_HANDLES {
	lower = 0,
	upper = 1
}

@Component({
	selector: "slider-demo",
	templateUrl: "./slider.component.html",
	styleUrls: ["./slider.component.scss"]
})
export class SliderComponent {
	public SLIDER_HANDLES: typeof SLIDER_HANDLES = SLIDER_HANDLES;

	public isSliderEnabled: boolean;
	public lowerValueForSlider: number = 100;
	public upperValueForSlider: number = 900;
	public sliderValues: number[] = [100, 900];
	public sliderConfig: StarkSliderConfig = {
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

	public toggleSliderEnable(): void {
		this.isSliderEnabled = !this.isSliderEnabled;
	}

	public onChangeSlider(values: number[]): void {
		this.lowerValueForSlider = values[0];
		this.upperValueForSlider = values[1];
	}

	public onChangeValueForSlider(event: any, sliderHandle: SLIDER_HANDLES): void {
		switch (sliderHandle) {
			case SLIDER_HANDLES.lower:
				this.sliderValues = [parseInt(event.target.value, 10), this.sliderValues[1]];
				break;

			case SLIDER_HANDLES.upper:
				this.sliderValues = [this.sliderValues[0], parseInt(event.target.value, 10)];
				break;

			default:
				break;
		}
	}
}
