import { Component, OnInit } from "@angular/core";

@Component({
	selector: "pretty-print-example",
	templateUrl: "./pretty-print.component.html",
	styleUrls: ["./pretty-print.component.scss"]
})
export class PrettyPrintComponent implements OnInit {
	public rawXmlData: string;

	public ngOnInit(): void {
		this.rawXmlData = `<menu id="file" value="File"><menuitem value="New" onclick="CreateNewDoc()" />
			<menuitem value="Open" onclick="OpenDoc()" />
			<menuitem value="Close" onclick="CloseDoc()" /></menu>`;
	}
}
