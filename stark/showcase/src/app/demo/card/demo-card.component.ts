import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-card",
	styleUrls: ["./demo-card.component.scss"],
	templateUrl: "./demo-card.component.html",
	encapsulation: ViewEncapsulation.None //used here to be able to customize the stark-full-width background color
})
export class DemoCardComponent implements OnInit {
	public basicCard: string;
	public advancedCard: string;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.basicCard = `<mat-card class="stark-card">
				<mat-card-header>
					<mat-card-title>
						<h3 translate>Card title</h3>
					</mat-card-title>
				</mat-card-header>
				<mat-card-content>
					<p>...</p>
				</mat-card-content>
			</mat-card>`;

		this.advancedCard = `<mat-card class="stark-card">
				<mat-card-header>
					<mat-card-title>
						<h3>Card title</h3>
					</mat-card-title>
					<mat-card-subtitle>
						<h4>Card subtitle</h4>
					</mat-card-subtitle>
					<div>
						<button color="white" mat-icon-button>
							<mat-icon svgIcon="cogs"></mat-icon>
						</button>
						<button color="white" mat-icon-button>
							<mat-icon svgIcon="dots-vertical"></mat-icon>
						</button>
					</div>
				</mat-card-header>
				<mat-card-content>
					<p>...</p>
					<div class="stark-full-width">	
						<h1>FULL WIDTH CONTAINER</h1>
					</div>
				</mat-card-content>
				<div class="stark-full-width"></div>
				<mat-card-actions>
					<button mat-raised-button color="primary">LIKE</button>
					<button mat-raised-button color="primary">SHARE</button>
				</mat-card-actions>
			</mat-card>`;
	}
}
