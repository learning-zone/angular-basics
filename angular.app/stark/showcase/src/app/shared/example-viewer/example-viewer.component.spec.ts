import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule, MatTabsModule, MatTooltipModule } from "@angular/material";
import { throwError, of, Observable, Subject } from "rxjs";
import { filter, delay } from "rxjs/operators";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkPrettyPrintModule } from "@nationalbankbelgium/stark-ui";

import { ExampleFile, ExampleViewerComponent } from "./example-viewer.component";
import { FileService } from "./file.service";
import SpyObj = jasmine.SpyObj;
import Spy = jasmine.Spy;

describe("ExampleViewerComponent", () => {
	let component: ExampleViewerComponent;
	let fileService: SpyObj<FileService>;
	let fixture: ComponentFixture<ExampleViewerComponent>;
	let logger: SpyObj<StarkLoggingService>;

	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			declarations: [ExampleViewerComponent],
			imports: [NoopAnimationsModule, MatButtonModule, MatTabsModule, MatTooltipModule, StarkPrettyPrintModule],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
				{
					provide: FileService,
					useValue: jasmine.createSpyObj("FileServiceSpy", ["fetchFile"])
				}
			],
			schemas: [NO_ERRORS_SCHEMA] // tells the Angular compiler to ignore unrecognized elements and attributes: mat-icon
		}).compileComponents();
	}));

	beforeEach(() => {
		logger = TestBed.get(STARK_LOGGING_SERVICE);
		fileService = TestBed.get(FileService);
		fileService.fetchFile.and.callFake(() => of("initial dummy file content"));

		fixture = TestBed.createComponent(ExampleViewerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges(); // trigger initial data binding
	});

	describe("@Input() exampleTitle", () => {
		it("should change the exampleTitle according to the @Input", () => {
			const h3: HTMLHeadingElement = fixture.nativeElement.querySelector("mat-card-header h3");
			component.exampleTitle = "Test title";
			fixture.detectChanges();
			expect(h3.textContent).toContain(component.exampleTitle);
		});
	});

	describe("@Input() extensions", () => {
		it("should show the tabs when the file exist", (done: DoneFn) => {
			component.exampleFiles = [];
			component.extensions = ["CSS", "JS", "HTML", "SCSS", "TS"];
			fixture.detectChanges();

			let button: HTMLButtonElement = fixture.nativeElement.querySelector("mat-card-header button");
			button.click();
			let tabs: any[] = fixture.nativeElement.querySelectorAll(".mat-tab-labels .mat-tab-label");
			expect(tabs.length).toBe(0);

			fileService.fetchFile.and.callFake(() => {
				fileFetched.next("file has been fetched");
				return of("some file content");
			});

			const fileFetched: Subject<string> = new Subject();
			const allFilesFetched: Observable<string> = fileFetched.asObservable().pipe(
				filter((_value: string, index: number) => index === component.extensions.length - 1),
				delay(10) // we need to give some time until the tabs are refreshed
			);

			allFilesFetched.subscribe(() => {
				fixture.detectChanges();

				button = fixture.nativeElement.querySelector("mat-card-header button");
				button.click();
				tabs = fixture.nativeElement.querySelectorAll(".mat-tab-labels .mat-tab-label");
				expect(tabs.length).toBe(component.extensions.length);
				done();
			});

			component.fetchExampleFiles();
		});
	});

	describe("fetchExampleFiles()", () => {
		beforeEach(() => {
			spyOn(component, "addExampleFile");
			fileService.fetchFile.calls.reset();
			logger.error.calls.reset();
		});

		it("should not do anything when the file doesn't exist", () => {
			fileService.fetchFile.and.returnValue(throwError("file does not exist"));
			expect(fileService.fetchFile).not.toHaveBeenCalled();
			component.fetchExampleFiles();
			expect(fileService.fetchFile).toHaveBeenCalledTimes(component.extensions.length);
			expect(logger.error).toHaveBeenCalledTimes(component.extensions.length);
			expect(component.addExampleFile).not.toHaveBeenCalled();
		});

		it("should call addExampleFiles() when the file exists passing the data of the file and its metadata", () => {
			fileService.fetchFile.and.returnValue(of("dummy file content"));
			component.fetchExampleFiles();
			expect(fileService.fetchFile).toHaveBeenCalledTimes(component.extensions.length);
			expect(component.addExampleFile).toHaveBeenCalledTimes(component.extensions.length);

			component.extensions.forEach((extension: string, index: number) => {
				const exampleFile: ExampleFile = (<Spy>component.addExampleFile).calls.argsFor(index)[0];
				expect(exampleFile.data).toBeDefined();
				expect(exampleFile.extension).toBe(extension);
				expect(exampleFile.format).toBeDefined();
			});
		});

		it("should call the FileService passing the right url of the file including the base URL if any", () => {
			fileService.fetchFile.and.returnValue(of("dummy file content"));
			component.filesPath = "dummy-example-file";
			component.appBaseHref = "";
			component.fetchExampleFiles();
			expect(fileService.fetchFile).toHaveBeenCalledTimes(component.extensions.length);

			component.extensions.forEach((extension: string, index: number) => {
				const filePath: string = fileService.fetchFile.calls.argsFor(index)[0];
				expect(filePath).toBe(component.examplesFolder + component.filesPath + "." + extension.toLowerCase());
			});

			fileService.fetchFile.calls.reset();
			component.appBaseHref = "mock-bae-href/";
			component.fetchExampleFiles();
			expect(fileService.fetchFile).toHaveBeenCalledTimes(component.extensions.length);

			component.extensions.forEach((extension: string, index: number) => {
				const filePath: string = fileService.fetchFile.calls.argsFor(index)[0];
				expect(filePath).toBe(
					component.appBaseHref + component.examplesFolder + component.filesPath + "." + extension.toLowerCase()
				);
			});
		});
	});

	describe("toggleSourceView()", () => {
		it("should toggle the showSource property", () => {
			component.showSource = true;
			component.toggleSourceView();
			expect(component.showSource).toBe(false);
			component.toggleSourceView();
			expect(component.showSource).toBe(true);
		});
	});
});
