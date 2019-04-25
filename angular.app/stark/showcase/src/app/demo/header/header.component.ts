import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-header",
	templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
	public headerHtml: string;
	public importSCSS: string;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.importSCSS = `@import "~@nationalbankbelgium/stark-ui/assets/themes/app-header-theme";`;

		this.headerHtml = `
		<header class="stark-app-header">
			<div class="stark-container">
				<div class="stark-app-bar">
					<div class="stark-app-bar-content-left">
						<div class="stark-actions">
							<button class="stark-home-button" color="white" mat-icon-button>
								<mat-icon starkSvgViewBox svgIcon="home"></mat-icon>
							</button>
							<button color="white" mat-icon-button (click)="sidenav.toggle()">
								<mat-icon starkSvgViewBox svgIcon="menu"></mat-icon>
							</button>
							<button color="white" mat-icon-button>
								<mat-icon starkSvgViewBox svgIcon="arrow-left"></mat-icon>
							</button>
						</div>
					</div>
		
					<div class="stark-app-bar-content-center">
						<div class="app-logo">
							<p>App Logo</p>
						</div>
					</div>
		
					<div class="stark-app-bar-content-right">
						<div>
							<div class="app-data">
								<p>App Data</p>
							</div>
							<button class="app-data-alt" color="white" mat-icon-button [matTooltip]="'STARK.ICONS.APP_DATA' | translate">
									<mat-icon starkSvgViewBox svgIcon="dots-vertical"></mat-icon>
							</button>
							<stark-app-logout></stark-app-logout>
						</div>
						<div>
							<div class="dropdown-lang">App Lang</div>
							<button color="white" mat-icon-button>
								<mat-icon starkSvgViewBox svgIcon="skip-next"></mat-icon>
							</button>
							<button color="white" mat-icon-button>
								<mat-icon starkSvgViewBox svgIcon="skip-previous"></mat-icon>
							</button>
						</div>
						<div class="stark-app-bar-content-right-actions-alt">
							<button mat-mini-fab [matTooltip]="'SHOWCASE.STYLEGUIDE.TITLE' | translate">
								<mat-icon starkSvgViewBox svgIcon="television-guide"></mat-icon>
							</button>
							<button mat-mini-fab color="success" [matTooltip]="'STARK.ICONS.ADD_ITEM' | translate">
								<mat-icon starkSvgViewBox svgIcon="plus"></mat-icon>
							</button>
							<button mat-mini-fab color="primary" [matTooltip]="'STARK.ICONS.SEARCH' | translate">
								<mat-icon starkSvgViewBox svgIcon="magnify"></mat-icon>
							</button>
						</div>
					</div>
					<div class="stark-app-bar-page-title">
						<h1>STARK</h1>
					</div>
				</div>
			</div>
		</header>`;
	}
}
