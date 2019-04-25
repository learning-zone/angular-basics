import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from '../../services/spinner.service';

class MockSpinnerService extends SpinnerService { }

describe('SpinnerComponent (class only)', () => {
  let comp: SpinnerComponent;
  let spinnerService: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        SpinnerComponent,
        { provide: SpinnerService , useClass: MockSpinnerService }
      ]
    });
    // inject both the component and the dependent service.
    comp = TestBed.get(SpinnerComponent);
    spinnerService = TestBed.get(SpinnerService);
  });

  it('should not have welcome message after construction', () => {
    expect(comp.active).toBeUndefined();
  });

  it('subject should set spinner active value from observable (false)', (done: DoneFn) => {  
    comp.ngOnInit();
    spinnerService.status.subscribe(value => { 
      expect(comp.active).toBe(false);
      done();
    });
    spinnerService.active = false;
  });

  it('subject should set spinner active value from observable (true)', (done: DoneFn) => {  
    comp.ngOnInit();
    spinnerService.status.subscribe(value => { 
      expect(comp.active).toBe(true);
      done();
    });
    spinnerService.active = true;
  });

});

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  // the actually injected service
  let componentSpinnerService: SpinnerService;
  // the TestBed Injected service
  let spinnerService: SpinnerService;
  let spinnerServiceStub: Partial<SpinnerService>;

  beforeEach(async(() => {
    spinnerServiceStub = { };
    TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ],
      providers: [ { provide: SpinnerService, useValue: spinnerServiceStub } ]
    })
    .compileComponents();
    spinnerService = TestBed.get(SpinnerService);

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();

    // SpinnerService actually injected into the component
    spinnerService = fixture.debugElement.injector.get(SpinnerService);
    componentSpinnerService = spinnerService;
    // SpinnerService from the root injector
    spinnerService = TestBed.get(SpinnerService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the component\'s SpinnerService instance',
    inject([SpinnerService], (service: SpinnerService) => {
    expect(service).toBe(componentSpinnerService);
  }));

  it('TestBed and Component SpinnerService should be the same', () => {
    expect(spinnerService === componentSpinnerService).toBe(true);
  });

  it('stub object and injected SpinnerService should not be the same', () => {
    expect(spinnerServiceStub === spinnerService).toBe(false);
  });
});
