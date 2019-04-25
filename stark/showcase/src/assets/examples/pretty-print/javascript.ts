import { Component, OnInit } from "@angular/core";

@Component({
	selector: "pretty-print-example",
	templateUrl: "./pretty-print.component.html",
	styleUrls: ["./pretty-print.component.scss"]
})
export class PrettyPrintComponent implements OnInit {
	public rawJavascriptData: string;

	public ngOnInit(): void {
		this.rawJavascriptData = [
			"function calculateData(seed, operationFn) {",
			"var data = operationFn(seed);",
			"if (!data){",
			"data = 'could not calculate data';",
			"}",
			"return data;",
			"}"
		].join("");
	}
}
