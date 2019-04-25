import { Component, OnInit } from "@angular/core";

@Component({
	selector: "pretty-print-example",
	templateUrl: "./pretty-print.component.html",
	styleUrls: ["./pretty-print.component.scss"]
})
export class PrettyPrintComponent implements OnInit {
	public rawJsonData: string;

	public ngOnInit(): void {
		this.rawJsonData = [
			'{"menu": { "id": "file", "value": "File",',
			'"menuitem": [{"value": "New", "onclick": "CreateNewDoc()"},',
			'{"value": "Open", "onclick": "OpenDoc()"},',
			'{"value": "Close", "onclick": "CloseDoc()"}]}}'
		].join("");
	}
}
