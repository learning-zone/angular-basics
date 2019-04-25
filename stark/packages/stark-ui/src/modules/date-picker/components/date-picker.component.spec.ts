import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDatepickerModule, MatInputModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { StarkDatePickerComponent } from "./date-picker.component";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService, MockStarkRoutingService } from "@nationalbankbelgium/stark-core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { EventEmitter } from "@angular/core";

describe("DatePickerComponent", () => {
	let fixture: ComponentFixture<StarkDatePickerComponent>;
	let component: StarkDatePickerComponent;

	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			declarations: [StarkDatePickerComponent],
			imports: [BrowserAnimationsModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, TranslateModule.forRoot()],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
				{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService },
				TranslateService
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarkDatePickerComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(fixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
		});

		it("should NOT have any inputs set", () => {
			expect(component.date).toBeUndefined();
			expect(component.dateFilter).toBeUndefined();
			expect(component.isDisabled).toBeUndefined();
			expect(component.label).toBeUndefined();
			expect(component.maxDate).toBeUndefined();
			expect(component.minDate).toBeUndefined();
			expect(component.minDate).toBeUndefined();
			expect(component.pickerId).toBeDefined();
			expect(component.pickerId).toEqual("");
			expect(component.pickerName).toBeDefined();
			expect(component.pickerName).toEqual("");
			expect(component.dateChanged).toBeDefined();
			expect(component.dateChanged).toEqual(new EventEmitter<Date>());
		});
	});

	describe("mat-datepicker properties binding", () => {
		it("the id of the MatDatepicker should be pickerId", () => {
			component.pickerId = "test-id";
			fixture.detectChanges();
			const input: HTMLElement = fixture.nativeElement.querySelector("#test-id");
			expect(input).not.toBeNull();
		});

		it("the id of the MatDatepickerInput should be pickerId + '-input'", () => {
			component.pickerId = "test-id";
			fixture.detectChanges();
			const input: HTMLElement = fixture.nativeElement.querySelector("#test-id-input");
			expect(input).not.toBeNull();
		});

		it("the name of the MatDatepickerInput should be pickerName", () => {
			component.pickerName = "test-name";
			fixture.detectChanges();
			const input: HTMLElement = fixture.nativeElement.querySelector('[name="test-name"]');
			expect(input).not.toBeNull();
		});

		it("the MatDatepickerInput should be disabled when isDisabled is true", () => {
			component.isDisabled = true;
			fixture.detectChanges();
			expect(component.pickerInput.disabled).toBe(true);
		});

		it("the placeholder of the MatDatepickerInput should be label", () => {
			component.label = "test placeholder";
			fixture.detectChanges();
			const input: HTMLElement = fixture.nativeElement.querySelector('[placeholder="test placeholder"]');
			expect(input).not.toBeNull();
		});

		it("the MatDatepickerInput minDate should be min", () => {
			const minDate: Date = new Date("07-01-2018");
			component.minDate = minDate;
			fixture.detectChanges();
			expect(component.pickerInput.min.toDate()).toEqual(minDate);
		});

		it("the MatDatepickerInput maxDate should be max", () => {
			const maxDate: Date = new Date("07-02-2018");
			component.maxDate = maxDate;
			fixture.detectChanges();
			expect(component.pickerInput.max.toDate()).toEqual(maxDate);
		});

		it("the MatDatepickerInput value should be date", () => {
			const date: Date = new Date("07-03-2018");
			component.date = date;
			fixture.detectChanges();
			expect(component.pickerInput.value.toDate()).toEqual(date);
		});
	});

	describe("Dates filter", () => {
		it("filterOnlyWeekdays() should filter week days", () => {
			expect(component.filterOnlyWeekdays(new Date("07-16-2018"))).toBe(true);
			expect(component.filterOnlyWeekdays(new Date("07-17-2018"))).toBe(true);
			expect(component.filterOnlyWeekdays(new Date("07-18-2018"))).toBe(true);
			expect(component.filterOnlyWeekdays(new Date("07-19-2018"))).toBe(true);
			expect(component.filterOnlyWeekdays(new Date("07-20-2018"))).toBe(true);
			expect(component.filterOnlyWeekdays(new Date("07-21-2018"))).toBe(false);
			expect(component.filterOnlyWeekdays(new Date("07-22-2018"))).toBe(false);
		});

		it("filterOnlyWeekends() should filter week days", () => {
			expect(component.filterOnlyWeekends(new Date("07-16-2018"))).toBe(false);
			expect(component.filterOnlyWeekends(new Date("07-17-2018"))).toBe(false);
			expect(component.filterOnlyWeekends(new Date("07-18-2018"))).toBe(false);
			expect(component.filterOnlyWeekends(new Date("07-19-2018"))).toBe(false);
			expect(component.filterOnlyWeekends(new Date("07-20-2018"))).toBe(false);
			expect(component.filterOnlyWeekends(new Date("07-21-2018"))).toBe(true);
			expect(component.filterOnlyWeekends(new Date("07-22-2018"))).toBe(true);
		});

		it("dateFilter should be filterOnlyWeekdays() when dateFilter is OnlyWeekdays", () => {
			component.dateFilter = "OnlyWeekdays";
			fixture.detectChanges();
			expect(typeof component.dateFilter).toBe("function");
			if (typeof component.dateFilter === "function") {
				expect(component.dateFilter).toBe(component.filterOnlyWeekdays);
			}
		});

		it("dateFilter should be filterOnlyWeekends() when dateFilter is OnlyWeekends", () => {
			component.dateFilter = "OnlyWeekends";
			expect(typeof component.dateFilter).toBe("function");
			if (typeof component.dateFilter === "function") {
				expect(component.dateFilter).toBe(component.filterOnlyWeekends);
			}
		});

		it("dateFilter() should be dateFilter in other cases", () => {
			expect(component.dateFilter).toBeUndefined();
			const func: any = (date: Date): boolean => {
				const day: number = date.getDay();
				return day === 3;
			};
			component.dateFilter = func;
			expect(component.dateFilter).toBe(func);
		});
	});
});
