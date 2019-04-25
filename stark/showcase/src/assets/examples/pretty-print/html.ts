import { Component, OnInit } from "@angular/core";

@Component({
	selector: "pretty-print-example",
	templateUrl: "./pretty-print.component.html",
	styleUrls: ["./pretty-print.component.scss"]
})
export class PrettyPrintComponent implements OnInit {
	public rawHtmlData: string;

	public ngOnInit(): void {
		this.rawHtmlData = `<!DOCTYPE html><html><head><style>body {background-color: powderblue;}h1{color: blue;}
			flashy{color: red;}</style></head><body><h1>This is a heading</h1><p class="flashy">
			This is a flashy paragraph.</p></body></html>`;
	}
}
