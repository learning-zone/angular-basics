/* angular imports */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, ViewChild, EventEmitter } from "@angular/core";

/* jasmine imports */
import Spy = jasmine.Spy;

/* stark-core imports */
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService, MockStarkRoutingService } from "@nationalbankbelgium/stark-core/testing";

/* stark-ui imports */
import { StarkSliderComponent } from "./slider.component";
import { StarkSliderConfig } from "./slider-config.intf";

/***
 * To be able to test changes to the input fields, the Slider component is hosted inside the TestComponentHost class.
 */
@Component({
	selector: `host-component`,
	template: `
		<stark-slider [values]="sliderValues" sliderId="rangeSlider" [sliderConfig]="sliderConfig"
					  (changed)="onValuesChange($event)"></stark-slider>`
})
class TestHostComponent {
	@ViewChild(StarkSliderComponent)
	public sliderComponent: StarkSliderComponent;

	public sliderId: string;
	public sliderValues: number[];
	public sliderConfig: StarkSliderConfig;

	/**
	 * Simulates the OnValueChanges event of the slider component
	 * To be able to test the 'Changes' output
	 * @param values: Array of numeric values to be set to the slider.
	 */
	public onValuesChange(values: number[]): void {
		this.sliderValues = values;
	}
}

describe("SliderController", () => {
	let component: StarkSliderComponent;
	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;

	const mockConfig: StarkSliderConfig = {
		range: {
			min: 5,
			max: 95
		}
	};
	const mockSliderId: string = "rangeSlider";
	const mockValues: number[] = [11, 22];
	const newMockValues: number[] = [14, 18];
	let attachSliderInstanceUpdateHandlerSpy: jasmine.Spy;

	/**
	 * async beforeEach
	 */
	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			declarations: [StarkSliderComponent, TestHostComponent],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
				{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService }
			]
		}).compileComponents();
	}));

	/**
	 * Synchronous beforeEach
	 */
	beforeEach(() => {
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		component = hostComponent.sliderComponent;

		hostComponent.sliderConfig = mockConfig;
		hostComponent.sliderValues = mockValues;
		hostComponent.sliderId = mockSliderId;

		spyOn(component.noUiSliderLibrary, "create").and.callThrough();
		spyOn(component, "updateSliderInstanceValues").and.callThrough();
		spyOn(<EventEmitter<number[]>>component.changed, "emit").and.callThrough();

		/***
		 * The stage
		 *   The "attachSliderInstanceUpdateHandler()" method attaches an update handler to the slider component by using the "slider.on" method.
		 *   The "slider.on" method should have been called once.
		 *   The "fixture.detectChanges()" method triggers the "ngOnInit()" and "ngAfterViewInit()" methods in the component.
		 *   The "ngAfterViewInit()" method calls the "createSliderInstance()" and "attachSliderInstanceUpdateHandler()" methods of the component.
		 *   The slider is created in the "createSliderInstance()" method
		 *
		 * The problem
		 *   Creating the spy before the "fixture.detectChanges()" method does not work, because the slider is not created yet.
		 *   Creating the spy after the "fixture.detectChanges()" method does not work either, because the "component.slider.on" function has already been executed.
		 *
		 * The solution
		 *   Putting a "stub" method on the "attachSliderInstanceUpdateHandler()" method, blocks the original code from being executed.
		 *   Before testing the call of the "component.slider.on" method, put a "callThrough" on the spy and execute the "attachSliderInstanceUpdateHandler()" method manually.
		 */
		attachSliderInstanceUpdateHandlerSpy = spyOn(component, "attachSliderInstanceUpdateHandler").and.stub();

		/***
		 * fixture.detectChanges() triggers the ngOnInit() and ngAfterViewInit() methods in the component.
		 */
		hostFixture.detectChanges();

		/***
		 * The slider is created after the fixture.detectChanges() has been called
		 */
		spyOn(component.slider, "on").and.callThrough();
		spyOn(component.slider, "set").and.callThrough();
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(hostFixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
			expect(component.routingService).not.toBeNull();
			expect(component.routingService).toBeDefined();
		});

		it("should have inputs", () => {
			expect(component.values).toBe(mockValues);
			expect(component.sliderConfig).toBe(mockConfig);
			expect(component.sliderId).toBe(mockSliderId);
			expect(component.changed).toBeDefined();
		});
	});

	describe("createSliderInstance", () => {
		it("should create the slider instance and assign it to the internal variable", () => {
			expect(component.noUiSliderLibrary.create).toHaveBeenCalledTimes(1);
			expect(component.slider).toBeDefined();
		});
	});

	describe("attachSliderInstanceUpdateHandler", () => {
		it("should add an 'update' event listener to the slider instance", () => {
			attachSliderInstanceUpdateHandlerSpy.and.callThrough();

			component.attachSliderInstanceUpdateHandler();

			expect(component.slider.on).toHaveBeenCalledTimes(1);

			expect((<Spy>component.slider.on).calls.argsFor(0)[0]).toBe("update");
			expect(typeof (<Spy>component.slider.on).calls.argsFor(0)[1]).toBe("function");
		});

		it("should update the slider instance when the values change", () => {
			attachSliderInstanceUpdateHandlerSpy.and.callThrough();
			component.attachSliderInstanceUpdateHandler();

			hostComponent.sliderValues = newMockValues;
			hostFixture.detectChanges();

			expect(component.updateSliderInstanceValues).toHaveBeenCalledTimes(1);
			expect(component.values).toBe(newMockValues);
		});

		it("should update the values and call changed() whenever the update handler is triggered and the slider unencodedValues changed", () => {
			attachSliderInstanceUpdateHandlerSpy.and.callThrough();
			component.attachSliderInstanceUpdateHandler();

			const updateHandler: Function = (<Spy>component.slider.on).calls.argsFor(0)[1];

			const dummyHandle: number = 0;
			const dummyEncodedValues: number[] = [];
			const dummyUnencodedValues: number[] = [14, 18];

			updateHandler(dummyEncodedValues, dummyHandle, dummyUnencodedValues);

			expect(component.values).toEqual(dummyUnencodedValues);
			expect(component.latestUnencodedValues).toBe(dummyUnencodedValues);
			expect((<EventEmitter<number[]>>component.changed).emit).toHaveBeenCalledTimes(1);
			expect((<EventEmitter<number[]>>component.changed).emit).toHaveBeenCalledWith(component.values);
		});

		it("should not update the slider instance when the same values are used", () => {
			hostComponent.sliderValues = mockValues;
			hostFixture.detectChanges();

			expect(component.updateSliderInstanceValues).toHaveBeenCalledTimes(0);
			expect(component.values).toBe(mockValues);
		});

		it("should NOT do anything in case the update handler is triggered but the slider unencodedValues did not change", () => {
			attachSliderInstanceUpdateHandlerSpy.and.callThrough();
			component.attachSliderInstanceUpdateHandler();

			const updateHandler: Function = (<Spy>component.slider.on).calls.argsFor(0)[1];

			const dummyHandle: number = 0;
			const dummyEncodedValues: number[] = [];

			updateHandler(dummyEncodedValues, dummyHandle, mockValues);

			expect(component.values).toBe(mockValues);
			expect(component.latestUnencodedValues).toBeUndefined();
			expect((<EventEmitter<number[]>>component.changed).emit).not.toHaveBeenCalled();
		});
	});

	describe("updateSliderInstanceValues", () => {
		it("should set the current values to the slider instance", () => {
			hostComponent.sliderValues = mockValues;

			component.updateSliderInstanceValues();

			expect(component.slider.set).toHaveBeenCalledTimes(1);
			expect(component.slider.set).toHaveBeenCalledWith(mockValues);
		});
	});
});
