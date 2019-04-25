import { Component, OnInit, Inject } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkPrettyPrintFormat } from "@nationalbankbelgium/stark-ui";

export interface FileType {
	format: StarkPrettyPrintFormat;
	title: string;
	path: string;
	rawData: string;
}

@Component({
	selector: "demo-pretty-print",
	templateUrl: "./demo-pretty-print.component.html",
	styleUrls: ["./demo-pretty-print.component.scss"]
})
export class DemoPrettyPrintComponent implements OnInit {
	public fileTypes: FileType[] = [];

	public dataFormats: StarkPrettyPrintFormat[] = [];
	public selectedDataFormat: string;
	public highlightingEnabled: boolean;
	public unformattedData: string;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.addCss();
		this.addScss();
		this.addHtml();
		this.addJavascript();
		this.addTypescript();
		this.addJson();
		this.addXml();
		this.addSql();

		this.unformattedData = "";
		this.selectedDataFormat = "";
		this.highlightingEnabled = false;
		this.dataFormats = this.fileTypes.map((fileType: FileType) => fileType.format);
	}

	public dataFormatDropdownOnChange(selectedValue: string): void {
		this.selectedDataFormat = selectedValue;
	}

	public toggleHighlightingEnabled(): void {
		this.highlightingEnabled = !this.highlightingEnabled;
	}

	public trackFileTypes(_index: number, fileType: any): string {
		return fileType.format;
	}

	private addCss(): void {
		const fileType: FileType = {
			format: "css",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.CSS",
			path: "pretty-print/css",
			rawData: [
				"body{background: #D2DA9C url(leftcolbg.jpg)repeat-y left top;color: #FFF;}",
				"p{margin-bottom:1em}ul{margin-left:20px;margin-bottom:1em}"
			].join("")
		};
		this.fileTypes.push(fileType);
	}

	private addScss(): void {
		const fileType: FileType = {
			format: "scss",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.SCSS",
			path: "pretty-print/scss",
			rawData: [
				"$font-stack: Helvetica, sans-serif; $primary-color: #333; body { font: 100% $font-stack; color: $primary-color; }"
			].join("")
		};
		this.fileTypes.push(fileType);
	}

	private addHtml(): void {
		const fileType: FileType = {
			format: "html",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.HTML",
			path: "pretty-print/html",
			rawData: `<!DOCTYPE html><html><head><style>body {background-color: powderblue;}h1{color: blue;}
				flashy{color: red;}</style></head><body><h1>This is a heading</h1><p class="flashy">
				This is a flashy paragraph.</p></body></html>`
		};
		this.fileTypes.push(fileType);
	}

	private addJavascript(): void {
		const fileType: FileType = {
			format: "javascript",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.JAVASCRIPT",
			path: "pretty-print/javascript",
			rawData: [
				"function calculateData(seed, operationFn) {",
				"var data = operationFn(seed);",
				"if (!data){",
				"data = 'could not calculate data';",
				"}",
				"return data;",
				"}"
			].join("")
		};
		this.fileTypes.push(fileType);
	}

	private addTypescript(): void {
		const fileType: FileType = {
			format: "typescript",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.TYPESCRIPT",
			path: "pretty-print/typescript",
			rawData: [
				"function calculateData(seed:any, operationFn:Function):any {",
				"var data:any = operationFn(seed);",
				"if (!data){",
				"data = 'could not calculate data';",
				"}",
				"return data;",
				"}"
			].join("")
		};
		this.fileTypes.push(fileType);
	}

	private addJson(): void {
		const fileType: FileType = {
			format: "json",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.JSON",
			path: "pretty-print/json",
			rawData: [
				'{"menu": { "id": "file", "value": "File",',
				'"menuitem": [{"value": "New", "onclick": "CreateNewDoc()"},',
				'{"value": "Open", "onclick": "OpenDoc()"},',
				'{"value": "Close", "onclick": "CloseDoc()"}]}}'
			].join("")
		};
		this.fileTypes.push(fileType);
	}

	private addXml(): void {
		const fileType: FileType = {
			format: "xml",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.XML",
			path: "pretty-print/xml",
			rawData: `<menu id="file" value="File"><menuitem value="New" onclick="CreateNewDoc()" />
				<menuitem value="Open" onclick="OpenDoc()" />
				<menuitem value="Close" onclick="CloseDoc()" /></menu>`
		};
		this.fileTypes.push(fileType);
	}

	private addSql(): void {
		const fileType: FileType = {
			format: "sql",
			title: "SHOWCASE.DEMO.PRETTY_PRINT.SQL",
			path: "pretty-print/sql",
			rawData: [
				"SELECT DISTINCT Name FROM Production.Product AS p WHERE EXISTS (SELECT * ",
				"FROM Production.ProductModel AS pm WHERE p.ProductModelID = pm.ProductModelID ",
				"AND pm.Name LIKE 'Long-Sleeve Logo Jersey%')"
			].join("")
		};
		this.fileTypes.push(fileType);
	}
}
