import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-footer",
	templateUrl: "./demo-footer.component.html"
})
export class DemoFooterComponent implements OnInit {
	public footerHtml: string;
	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.footerHtml = `<stark-app-footer
	legalInfoUrl="https://www.nbb.be/en/disclaimer-and-legal-information"
	helpPageUrl="https://www.nbb.be/en/links">

	<!-- Included html will be displayed at the left of the footer -->
	<a htref="https://www.some-page.com/">Some link</a>

</stark-app-footer>`;
	}
}
