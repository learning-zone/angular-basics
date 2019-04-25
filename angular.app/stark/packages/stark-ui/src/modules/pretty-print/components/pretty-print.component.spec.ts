/* tslint:disable:completed-docs no-big-function no-duplicate-string */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, ViewChild } from "@angular/core";

/* stark-core imports */
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";

/* stark-ui imports */
import { StarkPrettyPrintComponent } from "./pretty-print.component";

/***
 * To be able to test changes to the input fields, the Pretty-Print component is hosted inside the TestComponentHost class.
 */
@Component({
	selector: `host-component`,
	template: `
		<stark-pretty-print [data]="data"
							[format]="format"
							[enableHighlighting]="enableHighlighting"></stark-pretty-print>`
})
class TestHostComponent {
	@ViewChild(StarkPrettyPrintComponent)
	public prettyPrintComponent: StarkPrettyPrintComponent;

	public data: string;
	public format: string;
	public enableHighlighting: boolean;
}

describe("PrettyPrintComponent", () => {
	let component: StarkPrettyPrintComponent;
	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;

	const shouldHaveInputs: string = "should have inputs set";
	const marginBottom: string = "margin-bottom";
	const classTokenFunction: string = 'class="token function"';
	const classTokenKeyword: string = 'class="token keyword"';
	const classTokenProperty: string = 'class="token property"';
	const classTokenSelector: string = 'class="token selector"';

	const rawXmlData: string = [
		'<menu id="file" value="File"><menuitem value="New" onclick="CreateNewDoc()" />',
		'<menuitem value="Open" onclick="OpenDoc()" />',
		'<menuitem value="Close" onclick="CloseDoc()" /></menu>'
	].join("");

	const formattedXmlData: string = [
		'<menu id="file" value="File">',
		'  <menuitem value="New" onclick="CreateNewDoc()" />',
		'  <menuitem value="Open" onclick="OpenDoc()" />',
		'  <menuitem value="Close" onclick="CloseDoc()" />',
		"</menu>"
	].join("\n"); // should contain line breaks

	const rawCssData: string = [
		"body{background: #D2DA9C url(leftcolbg.jpg)repeat-y left top;color: #FFF;}",
		"p{margin-bottom:1em}ul{margin-left:20px;margin-bottom:1em}"
	].join("");

	const formattedCssData: string = [
		"body {",
		"  background: #d2da9c url(leftcolbg.jpg) repeat-y left top;",
		"  color: #fff;",
		"}",
		"p {",
		"  margin-bottom: 1em;",
		"}",
		"ul {",
		"  margin-left: 20px;",
		"  margin-bottom: 1em;",
		"}\n" // an extra line break is added at the end
	].join("\n"); // should contain line breaks

	const rawScssData: string = [
		"$font-stack: Helvetica, sans-serif; $primary-color: #333; body { font: 100% $font-stack; color: $primary-color; }"
	].join("");

	const formattedScssData: string = [
		"$font-stack: Helvetica, sans-serif;",
		"$primary-color: #333;",
		"body {",
		"  font: 100% $font-stack;",
		"  color: $primary-color;",
		"}\n" // an extra line break is added at the end
	].join("\n"); // should contain line breaks

	const rawSqlData: string = [
		"SELECT DISTINCT Name FROM Production.Product AS p WHERE EXISTS (SELECT * ",
		"FROM Production.ProductModel AS pm WHERE p.ProductModelID = pm.ProductModelID ",
		"AND pm.Name LIKE 'Long-Sleeve Logo Jersey%')"
	].join("");

	const formattedSqlData: string = [
		"SELECT DISTINCT Name",
		"FROM Production.Product AS p",
		"WHERE EXISTS ",
		"  (SELECT *",
		"  FROM Production.ProductModel AS pm",
		"  WHERE p.ProductModelID = pm.ProductModelID",
		"      AND pm.Name LIKE 'Long-Sleeve Logo Jersey%')"
	].join("\n"); // should contain line breaks

	const rawJsonData: string = [
		'{"menu": { "id": "file", "value": "File",',
		'"menuitem": [{"value": "New", "onclick": "CreateNewDoc()"},',
		'{"value": "Open", "onclick": "OpenDoc()"},',
		'{"value": "Close", "onclick": "CloseDoc()"}]}}'
	].join("");

	const formattedJsonData: string = [
		"{",
		'  "menu": {',
		'    "id": "file",',
		'    "value": "File",',
		'    "menuitem": [',
		'      { "value": "New", "onclick": "CreateNewDoc()" },',
		'      { "value": "Open", "onclick": "OpenDoc()" },',
		'      { "value": "Close", "onclick": "CloseDoc()" }',
		"    ]",
		"  }",
		"}\n" // an extra line break is added at the end
	].join("\n"); // should contain line breaks

	const rawJavascriptData: string = [
		"function calculateData(seed, operationFn) {",
		"var data = operationFn(seed);",
		"if (!data){",
		"data = 'could not calculate data';",
		"}",
		"return data;",
		"}"
	].join("");

	const formattedJavascriptData: string = [
		"function calculateData(seed, operationFn) {",
		"  var data = operationFn(seed);",
		"  if (!data) {",
		'    data = "could not calculate data";',
		"  }",
		"  return data;",
		"}\n" // an extra line break is added at the end
	].join("\n");

	const rawTypescriptData: string = [
		"function calculateData(seed:any, operationFn:Function):any {",
		"var data:any = operationFn(seed);",
		"if (!data){",
		"data = 'could not calculate data';",
		"}",
		"return data;",
		"}"
	].join("");

	const formattedTypescriptData: string = [
		"function calculateData(seed: any, operationFn: Function): any {",
		"  var data: any = operationFn(seed);",
		"  if (!data) {",
		'    data = "could not calculate data";',
		"  }",
		"  return data;",
		"}\n" // an extra line break is added at the end
	].join("\n");

	/**
	 * async beforeEach
	 */
	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			declarations: [StarkPrettyPrintComponent, TestHostComponent],
			providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }]
		}).compileComponents();
	}));

	/**
	 * Synchronous beforeEach
	 */
	beforeEach(() => {
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		hostFixture.detectChanges(); // trigger initial data binding

		component = hostComponent.prettyPrintComponent;
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(hostFixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
		});

		it("should NOT have any inputs set", () => {
			expect(component.data).toBeUndefined();
			expect(component.format).toBeUndefined();
			expect(component.enableHighlighting).toBeUndefined();
		});
	});

	describe("Formatting", () => {
		describe("XML", () => {
			beforeEach(() => {
				hostComponent.data = rawXmlData;
				hostComponent.format = "xml";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawXmlData);
				expect(component.format).toBe("xml");
				expect(component.enableHighlighting).toBeUndefined();
			});

			it("should nicely format raw XML data", () => {
				let formattedData: string = component.prettyString;

				const regExLessThan: RegExp = /&lt;/gi;
				const regExGreaterThan: RegExp = /&gt;/gi;
				const regExQuote: RegExp = /&quot;/gi;

				formattedData = formattedData
					.replace(regExLessThan, "<")
					.replace(regExGreaterThan, ">")
					.replace(regExQuote, '"');

				expect(formattedData).toBe(formattedXmlData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('&lt;menu id="file" value="File"&gt');
				expect(preElement.innerHTML).toContain('&lt;menuitem value="New" onclick="CreateNewDoc()" /&gt;');
				expect(preElement.innerHTML).toContain("&lt;/menu&gt;");
			});
		});

		describe("CSS", () => {
			beforeEach(() => {
				hostComponent.data = rawCssData;
				hostComponent.format = "css";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawCssData);
				expect(component.format).toBe("css");
				expect(component.enableHighlighting).toBeUndefined();
			});

			it("should nicely format raw CSS data", () => {
				expect(component.prettyString).toBe(formattedCssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("body");
				expect(preElement.innerHTML).toContain("color: #fff;");
				expect(preElement.innerHTML).toContain("margin-left: 20px;");
			});

			it("should simply display the unformatted raw CSS data in case it is not valid CSS", () => {
				const invalidRawCssData: string = rawCssData + "}";

				hostComponent.data = invalidRawCssData;
				hostComponent.format = "css";
				hostFixture.detectChanges();

				expect(component.prettyString).toBe(invalidRawCssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("p{margin-bottom:1em}ul{margin-left:20px;margin-bottom:1em}");
			});
		});

		describe("SCSS", () => {
			beforeEach(() => {
				hostComponent.data = rawScssData;
				hostComponent.format = "scss";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawScssData);
				expect(component.format).toBe("scss");
				expect(component.enableHighlighting).toBeUndefined();
			});

			it("should nicely format raw SCSS data", () => {
				expect(component.prettyString).toBe(formattedScssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("$font-stack: Helvetica, sans-serif;");
				expect(preElement.innerHTML).toContain("$primary-color: #333;");
				expect(preElement.innerHTML).toContain("font: 100% $font-stack;");
			});

			it("should simply display the unformatted raw SCSS data in case it is not valid SCSS", () => {
				const invalidRawScssData: string = rawScssData + "}";

				hostComponent.data = invalidRawScssData;
				hostComponent.format = "scss";
				hostFixture.detectChanges();

				expect(component.prettyString).toBe(invalidRawScssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("$primary-color: #333; body { font: 100% $font-stack;");
			});
		});

		describe("SQL", () => {
			beforeEach(() => {
				hostComponent.data = rawSqlData;
				hostComponent.format = "sql";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawSqlData);
				expect(component.format).toBe("sql");
				expect(component.enableHighlighting).toBeUndefined();
			});

			it("should nicely format raw SQL data", () => {
				expect(component.prettyString).toBe(formattedSqlData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("FROM Production.Product AS p");
				expect(preElement.innerHTML).toContain("FROM Production.ProductModel AS pm");
				expect(preElement.innerHTML).toContain("AND pm.Name LIKE 'Long-Sleeve Logo Jersey%'");
			});
		});

		describe("JSON", () => {
			beforeEach(() => {
				hostComponent.data = rawJsonData;
				hostComponent.format = "json";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawJsonData);
				expect(component.format).toBe("json");
				expect(component.enableHighlighting).toBeUndefined();
			});

			it("should nicely format raw JSON data", () => {
				expect(component.prettyString).toBe(formattedJsonData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('"id": "file",');
				expect(preElement.innerHTML).toContain('"menuitem": [');
				expect(preElement.innerHTML).toContain('"onclick": "CreateNewDoc()"');
			});

			it("should simply display the unformatted raw JSON data in case it is not valid JSON", () => {
				const invalidRawJsonData: string = rawJsonData.replace(":", "oops");

				hostComponent.data = invalidRawJsonData;
				hostComponent.format = "json";
				hostFixture.detectChanges();

				expect(component.prettyString).toBe(invalidRawJsonData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('{"menu"oops { "id": "file",');
				expect(preElement.innerHTML).toContain('"menuitem": [{"value": "New", "onclick": "CreateNewDoc()"}');
			});
		});

		describe("Javascript", () => {
			beforeEach(() => {
				hostComponent.data = rawJavascriptData;
				hostComponent.format = "javascript";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawJavascriptData);
				expect(component.format).toBe("javascript");
				expect(component.enableHighlighting).toBeUndefined();
			});

			it("should nicely format raw javascript data", () => {
				expect(component.prettyString).toBe(formattedJavascriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("function calculateData(seed, operationFn) {");
				expect(preElement.innerHTML).toContain("var data = operationFn(seed);");
				expect(preElement.innerHTML).toContain("if (!data) {");
			});

			it("should simply display the unformatted raw javascript data in case it is not valid javascript", () => {
				const invalidRawJavascriptData: string = rawJavascriptData + "}";

				hostComponent.data = invalidRawJavascriptData;
				hostComponent.format = "javascript";
				hostFixture.detectChanges();

				expect(component.prettyString).toBe(invalidRawJavascriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("if (!data){data = 'could not calculate data';}return data;");
			});
		});

		describe("Typescript", () => {
			beforeEach(() => {
				hostComponent.data = rawTypescriptData;
				hostComponent.format = "typescript";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawTypescriptData);
				expect(component.format).toBe("typescript");
				expect(component.enableHighlighting).toBeUndefined();
			});

			it("should nicely format raw typescript data", () => {
				expect(component.prettyString).toBe(formattedTypescriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("function calculateData(seed: any, operationFn: Function): any {");
				expect(preElement.innerHTML).toContain("var data: any = operationFn(seed);");
				expect(preElement.innerHTML).toContain("if (!data) {");
			});

			it("should simply display the unformatted raw typescript data in case it is not valid typescript", () => {
				const invalidRawTypescriptData: string = rawTypescriptData + "}";

				hostComponent.data = invalidRawTypescriptData;
				hostComponent.format = "typescript";
				hostFixture.detectChanges();

				expect(component.prettyString).toBe(invalidRawTypescriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("if (!data){data = 'could not calculate data';}return data;");
			});
		});

		describe("Undefined format", () => {
			beforeEach(() => {
				hostComponent.data = rawTypescriptData;
				hostComponent.format = <any>undefined;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawTypescriptData);
				expect(component.format).toBeUndefined();
				expect(component.enableHighlighting).toBeUndefined();
			});

			// the same test is performed with an unknown format
			// tslint:disable-next-line: no-identical-functions
			it("should leave the raw data unformatted when the format is not defined", () => {
				expect(component.prettyString).toBe(rawTypescriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("function calculateData(seed:any, operationFn:Function):any");
			});
		});

		describe("Unknown Format string", () => {
			beforeEach(() => {
				hostComponent.data = rawTypescriptData;
				hostComponent.format = "UnknownFormat";
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawTypescriptData);
				expect(component.format).toBe("unknownformat");
				expect(component.enableHighlighting).toBeUndefined();
			});

			// the same test is performed with an unknown format
			// tslint:disable-next-line: no-identical-functions
			it("should leave the raw data unformatted when the format is an unrecognised string", () => {
				expect(component.prettyString).toBe(rawTypescriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain("function calculateData(seed:any, operationFn:Function):any");
			});
		});
	});

	describe("Highlighting", () => {
		describe("XML", () => {
			beforeEach(() => {
				hostComponent.data = rawXmlData;
				hostComponent.format = "xml";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawXmlData);
				expect(component.format).toBe("xml");
				expect(component.enableHighlighting).toBe(true);
			});

			it("should highlight the formatted XML data", () => {
				let formattedData: string = component.prettyString;

				const regExLessThan: RegExp = /&lt;/gi;
				const regExGreaterThan: RegExp = /&gt;/gi;
				const regExQuote: RegExp = /&quot;/gi;

				formattedData = formattedData
					.replace(regExLessThan, "<")
					.replace(regExGreaterThan, ">")
					.replace(regExQuote, '"');

				expect(formattedData).toContain("class='language-markup'");
				expect(formattedData).toContain('class="token tag"');
				expect(formattedData).toContain("<span");
				expect(formattedData).toContain("menu");
				expect(formattedData).toContain("CreateNewDoc");
				expect(formattedData).toContain("menuitem");
				expect(formattedData).not.toBe(formattedXmlData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('<code class="language-markup">');
				expect(preElement.innerHTML).toContain('<span class="token punctuation">&lt;</span>menu</span>');
				expect(preElement.innerHTML).toContain('<span class="token attr-name">value</span>');
			});

			it("should remove highlighting from the already highlighted XML data when the enableHighlighting is set to FALSE", () => {
				hostComponent.enableHighlighting = false;
				hostFixture.detectChanges();

				let formattedData: string = component.prettyString;

				const regExLessThan: RegExp = /&lt;/gi;
				const regExGreaterThan: RegExp = /&gt;/gi;
				const regExQuote: RegExp = /&quot;/gi;

				formattedData = formattedData
					.replace(regExLessThan, "<")
					.replace(regExGreaterThan, ">")
					.replace(regExQuote, '"');

				expect(formattedData).not.toContain("class='language-markup'");
				expect(formattedData).not.toContain('class="token tag"');
				expect(formattedData).not.toContain("<span");
				expect(formattedData).toContain("menu");
				expect(formattedData).toContain("CreateNewDoc");
				expect(formattedData).toContain("menuitem");
				expect(formattedData).toBe(formattedXmlData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-markup">');
				expect(preElement.innerHTML).toContain('&lt;menu id="file" value="File"&gt;');
				expect(preElement.innerHTML).toContain('&lt;menuitem value="New" onclick="CreateNewDoc()" /&gt;');
				expect(preElement.innerHTML).toContain("&lt;/menu&gt;");
			});
		});

		describe("CSS", () => {
			beforeEach(() => {
				hostComponent.data = rawCssData;
				hostComponent.format = "css";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawCssData);
				expect(component.format).toBe("css");
				expect(component.enableHighlighting).toBe(true);
			});

			it("should highlight the formatted CSS data", () => {
				const formattedData: string = component.prettyString;

				expect(formattedData).toContain("class='language-css'");
				expect(formattedData).toContain(classTokenSelector);
				expect(formattedData).toContain("<span");
				expect(formattedData).toContain("background");
				expect(formattedData).toContain("color");
				expect(formattedData).toContain(marginBottom);
				expect(formattedData).not.toBe(formattedCssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('<code class="language-css">');
				expect(preElement.innerHTML).toContain('<span class="token selector">body </span>');
				expect(preElement.innerHTML).toContain('<span class="token punctuation">:</span>');
			});

			it("should remove highlighting from the already highlighted CSS data when the enableHighlighting is set to FALSE", () => {
				hostComponent.enableHighlighting = false;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-css'");
				expect(formattedData).not.toContain(classTokenSelector);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).toContain("background");
				expect(formattedData).toContain("color");
				expect(formattedData).toContain(marginBottom);
				expect(formattedData).toBe(formattedCssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-css">');
				expect(preElement.innerHTML).toContain("color: #fff;");
				expect(preElement.innerHTML).toContain("margin-bottom: 1em;");
				expect(preElement.innerHTML).toContain("margin-left: 20px;");
			});
		});

		describe("SCSS", () => {
			beforeEach(() => {
				hostComponent.data = rawScssData;
				hostComponent.format = "scss";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawScssData);
				expect(component.format).toBe("scss");
				expect(component.enableHighlighting).toBe(true);
			});

			it("should highlight the formatted SCSS data", () => {
				const formattedData: string = component.prettyString;

				expect(formattedData).toContain("class='language-scss'");
				expect(formattedData).toContain(classTokenSelector);
				expect(formattedData).toContain("<span");
				expect(formattedData).toContain("$primary-color");
				expect(formattedData).toContain("$font-stack");
				expect(formattedData).toContain("Helvetica");
				expect(formattedData).not.toBe(formattedScssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('<code class="language-scss">');
				expect(preElement.innerHTML).toContain('<span class="token variable">$font-stack</span>');
				expect(preElement.innerHTML).toContain('<span class="token punctuation">:</span>');
			});

			it("should remove highlighting from the already highlighted SCSS data when the enableHighlighting is set to FALSE", () => {
				hostComponent.enableHighlighting = false;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-scss'");
				expect(formattedData).not.toContain(classTokenSelector);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).toContain("$primary-color");
				expect(formattedData).toContain("$font-stack");
				expect(formattedData).toContain("Helvetica");
				expect(formattedData).toBe(formattedScssData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-scss">');
				expect(preElement.innerHTML).toContain("font: 100% $font-stack;");
				expect(preElement.innerHTML).toContain("color: $primary-color;");
			});
		});

		describe("SQL", () => {
			beforeEach(() => {
				hostComponent.data = rawSqlData;
				hostComponent.format = "sql";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawSqlData);
				expect(component.format).toBe("sql");
				expect(component.enableHighlighting).toBe(true);
			});

			it("should highlight the formatted SQL data", () => {
				const formattedData: string = component.prettyString;

				expect(formattedData).toContain("class='language-sql'");
				expect(formattedData).toContain(classTokenKeyword);
				expect(formattedData).toContain("<span");
				expect(formattedData).toContain("SELECT");
				expect(formattedData).toContain("FROM");
				expect(formattedData).toContain("WHERE");
				expect(formattedData).not.toBe(formattedSqlData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('<code class="language-sql">');
				expect(preElement.innerHTML).toContain('<span class="token keyword">WHERE</span>');
				expect(preElement.innerHTML).toContain('<span class="token operator">=</span>');
			});

			it("should remove highlighting from the already highlighted SQL data when the enableHighlighting is set to FALSE", () => {
				hostComponent.enableHighlighting = false;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-sql'");
				expect(formattedData).not.toContain(classTokenKeyword);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).toContain("SELECT");
				expect(formattedData).toContain("FROM");
				expect(formattedData).toContain("WHERE");
				expect(formattedData).toBe(formattedSqlData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-sql">');
				expect(preElement.innerHTML).toContain("SELECT DISTINCT Name");
				expect(preElement.innerHTML).toContain("FROM Production.Product AS p");
			});
		});

		describe("JSON", () => {
			beforeEach(() => {
				hostComponent.data = rawJsonData;
				hostComponent.format = "json";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawJsonData);
				expect(component.format).toBe("json");
				expect(component.enableHighlighting).toBe(true);
			});

			it("should highlight the formatted JSON data", () => {
				const formattedData: string = component.prettyString;

				expect(formattedData).toContain("class='language-json'");
				expect(formattedData).toContain(classTokenProperty);
				expect(formattedData).toContain("<span");
				expect(formattedData).toContain("menu");
				expect(formattedData).toContain("CreateNewDoc");
				expect(formattedData).toContain("menuitem");
				expect(formattedData).not.toBe(formattedJsonData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('<code class="language-json">');
				expect(preElement.innerHTML).toContain('<span class="token string">"file"</span>');
				expect(preElement.innerHTML).toContain('<span class="token property">"onclick"</span>');
			});

			it("should remove highlighting from the already highlighted JSON data when the enableHighlighting is set to FALSE", () => {
				hostComponent.enableHighlighting = false;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-json'");
				expect(formattedData).not.toContain(classTokenProperty);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).toContain("menu");
				expect(formattedData).toContain("CreateNewDoc");
				expect(formattedData).toContain("menuitem");
				expect(formattedData).toBe(formattedJsonData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-json">');
				expect(preElement.innerHTML).toContain('"menuitem": [');
				expect(preElement.innerHTML).toContain('"onclick": "CreateNewDoc()"');
			});

			it("should not highlight invalid JSON data", () => {
				const invalidRawJsonData: string = rawJsonData.replace(":", "oops");

				hostComponent.data = invalidRawJsonData;
				hostComponent.format = "json";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-json'");
				expect(formattedData).not.toContain(classTokenProperty);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).toContain("menu");
				expect(formattedData).toContain("CreateNewDoc");
				expect(formattedData).toContain("menuitem");
				expect(formattedData).toBe(invalidRawJsonData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-json">');
				expect(preElement.innerHTML).toContain('"menu"oops');
			});
		});

		describe("JavaScript", () => {
			beforeEach(() => {
				hostComponent.data = rawJavascriptData;
				hostComponent.format = "javascript";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawJavascriptData);
				expect(component.format).toBe("javascript");
				expect(component.enableHighlighting).toBe(true);
			});

			it("should highlight the formatted JavaScript data", () => {
				const formattedData: string = component.prettyString;

				expect(formattedData).toContain("class='language-javascript'");
				expect(formattedData).toContain(classTokenKeyword);
				expect(formattedData).toContain("<span");
				expect(formattedData).toContain(classTokenFunction);
				expect(formattedData).toContain("calculateData");
				expect(formattedData).toContain("var");
				expect(formattedData).toContain("operationFn");
				expect(formattedData).toContain("seed");
				expect(formattedData).toContain("return");
				expect(formattedData).not.toBe(rawJavascriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('<code class="language-javascript">');
				expect(preElement.innerHTML).toContain('<span class="token keyword">function</span>');
				expect(preElement.innerHTML).toContain('<span class="token punctuation">)</span>');
			});

			it("should remove highlighting from the already highlighted JavaScript data when the enableHighlighting is set to FALSE", () => {
				hostComponent.enableHighlighting = false;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-javascript'");
				expect(formattedData).not.toContain(classTokenKeyword);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).not.toContain(classTokenFunction);
				expect(formattedData).toContain("calculateData");
				expect(formattedData).toContain("var");
				expect(formattedData).toContain("operationFn");
				expect(formattedData).toContain("seed");
				expect(formattedData).toContain("return");
				expect(formattedData).toBe(formattedJavascriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-javascript">');
				expect(preElement.innerHTML).toContain("function calculateData(seed, operationFn)");
				expect(preElement.innerHTML).toContain("if (!data) {");
			});

			it("should not highlight invalid javascript data", () => {
				const invalidRawJavascriptData: string = rawJavascriptData + "}";

				hostComponent.data = invalidRawJavascriptData;
				hostComponent.format = "javascript";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-javascript'");
				expect(formattedData).not.toContain(classTokenKeyword);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).not.toContain(classTokenFunction);
				expect(formattedData).toContain("calculateData");
				expect(formattedData).toContain("var");
				expect(formattedData).toContain("operationFn");
				expect(formattedData).toContain("seed");
				expect(formattedData).toContain("return");
				expect(formattedData).toBe(invalidRawJavascriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-javascript">');
				expect(preElement.innerHTML).toContain("function calculateData(seed, operationFn)");
				expect(preElement.innerHTML).toContain("if (!data){data = 'could not calculate data';}");
			});
		});

		describe("TypeScript", () => {
			beforeEach(() => {
				hostComponent.data = rawTypescriptData;
				hostComponent.format = "typescript";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();
			});

			it(shouldHaveInputs, () => {
				expect(component.data).toBe(rawTypescriptData);
				expect(component.format).toBe("typescript");
				expect(component.enableHighlighting).toBe(true);
			});

			it("should highlight the formatted TypeScript data", () => {
				const formattedData: string = component.prettyString;

				expect(formattedData).toContain("class='language-typescript'");
				expect(formattedData).toContain(classTokenKeyword);
				expect(formattedData).toContain("<span");
				expect(formattedData).toContain(classTokenFunction);
				expect(formattedData).toContain("calculateData");
				expect(formattedData).toContain("var");
				expect(formattedData).toContain("operationFn");
				expect(formattedData).toContain("seed");
				expect(formattedData).toContain("return");
				expect(formattedData).not.toBe(rawTypescriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).toContain('<code class="language-typescript">');
				expect(preElement.innerHTML).toContain('<span class="token keyword">function</span>');
				expect(preElement.innerHTML).toContain('<span class="token punctuation">)</span>');
			});

			it("should remove highlighting from the already highlighted TypeScript data when the enableHighlighting is set to FALSE", () => {
				hostComponent.enableHighlighting = false;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-typescript'");
				expect(formattedData).not.toContain(classTokenKeyword);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).not.toContain(classTokenFunction);
				expect(formattedData).toContain("calculateData");
				expect(formattedData).toContain("var");
				expect(formattedData).toContain("operationFn");
				expect(formattedData).toContain("seed");
				expect(formattedData).toContain("return");
				expect(formattedData).toBe(formattedTypescriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-typescript">');
				expect(preElement.innerHTML).toContain("function calculateData(seed: any, operationFn: Function): any");
				expect(preElement.innerHTML).toContain('data = "could not calculate data";');
			});

			it("should not highlight invalid typescript data", () => {
				const invalidRawTypescriptData: string = rawTypescriptData + "}";

				hostComponent.data = invalidRawTypescriptData;
				hostComponent.format = "typescript";
				hostComponent.enableHighlighting = true;
				hostFixture.detectChanges();

				const formattedData: string = component.prettyString;

				expect(formattedData).not.toContain("class='language-typescript'");
				expect(formattedData).not.toContain(classTokenKeyword);
				expect(formattedData).not.toContain("<span");
				expect(formattedData).not.toContain(classTokenFunction);
				expect(formattedData).toContain("calculateData");
				expect(formattedData).toContain("var");
				expect(formattedData).toContain("operationFn");
				expect(formattedData).toContain("seed");
				expect(formattedData).toContain("return");
				expect(formattedData).toBe(invalidRawTypescriptData);

				const preElement: HTMLPreElement | null = <HTMLPreElement>hostFixture.nativeElement.querySelector("pre");
				expect(preElement).not.toBeNull();
				expect(preElement.innerHTML).not.toContain('<code class="language-typescript">');
				expect(preElement.innerHTML).toContain("function calculateData(seed:any, operationFn:Function):any");
				expect(preElement.innerHTML).toContain("if (!data){data = 'could not calculate data';}");
			});
		});
	});
});
