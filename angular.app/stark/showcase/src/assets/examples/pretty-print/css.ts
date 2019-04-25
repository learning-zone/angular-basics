import { Component, OnInit } from "@angular/core";

@Component({
	selector: "pretty-print-example",
	templateUrl: "./pretty-print.component.html",
	styleUrls: ["./pretty-print.component.scss"]
})
export class PrettyPrintComponent implements OnInit {
	public rawCssData: string;

	public ngOnInit(): void {
		this.rawCssData = [
			"body{background: #D2DA9C url(leftcolbg.jpg)repeat-y left top;color: #FFF;}",
			"p{margin-bottom:1em}ul{margin-left:20px;margin-bottom:1em}"
		].join("");
	}
}
