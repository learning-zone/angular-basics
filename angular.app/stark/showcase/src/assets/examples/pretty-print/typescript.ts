import { Component, OnInit } from "@angular/core";

@Component({
	selector: "pretty-print-example",
	templateUrl: "./pretty-print.component.html",
	styleUrls: ["./pretty-print.component.scss"]
})
export class PrettyPrintComponent implements OnInit {
	public rawTypescriptData: string;

	public ngOnInit(): void {
		this.rawTypescriptData = [
			"function calculateData(seed:any, operationFn:Function):any {",
			"var data:any = operationFn(seed);",
			"if (!data){",
			"data = 'could not calculate data';",
			"}",
			"return data;",
			"}"
		].join("");
	}
}
