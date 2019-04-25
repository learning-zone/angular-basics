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
	public valueForSlider: number = 100;
	public sliderValues: number[] = [100];
	public sliderConfig: StarkSliderConfig = {
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

	public toggleSliderEnable(): void {
		this.isSliderEnabled = !this.isSliderEnabled;
	}

	public onChangeSlider(values: number[]): void {
		this.valueForSlider = values[0];
	}

	public onChangeValueForSlider(event: any): void {
		this.sliderValues = [parseInt(event.target.value, 10)];
	}
}
