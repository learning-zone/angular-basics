## Angular Unit Testing Interview Questions and Answers

#### Q. How do you mock a service to inject in a unit test?
**Resolving via TestBed**  
The `TestBed` acts as a dummy Angular Module and we can configure it like one including with a set of providers like so:
```typescript
TestBed.configureTestingModule({
  providers: [AuthService]
});
```
We can then ask the `TestBed` to resolve a token into a dependency using it’s internal injector, like so:
```typescript
testBedService = TestBed.get(AuthService);
```
If most of our test specs need the same dependency mocked the same way we can resolve it once in the `beforeEach` function and mock it it there.

**Resolving via the inject function**  
```typescript
it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([AuthService], (injectService: AuthService) => {
      expect(injectService).toBe(testBedService);
    })
);
```
The `inject` function wraps the test spec function but lets us also inject dependencies using the parent injector in the `TestBed`.
```typescript
inject(
  [token1, token2, token2],
  (dep1, dep2, dep3) => { }
)
```
The first param is an array of tokens we want to resolve dependencies for, the second parameter is a function whose arguments are the resolved dependencies.

Using the `inject` function:

* Makes it clear what dependencies each spec function uses.
* If each test spec requires different mocks and spys this is a better solution that resolving it once per test suite.

**Overriding the components providers**  
Before we create a component via the `TestBed` we can override it’s providers. Lets imagine we have a mock `AuthService` like so:
```typescript
class MockAuthService extends AuthService {
  isAuthenticated() {
    return 'Mocked';
  }
}
```
We can override the components providers to use this mocked `AuthService` like so.
```typescript
TestBed.overrideComponent(
    LoginComponent,
    {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
);
```
The syntax is pretty specific, it’s called a `MetaDataOverride` and it can have the properties `set`, `add` and `remove`. We use `set` to completely replace the providers array with the values we’ve set.

**Resolving via the component injector**  
When the component is created since it has it’s own injector it will resolve the AuthService itself and not forward the request to it’s parent TestBed injector.

If we wanted to get the same instance of dependency that was passed to the component constructor we need to resolve using the component injector, we can do that through the component fixture like so:
```typescript
componentService = fixture.debugElement.injector.get(AuthService);
```

**Listing**  
login.component.spec.ts
```typescript
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from "./auth.service";

class MockAuthService extends AuthService {
    isAuthenticated() {
        return 'Mocked';
    }
}

describe('Component: Login', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let testBedService: AuthService;
    let componentService: AuthService;

    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService]
        });

        // Configure the component with another set of Providers
        TestBed.overrideComponent(
            LoginComponent,
            { set: { providers: [{ provide: AuthService, useClass: MockAuthService }] } }
        );

        // create component and test fixture
        fixture = TestBed.createComponent(LoginComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // AuthService provided to the TestBed
        testBedService = TestBed.get(AuthService);

        // AuthService provided by Component, (should return MockAuthService)
        componentService = fixture.debugElement.injector.get(AuthService);
    });

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
        inject([AuthService], (injectService: AuthService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('Service injected via component should be and instance of MockAuthService', () => {
        expect(componentService instanceof MockAuthService).toBeTruthy();
    });
});
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. What Is Karma? What Is the Use in Angular?
#### Q. What Is Jasmine? What Is the Use in Angular? 
#### Q. How to Test a components inputs as well as its outputs?
#### Q. How to Interact with a components view?
#### Q. Which of the following can be used to run unit tests in Angular?
* Karma
* Protractor
#### Q. Which of the following can be used to run end-to-end tests in Angular?
* Karma
* Protractor
#### Q. Test doubles are needed when writing which of the following?
* Unit tests
* End-to-end tests
* Both of the above
#### Q. Which of the following will need Angular testing utilities for unit testing?
* Services
* Components
* Both of the above
#### Q. Which of the following utility is used to create an Angular testing module which can be used to create module environment for the class one wants to test?
* AngularTestUtil
* NgTest
* NgTestBed
* TestBed
#### Q. It is recommended to write isolated unit tests for which of the following?
* Services
* Pipes
* Both of the above
* None of the above
#### Q. Karma test runner requires tests to be written with file having extension such as which of the following?
* .test.ts
* .spec.ts
* Both of the above
#### Q. Which of the following TestBed method is used to create an Angular testing module which is used for creating module environment for testing the class?
* createTestModule
* configureTestModule
* configureTestingModule
* createTestingModule
#### Q. Which of the following TestBed method is used to create an Angular component under test?
* createComponent
* createTestingComponent
* configureComponent
* configureTestingComponent
#### Q. It is OK to re-configure TestBed after calling createComponent API on TestBed.
* True
* False
#### Q. Types of Test in Angular?

The types of Testing looks like -
1. Unit Test
2. Integration Test
3. End to End (e2e) Test

#### Q. What is Unit Test in Angular? 
The Unit Test is used to testing a single function, single components in Isolation. This is very fast.

In this Test, we are not able to say that everything is all right in the application. Just for a single Unit or function assure that working fine.

Example:
**app.component.ts**  
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```

**app.component.spec.ts**
```typescript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
   
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
```

**app.component.html**  
```html
<div style="text-align:center">
  <h1>  Welcome to {{title}}! </h1>
</div>
<h2>Here are some links to help you start: </h2>
<ul>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://code-sample.com/">Tour of Examples</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://code-sample.com/">CLI Documentation</a></h2>
  </li>
</ul>
```


#### Q. What Is Integration Testing in Angular? 
The Integration Testing is used to testing a component with templates and this testing containing more time as per comparison Unit Test.

#### Q. What is End-to-End Testing in Angular? 
The End to End Testing is used to testing the entire application looks like -
1. All User Interactions
2. All Service Calls
3. Authentication/Authorization of app
4. Everything of App

This is the actual testing of your append it is fast action.
Unit testing and Integrations testing will do as fake calls but e2e testing is done with your actual Services and APIs calls.


Recommended Unit Testing Tools – Angular 4/2 and Angular
* Karma
* Jasmine and
* QUnit

Test Function – After installing everything as per your project requirements, CREATE your project.
The following Steps –
* ng new YourTestProject
* ng install
* ng serve/ng test

*Note – If you are going to development then type ng server command and if you want to test your project, you should type ng test command.  After type ng test command and press inter. It’s taking some time to installing everything in your project for test.*

#### Q. What are the Test functions avilable in Angular?
1. describe – Test suit (just a function)
2. it  - The spec or test
3. expect -  Expected outcome.

Triple Rule of Testing –
1. Arrange - Create and Initialize the Components
2. Act -  Invoke the Methods/Functions of Components
3. Assert - Assert the expected outcome/behaviour

#### Q. What are the Best Practices in Unit Testing?
The quick list of best practices.
* Use `beforeEach()` to Initialize the context for your tests.
* Make sure the string descriptions you put in `describe()` and `it()` make sense as output
* Use `after()` and `afterEach()` to clean-up your tests if there is any state that may bleed over.
* If any one test is over 15 lines of code, you may need to refactor the test
```typescript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

//describe – Test suit (just a function)
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  }));

 // it - The spec or test
 it('should have hello property', function() {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;

   //expect – This Is For expected outcome.
   expect(app.hello).toBe('Hello, Anil!');
 });
});
```

**Example: Login Testing**  
login.component.ts
```typescript
import { Component, OnInit, EventEmitter,Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter<User>();
  @Input() enabled = true;

  constructor() { }

  ngOnInit() {  }

  login(email, password) {
    if (email && password) {
       this.loggedIn.emit(new User(email, password));
    }
   
    console.log(`Login ${email} ${password}`);
  }
}

export class User {
  constructor(public email: string, public password: string) {
  }
}
```

login.component.spec.ts
```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, DebugElement} from "@angular/core";
import {LoginComponent, User } from './login.component';
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitElement: DebugElement;
  let loginElement: DebugElement;
  let passwordElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    submitElement = fixture.debugElement.query(By.css('button'));
    loginElement = fixture.debugElement.query(By.css('input[type=email]'));
    passwordElement = fixture.debugElement.query(By.css('input[type=password]'));
  });

  it('Setting enabled to false disabled the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();

    //Expected outcome
    expect(submitElement.nativeElement.disabled).toBeTruthy();
  });

  it('Setting enabled to true enables the submit button', () => {
    component.enabled = true;
    fixture.detectChanges();

    //Expected outcome
    expect(submitElement.nativeElement.disabled).toBeFalsy();
  });

  it('Entering email and password emits loggedIn event', () => {
    let user: User;

    loginElement.nativeElement.value = "anil.singh@code-sample.com";
    passwordElement.nativeElement.value = "$ystem!1356";

    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // This sync emits the event and the subscribe callback gets executed above
    submitElement.triggerEventHandler('click', null);

    //Expected outcome
    expect(user.email).toBe("anil.singh@code-sample.com");
    expect(user.password).toBe("$ystem!1356");
  });

});
```

login.component.html
```html
<form>
  <label>Email</label>
  <input type="email" #email>
  <label>Password</label>
  <input type="password" #password>
  <button type="button"
          (click)="login(email.value, password.value)"
          [disabled]="!enabled">Login
  </button>
</form>
```

#### Q. How do you unit test a service with a dependency?
Using `TestBed`
```typescript
TestBed.configureTestingModule({
  providers: [AuthService]
});
```
