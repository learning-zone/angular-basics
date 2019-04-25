import { Component, OnInit, Input, Inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FileService } from "./file.service";
import { STARK_LOGGING_SERVICE, StarkErrorImpl, StarkLoggingService } from "@nationalbankbelgium/stark-core";

export interface ExampleFile {
	extension: string;
	data: string;
	format: string;
}

@Component({
	selector: "example-viewer",
	templateUrl: "./example-viewer.component.html",
	styleUrls: ["./example-viewer.component.scss"]
})
export class ExampleViewerComponent implements OnInit {
	@Input()
	public extensions: string[];
	@Input()
	public filesPath: string;
	@Input()
	public exampleTitle: string;

	public appBaseHref: string;
	public examplesFolder: string;
	public exampleFiles: ExampleFile[];
	public showSource: boolean;

	public constructor(private fileService: FileService, @Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {
		this.extensions = ["HTML", "TS", "CSS"];
		this.exampleFiles = [];
		this.showSource = false;
		this.appBaseHref = this.getAppBaseHref();
		this.examplesFolder = "assets/examples/";
	}

	public ngOnInit(): void {
		this.fetchExampleFiles();
	}

	public fetchExampleFiles(): void {
		for (const extension of this.extensions) {
			this.fileService.fetchFile(this.appBaseHref + this.examplesFolder + this.filesPath + "." + extension.toLowerCase()).subscribe(
				(data: string) =>
					this.addExampleFile({
						extension: extension,
						data: data,
						format: this.translateExtensionToFormat(extension)
					}),
				(error: HttpErrorResponse) => this.logger.error("Error while fetching files", new StarkErrorImpl(error))
			);
		}
	}

	/**
	 * Get the final baseHref based on the path location of the Showcase app. Useful when deployed on GitHub Pages
	 */
	public getAppBaseHref(): string {
		// the final url in GitHub Pages will be something like "/showcase/latest/" or "/showcase/some-version/"
		const finalUrlRegex: RegExp = /(\/showcase\/[\d\D][^\/]+(\/|\/$|$))/;
		const trailingSlashRegex: RegExp = /\/$/;
		const matches: RegExpExecArray | null = finalUrlRegex.exec(window.location.pathname);

		let finalBaseHref: string = "";

		if (matches && matches[1]) {
			finalBaseHref = matches[1]; // match group 1 contains the base url (i.e. "/showcase/latest/")
		}

		// add a trailing slash to the url in case it doesn't have any
		if (!finalBaseHref.match(trailingSlashRegex)) {
			finalBaseHref = finalBaseHref + "/";
		}

		return finalBaseHref;
	}

	public addExampleFile(fileContent: ExampleFile): void {
		this.exampleFiles.push(fileContent);
	}

	public toggleSourceView(): void {
		this.showSource = !this.showSource;
	}

	public trackExampleFile(_index: number, file: ExampleFile): string {
		return file.extension;
	}

	private translateExtensionToFormat(extension: string): string {
		switch (extension.toLowerCase()) {
			case "js":
				return "javascript";

			case "ts":
				return "typescript";

			default:
				return extension;
		}
	}
}
