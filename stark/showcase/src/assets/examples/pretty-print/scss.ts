import { Component, OnInit } from "@angular/core";

@Component({
	selector: "pretty-print-example",
	templateUrl: "./pretty-print.component.html",
	styleUrls: ["./pretty-print.component.scss"]
})
export class PrettyPrintComponent implements OnInit {
	public rawScssData: string;

	public ngOnInit(): void {
		this.rawScssData = [
			"$font-stack: Helvetica, sans-serif; $primary-color: #333; body { font: 100% $font-stack; color: $primary-color; }"
		].join("");
	}
}
