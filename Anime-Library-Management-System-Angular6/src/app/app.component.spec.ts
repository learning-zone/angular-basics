import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({selector: 'app-header', template: ''})
class HeaderStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent {}

@Component({selector: 'app-spinner', template: ''})
class SpinnerStubComponent {}

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        HeaderStubComponent,
        RouterOutletStubComponent,
        FooterStubComponent,
        SpinnerStubComponent 
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));

  it(`should have heading as 'Abhishek's Anime Library'`, async(() => {
    expect(comp.title).toEqual(`Abhishek's Anime Library`);
  }));

});
