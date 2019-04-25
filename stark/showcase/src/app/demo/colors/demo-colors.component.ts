import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-colors",
	templateUrl: "./demo-colors.component.html"
})
export class DemoColorsComponent implements OnInit {
	public simpleMap: string;
	public advancedMap: string;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.advancedMap = `
            $dark-primary-text: rgba(black, 0.87);
            $light-primary-text: white;

            $stark-primary-palette: (
                50: #e0eff8,
                100: #b3d6ef,
                200: #80bbe4,
                300: #4d9fd9,
                400: #268bd0,
                500: #0076c8,
                600: #006ec2,
                700: #0063bb,
                800: #0059b4,
                900: #143e74,
                A100: #d1e1ff,
                A200: #9ec0ff,
                A400: #6b9eff,
                A700: #528eff,
                contrast: (
                  50: $dark-primary-text,
                  100: $dark-primary-text,
                  200: $dark-primary-text,
                  300: $dark-primary-text,
                  400: $light-primary-text,
                  500: $light-primary-text,
                  600: $light-primary-text,
                  700: $light-primary-text,
                  800: $light-primary-text,
                  900: $light-primary-text,
                  A100: $dark-primary-text,
                  A200: $dark-primary-text,
                  A400: $dark-primary-text,
                  A700: $dark-primary-text
                )
            );

            @import "~@nationalbankbelgium/stark-ui/assets/themes/theming";
        `;

		this.simpleMap = `
            $dark-primary-text: rgba(black, 0.87);
            $light-primary-text: white;

            $stark-color-theme: (
                accent: (
                color: #8f0039,
                contrast: $light-primary-text
                ),
                alert: (
                color: #d32f2f,
                contrast: $light-primary-text
                ),
                alt: (
                color: #323232,
                contrast: $light-primary-text
                ),
                neutral: (
                color: #bfbfbf,
                contrast: $light-primary-text
                ),
                primary: (
                color: #0076c8,
                contrast: $light-primary-text
                ),
                success: (
                color: #4caf50,
                contrast: $light-primary-text
                ),
                warning: (
                color: #ff9800,
                contrast: $light-primary-text
                ),
                white-transp: (
                color: rgba(255, 255, 255, 0.87),
                contrast: $dark-primary-text
                )
            );

            @import "~@nationalbankbelgium/stark-ui/assets/themes/theming";
		`;
	}
}
