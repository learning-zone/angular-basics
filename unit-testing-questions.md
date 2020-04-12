## Angular Unit Testing Interview Questions 



#### Q. How do you mock a service to inject in a unit test?
**a.) Resolving via TestBed**  
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

**b.) Resolving via the inject function**  
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

**c.) Overriding the components providers**  
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

**d.) Resolving via the component injector**  
When the component is created since it has it’s own injector it will resolve the AuthService itself and not forward the request to it’s parent TestBed injector.

If we wanted to get the same instance of dependency that was passed to the component constructor we need to resolve using the component injector, we can do that through the component fixture like so:
```typescript
componentService = fixture.debugElement.injector.get(AuthService);
```
 
**login.component.spec.ts**
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

#### Q. What is Karma? What is the use in Angular?
Karma is a tool for executing source code against test code inside a browser environment. It supports the running of tests in each browser it’s configured for. Results are displayed on both the command line and on the browser for the developer to inspect which tests have passed or failed. Karma also watches the files and can trigger a test rerun whenever a file changes. At the root of the Angular project, we have the file `karma.conf` that’s used to configure Karma. 

The contents should look something like this:
```typescript
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
```

#### Q. What is Jasmine? What is the Use in Angular? 
Jasmine is a javascript testing framework that supports a software development practice called `Behaviour Driven Development`, or `BDD` for short. It’s a specific flavour of `Test Driven Development (TDD)`.

Jasmine, and BDD in general, attempts to describe tests in a human readable format so that non-technical people can understand what is being tested. 

For example if we wanted to test this function:
```typescript
function message() {
  return 'Hello world!';
}
```

We would write a jasmine test spec like so:
```typescript
describe('Hello world', () => { 
  it('says hello', () => { 
    expect(message()) 
        .toEqual('Hello world!'); 
  });
});
```

* The `describe(string, function)` function defines what we call a Test Suite, a collection of individual Test Specs.
* The `it(string, function)` function defines an individual Test Spec, this contains one or more Test Expectations.
* The `expect(actual)` expression is what we call an Expectation. In conjunction with a Matcher it describes an expected piece of behaviour in the application.
* The `matcher(expected)` expression is what we call a Matcher. It does a boolean comparison with the expected value passed in vs. the actual value passed to the expect function, if they are false the spec fails.

**Built-in matchers**  
```typescript
expect(array).toContain(member);
expect(fn).toThrow(string);
expect(fn).toThrowError(string);
expect(instance).toBe(instance);
expect(mixed).toBeDefined();
expect(mixed).toBeFalsy();
expect(mixed).toBeNull();
expect(mixed).toBeTruthy();
expect(mixed).toBeUndefined();
expect(mixed).toEqual(mixed);
expect(mixed).toMatch(pattern);
expect(number).toBeCloseTo(number, decimalPlaces);
expect(number).toBeGreaterThan(number);
expect(number).toBeLessThan(number);
expect(number).toBeNaN();
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(number);
expect(spy).toHaveBeenCalledWith(...arguments);
```

**Setup and teardown**

**beforeAll**: This function is called once, before all the specs in describe test suite are run.  
**afterAll**: This function is called once after all the specs in a test suite are finished.  
**beforeEach**: This function is called before each test specification, it function, has been run.  
**afterEach**: This function is called after each test specification has been run.  

We might use these functions like so:
```typescript
describe('Hello world', () => {

  let expected = "";

  beforeEach(() => {
    expected = "Hello World";
  });

  afterEach(() => {
    expected = "";
  });

  it('says hello', () => {
    expect(message())
        .toEqual(expected);
  });
});
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. What is Protractor?  
Protractor is an end-to-end test framework for Angular. It runs your tests inside a real browser, interacting with it as real person would. Unlike unit tests, where we test individual functions, here we test the entire logic. Protractor is able to fill in forms, click buttons and confirm that the expected data and styling is displayed in the HTML document. Just like Karma, Protractor has its own configuration file at the root of your Angular project, `protractor.conf`:
```typescript
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
```

#### Q. How to test a components input as well as its outputs?
 
**LoginComponent.ts**  
```typescript
import {Component, EventEmitter, Input, Output} from '@angular/core';

export class User { (1)
  constructor(public email: string, public password: string) {
  }
}

@Component({
  selector: 'app-login',
  template: `
<form>
  <label>Email</label>
  <input type="email"
         #email>
  <label>Password</label>
  <input type="password"
         #password>
  <button type="button" (2)
          (click)="login(email.value, password.value)"
          [disabled]="!enabled">Login
  </button>
</form>
`
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<User>(); (3)
  @Input() enabled = true; (4)

  login(email, password) { (5)
    console.log(`Login ${email} ${password}`);
    if (email && password) {
      console.log(`Emitting`);
      this.loggedIn.emit(new User(email, password));
    }
  }
}
```
1. We create a User class which holds the model of a logged in user.
1. The button is sometimes disabled depending on the enabled input property value and on clicking the button we call the login function.
1. The component has an output event called loggedIn.
1. The component has an input property called enabled.
1. In the login function we emit a new user model on the loggedIn event.

**LoginComponent.spec.ts**  
```typescript
describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });
});
```

**Testing @Inputs**  
To test inputs we need to do things:

* We need to be able to change the input property enabled on our component.
* We need to check that the button is enabled or disabled depending on the value of our input property.
```typescript
it('Setting enabled to false disables the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
});
```

**Testing @Outputs**  
```typescript
it('Entering email and password emits loggedIn event', () => {
  let user: User;
  loginEl.nativeElement.value = "test@example.com"; (1)
  passwordEl.nativeElement.value = "123456";

  component.loggedIn.subscribe((value) => user = value);

  submitEl.triggerEventHandler('click', null); (2)

  expect(user.email).toBe("test@example.com");
  expect(user.password).toBe("123456");
});
```
1. Setup data in our input controls.
1. Trigger a click on our submit button, this synchronously emits the user object in the subscribe callback!

Since the output event is actually an Observable we can subscribe to it and get a callback for every item emitted.
We store the emitted value to a user object and then add some expectations on the user object. 

We can test inputs by just setting values on a components input properties. We can test outputs by subscribing to an EventEmitters observable and storing the emitted values on local variables.
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

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
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

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
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

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
1. `describe()` – Test suit (just a function)
2. `it()`  - The spec or test
3. `expect()` -  Expected outcome.

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
*login.component.ts*
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

**login.component.spec.ts**
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

**login.component.html**
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
```
ng test
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. How do you unit test a service with a dependency?
Using `TestBed`
```typescript
TestBed.configureTestingModule({
  providers: [AuthService]
});
```
#### Q. How code coverage works in angular 7?
The CLI can run unit tests and create code coverage reports. Code coverage reports show you any parts of our code base that may not be properly tested by your unit tests.

To generate a coverage report run the following command in the root of your project.
```bash
ng test --code-coverage
```
When the tests are complete, the command creates a new `/coverage` folder in the project. Open the `index.html` file to see a report with your source code and code coverage values.

If you want to create code-coverage reports every time you test, you can set the following option in the CLI configuration file, `angular.json`:
```json
"test": {
  "options": {
    "codeCoverage": true
  }
}
```
**Code coverage enforcement**  

The code coverage percentages let you estimate how much of your code is tested. If your team decides on a set minimum amount to be unit tested, you can enforce this minimum with the Angular CLI.

For example, suppose you want the code base to have a minimum of 80% code coverage. To enable this, open the Karma test platform configuration file, `karma.conf.js`, and add the following in the `coverageIstanbulReporter`: key.
```
coverageIstanbulReporter: {
  reports: [ 'html', 'lcovonly' ],
  fixWebpackSourcePaths: true,
  thresholds: {
    statements: 80,
    lines: 80,
    branches: 80,
    functions: 80
  }
}
```
The thresholds property causes the tool to enforce a minimum of 80% code coverage when the unit tests are run in the project.

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. Explain Unit Testing using Mocha and Chai in Angular 7?
**Installation**  
```bash
npm install chai mocha ts-node @types/chai @types/mocha --save-dev
```
**Mocha** is a JavaScript test framework running on Node.js and in the browser. Mocha allows asynchronous testing, test coverage reports, and use of any assertion library. Mocha gives us a Suite for describing, running and building tests but it does not give us a way to check values.

**Chai** is a BDD / TDD assertion library for NodeJS and the browser that can be delightfully paired with any javascript testing framework. 

Basically, mocha is a framework and chai is a library. Let's go a little deeper in mocha. Mocha uses hooks to organize its structure. 

* **describe()**: It's used to group, which you can nest as deep;
* **it()**: It's the test case;
* **before()**: It's a hook to run before the first it() or describe();
* **beforeEach()**: It’s a hook to run before each it() or describe();
* **after()**: It’s a hook to run after it() or describe();
* **afterEach()**: It’s a hook to run after each it() or describe();

**Scenario 1: One test case**   

In this case, we can just call a solitary `it()`, mocha will run this only test.
```typescript
it('Homer should drink beer', () => {
  /** Test cases */
})
```
**Scenario 2: A nested test case**  

In this case, we can nest some `describes()` hooks and finally call `it()` to execute the test.
```typescript
describe('Abraham Simpson', () => {
  describe('Homer Simpson', () => {
    describe('Bart Simpson', () => {
      it('Bart should skate', () => { 
        /** Test cases */ 
      })
    })
  })
})
```
**Scenario 3: Two test cases in one test**  

Here, inside the `describe()` we have two `it()` that will execute the tests.
```typescript
describe('Homer Simpson', () => {
  it('Bart should skate', () => { 
    /** Test cases for Bart */ 
  })
  it('Lisa should play sax', () => { 
    /** Test cases for Lisa */ 
  })
})
```
**Scenario 4: Run just once before the first test case**  

In this scenario, before the first `it()` mocha will execute what is inside `before()`, but only once.
```javascript
describe('Springfield', () => {
	before(() => {
		console.log('Marge calls Barge and Lisa (you see this only once)')
	})
	it('Bart should hear his mother', () => {
		/** Test cases */
	})
	it('Lisa should hear her mother', () => {
		/** Test cases */
	})
})
```
**Scenario 5: Run once before each test case**  

On the contrary of `before()`, **beforeEach()** is executed each time for each `it()` [or `describe()`] that we have. If we have one `it()`, it will be executed just once. if we have two `it()` it will be executed twice and so go on.
```typescript
describe('Springfield', () => {
	beforeEach(() => {
		console.log('Marge calls Barge and Lisa (you see this twice)')
	})
	it('Bart should hear his mother', () => {
		/** Test cases */
	})
	it('Lisa should hear her mother', () => {
		/** Test cases */
	})
})
```
**Scenario 6: Two tests in a big test**  

In this last scenario, mocha will nest the `describe()` and execute `it()`.
```typescript
describe('Homer Simpson', () => {
	describe('Bart Simpson', () => {
		it('Bart should skate', () => {
			/** Test cases */
		})
	})
	describe('Lisa Simpson', () => {
		it('Lisa should play sax', () => {
			/** Test cases */
		})
	})
})
```
Run
```bash
$ yarn mocha
```

#### Q. What are some of the different tests types you can write?
#### Q. How do you mock a service to inject in an integration test?
#### Q. How do you mock a module in an integration test?
#### Q. How do you test a component that has a dependency to an async service?
#### Q. What is the difference between 'async()' and 'fakeAsync()'?

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>
